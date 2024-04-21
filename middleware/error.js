const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Set default status code to 500 if err.statusCode is undefined
  if (err.statusCode === undefined) {
    err.statusCode = 500;
  }

  // wrong mongodb id
  if (err.name === "CastError") {
    const message = `Resources is not found with this id. Invalid ${req.path}`;
    err = new ErrorHandler(message, 400);
  }

  //   duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again later`;
    err = new ErrorHandler(message, 400);
  }

  // expired jwt
  if (err.name === "TokenExpiredError") {
    const message = `Your url is expired please try agian later`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};