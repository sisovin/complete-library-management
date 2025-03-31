const AppError = require('../utils/error/AppError');
const { errorTypes } = require('../utils/error/errorTypes');
const logger = require('../config/logger.config');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!statusCode) {
    statusCode = 500;
  }

  if (statusCode === 500) {
    logger.error(err.stack);
  }

  res.status(statusCode).json({
    status: errorTypes[statusCode] || 'error',
    message: message || 'An unexpected error occurred',
  });
};

module.exports = errorHandler;
