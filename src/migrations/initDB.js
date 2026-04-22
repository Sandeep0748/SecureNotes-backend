require('dotenv').config();
const connectDB = require('../db/connection');

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = { initializeDatabase };
