const apiKeyService = require('../services/apiKeyService');
const express = require('express');
const router = express.Router()

// Controller to generate API key and send it via email
router.get('/requestkey/:email', async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Call service to generate and send API key
    if (!apiKeyService.validateMember(email)) {
      return res.status(500).json({
        status: 'error',
        message: 'This feature is restricted to members of LSCS-RND.'
      });
    }

    await apiKeyService.generateAndSendApiKey(email);
    res.status(200).json({
      status: 'success',
      message: 'API key generated and has been sent to the given email address.'
    });

  } catch (error) {
    console.error('Error generating API key:', error);
    res.status(500).json({ error: 'Error generating API key' });
  }
})

module.exports = router
