const User = require('./User');
const InfluencerRegistration = require('./InfluencerRegistration');
const InfluencerAdRequest = require('./InfluencerAdRequest');


User.hasOne(InfluencerRegistration, { foreignKey: 'userId' });
InfluencerRegistration.belongsTo(User, { foreignKey: 'userId' });



User.hasMany(InfluencerAdRequest, { foreignKey: 'userId' });
InfluencerAdRequest.belongsTo(User, { foreignKey: 'userId' });

InfluencerRegistration.hasMany(InfluencerAdRequest, { foreignKey: 'influencerId' });
InfluencerAdRequest.belongsTo(InfluencerRegistration, { foreignKey: 'influencerId' });




module.exports = { User, InfluencerRegistration };
