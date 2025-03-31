const { Borrow } = require('../database/schema');
const AppError = require('../utils/error/AppError');

class FineCalculator {
  static async calculateFine(borrowId) {
    const borrow = await Borrow.findByPk(borrowId);
    if (!borrow) {
      throw new AppError('Borrow record not found', 404);
    }

    const dueDate = new Date(borrow.dueDate);
    const returnDate = borrow.returnDate ? new Date(borrow.returnDate) : new Date();
    const overdueDays = Math.max(0, Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24)));

    const finePerDay = 5; // Assuming fine is $5 per day
    const fine = overdueDays * finePerDay;

    return fine;
  }
}

module.exports = FineCalculator;
