const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");


// Get all users
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// Delete a user
exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
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



// Delete a property
exports.deleteProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
