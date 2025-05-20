const { Op } = require('sequelize');
const UserSubscriptionPlan = require('../models/UserSubscriptionPlan');


async function createPlan(req, res) {
  try {
    const {
      title,
      price,
      monthly_duration,
      discount_percentage,
      discount_bookings_count,
      ai_enabled,
      ai_duration_days,
      features,
      description
    } = req.body;

    const newPlan = await UserSubscriptionPlan.create({
      title,
      price,
      monthly_duration,
      discount_percentage,
      discount_bookings_count,
      ai_enabled,
      ai_duration_days,
      features,
      description
    });

    return res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating UserSubscriptionPlan:", error);
    return res.status(500).json({ error: 'Failed to create plan', details: error.message });
  }
}


async function getPlans(req, res) {
  try {
    const plans = await UserSubscriptionPlan.findAll({
      where: { deletedAt: null }
    });
    return res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return res.status(500).json({ error: 'Failed to get plans', details: error.message });
  }
}

// جلب خطة محددة بالمعرف
async function getPlanById(req, res) {
  try {
    const { id } = req.params;
    const plan = await UserSubscriptionPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    return res.json(plan);
  } catch (error) {
    console.error("Error fetching plan by ID:", error);
    return res.status(500).json({ error: 'Failed to get plan', details: error.message });
  }
}


async function updatePlan(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      price,
      monthly_duration,
      discount_percentage,
      discount_bookings_count,
      ai_enabled,
      ai_duration_days,
      features,
      description
    } = req.body;

    const plan = await UserSubscriptionPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const updatedPlan = await plan.update({
      title,
      price,
      monthly_duration,
      discount_percentage,
      discount_bookings_count,
      ai_enabled,
      ai_duration_days,
      features,
      description
    });

    return res.json(updatedPlan);
  } catch (error) {
    console.error("Error updating plan:", error);
    return res.status(500).json({ error: 'Failed to update plan', details: error.message });
  }
}


async function softDeletePlan(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required for soft delete' });
    }

    const plan = await UserSubscriptionPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    await plan.destroy(); 
    return res.json({ message: 'Plan soft-deleted successfully' });
  } catch (error) {
    console.error("Error soft-deleting plan:", error);
    return res.status(500).json({ error: 'Failed to delete plan', details: error.message });
  }
}


async function getDeletedPlans(req, res) {
  try {
    const deletedPlans = await UserSubscriptionPlan.findAll({
      where: { deletedAt: { [Op.ne]: null } },
      paranoid: false
    });
    return res.json(deletedPlans);
  } catch (error) {
    console.error("Error fetching deleted plans:", error);
    return res.status(500).json({ error: 'Failed to get deleted plans', details: error.message });
  }
}


async function restorePlan(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Plan ID is required to restore a plan' });
    }

    const plan = await UserSubscriptionPlan.findByPk(id, { paranoid: false });
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    await plan.restore();
    const restoredPlan = await UserSubscriptionPlan.findByPk(id);
    return res.json(restoredPlan);
  } catch (error) {
    console.error("Error restoring plan:", error);
    return res.status(500).json({ error: 'Failed to restore plan', details: error.message });
  }
}

module.exports = {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  softDeletePlan,
  getDeletedPlans,
  restorePlan
};
