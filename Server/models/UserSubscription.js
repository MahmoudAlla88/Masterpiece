const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');
const UserSubscriptionPlan = require('./UserSubscriptionPlan');

const UserSubscription = sequelize.define('UserSubscription', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: UserSubscriptionPlan, key: 'id' }
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  remaining_discount_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ai_expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'user_subscriptions',
  timestamps: true,
  underscored: true
});

UserSubscription.belongsTo(User, { foreignKey: 'user_id' });
UserSubscription.belongsTo(UserSubscriptionPlan, { foreignKey: 'plan_id' });

module.exports = UserSubscription;