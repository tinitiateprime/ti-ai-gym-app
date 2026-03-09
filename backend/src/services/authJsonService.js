const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const USERS_FILE = path.join(__dirname, "../../data/users.json");
const VALID_ROLES = ["MEMBER", "TRAINER", "SELLER", "OWNER"];

async function ensureUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, "[]", "utf8");
  }
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function parseUserNumber(value) {
  if (typeof value === "number") {
    return Number.isSafeInteger(value) ? value : String(value);
  }

  const raw = String(value ?? "").trim();
  if (!raw) return "";

  if (/^\d+$/.test(raw)) {
    if (raw.length > 1 && raw.startsWith("0")) return raw;

    const n = Number(raw);
    return Number.isSafeInteger(n) ? n : raw;
  }

  return raw;
}

function hasValue(v) {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.trim().length > 0;
  return true;
}

function generateId(prefix = "user") {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, key] = String(storedHash || "").split(":");
  if (!salt || !key) return false;

  const hashBuffer = crypto.scryptSync(String(password || ""), salt, 64);
  const keyBuffer = Buffer.from(key, "hex");

  if (hashBuffer.length !== keyBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(hashBuffer, keyBuffer);
}

function toSafeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    fullName: user.fullName,
    mobile: user.mobile,
    email: user.email,
    roleKey: user.roleKey,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt || user.createdAt,
  };
}

async function readUsers() {
  await ensureUsersFile();

  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await ensureUsersFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

async function findUserByEmail(email) {
  const users = await readUsers();
  const normalized = normalizeEmail(email);
  return users.find((u) => normalizeEmail(u.email) === normalized) || null;
}

async function createUser(input) {
  const fullName = String(input?.fullName || "").trim();
  const mobile = parseUserNumber(input?.mobile);
  const email = normalizeEmail(input?.email);
  const password = String(input?.password ?? "");
  const roleKey = String(input?.roleKey || "").trim().toUpperCase();

  if (
    !hasValue(fullName) ||
    !hasValue(mobile) ||
    !hasValue(email) ||
    !hasValue(password) ||
    !hasValue(roleKey)
  ) {
    throw new Error("All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (!VALID_ROLES.includes(roleKey)) {
    throw new Error("Invalid role selected");
  }

  const users = await readUsers();

  const alreadyExists = users.some((u) => normalizeEmail(u.email) === email);
  if (alreadyExists) {
    throw new Error("Email already registered");
  }

  const now = new Date().toISOString();

  const newUser = {
    id: generateId("user"),
    fullName,
    mobile,
    email,
    passwordHash: hashPassword(password),
    roleKey,
    createdAt: now,
    updatedAt: now,
  };

  users.push(newUser);
  await writeUsers(users);

  return toSafeUser(newUser);
}

async function verifyUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const ok = verifyPassword(password, user.passwordHash);
  if (!ok) return null;

  return toSafeUser(user);
}

module.exports = {
  createUser,
  verifyUser,
  findUserByEmail,
  readUsers,
};