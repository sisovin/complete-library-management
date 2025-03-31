const mockUser = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Mock User',
  email: 'mockuser@example.com',
  password: 'password123',
  tokens: [
    {
      token: 'mockToken123',
    },
  ],
};

const mockBook = {
  _id: '507f1f77bcf86cd799439012',
  title: 'Mock Book',
  author: 'Mock Author',
  publishedDate: '2023-01-01',
};

const mockBorrow = {
  _id: '507f1f77bcf86cd799439013',
  user: mockUser._id,
  book: mockBook._id,
  borrowDate: new Date(),
  returnDate: new Date(),
};

module.exports = {
  mockUser,
  mockBook,
  mockBorrow,
};
