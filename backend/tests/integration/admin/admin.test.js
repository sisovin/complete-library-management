const request = require('supertest');
const app = require('../../../app');
const { User } = require('../../../database/schema');
const { setupDatabase, userOne, adminUser } = require('../../fixtures/db');

beforeEach(setupDatabase);

describe('Admin Controller', () => {
  describe('GET /api/admin/users', () => {
    it('should fetch all users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(200);

      expect(response.body.data.users.length).toBe(2);
    });
  });

  describe('GET /api/admin/users/:id', () => {
    it('should fetch a user by ID', async () => {
      const response = await request(app)
        .get(`/api/admin/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(200);

      expect(response.body.data.user.name).toBe(userOne.name);
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app)
        .get('/api/admin/users/invalidId')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(404);

      expect(response.body.message).toBe('No user found with that ID');
    });
  });

  describe('POST /api/admin/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send(newUser)
        .expect(201);

      expect(response.body.data.user.name).toBe(newUser.name);
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({})
        .expect(400);

      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/admin/users/:id', () => {
    it('should update a user', async () => {
      const updatedData = {
        name: 'Updated Name',
      };

      const response = await request(app)
        .put(`/api/admin/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.data.user.name).toBe(updatedData.name);
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app)
        .put('/api/admin/users/invalidId')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({ name: 'Updated Name' })
        .expect(404);

      expect(response.body.message).toBe('No user found with that ID');
    });
  });

  describe('DELETE /api/admin/users/:id', () => {
    it('should delete a user', async () => {
      await request(app)
        .delete(`/api/admin/users/${userOne._id}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(204);

      const user = await User.findById(userOne._id);
      expect(user).toBeNull();
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app)
        .delete('/api/admin/users/invalidId')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .expect(404);

      expect(response.body.message).toBe('No user found with that ID');
    });
  });
});
