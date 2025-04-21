// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/config'); 
// const User = require('./User');
// const InfluencerRegistration = sequelize.define('InfluencerRegistration', {
//   // Step 1: Referencing User
//   userId: {
//     type: DataTypes.BIGINT,
//     references: {
//       model: User,  // العلاقة مع جدول User
//       key: 'id',  // يجب أن يكون هذا هو المفتاح الأساسي في جدول User
//     },
//     allowNull: false,
//   },
//   // Step 2: Influencer Specific Questions
//   isInfluencer: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   hasDonePreviousAds: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   previousProduct: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   joinReason: {
//     type: DataTypes.JSONB, // لتخزين قائمة من الأسباب التي تم اختيارها
//     allowNull: false,
//   },
//   otherReason: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   bio: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   // Step 3: Profile Image, Social Links, Target Content
//   profileImage: {
//     type: DataTypes.STRING,
//     allowNull: true, // يمكن أن تكون الصورة اختيارية في البداية
//   },
//   coverImage: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   stats: {
//     type: DataTypes.JSONB,
//     allowNull: false,
//   },
//   socialLinks: {
//     type: DataTypes.JSONB, // تخزين روابط السوشيال ميديا كـ JSON
//     allowNull: true,
//   },
//   targetContent: {
//     type: DataTypes.ARRAY(DataTypes.STRING),// لتخزين المحتوى المستهدف مثل Travel, Food
//     allowNull: true,
//   },
//   audienceDemo: {
//     type: DataTypes.JSONB,
//     allowNull: false,
//   },
//   // حملات سابقة للإنفلونسر مثل: [{ brand: "EcoStyle", description: "Sustainable fashion collection launch", date: "Jan 2025" }, ...]
//   previousCampaigns: {
//     type: DataTypes.JSONB,
//     allowNull: true,
//   },

// }, {
//   timestamps: true, // لتخزين تاريخ الإنشاء والتحديث
//   paranoid: true, // لتفعيل الحذف الناعم (soft deletes)
//   tableName: 'InfluencerRegistrations', // اسم الجدول في قاعدة البيانات
//   underscored: true, // لاستخدام underscore بدلاً من camelCase في أسماء الحقول
// });

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
