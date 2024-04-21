const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

exports.isVerify = catchAsyncError(async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return next(new ErrorHandler("Please login to continue", 400));
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});
