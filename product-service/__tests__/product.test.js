const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // adjust the path as needed
const Product = require('../models/Product'); // adjust the path as needed
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

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app).post('/products').send({
      name: 'Test Product',
      price: 9.99,
      userId: '123456789012',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Product');
    expect(res.body.price).toBe(9.99);
  });

  it('should get a product by id', async () => {
    const product = new Product({ name: 'Sample Product', price: 19.99, userId: '123456789012' });
    await product.save();

    const res = await request(app).get(`/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Sample Product');
  });

  it('should return 404 for non-existent product', async () => {
    const res = await request(app).get('/products/nonexistentid');
    expect(res.statusCode).toBe(404);
  });

  // This test might need to be adjusted based on how you implement user verification
  it('should get products for a user', async () => {
    const userId = '123456789012';
    await Product.create({ name: 'User Product 1', price: 29.99, userId });
    await Product.create({ name: 'User Product 2', price: 39.99, userId });

    const res = await request(app).get(`/products/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].userId).toBe(userId);
  });
});
