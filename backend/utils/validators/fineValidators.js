const { check } = require('express-validator');

const validateCalculateFine = [
  check('borrowId')
    .isUUID()
    .withMessage('Invalid borrow ID format'),
];

const validatePayFine = [
  check('userId')
    .isUUID()
    .withMessage('Invalid user ID format'),
  check('borrowId')
    .isUUID()
    .withMessage('Invalid borrow ID format'),
];

module.exports = {
  validateCalculateFine,
  validatePayFine,
};
