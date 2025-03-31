const request = require('supertest');
const app = require('../../app');
const { User } = require('../../database/schema');
const { setupDatabase, userOne, userTwo, adminUser } = require('../fixtures/db');

beforeEach(setupDatabase);

describe('User API', () => {
  describe('GET /api/users', () => {
    it('should fetch all users for admin', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(200);

      expect(response.body.data.users.length).toBe(3);
    });

    it('should not fetch users for non-admin', async () => {
      await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(403);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should fetch user by id for admin', async () => {
      const response = await request(app)
        .get(`/api/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(200);

      expect(response.body.data.user._id).toBe(userOne._id.toString());
    });

    it('should not fetch user by id for non-admin', async () => {
      await request(app)
        .get(`/api/users/${userOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(403);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      const user = await User.findById(response.body.data.user._id);
      expect(user).not.toBeNull();
      expect(user.username).toBe(newUser.username);
    });
  });

  describe('PATCH /api/users/:id', () => {
    it('should update user by id for admin', async () => {
      const updates = { username: 'updateduser' };

      const response = await request(app)
        .patch(`/api/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send(updates)
        .expect(200);

      const user = await User.findById(userOne._id);
      expect(user.username).toBe(updates.username);
    });

    it('should not update user by id for non-admin', async () => {
      const updates = { username: 'updateduser' };

      await request(app)
        .patch(`/api/users/${userOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send(updates)
        .expect(403);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user by id for admin', async () => {
      await request(app)
        .delete(`/api/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(204);

      const user = await User.findById(userOne._id);
      expect(user).toBeNull();
    });

    it('should not delete user by id for non-admin', async () => {
      await request(app)
        .delete(`/api/users/${userOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(403);
    });
  });
});
