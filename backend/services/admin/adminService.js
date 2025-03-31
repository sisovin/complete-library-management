const { User } = require('../../database/schema');
const AppError = require('../../utils/error/AppError');

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    throw new AppError('Error fetching users', 500);
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    throw new AppError('Error fetching user', 500);
  }
};

exports.createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (err) {
    throw new AppError('Error creating user', 500);
  }
};

exports.updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('No user found with that ID', 404);
    }
    const updatedUser = await user.update(userData);
    return updatedUser;
  } catch (err) {
    throw new AppError('Error updating user', 500);
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('No user found with that ID', 404);
    }
    await user.destroy();
    return user;
  } catch (err) {
    throw new AppError('Error deleting user', 500);
  }
};
