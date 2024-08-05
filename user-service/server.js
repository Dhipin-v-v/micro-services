const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const connectDB = require('./config/database');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'A simple User Service API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`User Service listening on http://localhost:${port}`);
});

module.exports = app;