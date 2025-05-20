const { Op } = require('sequelize');
const subscription_plans = require('../models/subscriptionPlan');


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
      features,  
    });

    return res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating plan:", error);
    return res.status(500).json({ error: 'Failed to create plan', details: error.message });
  }
}




async function getPlans(req, res) {
  try {
    const plans = await subscription_plans.findAll({
      where: {
        deletedAt: null 
      },
  });
    return res.json(plans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to get plans' });
  }
}


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


async function updatePlan(req, res) {
  try {
    const { id } = req.params;
    const { title, price, monthly_duration, description, features } = req.body;

    const plan = await subscription_plans.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    if (!title || !price || !monthly_duration || !description || !features) {
      return res.status(400).json({ error: 'All fields are required' });
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



async function softDeletePlan(req, res) {
  try {
    const { id } = req.params;

  
    if (!id) {
      return res.status(400).json({ error: 'ID is required for soft delete' });
    }

   
    const plan = await subscription_plans.findByPk(id);
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
   
    const deletedPlans = await subscription_plans.findAll({
      where: {
        deletedAt: { [Op.ne]: null }  
      },
      paranoid: false,  
    });

    return res.json(deletedPlans);
  } catch (error) {
    console.error("Error fetching deleted plans:", error);
    return res.status(500).json({ error: 'Failed to get deleted plans', details: error.message });
  }
}

const restorePlan = async (req, res) => {
  const { planId } = req.params;
  if (!planId) {
    return res.status(400).json({ error: 'Plan ID is required to restore a plan' });
  }

  try {
    const plan = await subscription_plans.findByPk(planId, { paranoid: false });
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

   
    await plan.restore(); 
   

    const restoredPlan = await subscription_plans.findByPk(planId);
    return res.json(restoredPlan);
  } catch (err) {
    console.error('Error in restorePlan:', err);
    return res.status(500).json({ error: 'Failed to restore plan.' });
  }
};
module.exports = {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  softDeletePlan,
  getDeletedPlans,
  restorePlan
};
