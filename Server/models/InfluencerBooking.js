// models/InfluencerBooking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const InfluencerBooking = sequelize.define('InfluencerBooking', {

  id: {                                        
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {                                    
    type: DataTypes.BIGINT,
    allowNull: false,
  },

  influencerId: {                              
    type: DataTypes.BIGINT,
    allowNull: false,
  },

  campaignTitle: {                              
    type: DataTypes.STRING(120),
    allowNull: false,
  },

  brief: {                                      
    type: DataTypes.TEXT,
    allowNull: false,
  },

  platform: {                                  
    type: DataTypes.ENUM('instagram', 'tiktok', 'youtube', 'facebook', 'other'),
    allowNull: false,
  },

  contentType: {                               
    type: DataTypes.ENUM('post', 'story', 'reel', 'video', 'blog'),
    allowNull: false,
  },

  proposedPrice: {                             
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
       
  },

  requestedDate: {                            
    type: DataTypes.DATE,
    allowNull: false,
  },

  scheduledDate: {                            
    type: DataTypes.DATE,
    allowNull: true,
  },

  status: {                                   
    type: DataTypes.ENUM(
      'pending',    
      'accepted',    
      'rejected', 
      'scheduled', 
      'paid',       
      'published', 
      'cancelled'  
    ),
    defaultValue: 'pending',
  },

  paymentIntentId: {                
    type: DataTypes.STRING,
    allowNull: true,
  },
  postUrl: {                       // سيُخزَّن في قاعدة البيانات كـ post_url
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isUrl: true },     // تأكد أن القيمة رابط صالح
  },
  expiresAt: {                                
    type: DataTypes.DATE,
    allowNull: false,
  },
originalPrice: {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: true,       // أصبح مسموح أن يكون null
  defaultValue: 0,       // اختياري: يضع 0 إذا لم تُمرَّر قيمة
  field: 'original_price'
},
discountApplied: {
  type: DataTypes.BOOLEAN,
  allowNull: true,       // أصبح مسموح أن يكون null
  defaultValue: false,   // اختياري: يضع false إذا لم تُمرَّر قيمة
  field: 'discount_applied'
},
finalPrice: {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: true,       // أصبح مسموح أن يكون null
  defaultValue: 0,       // اختياري: يضع 0 إذا لم تُمرَّر قيمة
  field: 'final_price'
}
}, {
  tableName: 'influencer_bookings',
  timestamps: true,
  underscored: true,
});

// العلاقات (associations) – أضِفها في index.js أو بعد تعريف كل موديل


module.exports = InfluencerBooking;



