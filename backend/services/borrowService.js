const Borrow = require('../models/Borrow');
const Book = require('../models/Book');
const User = require('../models/User');
const AppError = require('../utils/error/AppError');

// Get all borrow records
exports.getAllBorrows = async () => {
  try {
    const borrows = await Borrow.find();
    return {
      status: 'success',
      results: borrows.length,
      data: {
        borrows,
      },
    };
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

// Get a single borrow record by ID
exports.getBorrowById = async (id) => {
  try {
    const borrow = await Borrow.findById(id);

    if (!borrow) {
      throw new AppError('No borrow record found with that ID', 404);
    }

    return {
      status: 'success',
      data: {
        borrow,
      },
    };
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

// Create a new borrow record
exports.createBorrow = async (userId, bookId, borrowDate, returnDate) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('No user found with that ID', 404);
    }

    const book = await Book.findById(bookId);
    if (!book) {
      throw new AppError('No book found with that ID', 404);
    }

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      borrowDate,
      returnDate,
    });

    return {
      status: 'success',
      data: {
        borrow,
      },
    };
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

// Update a borrow record by ID
exports.updateBorrowById = async (id, updateData) => {
  try {
    const borrow = await Borrow.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!borrow) {
      throw new AppError('No borrow record found with that ID', 404);
    }

    return {
      status: 'success',
      data: {
        borrow,
      },
    };
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

// Delete a borrow record by ID
exports.deleteBorrowById = async (id) => {
  try {
    const borrow = await Borrow.findByIdAndDelete(id);

    if (!borrow) {
      throw new AppError('No borrow record found with that ID', 404);
    }

    return {
      status: 'success',
      data: null,
    };
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};
