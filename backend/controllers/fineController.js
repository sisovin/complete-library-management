const FineService = require('../services/fineService');
const FineCalculator = require('../utils/fineCalculator');
const { validationResult } = require('express-validator');
const AppError = require('../utils/error/AppError');

exports.calculateFine = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { borrowId } = req.params;
    const fine = await FineCalculator.calculateFine(borrowId);

    res.status(200).json({ fine });
  } catch (error) {
    next(new AppError('Error calculating fine', 500));
  }
};

exports.payFine = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, borrowId } = req.body;
    const result = await FineService.payFine(userId, borrowId);

    res.status(200).json({ message: 'Fine paid successfully', result });
  } catch (error) {
    next(new AppError('Error paying fine', 500));
  }
};

exports.getFineDetails = async (req, res, next) => {
  try {
    const { borrowId } = req.params;
    const fineDetails = await FineService.getFineDetails(borrowId);

    res.status(200).json({ fineDetails });
  } catch (error) {
    next(new AppError('Error fetching fine details', 500));
  }
};
