const { mockUser, mockBook, mockBorrow } = require('../__mocks__');

const setupDatabase = async () => {
  await User.deleteMany();
  await Book.deleteMany();
  await Borrow.deleteMany();

  await new User(mockUser).save();
  await new Book(mockBook).save();
  await new Borrow(mockBorrow).save();
};

module.exports = {
  setupDatabase,
};
