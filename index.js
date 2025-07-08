console.log("🔧 Starting server...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ✅ Allow requests from any origin (public API)
app.use(cors()); // ← this allows all origins by default

app.use(express.json());

// ✅ Import and use auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes); // e.g., /api/login

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is working");
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
