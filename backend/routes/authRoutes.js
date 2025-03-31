const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  validatorMiddleware,
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  validatorMiddleware,
  authController.login
);

module.exports = router;
