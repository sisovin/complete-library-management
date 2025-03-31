const express = require('express');
const router = express.Router();
const fineController = require('../controllers/fineController');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

router.get(
  '/calculate/:borrowId',
  authMiddleware,
  [check('borrowId').isUUID()],
  validatorMiddleware,
  fineController.calculateFine
);

router.post(
  '/pay',
  authMiddleware,
  [
    check('userId').isUUID(),
    check('borrowId').isUUID()
  ],
  validatorMiddleware,
  fineController.payFine
);

router.get(
  '/details/:borrowId',
  authMiddleware,
  [check('borrowId').isUUID()],
  validatorMiddleware,
  fineController.getFineDetails
);

module.exports = router;
