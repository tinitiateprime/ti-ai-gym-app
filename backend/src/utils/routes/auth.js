const express = require("express");
const { createUser, verifyUser } = require("../services/authCsvService");

const router = express.Router();

const VALID_ROLES = ["MEMBER", "TRAINER", "SELLER", "OWNER"];

router.post("/signup", async (req, res) => {
  try {
    const { fullName, mobile, email, password, roleKey } = req.body || {};

    if (!fullName || !mobile || !email || !password || !roleKey) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailValid) {
      return res.status(400).json({
        ok: false,
        error: "Invalid email",
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        ok: false,
        error: "Password must be at least 6 characters",
      });
    }

    if (!VALID_ROLES.includes(String(roleKey))) {
      return res.status(400).json({
        ok: false,
        error: "Invalid role selected",
      });
    }

    const user = await createUser({
      fullName: String(fullName),
      mobile: String(mobile),
      email: normalizedEmail,
      password: String(password),
      roleKey: String(roleKey),
    });

    return res.status(201).json({
      ok: true,
      message: "Signup successful",
      user,
    });
  } catch (err) {
    const message = err?.message || "Signup failed";
    const status = message === "Email already registered" ? 409 : 500;

    return res.status(status).json({
      ok: false,
      error: message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email and password are required",
      });
    }

    const user = await verifyUser(
      String(email).trim().toLowerCase(),
      String(password)
    );

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Invalid credentials",
      });
    }

    return res.json({
      ok: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({
      ok: false,
      error: "Login failed",
    });
  }
});

module.exports = router;