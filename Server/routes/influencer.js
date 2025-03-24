const express = require('express');
const router = express.Router();
const { registerInfluencer } = require('../controllers/InfluencerControllers');

// Route to register influencer
router.post('/register', registerInfluencer);

module.exports = router;
