const Borrow = require('../models/Borrow');
const Book = require('../models/Book');
const User = require('../models/User');
const AppError = require('../utils/error/AppError');
const { validationResult } = require('express-validator');

// Get all borrow records
exports.getAllBorrows = async (req, res, next) => {
  try {
    const borrows = await Borrow.find();
    res.status(200).json({
      status: 'success',
      results: borrows.length,
      data: {
        borrows,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get a single borrow record by ID
exports.getBorrowById = async (req, res, next) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return next(new AppError('No borrow record found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        borrow,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Create a new borrow record
exports.createBorrow = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 422, errors.array()));
  }

  try {
    const { userId, bookId, borrowDate, returnDate } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      borrowDate,
      returnDate,
    });

    res.status(201).json({
      status: 'success',
      data: {
        borrow,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update a borrow record by ID
exports.updateBorrowById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 422, errors.array()));
  }

  try {
    const borrow = await Borrow.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!borrow) {
      return next(new AppError('No borrow record found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        borrow,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Delete a borrow record by ID
exports.deleteBorrowById = async (req, res, next) => {
  try {
    const borrow = await Borrow.findByIdAndDelete(req.params.id);

    if (!borrow) {
      return next(new AppError('No borrow record found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
