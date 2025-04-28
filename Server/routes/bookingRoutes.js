const express = require('express');
const router = express.Router();

const  authMiddleware  = require('../middleware/AuthMiddleware');  // assuming you have auth middleware for authentication
const bookingController = require('../controllers/bookingControllers');

router.post('/request-ad', bookingController.createAdRequest);
router.get('/all', bookingController.getAllAdRequests);

// Route لعرض الطلبات الخاصة بمؤثر معين
router.get('/influencer/:influencerId', bookingController.getAdRequestsByInfluencerId);

// Route لتحديث حالة الطلب
router.put('/update-status/:requestId', bookingController.updateAdRequestStatus);
router.get('/bookings/:userId', bookingController.getBookingsByUserId); 
router.post('/pay/:bookingId', bookingController.payBooking); 
router.get(
    '/influencers/:influencerId/calendar',
    bookingController.getCalendarBookingsForInfluencer
  );
  router.get('/influencers/:influencerId/overview', bookingController.getInfluencerOverview);
module.exports = router;
