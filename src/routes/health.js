const express = require('express');
const router = express.Router();

// Import du contrôleur
const healthController = require('../controllers/healthController');

// Route GET /health
router.get('/', healthController.getHealth);

module.exports = router;