const express = require('express');
const router = express.Router();

const {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  softDeletePlan,
  getDeletedPlans,
} = require('../controllers/subscriptionController');


router.post('/', createPlan);


router.get('/', getPlans);
router.get('/:id', getPlanById);


router.put('/:id', updatePlan);

// حذف ناعم
router.delete('/:id', softDeletePlan);

// (اختياري) جلب الاشتراكات المحذوفة
router.get('/deleted/all', getDeletedPlans);

module.exports = router;
