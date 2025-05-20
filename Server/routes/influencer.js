const express = require('express');
const router = express.Router();
const { getAllInfluencers , registerInfluencer ,getApprovedInfluencers ,updateInfluencerStatus,getInfluencerById,getInfluencerByUserId,featuresInfluencers,updateInfluencer} = require('../controllers/InfluencerControllers');

// Route to register influencer
router.post('/register', registerInfluencer);
router.get('/get', getApprovedInfluencers);
router.put('/:influencerId/status', updateInfluencerStatus);
router.get('/getAllInfluencers', getAllInfluencers);
router.get('/get/:id', getInfluencerById);
router.get('/features', featuresInfluencers);
router.put('/update/:id', updateInfluencer);
router.get('/user/:userId', getInfluencerByUserId);

module.exports = router;
