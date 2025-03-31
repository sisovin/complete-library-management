const { User } = require('../database/schema');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/error/AppError');

exports.getAllUsers = async () => {
  return await User.findAll();
};

exports.getUserById = async (id) => {
  return await User.findByPk(id);
};

exports.createUser = async (userData) => {
  const { username, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 12);
  return await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError('No user found with that ID', 404);
  }
  const { username, email, password, role } = userData;
  const hashedPassword = password ? await bcrypt.hash(password, 12) : user.password;
  return await user.update({
    username,
    email,
    password: hashedPassword,
    role,
  });
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError('No user found with that ID', 404);
  }
  await user.destroy();
};
