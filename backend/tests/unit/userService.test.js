const userService = require('../../services/userService');
const { User } = require('../../database/schema');
const bcrypt = require('bcryptjs');
const AppError = require('../../utils/error/AppError');

jest.mock('../../database/schema');
jest.mock('bcryptjs');

describe('User Service', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      User.findAll.mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(User.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = { id: 1, username: 'user1' };
      User.findByPk.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual(mockUser);
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });

    it('should return null if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      const result = await userService.getUserById(1);

      expect(result).toBeNull();
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUserData = { username: 'user1', email: 'user1@example.com', password: 'password', role: 'user' };
      const mockHashedPassword = 'hashedPassword';
      const mockCreatedUser = { id: 1, ...mockUserData, password: mockHashedPassword };

      bcrypt.hash.mockResolvedValue(mockHashedPassword);
      User.create.mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(mockUserData);

      expect(result).toEqual(mockCreatedUser);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 12);
      expect(User.create).toHaveBeenCalledWith({ ...mockUserData, password: mockHashedPassword });
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const mockUser = { id: 1, username: 'user1', email: 'user1@example.com', password: 'oldPassword', role: 'user', update: jest.fn() };
      const mockUserData = { username: 'updatedUser', email: 'updated@example.com', password: 'newPassword', role: 'admin' };
      const mockHashedPassword = 'hashedNewPassword';

      User.findByPk.mockResolvedValue(mockUser);
      bcrypt.hash.mockResolvedValue(mockHashedPassword);

      const result = await userService.updateUser(1, mockUserData);

      expect(result).toEqual(mockUser);
      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 12);
      expect(mockUser.update).toHaveBeenCalledWith({ ...mockUserData, password: mockHashedPassword });
    });

    it('should throw an error if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(userService.updateUser(1, {})).rejects.toThrow(AppError);
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const mockUser = { id: 1, destroy: jest.fn() };

      User.findByPk.mockResolvedValue(mockUser);

      await userService.deleteUser(1);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(mockUser.destroy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(userService.deleteUser(1)).rejects.toThrow(AppError);
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });
  });
});
