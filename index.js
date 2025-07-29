console.log("🔧 Starting server...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const helmet = require("helmet"); // ✅ Helmet added
const dotenv = require('dotenv');

require('dotenv').config();
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet()); // ✅ Helmet middleware used
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); 

app.get("/", (req, res) => {
  res.send("✅ Backend is working");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.use(cors());
    app.use(helmet()); // ✅ Helmet applied again (not needed twice, but kept as per request)
    app.use(express.json());

    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);

    app.get("/", (req, res) => {
      res.send("✅ Backend is working");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
