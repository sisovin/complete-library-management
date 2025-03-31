const request = require('supertest');
const app = require('../../app');
const { setupDatabase, userOne, borrowOne } = require('../fixtures');

beforeEach(setupDatabase);

describe('Fine Management', () => {
  test('Should calculate fine for a borrow record', async () => {
    const response = await request(app)
      .get(`/api/fines/calculate/${borrowOne.id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    expect(response.body).toHaveProperty('fine');
  });

  test('Should pay fine for a borrow record', async () => {
    const response = await request(app)
      .post('/api/fines/pay')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        userId: userOne.id,
        borrowId: borrowOne.id
      })
      .expect(200);

    expect(response.body.message).toBe('Fine paid successfully');
  });

  test('Should get fine details for a borrow record', async () => {
    const response = await request(app)
      .get(`/api/fines/details/${borrowOne.id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    expect(response.body).toHaveProperty('fineDetails');
  });
});
