const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const connectDB = require('./config/database');
const productRoutes = require('./routes/product');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Service API',
      version: '1.0.0',
      description: 'A simple Product Service API',
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
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`);
});

module.exports = app;
