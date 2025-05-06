const express = require('express');
const router = express.Router();
const { getNearbyLawyers } = require('../controllers/lawyerController.js');

router.get('/nearby', getNearbyLawyers);

module.exports = router;
