// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/config');

// const InfluencerAdRequest = sequelize.define('InfluencerAdRequest', {
//   id: {
//     type: DataTypes.BIGINT,
//     autoIncrement: true,
//     primaryKey: true,
//   },

//   userId: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },

//   influencerId: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },

//   message: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },

//   requestedDate: {
//     type: DataTypes.DATE,
//     allowNull: true, // المؤثر يحدد لاحقًا
//   },

//   needsProductDelivery: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },

//   deliveryAddress: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },

//   status: {
//     type: DataTypes.ENUM('pending', 'approved', 'rejected', 'scheduled'),
//     defaultValue: 'pending',
//   },

// }, {
//   timestamps: true,
//   paranoid: true,
//   tableName: 'InfluencerAdRequest',
//   underscored: true,
// });

// module.exports = InfluencerAdRequest;
// models/InfluencerAdRequest.js
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
