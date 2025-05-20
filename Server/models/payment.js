const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const SubscriptionPlan = require('./SubscriptionPlan');  // Relationship with SubscriptionPlan

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,  // Can be 'creditCard', 'paypal', etc.
  },
  UserId: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',  // 'pending', 'completed', 'failed', etc.
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: true,  // Transaction ID from PayPal or Payment Gateway
  },
  subscription_plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SubscriptionPlan, // Foreign key reference to SubscriptionPlan table
      key: 'id'
    }
  },
}, {
  timestamps: true,
  paranoid: true,  // For soft deletes
  tableName: 'payments',  // Table name in the database
  underscored: true,
});

module.exports = Payment;
