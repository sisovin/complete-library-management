const request = require('supertest');
const app = require('../../app');
const Book = require('../../models/Book');
const { setupDatabase, userOne, userOneToken } = require('../fixtures/db');

beforeEach(setupDatabase);

describe('Books API', () => {
  test('Should create a new book', async () => {
    const newBook = {
      title: 'New Book',
      author: 'Author Name',
      publishedDate: '2023-01-01',
    };

    const response = await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${userOneToken}`)
      .send(newBook)
      .expect(201);

    const book = await Book.findById(response.body.data.book._id);
    expect(book).not.toBeNull();
    expect(book.title).toBe(newBook.title);
  });

  test('Should get all books', async () => {
    const response = await request(app)
      .get('/api/v1/books')
      .expect(200);

    expect(response.body.results).toBeGreaterThan(0);
  });

  test('Should get a book by ID', async () => {
    const book = await Book.findOne();

    const response = await request(app)
      .get(`/api/v1/books/${book._id}`)
      .expect(200);

    expect(response.body.data.book.title).toBe(book.title);
  });

  test('Should update a book by ID', async () => {
    const book = await Book.findOne();
    const updatedData = {
      title: 'Updated Title',
    };

    const response = await request(app)
      .patch(`/api/v1/books/${book._id}`)
      .set('Authorization', `Bearer ${userOneToken}`)
      .send(updatedData)
      .expect(200);

    const updatedBook = await Book.findById(book._id);
    expect(updatedBook.title).toBe(updatedData.title);
  });

  test('Should delete a book by ID', async () => {
    const book = await Book.findOne();

    await request(app)
      .delete(`/api/v1/books/${book._id}`)
      .set('Authorization', `Bearer ${userOneToken}`)
      .expect(204);

    const deletedBook = await Book.findById(book._id);
    expect(deletedBook).toBeNull();
  });
});
