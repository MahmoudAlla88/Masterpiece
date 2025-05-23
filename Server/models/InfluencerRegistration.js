
// module.exports = InfluencerRegistration;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');

const InfluencerRegistration = sequelize.define('InfluencerRegistration', {
  // مرجعية إلى جدول User
  userId: {
    type: DataTypes.BIGINT,
    references: {
      model: User, // العلاقة مع جدول User
      key: 'id',
    },
    allowNull: false,
  },
  // بيانات البروفايل
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: false, // صورة البروفايل إلزامية حسب الفورم
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,  // اختياري؛ إذا لم يُعبأ نستخدم صورة البروفايل
  },
  // الإحصائيات المُرسلة كـ JSON
  stats: {
    type: DataTypes.JSONB,
    allowNull: false, // إلزامية
  },
  // روابط السوشيال ميديا (يتم تخزينها على شكل JSON)
  socialLinks: {
    type: DataTypes.JSONB,
    allowNull: false, // يجب تعبئة رابط منصة واحدة على الأقل حسب التحقق في الفورم
  },
  // فئات المحتوى المختارة، كمصفوفة من السلاسل النصية
  contentCategories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  // بيانات الجمهور (مثل gender, ageGroups, topLocations)
  audienceDemo: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  // الحملات السابقة (اختيارية)
  previousCampaigns: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  advertisingcost:{
    type: DataTypes.BIGINT,
    defaultValue:300,
    allowNull: false,
  }
}, {
  timestamps: true,
  paranoid: false,
  tableName: 'influencerregistrations',
  underscored: true,
});

module.exports = InfluencerRegistration;

// // إعداد علاقة one-to-one بين User و InfluencerRegistration
// User.hasOne(InfluencerRegistration, { foreignKey: 'userId' });
// InfluencerRegistration.belongsTo(User, { foreignKey: 'userId' });
