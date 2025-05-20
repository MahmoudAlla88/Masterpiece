const express = require('express');
const router = express.Router();
const {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  softDeletePlan,
  getDeletedPlans,
  restorePlan
} = require('../controllers/userSubscriptionPlanController');

// إنشاء خطة
router.post('/user-subscription-plans', createPlan);

// جلب كل الخطط غير المحذوفة
router.get('/user-subscription-plans', getPlans);

// جلب خطة محددة
router.get('/user-subscription-plans/:id', getPlanById);

// تحديث خطة
router.put('/user-subscription-plans/:id', updatePlan);

// حذف ناعم لخطة
router.delete('/user-subscription-plans/:id', softDeletePlan);

// جلب الخطط المحذوفة
router.get('/user-subscription-plans/deleted/all', getDeletedPlans);

// استعادة خطة
router.put('/user-subscription-plans/restore/:id', restorePlan);

module.exports = router;
