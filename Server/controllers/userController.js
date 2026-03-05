const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "househunt-dev-secret", {
    expiresIn: "7d",
  });


// Register user
exports.registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token: generateToken(user._id),
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// Login user
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token: generateToken(user._id),
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// Get all properties
exports.getAllProperties = async (req, res) => {
  try {

    const properties = await Property.find();

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// Book a property
exports.bookProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    property.isBooked = true;

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property booked successfully",
      property
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
