const { body, param } = require('express-validator');

const borrowValidators = {
  validateBorrowRequest: [
    body('userId')
      .isUUID()
      .withMessage('Invalid user ID format'),
    body('bookId')
      .isUUID()
      .withMessage('Invalid book ID format'),
    body('borrowDate')
      .isISO8601()
      .withMessage('Invalid borrow date format'),
    body('returnDate')
      .isISO8601()
      .withMessage('Invalid return date format')
      .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.borrowDate)) {
          throw new Error('Return date must be after borrow date');
        }
        return true;
      })
  ],

  validateBorrowId: [
    param('borrowId')
      .isUUID()
      .withMessage('Invalid borrow ID format')
  ]
};

module.exports = borrowValidators;
