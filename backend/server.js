require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createUser, verifyUser } = require("./src/services/authJsonservice");

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

app.post("/api/signup", async (req, res) => {
  try {
    const user = await createUser({
      fullName: req.body?.fullName,
      mobile: req.body?.mobile,
      email: req.body?.email,
      password: req.body?.password,
      roleKey: req.body?.roleKey,
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

    return res.status(status).json({ ok: false, error: message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password ?? "");

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
    return res.status(500).json({ ok: false, error: "Login failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


