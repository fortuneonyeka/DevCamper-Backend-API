const ErrorResponse = require( "../utills/errorRespos" );
const colors = require('colors');
colors.enable();

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red)

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server error"
  })
}

module.exports = errorHandler
