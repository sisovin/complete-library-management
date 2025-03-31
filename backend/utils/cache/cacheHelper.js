const { getAsync, setAsync, delAsync } = require('./redis');

const cacheHelper = {
  async get(key) {
    try {
      const value = await getAsync(key);
      return JSON.parse(value);
    } catch (error) {
      console.error('Error getting cache value:', error);
      return null;
    }
  },

  async set(key, value, expiration = 3600) {
    try {
      await setAsync(key, JSON.stringify(value), 'EX', expiration);
    } catch (error) {
      console.error('Error setting cache value:', error);
    }
  },

  async delete(key) {
    try {
      await delAsync(key);
    } catch (error) {
      console.error('Error deleting cache value:', error);
    }
  },
};

module.exports = cacheHelper;
