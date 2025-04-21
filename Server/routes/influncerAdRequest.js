const express = require('express');
const router = express.Router();
const auth = require('../middleware/AuthMiddleware');
const controller = require('../controllers/adRequestController');

router.post('/ad-request', auth, controller.createAdRequest);
router.patch('/ad-request/:requestId/status', controller.updateAdRequestStatus);
router.patch('/ad-request/:requestId/schedule', controller.scheduleAd);
router.get('/ad-request', controller.getAllAdRequests);
router.get('/ad-request/influencer/:influencerId', controller.getAdRequestsByInfluencer);

module.exports = router;
