const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');


const Brand = sequelize.define('Brand', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  minAdPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Minimum estimated advertisement price in USD',
  },
  maxAdPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Maximum estimated advertisement price in USD',
  }
}, {
  tableName: 'brands',
  timestamps: true,
});


module.exports = Brand;
