const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Only import the route
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is working");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
