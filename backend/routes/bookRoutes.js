const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(
    authMiddleware,
    [
      check('title').not().isEmpty().withMessage('Title is required'),
      check('author').not().isEmpty().withMessage('Author is required'),
      check('publishedDate').isDate().withMessage('Published date is required'),
    ],
    validatorMiddleware,
    bookController.createBook
  );

router
  .route('/:id')
  .get(bookController.getBookById)
  .patch(
    authMiddleware,
    [
      check('title').optional().not().isEmpty().withMessage('Title is required'),
      check('author').optional().not().isEmpty().withMessage('Author is required'),
      check('publishedDate').optional().isDate().withMessage('Published date is required'),
    ],
    validatorMiddleware,
    bookController.updateBookById
  )
  .delete(authMiddleware, bookController.deleteBookById);

module.exports = router;
