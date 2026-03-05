const express = require("express");
const router = express.Router();

const {
  addProperty,
  getOwnerProperties,
  updateProperty,
  deleteProperty
} = require("../controllers/ownerController");

const { protect, ownerOnly } = require("../middleware/authMiddleware");


// Add property
router.post("/property", protect, ownerOnly, addProperty);


// Get all properties of an owner
router.get("/properties/:ownerId", protect, ownerOnly, getOwnerProperties);


// Update property
router.put("/property/:id", protect, ownerOnly, updateProperty);


// Delete property
router.delete("/property/:id", protect, ownerOnly, deleteProperty);


module.exports = router;
