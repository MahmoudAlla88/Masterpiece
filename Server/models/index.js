const User = require('./User');
const InfluencerRegistration = require('./InfluencerRegistration');
const InfluencerAdRequest = require('./InfluencerAdRequest');
const InfluencerBooking = require('./InfluencerBooking');
const SubscriptionPlan = require('./SubscriptionPlan');
const Payment = require('./Payment');
User.hasOne(InfluencerRegistration, { foreignKey: 'userId',    });
InfluencerRegistration.belongsTo(User, { foreignKey: 'userId' , });



User.hasMany(InfluencerAdRequest, { foreignKey: 'userId' });
InfluencerAdRequest.belongsTo(User, { foreignKey: 'userId' });

InfluencerRegistration.hasMany(InfluencerAdRequest, { foreignKey: 'influencerId' });
InfluencerAdRequest.belongsTo(InfluencerRegistration, { foreignKey: 'influencerId' });


// في النموذج User.js
User.hasMany(InfluencerBooking, { foreignKey: 'userId' });
InfluencerBooking.belongsTo(User, { foreignKey: 'userId',  });

// في النموذج InfluencerBooking.js
InfluencerBooking.belongsTo(User, { foreignKey: 'userId' ,});
// في النموذج InfluencerRegistration.js
InfluencerRegistration.hasMany(InfluencerBooking, { foreignKey: 'id' ,sourceKey : 'userId',          // موازي لـ targetKey فى الاتجاه الآخر
    });
InfluencerBooking.belongsTo(InfluencerRegistration, { foreignKey: 'influencerId',  targetKey : 'userId',   });


// In SubscriptionPlan model file
SubscriptionPlan.hasMany(Payment, { foreignKey: 'subscription_plan_id' });
Payment.belongsTo(SubscriptionPlan, { foreignKey: 'subscription_plan_id' });


module.exports = { User, InfluencerRegistration , InfluencerBooking ,  SubscriptionPlan,
  Payment,};
