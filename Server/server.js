// server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database connection
const connectDB = require("./config/connect");

// Import routes
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


const startServer = async () => {
  const isDbConnected = await connectDB();

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/owners", ownerRoutes);
  app.use("/api/admin", adminRoutes);

  // Default route
  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  // Server Port
  const PORT = process.env.PORT || 5000;

  // Start Server
  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on port ${PORT}`);
    if (!isDbConnected) {
      console.log("Server is running without database connectivity. Check MONGO_URI/DNS/Atlas network access.");
    }
  });
};

startServer();
