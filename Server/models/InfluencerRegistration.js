const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 
const User = require('./User');
const InfluencerRegistration = sequelize.define('InfluencerRegistration', {
  // Step 1: Referencing User
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,  // العلاقة مع جدول User
      key: 'id',  // يجب أن يكون هذا هو المفتاح الأساسي في جدول User
    },
    allowNull: false,
  },
  // Step 2: Influencer Specific Questions
  isInfluencer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasDonePreviousAds: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  previousProduct: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  joinReason: {
    type: DataTypes.JSONB, // لتخزين قائمة من الأسباب التي تم اختيارها
    allowNull: false,
  },
  otherReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Step 3: Profile Image, Social Links, Target Content
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true, // يمكن أن تكون الصورة اختيارية في البداية
  },
  socialLinks: {
    type: DataTypes.JSONB, // تخزين روابط السوشيال ميديا كـ JSON
    allowNull: true,
  },
  targetContent: {
    type: DataTypes.JSONB, // لتخزين المحتوى المستهدف مثل Travel, Food
    allowNull: true,
  },
  audienceGender: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  timestamps: true, // لتخزين تاريخ الإنشاء والتحديث
  paranoid: true, // لتفعيل الحذف الناعم (soft deletes)
  tableName: 'InfluencerRegistrations', // اسم الجدول في قاعدة البيانات
  underscored: true, // لاستخدام underscore بدلاً من camelCase في أسماء الحقول
});

module.exports = InfluencerRegistration;
