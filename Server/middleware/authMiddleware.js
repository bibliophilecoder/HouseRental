const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");


// Protect routes
exports.protect = async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "househunt-dev-secret");

      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {

      res.status(401).json({
        success: false,
        message: "Not authorized, token failed"
      });

    }

  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token"
    });
  }
};



// Admin access
exports.adminOnly = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    next();
  } else {

    res.status(403).json({
      success: false,
      message: "Admin access only"
    });

  }

};



// Owner access
exports.ownerOnly = (req, res, next) => {

  if (req.user && req.user.role === "owner") {
    next();
  } else {

    res.status(403).json({
      success: false,
      message: "Owner access only"
    });

  }

};
