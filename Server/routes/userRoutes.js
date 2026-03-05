const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllProperties,
  bookProperty
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");


// Register new user
router.post("/register", registerUser);


// Login user
router.post("/login", loginUser);


// Get all available properties
router.get("/properties", getAllProperties);


// Book a property
router.put("/book/:id", protect, bookProperty);


module.exports = router;
