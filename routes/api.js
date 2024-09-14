const express = require('express');
const router = express.Router();
const { addTrainLocation, getTrainLocations, getTrainLocationById } = require('../controllers/trainController');
const authenticateToken = require('../middlewares/auth');

// Public routes
router.get('/locations', getTrainLocations);

// Protected routes (authentication required)
router.post('/locations', addTrainLocation);
router.get('/locations/:id', authenticateToken, getTrainLocationById);

module.exports = router;
