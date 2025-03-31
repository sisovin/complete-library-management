const faker = require('faker');
const fs = require('fs');

const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.random.arrayElement(['user', 'admin']),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return users;
};

const generateBooks = (numBooks) => {
  const books = [];
  for (let i = 0; i < numBooks; i++) {
    books.push({
      id: faker.datatype.uuid(),
      title: faker.lorem.words(),
      author: faker.name.findName(),
      publishedDate: faker.date.past(),
      genre: faker.random.arrayElement(['Fiction', 'Non-Fiction', 'Science', 'History']),
      available: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return books;
};

const generateBorrows = (numBorrows, users, books) => {
  const borrows = [];
  for (let i = 0; i < numBorrows; i++) {
    borrows.push({
      id: faker.datatype.uuid(),
      userId: faker.random.arrayElement(users).id,
      bookId: faker.random.arrayElement(books).id,
      borrowDate: faker.date.past(),
      returnDate: faker.date.future(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return borrows;
};

const generateMockData = (numUsers, numBooks, numBorrows) => {
  const users = generateUsers(numUsers);
  const books = generateBooks(numBooks);
  const borrows = generateBorrows(numBorrows, users, books);

  const data = {
    users,
    books,
    borrows,
  };

  fs.writeFileSync('mock-data.json', JSON.stringify(data, null, 2));
};

generateMockData(100, 50, 30);
