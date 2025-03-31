const { calculateFine } = require('../../utils/fineCalculator');

describe('Fine Calculator', () => {
  test('should return 0 for no overdue days', () => {
    const overdueDays = 0;
    const fine = calculateFine(overdueDays);
    expect(fine).toBe(0);
  });

  test('should calculate fine correctly for overdue days', () => {
    const overdueDays = 5;
    const fine = calculateFine(overdueDays);
    expect(fine).toBe(25); // Assuming fine is $5 per day
  });

  test('should handle negative overdue days gracefully', () => {
    const overdueDays = -3;
    const fine = calculateFine(overdueDays);
    expect(fine).toBe(0);
  });
});
