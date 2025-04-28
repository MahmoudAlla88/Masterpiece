
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const InfluencerAdRequest = sequelize.define('InfluencerAdRequest', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  influencerId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  adTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adDetails: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  adDuration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  budget: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  scheduledDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  scheduledTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'scheduled'),
    defaultValue: 'pending',
  }
}, {
  timestamps: true,
  tableName: 'InfluencerAdRequest',
  underscored: true,
  paranoid: true
});

module.exports = InfluencerAdRequest;
