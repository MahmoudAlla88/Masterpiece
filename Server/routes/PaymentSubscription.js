const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentSubscriptionController');

// POST: Create a payment and update user's subscription
router.post('/payments', paymentController.processPayment);

// PUT: Update user's subscription
router.put('/users/:userId/update-subscription', paymentController.updateUserSubscription);

module.exports = router;
