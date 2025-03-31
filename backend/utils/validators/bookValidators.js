const { check } = require('express-validator');

const createBookValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('author', 'Author is required').not().isEmpty(),
  check('publishedDate', 'Published date is required').isDate(),
];

const updateBookValidation = [
  check('title', 'Title is required').optional().not().isEmpty(),
  check('author', 'Author is required').optional().not().isEmpty(),
  check('publishedDate', 'Published date is required').optional().isDate(),
];

module.exports = {
  createBookValidation,
  updateBookValidation,
};
