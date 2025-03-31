const express = require('express');
const adminController = require('../../controllers/admin/adminController');
const authMiddleware = require('../../middlewares/authMiddleware');
const roleMiddleware = require('../../middlewares/roleMiddleware');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router
  .route('/users')
  .get(adminController.getAllUsers)
  .post(
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
    ],
    validatorMiddleware,
    adminController.createUser
  );

router
  .route('/users/:id')
  .get(adminController.getUserById)
  .put(
    [
      check('name', 'Name is required').optional().not().isEmpty(),
      check('email', 'Please include a valid email').optional().isEmail(),
      check('password', 'Password is required').optional().not().isEmpty(),
    ],
    validatorMiddleware,
    adminController.updateUser
  )
  .delete(adminController.deleteUser);

module.exports = router;
