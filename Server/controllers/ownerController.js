const Property = require("../models/PropertySchema");


// Add new property
exports.addProperty = async (req, res) => {
  try {
    const propertyPayload = {
      ...req.body,
      owner: req.user._id,
    };
    const property = await Property.create(propertyPayload);

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      property
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// Get all properties of owner
exports.getOwnerProperties = async (req, res) => {
  try {

    const properties = await Property.find({ owner: req.params.ownerId });

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



// Update property
exports.updateProperty = async (req, res) => {
  try {

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated",
      property
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// Delete property
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
