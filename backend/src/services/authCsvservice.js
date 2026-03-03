const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");

const USERS_FILE = path.join(__dirname, "../../data/user.json");

async function ensureUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, "[]", "utf8");
  }
}

async function readUsers() {
  await ensureUsersFile();

  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [];
  } catch (err) {
    return [];
  }
}

async function writeUsers(users) {
  await ensureUsersFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

async function findUserByEmail(email) {
  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);

  return users.find((user) => normalizeEmail(user.email) === normalizedEmail) || null;
}

async function createUser(input) {
  const users = await readUsers();
  const normalizedEmail = normalizeEmail(input.email);

  const existing = users.find(
    (user) => normalizeEmail(user.email) === normalizedEmail
  );

  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(String(input.password), 10);

  const newUser = {
    fullName: String(input.fullName || "").trim(),
    mobile: String(input.mobile || "").trim(),
    email: normalizedEmail,
    passwordHash,
    roleKey: String(input.roleKey || "").trim(),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return {
    fullName: newUser.fullName,
    mobile: newUser.mobile,
    email: newUser.email,
    roleKey: newUser.roleKey,
    createdAt: newUser.createdAt,
  };
}

async function verifyUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(String(password), user.passwordHash || "");
  if (!isValid) return null;

  return {
    fullName: user.fullName,
    mobile: user.mobile,
    email: user.email,
    roleKey: user.roleKey,
    createdAt: user.createdAt,
  };
}

module.exports = {
  createUser,
  verifyUser,
  findUserByEmail,
};