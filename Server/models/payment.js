const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Payment = sequelize.define('Payment', {
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // يمكن أن تكون: 'pending', 'completed', 'failed'
  },
  paymentAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // ID مرجع (الذي يشير إلى النوع المعني بالدفعة مثل طلب الإعلان أو الاشتراك)
  referenceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // نوع الكيان الذي تم الدفع له: "adRequest" أو "subscription" أو أي نوع آخر
  referenceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // يمكن إضافة معلومات إضافية مثل رقم المعاملة (transactionId)، إلخ.
});

module.exports = Payment;
