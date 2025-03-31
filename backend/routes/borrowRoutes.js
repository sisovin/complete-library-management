const express = require('express');
const borrowController = require('../controllers/borrowController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkPermissionMiddleware = require('../middlewares/checkPermissionMiddleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { borrowValidators } = require('../utils/validators/borrowValidators');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware, checkPermissionMiddleware('view_borrows'), borrowController.getAllBorrows)
  .post(authMiddleware, checkPermissionMiddleware('create_borrow'), borrowValidators, validatorMiddleware, borrowController.createBorrow);

router
  .route('/:id')
  .get(authMiddleware, checkPermissionMiddleware('view_borrow'), borrowController.getBorrowById)
  .patch(authMiddleware, checkPermissionMiddleware('update_borrow'), borrowValidators, validatorMiddleware, borrowController.updateBorrowById)
  .delete(authMiddleware, checkPermissionMiddleware('delete_borrow'), borrowController.deleteBorrowById);

module.exports = router;
