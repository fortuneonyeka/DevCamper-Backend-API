const ErrorResponse = require( "../utils/errorResponse" );

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key (11000 error code)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern)[0];
    const duplicateValue = err.keyValue[duplicateField];
    
    let message;
    if (duplicateField === 'name') {
      message = `Bootcamp with name '${duplicateValue}' already exists`;
    } else if (duplicateField === 'email') {
      message = `Email '${duplicateValue}' is already in use`;
    } else {
      message = `Duplicate field value entered for ${duplicateField}: ${duplicateValue}`;
    }
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join('. ');
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};
module.exports = errorHandler;