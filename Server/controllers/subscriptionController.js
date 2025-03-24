const { where } = require('sequelize');
const subscription_plans = require('../models/subscriptionPlan');

// إنشاء اشتراك
async function createPlan(req, res) {
  try {
    const { title, price, monthly_duration, description, features } = req.body;
    
    if (!subscription_plans) {
      throw new Error('subscription_plans is not defined');
    }

    const newPlan = await subscription_plans.create({
      title, 
      price,
      monthly_duration,
      description,
      features,  // تأكد أن الميزات تُرسل بشكل صحيح
    });

    return res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating plan:", error);
    return res.status(500).json({ error: 'Failed to create plan', details: error.message });
  }
}



// جلب كل الاشتراكات (غير المحذوفة)
async function getPlans(req, res) {
  try {
    const plans = await subscription_plans.findAll({
      where: {
        deletedAt: null // Assuming deletedAt is set to null if not deleted
      },
  });
    return res.json(plans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get plans' });
  }
}

// جلب اشتراك محدّد بالمعرف
async function getPlanById(req, res) {
  try {
    const { id } = req.params;
    const plan = await subscription_plans.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    return res.json(plan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get plan' });
  }
}

// تحديث اشتراك
async function updatePlan(req, res) {
  try {
    const { id } = req.params;
    const { title, price, monthly_duration, description, features } = req.body;

    const plan = await subscription_plans.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    const updatedPlan = await plan.update({
      title,
      price,
      monthly_duration,
      description,
      features
    });
    return res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update plan' });
  }
}

// حذف ناعم
async function softDeletePlan(req, res) {
  try {
    const { id } = req.params;
    const plan = await subscription_plans.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    await plan.destroy(); // إذا كان `paranoid: true` مفعّلاً، سيقوم `destroy()` بتعيين `deletedAt`
    return res.json({ message: 'Plan soft-deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete plan' });
  }
}

// جلب الاشتراكات المحذوفة
async function getDeletedPlans(req, res) {
  try {
    const deletedPlans = await subscription_plans.findAll({
      where: {
        deletedAt: { [Op.ne]: null }
      },
      paranoid: false, // سيتيح لك الوصول إلى السجلات المحذوفة
    });
    return res.json(deletedPlans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get deleted plans' });
  }
}

module.exports = {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  softDeletePlan,
  getDeletedPlans,
};
