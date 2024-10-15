const ApiKey = require('../models/apiKey');
const sendEmail = require('./mailerService');
const generateApiKey = require('./generateApiKeyService');

// Service to generate and send API key
async function generateAndSendApiKey(email) {
  // Generate API key
  const apiKey = generateApiKey();

  // Store the API key in MongoDB
  const newApiKey = new ApiKey({ key: apiKey, email });
  await newApiKey.save();

  // Send the API key to the provided email
  await sendEmail(email, apiKey);
}

// Service to validate RND membership
async function validateMember(email) {
  const member = await ApiKey.findOne({ email, committee: 'Research and Development' });
  return member ? true : false;
}

// Service to validate API key
async function validateApiKey(apiKey) {
  // Check if the API key exists in the database
  const storedKey = await ApiKey.findOne({ key: apiKey });
  return storedKey ? storedKey.email : null;
}

module.exports = {
  generateAndSendApiKey,
  validateApiKey,
};
