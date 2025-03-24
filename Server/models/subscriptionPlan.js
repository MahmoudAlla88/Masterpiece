const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
  
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  monthly_duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1, // مثلاً مدة اشتراك شهرية افتراضية = شهر 1
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),  // حقل الميزات كـ Array من النصوص
    allowNull: true,
  }
}, {
  // خيارات عامة للموديل
  timestamps: true,      // Sequelize سيضيف حقول createdAt و updatedAt
  paranoid: true,        // لتفعيل Soft Delete => سيضيف حقل deletedAt
  tableName: 'subscription_plans', // اسم الجدول في قاعدة البيانات
  underscored: true,     // إن كنت تفضل النمط (snake_case) للأعمدة في DB
});

module.exports = SubscriptionPlan;
