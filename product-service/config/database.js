const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI.replace('<password>', process.env.MONGO_PASSWORD).replace('<db_name>', 'product_details');


const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;