const { Borrow, User } = require('../database/schema');
const FineCalculator = require('../utils/fineCalculator');
const AppError = require('../utils/error/AppError');

class FineService {
  static async payFine(userId, borrowId) {
    const borrow = await Borrow.findByPk(borrowId);
    if (!borrow) {
      throw new AppError('Borrow record not found', 404);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const fine = await FineCalculator.calculateFine(borrowId);
    if (fine > 0) {
      // Logic to mark the fine as paid
      borrow.finePaid = true;
      await borrow.save();
    }

    return { userId, borrowId, fine };
  }

  static async getFineDetails(borrowId) {
    const borrow = await Borrow.findByPk(borrowId);
    if (!borrow) {
      throw new AppError('Borrow record not found', 404);
    }

    const fine = await FineCalculator.calculateFine(borrowId);
    return { borrowId, fine };
  }
}

module.exports = FineService;
