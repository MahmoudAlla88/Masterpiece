
const Payment = require('../models/Payment');
const User = require('../models/User');


exports.processPayment = async (req, res) => {
     const {
    userId,subscriptionPlanId, planTitle, planPrice, planDuration, paymentMethod ,
      paymentStatus         
    } = req.body;
        console.log(req.body);
  try {

   const payment = await Payment.create({
       UserId:userId,
      amount: planPrice,  
        payment_method:paymentMethod,
      payment_status: paymentStatus || 'pending', 
   subscription_plan_id:subscriptionPlanId,
  
    });

   
    const user = await User.findOne({ where: { id: userId } }); 
      if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    await user.update({
      subscriptionplan:  planTitle,
      subscriptionexpiry: new Date(
  new Date().setMonth(
    new Date().getMonth() + Number(planDuration) 
  )
)   });

    return res.status(200).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing payment' });
  }
};


exports.updateUserSubscription = async (req, res) => {
  const { userId, subscriptionplan, subscriptionexpiry } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      subscriptionplan,
      subscriptionexpiry,  
    });

    return res.status(200).json({ message: 'User subscription updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating subscription' });
  }
};
