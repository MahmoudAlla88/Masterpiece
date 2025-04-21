
const express = require('express');
const router = express.Router();
const { sendInfluencersAndBrand } = require('../controllers/externalApiController');

router.post('/external/send-influencers', sendInfluencersAndBrand);

module.exports = router;
