const express = require('express');
const router = express.Router();
const { recognizeText } = require('../controllers/visionControllers');

// Define your OCR route
router.post('/recognize-text', recognizeText);

module.exports = router;
