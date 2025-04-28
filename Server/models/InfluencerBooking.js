// models/InfluencerBooking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const InfluencerBooking = sequelize.define('InfluencerBooking', {

  id: {                                         // مفتاح رئيسي
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {                                    // صاحب الحملة (الشركة / المعلن)
    type: DataTypes.BIGINT,
    allowNull: false,
  },

  influencerId: {                               // المؤثّر المطلوب
    type: DataTypes.BIGINT,
    allowNull: false,
  },

  campaignTitle: {                              // عنوان مختصر للحملة
    type: DataTypes.STRING(120),
    allowNull: false,
  },

  brief: {                                      // ملخّص المطلوب من الإعلان
    type: DataTypes.TEXT,
    allowNull: false,
  },

  platform: {                                   // المنصّة المستهدفة
    type: DataTypes.ENUM('instagram', 'tiktok', 'youtube', 'facebook', 'other'),
    allowNull: false,
  },

  contentType: {                                // نوع المحتوى
    type: DataTypes.ENUM('post', 'story', 'reel', 'video', 'blog'),
    allowNull: false,
  },

  proposedPrice: {                              // السعر المقترح من الشركة
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
       
  },

  requestedDate: {                              // التاريخ المطلوب للنشر
    type: DataTypes.DATE,
    allowNull: false,
  },

  scheduledDate: {                              // التاريخ المؤكَّد (يحدّده المؤثّر بعد القبول)
    type: DataTypes.DATE,
    allowNull: true,
  },

  status: {                                     // حالة الطلب
    type: DataTypes.ENUM(
      'pending',     // بانتظار ردّ المؤثّر
      'accepted',    // وافق المؤثّر
      'rejected', 
      'scheduled', // رفض المؤثّر
      'paid',        // تم الدفع (مبلغ مُحتجز)
      'published',   // نُشِر الإعلان
      'cancelled'    // أُلغِي (انتهت المهلة أو بإرادة أحد الطرفين)
    ),
    defaultValue: 'pending',
  },

  paymentIntentId: {                            // معرّف عملية الدفع (Stripe/PayPal)
    type: DataTypes.STRING,
    allowNull: true,
  },
 
  expiresAt: {                                  // آخر مهلة للدفع قبل الإلغاء التلقائي
    type: DataTypes.DATE,
    allowNull: false,
  },

}, {
  tableName: 'influencer_bookings',
  timestamps: true,
  underscored: true,
});

// العلاقات (associations) – أضِفها في index.js أو بعد تعريف كل موديل


module.exports = InfluencerBooking;



