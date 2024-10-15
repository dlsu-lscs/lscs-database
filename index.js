require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const apiKeyController = require('./controllers/apiKeyController');

// Initialize Express app
const app = express();
app.use(express.json()); // to parse JSON request bodies

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// API routes
app.post('/generate-key', apiKeyController.generateApiKey); // Controller to handle API key generation
app.get('/protected-data', apiKeyController.validateApiKey, apiKeyController.protectedData); // Protected route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
