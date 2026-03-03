// src/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcryptjs";
import { appendCsvLine, readCsvObjects } from "../utils/blobCsv";

const router = Router();

const USERS_BLOB_PATH = "auth/users.csv";

const USER_HEADERS = [
  "fullName",
  "mobile",
  "email",
  "passwordHash",
  "roleKey",
  "createdAt",
];

function normalizeEmail(email: string): string {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const fullName = String(req.body?.fullName || "").trim();
    const mobile = String(req.body?.mobile || "").trim();
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");
    const roleKey = String(req.body?.roleKey || "").trim();

    if (!fullName || !mobile || !email || !password || !roleKey) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        error: "Password must be at least 6 characters",
      });
    }

    const users = await readCsvObjects(USERS_BLOB_PATH);
    const alreadyExists = users.some(
      (u) => normalizeEmail(u.email) === email
    );

    if (alreadyExists) {
      return res.status(409).json({
        ok: false,
        error: "User already exists with this email",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await appendCsvLine(USERS_BLOB_PATH, USER_HEADERS, [
      fullName,
      mobile,
      email,
      passwordHash,
      roleKey,
      new Date().toISOString(),
    ]);

    return res.status(201).json({
      ok: true,
      message: "Signup successful",
      user: {
        fullName,
        mobile,
        email,
        roleKey,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      ok: false,
      error: "Internal server error during signup",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email and password are required",
      });
    }

    const users = await readCsvObjects(USERS_BLOB_PATH);
    const user = users.find((u) => normalizeEmail(u.email) === email);

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash || "");

    if (!isPasswordValid) {
      return res.status(401).json({
        ok: false,
        error: "Invalid credentials",
      });
    }

    return res.json({
      ok: true,
      message: "Login successful",
      user: {
        fullName: user.fullName,
        mobile: user.mobile,
        email: user.email,
        roleKey: user.roleKey,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      ok: false,
      error: "Internal server error during login",
    });
  }
});

export default router;