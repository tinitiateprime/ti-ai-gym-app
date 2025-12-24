const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "user.json"); // ✅ your file name

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]", "utf-8");
}

function readUsers() {
  ensureStorage();
  const raw = fs.readFileSync(USERS_FILE, "utf-8");
  const arr = JSON.parse(raw || "[]");
  return Array.isArray(arr) ? arr : [];
}

function writeUsers(users) {
  ensureStorage();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

// ✅ SIGNUP (append to user.json)
app.post("/api/signup", (req, res) => {
  try {
    const { fullName, mobile, email, password, roleKey } = req.body || {};
    if (!fullName || !mobile || !email || !password || !roleKey) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const emailKey = String(email).trim().toLowerCase();
    const users = readUsers();

    const exists = users.some(u => String(u.email).toLowerCase() === emailKey);
    if (exists) return res.status(409).json({ ok: false, error: "User already exists" });

    const newUser = {
      fullName,
      mobile,
      email: emailKey,
      password, // ⚠️ real app: hash
      roleKey,  // MEMBER/TRAINER/SELLER
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    return res.json({ ok: true, user: { email: newUser.email, roleKey: newUser.roleKey, fullName: newUser.fullName } });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ✅ LOGIN (read from user.json)
app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Email and password required" });
    }

    const emailKey = String(email).trim().toLowerCase();
    const users = readUsers();

    const user = users.find(
      u => String(u.email).toLowerCase() === emailKey && String(u.password) === String(password)
    );

    if (!user) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    return res.json({
      ok: true,
      user: { email: user.email, roleKey: user.roleKey, fullName: user.fullName },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  ensureStorage();
  console.log("✅ API running on http://0.0.0.0:" + PORT);
  console.log("✅ Using file:", USERS_FILE);
});
