const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  getAllProperties,
  deleteProperty
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");


// Get all users
router.get("/users", protect, adminOnly, getAllUsers);


// Delete a user
router.delete("/user/:id", protect, adminOnly, deleteUser);


// Get all properties
router.get("/properties", protect, adminOnly, getAllProperties);


// Delete a property
router.delete("/property/:id", protect, adminOnly, deleteProperty);


module.exports = router;
