const Book = require('../models/Book');
const AppError = require('../utils/error/AppError');

// Get all books
exports.getAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (err) {
    throw new AppError('Error fetching books', 500);
  }
};

// Get a single book by ID
exports.getBookById = async (id) => {
  try {
    const book = await Book.findById(id);

    if (!book) {
      throw new AppError('No book found with that ID', 404);
    }

    return book;
  } catch (err) {
    throw new AppError('Error fetching book', 500);
  }
};

// Create a new book
exports.createBook = async (bookData) => {
  try {
    const book = await Book.create(bookData);
    return book;
  } catch (err) {
    throw new AppError('Error creating book', 500);
  }
};

// Update a book by ID
exports.updateBookById = async (id, bookData) => {
  try {
    const book = await Book.findByIdAndUpdate(id, bookData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw new AppError('No book found with that ID', 404);
    }

    return book;
  } catch (err) {
    throw new AppError('Error updating book', 500);
  }
};

// Delete a book by ID
exports.deleteBookById = async (id) => {
  try {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      throw new AppError('No book found with that ID', 404);
    }

    return null;
  } catch (err) {
    throw new AppError('Error deleting book', 500);
  }
};
