const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const UserSubscriptionPlan = sequelize.define('UserSubscriptionPlan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0
  },
  monthly_duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  discount_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // نسبة الخصم (%)
  },
  discount_bookings_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // عدد الحجوزات المخصّمة
  },
  ai_enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ai_duration_days: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'عدد أيام صلاحية AI للمستخدم'
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    comment: 'قائمة الميزات في الخطة'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'user_subscription_plans',
  timestamps: true,
  paranoid: true,
  underscored: true
});

module.exports = UserSubscriptionPlan;