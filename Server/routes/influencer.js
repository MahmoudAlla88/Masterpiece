const express = require('express');
const router = express.Router();
const { registerInfluencer ,getApprovedInfluencers} = require('../controllers/InfluencerControllers');

// Route to register influencer
router.post('/register', registerInfluencer);
router.get('/get', getApprovedInfluencers);
module.exports = router;
