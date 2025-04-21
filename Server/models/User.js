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
}, 
{
  timestamps: true,  // يُفعّل تسجيل تاريخ الإنشاء (createdAt) والتحديث (updatedAt) تلقائيًا لكل سجل.
  paranoid: true,    // يُفعّل الحذف الناعم (soft deletes)؛ بدلاً من حذف السجل نهائيًا، يتم تعيين وقت الحذف في عمود (deletedAt).
  tableName: 'User', // يُحدد اسم الجدول في قاعدة البيانات كـ 'User' بدلاً من الاسم الافتراضي الذي ينشئه Sequelize.
  underscored: true, // يستخدم صيغة الـ underscores للفصل بين الكلمات في أسماء الحقول (مثال: created_at بدلاً من createdAt).
}
);

module.exports = User;
// تحدد علاقة one-to-one بأن كل مستخدم (User) يمتلك سجل واحد خاص بتسجيل الإنفلونسر (InfluencerRegistration)
// يتم الربط عن طريق المفتاح الخارجي 'userId' في جدول InfluencerRegistration.
// User.hasOne(InfluencerRegistration, { foreignKey: 'userId' });

// // تحدد أن سجل تسجيل الإنفلونسر (InfluencerRegistration) ينتمي إلى مستخدم (User)
// // وباستخدام المفتاح الخارجي 'userId'، يتم الربط بين السجل في InfluencerRegistration والسجل المناسب في User.
// InfluencerRegistration.belongsTo(User, { foreignKey: 'userId' });
