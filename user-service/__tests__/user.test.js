const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
require('dotenv').config();

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI.replace('<password>', process.env.MONGO_PASSWORD).replace(
    '<db_name>',
    'test_db'
  );
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Test User',
      email: 'test@example.com',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test User');
    expect(res.body.email).toBe('test@example.com');
  });

  it('should get a user by id', async () => {
    const user = new User({ name: 'John Doe', email: 'john@example.com' });
    await user.save();

    const res = await request(app).get(`/users/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('John Doe');
  });

  it('should return 404 for non-existent user', async () => {
    const res = await request(app).get('/users/nonexistentid');
    expect(res.statusCode).toBe(404);
  });
});
