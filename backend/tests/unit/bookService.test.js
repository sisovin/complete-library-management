const bookService = require('../../services/bookService');
const Book = require('../../models/Book');
const AppError = require('../../utils/error/AppError');

jest.mock('../../models/Book');

describe('Book Service', () => {
  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }];
      Book.find.mockResolvedValue(mockBooks);

      const books = await bookService.getAllBooks();

      expect(books).toEqual(mockBooks);
    });

    it('should throw an error if fetching books fails', async () => {
      Book.find.mockRejectedValue(new Error('Error fetching books'));

      await expect(bookService.getAllBooks()).rejects.toThrow(AppError);
    });
  });

  describe('getBookById', () => {
    it('should return a book by ID', async () => {
      const mockBook = { title: 'Book 1' };
      Book.findById.mockResolvedValue(mockBook);

      const book = await bookService.getBookById('1');

      expect(book).toEqual(mockBook);
    });

    it('should throw an error if no book is found', async () => {
      Book.findById.mockResolvedValue(null);

      await expect(bookService.getBookById('1')).rejects.toThrow(AppError);
    });

    it('should throw an error if fetching book fails', async () => {
      Book.findById.mockRejectedValue(new Error('Error fetching book'));

      await expect(bookService.getBookById('1')).rejects.toThrow(AppError);
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const mockBook = { title: 'Book 1' };
      Book.create.mockResolvedValue(mockBook);

      const book = await bookService.createBook(mockBook);

      expect(book).toEqual(mockBook);
    });

    it('should throw an error if creating book fails', async () => {
      Book.create.mockRejectedValue(new Error('Error creating book'));

      await expect(bookService.createBook({ title: 'Book 1' })).rejects.toThrow(AppError);
    });
  });

  describe('updateBookById', () => {
    it('should update a book by ID', async () => {
      const mockBook = { title: 'Updated Book' };
      Book.findByIdAndUpdate.mockResolvedValue(mockBook);

      const book = await bookService.updateBookById('1', mockBook);

      expect(book).toEqual(mockBook);
    });

    it('should throw an error if no book is found', async () => {
      Book.findByIdAndUpdate.mockResolvedValue(null);

      await expect(bookService.updateBookById('1', { title: 'Updated Book' })).rejects.toThrow(AppError);
    });

    it('should throw an error if updating book fails', async () => {
      Book.findByIdAndUpdate.mockRejectedValue(new Error('Error updating book'));

      await expect(bookService.updateBookById('1', { title: 'Updated Book' })).rejects.toThrow(AppError);
    });
  });

  describe('deleteBookById', () => {
    it('should delete a book by ID', async () => {
      const mockBook = { title: 'Book 1' };
      Book.findByIdAndDelete.mockResolvedValue(mockBook);

      const result = await bookService.deleteBookById('1');

      expect(result).toBeNull();
    });

    it('should throw an error if no book is found', async () => {
      Book.findByIdAndDelete.mockResolvedValue(null);

      await expect(bookService.deleteBookById('1')).rejects.toThrow(AppError);
    });

    it('should throw an error if deleting book fails', async () => {
      Book.findByIdAndDelete.mockRejectedValue(new Error('Error deleting book'));

      await expect(bookService.deleteBookById('1')).rejects.toThrow(AppError);
    });
  });
});
