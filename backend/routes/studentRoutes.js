const express = require('express');
const { submitForm } = require('../controllers/studentController');
const { authenticateToken } = require('../controllers/studentController'); 
const router = express.Router();

router.post('/submit', authenticateToken, submitForm);

module.exports = router;