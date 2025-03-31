const { User } = require('../database/schema');
const { Op } = require('sequelize');
const logger = require('../config/logger.config');

const removeUnverifiedAccounts = async () => {
  try {
    const result = await User.destroy({
      where: {
        verified: false,
        createdAt: {
          [Op.lt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        },
      },
    });

    logger.info(`Removed ${result} unverified accounts`);
  } catch (error) {
    logger.error('Error removing unverified accounts:', error);
  }
};

module.exports = removeUnverifiedAccounts;
