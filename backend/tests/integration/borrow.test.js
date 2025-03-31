const request = require('supertest');
const app = require('../../app');
const Borrow = require('../../models/Borrow');
const User = require('../../models/User');
const Book = require('../../models/Book');
const mongoose = require('mongoose');

describe('Borrow API', () => {
  let user, book, borrow;

  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });

    book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      isbn: '1234567890',
    });

    borrow = await Borrow.create({
      user: user._id,
      book: book._id,
      borrowDate: new Date(),
      returnDate: new Date(),
    });
  });

  afterAll(async () => {
    await Borrow.deleteMany();
    await User.deleteMany();
    await Book.deleteMany();
    await mongoose.connection.close();
  });

  describe('GET /api/borrows', () => {
    it('should get all borrow records', async () => {
      const res = await request(app)
        .get('/api/borrows')
        .set('Authorization', `Bearer ${user.generateAuthToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.results).toBeGreaterThan(0);
      expect(res.body.data.borrows.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/borrows/:id', () => {
    it('should get a single borrow record by ID', async () => {
      const res = await request(app)
        .get(`/api/borrows/${borrow._id}`)
        .set('Authorization', `Bearer ${user.generateAuthToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.borrow).toBeDefined();
    });
  });

  describe('POST /api/borrows', () => {
    it('should create a new borrow record', async () => {
      const newBorrow = {
        userId: user._id,
        bookId: book._id,
        borrowDate: new Date(),
        returnDate: new Date(),
      };

      const res = await request(app)
        .post('/api/borrows')
        .set('Authorization', `Bearer ${user.generateAuthToken()}`)
        .send(newBorrow)
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data.borrow).toBeDefined();
    });
  });

  describe('PATCH /api/borrows/:id', () => {
    it('should update a borrow record by ID', async () => {
      const updatedBorrow = {
        returnDate: new Date(),
      };

      const res = await request(app)
        .patch(`/api/borrows/${borrow._id}`)
        .set('Authorization', `Bearer ${user.generateAuthToken()}`)
        .send(updatedBorrow)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.borrow.returnDate).toBeDefined();
    });
  });

  describe('DELETE /api/borrows/:id', () => {
    it('should delete a borrow record by ID', async () => {
      const res = await request(app)
        .delete(`/api/borrows/${borrow._id}`)
        .set('Authorization', `Bearer ${user.generateAuthToken()}`)
        .expect(204);

      expect(res.body).toEqual({});
    });
  });
});
