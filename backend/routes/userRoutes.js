const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const userValidators = require('../utils/validators/userValidators');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware, roleMiddleware('admin'), userController.getAllUsers)
  .post(
    userValidators.createUser,
    validatorMiddleware,
    userController.createUser
  );

router
  .route('/:id')
  .get(authMiddleware, roleMiddleware('admin'), userController.getUser)
  .patch(
    authMiddleware,
    roleMiddleware('admin'),
    userValidators.updateUser,
    validatorMiddleware,
    userController.updateUser
  )
  .delete(authMiddleware, roleMiddleware('admin'), userController.deleteUser);

module.exports = router;
