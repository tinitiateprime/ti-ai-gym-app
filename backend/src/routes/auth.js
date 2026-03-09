const express = require("express");
const { createUser, verifyUser } = require("../services/authJsonService");

const router = express.Router();

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, mobile, email, password, roleKey } = req.body || {};

    const user = await createUser({
      fullName,
      mobile,
      email,
      password,
      roleKey,
    });

    return res.status(201).json({
      ok: true,
      message: "Signup successful",
      user,
    });
  } catch (err) {
    const message = err?.message || "Signup failed";

    const status =
      message === "Email already registered" ? 409 :
      message === "All fields are required" ? 400 :
      message === "Invalid email" ? 400 :
      message === "Password must be at least 6 characters" ? 400 :
      message === "Invalid role selected" ? 400 :
      500;

    return res.status(status).json({
      ok: false,
      error: message,
    });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email and password are required",
      });
    }

    const user = await verifyUser(email, password);

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