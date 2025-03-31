const { body, param } = require('express-validator');

const validateUserId = [
  param('id')
    .isUUID()
    .withMessage('Invalid user ID format'),
];

const validateUserCreation = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
];

const validateUserUpdate = [
  param('id')
    .isUUID()
    .withMessage('Invalid user ID format'),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  validateUserId,
  validateUserCreation,
  validateUserUpdate,
};
