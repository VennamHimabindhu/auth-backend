const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
router.post("/login", async (req, res) => {
  console.log("📥 Login request received:", req.body); // ✅ log
if (!req.body.email || !req.body.password) {
  console.log("❌ Missing email or password in request");
}

  try {
    const { email, password } = req.body;

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
  console.log("📥 Registration request received:", req.body);

  try {
    const { username, email, password, role } = req.body;

    // Basic validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log("✅ User registered successfully");
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
