const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require("../config/config")
const InfluencerRegistration = require('./InfluencerRegistration');  // تأكد من استيراد النموذج المناسب


const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,  // يمكن استخدام BIGINT إذا كانت القيم كبيرة
    primaryKey: true,  // تعيينه كـ primary key
    autoIncrement: true,  // تعيينه ليتم توليده تلقائيًا
  },
  google_id: {
    type: DataTypes.STRING,  // تغيير الـ google_id إلى BIGINT
    allowNull: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensures that the email is unique
  }
  ,
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  adminApproved: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  paranoid: true,     
  tableName: 'User', 
  underscored: true,  
});

User.hasOne(InfluencerRegistration, { foreignKey: 'userId' });
InfluencerRegistration.belongsTo(User, { foreignKey: 'userId' });


module.exports = User;
