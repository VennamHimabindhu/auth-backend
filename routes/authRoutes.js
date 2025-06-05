const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
router.post("/login", async (req, res) => {
  console.log("📥 Login request received");
  console.log("📨 Received login request body:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("❌ Missing email or password in request");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful");
    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error("❌ Server error during login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});
router.post("/register", async (req, res) => {
  console.log("📥 Registration request received");
  console.log("📨 Registration request body:", req.body);

  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      console.log("❌ Missing fields in request");
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists with email:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log("✅ User registered successfully:", newUser.email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Server error during registration:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  // example logic
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // TODO: Add real logic here (find user, send reset email, etc.)
  res.status(200).json({ message: "Reset link sent (dummy response)" });
});



module.exports = router;
