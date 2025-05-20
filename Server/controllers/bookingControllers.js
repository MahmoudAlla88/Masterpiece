const { User, InfluencerBooking, InfluencerRegistration } = require('../models');
const { Op ,fn, col , literal} = require('sequelize'); 
const sequelize = require('../config/config'); 
const UserSubscriptionPlan = require('../models/UserSubscriptionPlan');

const PLATFORMS = ['instagram', 'tiktok', 'youtube', 'facebook', 'other'];
const CONTENT_TYPES = ['post', 'story', 'reel', 'video', 'blog'];
const ACTIVE_STATUSES = ['pending', 'accepted', 'scheduled', 'paid', 'published'];


exports.createAdRequest = async (req, res) => {
  const {
    userId,
    influencerId,
    campaignTitle,
    brief,
    platform,
    contentType,
    proposedPrice,
    requestedDate,
    paymentMethod,
    orderID,
    payerID,
  } = req.body;

  console.log('jj', req.body);

  // Collect validation errors
  const errors = [];

  // Parse and validate IDs
  const uid = parseInt(userId, 10);
  const iid = parseInt(influencerId, 10);
  if (isNaN(uid)) {
    errors.push('userId must be an integer and is required.');
  }
  if (isNaN(iid)) {
    errors.push('influencerId must be an integer and is required.');
  }

  // Validate strings
  if (!campaignTitle || typeof campaignTitle !== 'string' || !campaignTitle.trim()) {
    errors.push('campaignTitle is required and must be a non-empty string.');
  }
  if (!brief || typeof brief !== 'string' || !brief.trim()) {
    errors.push('brief is required and must be a non-empty string.');
  }

  // Enum checks
  if (!platform || !PLATFORMS.includes(platform)) {
    errors.push(`platform must be one of: ${PLATFORMS.join(', ')}.`);
  }
  if (!contentType || !CONTENT_TYPES.includes(contentType)) {
    errors.push(`contentType must be one of: ${CONTENT_TYPES.join(', ')}.`);
  }

  // Price
  const price = parseFloat(proposedPrice);
  if (isNaN(price) || price <= 0) {
    errors.push('proposedPrice must be a number greater than 0.');
  }

  // Date
  const date = new Date(requestedDate);
  if (isNaN(date.getTime())) {
    errors.push('requestedDate must be a valid ISO-8601 date string.');
  }
const now = new Date();
if (date < now) {
  errors.push('requestedDate cannot be in the past.');
}
  // Payment method
  if (!['creditCard', 'paypal'].includes(paymentMethod)) {
    errors.push('paymentMethod must be either "creditCard" or "paypal".');
  }
  if (paymentMethod === 'paypal') {
    if (!orderID || typeof orderID !== 'string') {
      errors.push('orderID is required when paymentMethod is paypal.');
    }
    if (!payerID || typeof payerID !== 'string') {
      errors.push('payerID is required when paymentMethod is paypal.');
    }
  }

const conflict = await InfluencerBooking.findOne({
  where: {
    influencerId: iid,
    requestedDate: date,          // أو scheduledDate إذا استعملتها بدلاً من requestedDate
    status: { [Op.in]: ACTIVE_STATUSES }
  }
});

if (conflict) {
  return res
    .status(409)
    .json({ message: 'This time slot is already booked for the influencer.' });
}


  // If any errors, respond 400
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  try {
    // Compute expiresAt = 24h after requestedDate
    const originalPrice = price; 
      // 2) جلب بيانات المستخدم وخطة الاشتراك
    const user = await User.findByPk(userId);
    const plan = user.subscriptionplan
      ? await UserSubscriptionPlan.findOne({ where: { title: user.subscriptionplan } })
      : null;
    const now = new Date();
    const isActive = plan
      && user.subscriptionexpiry
      && new Date(user.subscriptionexpiry) > now;

    // 3) حساب الخصم
    let discountApplied = false;
    let finalPrice = originalPrice;
    if (isActive && plan.discount_bookings_count > 0) {
      // احسب بداية دورة الاشتراك
      const periodStart = new Date(user.subscriptionexpiry);
      periodStart.setMonth(periodStart.getMonth() - plan.monthly_duration);

      // عد الحجوزات المخصومة ضمن هذه الدورة
      const used = await InfluencerBooking.count({
        where: {
          userId: uid,
          discount_applied: true,
          createdAt: { [Op.between]: [periodStart, user.subscriptionexpiry] }
        }
      });

      if (used < plan.discount_bookings_count) {
        discountApplied = true;
        finalPrice = +(originalPrice * (100 - plan.discount_percentage) / 100).toFixed(2);
      }
    }

    const expiresAt = new Date(date);
    expiresAt.setDate(expiresAt.getDate() + 1);

    const booking = await InfluencerBooking.create({
      userId: uid,
      influencerId: iid,
      campaignTitle: campaignTitle.trim(),
      brief: brief.trim(),
      platform,
      contentType,
        originalPrice:  originalPrice,
     discountApplied: discountApplied,
      finalPrice:      finalPrice,
      proposedPrice: price,
      requestedDate: date,
      paymentIntentId: paymentMethod === 'paypal' ? orderID : null,
      expiresAt,
      status: 'pending',
    });

    return res.status(201).json({ message: 'Ad request created successfully.', booking });
  } catch (err) {
    console.error('Error in createAdRequest:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



exports.getAllAdRequests = async (req, res) => {
  // const { status, page = 1, limit = 10 } = req.query;
  // console.log('Fetching bookings for:', { status, page, limit });
  try {
    // إعدادات التصفية والصفحات
    // const offset = (page - 1) * limit;
    
    // const where = {};
    // if (status && status !== 'all') {
    //   where.status = status;  // التصفية حسب الحالة
    // }

const bookings = await InfluencerBooking.findAll({
  // where,
  // limit,
  // offset,
  include: [
    {
      model: User,  // جلب بيانات المستخدم الذي قام بالحجز
      attributes: ['name', 'email'],  // جلب اسم و إيميل المستخدم
       
    },
    {
      model: InfluencerRegistration,
   
       attributes: ['id', 'userId'], 
       include: [
        {
          model: User,  // جلب بيانات المستخدم الذي قام بالحجز
         // جلب اسم و إيميل المستخدم
        
          attributes: ['name', 'email'], 
        },
       ]
    }
  ],
  order: [['createdAt', 'DESC']]  // ترتيب حسب تاريخ الإنشاء
});
console.log("bookings",bookings);
    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};






  exports.getAdRequestsByInfluencerId = async (req, res) => {
    const { influencerId } = req.params;
  console.log("influencerId",influencerId)
    try {
      // تأكد من أن المؤثر موجود في قاعدة البيانات
   
  
      // جلب الطلبات المتعلقة بالمؤثر
      const adRequests = await InfluencerBooking.findAll({
        where: { influencerId },
        include: [
          { model: User, attributes: ['id', 'name', 'email']  }, // تضمين بيانات المستخدم
        ],
      });
  
      return res.status(200).json(adRequests);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'حدث خطأ أثناء جلب الطلبات الخاصة بالمؤثر' });
    }
  };

  exports.updateAdRequestStatus = async (req, res) => {
    const { requestId } = req.params; // نحتاج لمرجع الطلب
    const { status, scheduledDate } = req.body; // الحالة والتاريخ المجدول
  
    try {
      // التأكد من أن الطلب موجود
      const adRequest = await InfluencerBooking.findByPk(requestId);
      if (!adRequest) {
        return res.status(404).json({ message: 'الطلب غير موجود' });
      }
  
      // التحقق من أن الحالة الجديدة صالحة
      const validStatuses = ['pending', 'accepted', 'rejected', 'scheduled', 'paid', 'published', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'حالة الطلب غير صحيحة' });
      }
  
      // تحديث حالة الطلب
      adRequest.status = status;
      
      // إذا كانت الحالة "موافق" (accepted) أو "مجدول" (scheduled)، قم بتعيين تاريخ الجدولة
      if (status === 'accepted' || status === 'scheduled' || status === 'paid') {
        if (!scheduledDate) {
          return res.status(400).json({ message: 'تاريخ الجدولة مطلوب' });
        }
        adRequest.scheduledDate = new Date(scheduledDate);
      }
  
      await adRequest.save();  
  
      return res.status(200).json({ message: 'تم تحديث حالة الطلب بنجاح', adRequest });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'حدث خطأ أثناء تحديث حالة الطلب' });
    }
  };


  exports.getBookingsByUserId = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const bookings = await InfluencerBooking.findAll({
        where: { userId },
        include: [{ model: User, attributes: ['id', 'name', 'email'] }
      ,{
        model: InfluencerRegistration,
     
         attributes: ['id', 'userId'], 
         include: [
          {
            model: User, 
          
          
            attributes: ['name', 'email'], 
          },
         ]
      }
      ] 
      });
  
      if (!bookings) {
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };



// هون عشان اعدل على ال status 
  exports.influencerActionOnBooking = async (req, res) => {
    const { requestId }          = req.params;
    const { action, postUrl }    = req.body;     

    if (!['publish', 'cancel'].includes(action)) {
      return res.status(400).json({ message: 'action must be publish or cancel' });
    }
  
    try {
   
      const booking = await InfluencerBooking.findByPk(requestId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  

      /* فرق الساعات حتى موعد النشر */
      const targetDate   = booking.scheduledDate || booking.requestedDate;
      const hoursToEvent = (targetDate - new Date()) / (1000 * 60 * 60);
  
 
      if (action === 'publish') {
        if (!postUrl || typeof postUrl !== 'string' || !postUrl.trim()) {
          return res.status(400).json({ message: 'postUrl is required' });
        }
  
        await sequelize.transaction(async (t) => {
          /*  حدِّث الحجز */
          booking.postUrl = postUrl.trim();
          booking.status  = 'published';
          await booking.save({ transaction: t });
  
          /* ❷ أضف الحملة إلى previousCampaigns */

          const reg = await InfluencerRegistration.findOne({
            where: { userId: booking.influencerId },
           transaction: t, lock: t.LOCK.UPDATE 
          });
  
          if (reg) {
            const prev = Array.isArray(reg.previousCampaigns)
                         ? [...reg.previousCampaigns]
                         : [];
  
            prev.push({
              brand      : booking.campaignTitle,           
              description: booking.brief,
              date       : (booking.scheduledDate || new Date()).toISOString()
            });
  
            reg.previousCampaigns = prev;
            await reg.save({ transaction: t });
          }
        });
  
        return res
          .status(200)
          .json({ message: 'Booking marked as published and campaign logged', booking });
      }
  
     
      if (action === 'cancel') {
        // if (hoursToEvent < 24) {
        //   return res
        //     .status(400)
        //     .json({ message: 'Cannot cancel: less than 24 hours before publish date' });
        // }
  
        booking.status = 'cancelled';
        await booking.save();
  
        return res.status(200).json({ message: 'Booking cancelled successfully', booking });
      }
    } catch (err) {
      console.error('influencerActionOnBooking error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

















  // controllers/bookingControllers.js
exports.payBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await InfluencerBooking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // هنا يمكن إضافة معالجة الدفع (مثل Stripe أو PayPal)
    // بعد الدفع الناجح:

    booking.status = 'paid';
    await booking.save();

    return res.status(200).json({ success: true, message: 'Payment successful' });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// exports.getCalendarBookingsForInfluencer = async (req, res) => {
//   const { influencerId } = req.params;
//   const { start, end } = req.query;      // تواريخ ISO اختيارية

//   try {
//     // نحضّر فلترة التاريخ
//     const dateFilter = {};
//     if (start && end) {
//       dateFilter[Op.or] = [
//         {                           // حجوزات مـجدولة
//           scheduledDate: { [Op.between]: [new Date(start), new Date(end)] }
//         },
//         {                           // حجوزات غير مـجدولة (نستخدم requestedDate)
//           scheduledDate: null,
//           requestedDate: { [Op.between]: [new Date(start), new Date(end)] }
//         }
//       ];
//     }

//     // جلب الحجوزات
//     const bookings = await InfluencerBooking.findAll({
//       where: {
//         influencerId,
//         status: { [Op.notIn]: ['cancelled', 'rejected'] }, // استبعد الملغاة والمرفوضة
//         ...dateFilter
//       },
//       include: [
//         {
//           model: User,
          
//           attributes: ['id', 'name', 'email']
//         }
//       ],
//       order: [['createdAt', 'DESC']]
//     });
// console.log(bookings)
//     // نهيّئ الشكل المناسب للـ Calendar
//     const events = bookings.map(b => ({
//       id: b.id,
//       title: b.campaignTitle,
//       start: b.scheduledDate ? b.scheduledDate : b.requestedDate,
//       end:   b.scheduledDate ? b.scheduledDate : b.requestedDate,
//       status: b.status,
//       User: {
//         id:   b.User.id,
//         name: b.User.name
//       }
//     }));

//     return res.status(200).json(events);
//   } catch (error) {
//     console.error('Error fetching calendar bookings:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
exports.getCalendarBookingsForInfluencer = async (req, res) => {
  const { influencerId } = req.params;
  const { start, end }   = req.body;  // — نطاق التواريخ من body

  try {
    // بناء شرط where
    const where = {
      influencerId,
      status: { [Op.ne]: 'cancelled' }
    };
    if (start && end) {
      where.requestedDate = {
        [Op.between]: [new Date(start), new Date(end)]
      };
    }

    // اجلب الحجوزات مع الانضمام الضعيف لـ User (required: false)
    const bookings = await InfluencerBooking.findAll({
      where,
      include: [{
        model     : User,
        attributes: ['id', 'name', 'email'],
        required  : false
      }],
      order: [['createdAt', 'DESC']]
    });

    // صياغة النتائج
    const events = bookings.map(b => {
      // حقل user اختياري
      const user = b.User
        ? { id: b.User.id, name: b.User.name }
        : undefined;

      return {
        id     : b.id,
        title  : b.campaignTitle,
        start  : b.requestedDate,
        end    : b.requestedDate,
        status : b.status,
        ...(user && { user })
      };
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching calendar bookings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
const moment = require('moment');

exports.getInfluencerOverview = async (req, res) => {
  const { influencerId } = req.params;

  try {
    /* إجمالي الحجوزات حسب الحالة */
    const statusCounts = await InfluencerBooking.findAll({
      where: { influencerId },
      attributes: ['status', [fn('COUNT', col('id')), 'count']],
      group: ['status'],
      raw: true,
    });

    /* الأرباح المؤكَّدة  ✅ */
    const totalRevenue =
      (await InfluencerBooking.sum('proposedPrice', {
        where: { influencerId, status: { [Op.in]: ['paid', 'published'] } },
      })) || 0;

    /* أقرب حجز قادم */
    const nextBooking = await InfluencerBooking.findOne({
      where: {
        influencerId,
        scheduledDate: { [Op.gte]: new Date() },
        status: { [Op.in]: ['scheduled', 'paid'] },
      },
      order: [['scheduledDate', 'ASC']],
      attributes: ['id', 'campaignTitle', 'scheduledDate'],
      raw: true,
    });

    /* الحجوزات لكل شهر (آخر 6 أشهر) */
    const monthly = await InfluencerBooking.findAll({
      where: {
        influencerId,
        createdAt: { [Op.gte]: moment().subtract(6, 'month').toDate() },
      },
      attributes: [
        [fn('DATE_TRUNC', 'month', col('created_at')), 'month'],
        [fn('COUNT', col('id')), 'bookings'],
      ],
      group: ['month'],
      order: [['month', 'ASC']],
      raw: true,
    });

    res.json({ statusCounts, totalRevenue, nextBooking, monthly });
  } catch (err) {
    console.error('Overview error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};





// const { InfluencerBooking, InfluencerRegistration, User } = require('../models');
// const {literal } = require('sequelize');

// GET /api/influencers/top?limit=3
// exports.getTopInfluencers = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit, 10) || 3;

//     // نجمع الحجوزات على influencerId، نعدّها، نرتّب تنازليّاً، ونحدّد الثلاثة الأوائل
//     const top = await InfluencerBooking.findAll({
//       attributes: [
//         'influencerId',
//         [ fn('COUNT', col('InfluencerBooking.id')), 'bookingCount' ]
//       ],
//       group: ['influencerId'],
//       order: [[ literal('bookingCount'), 'DESC' ]],
//       limit,
//       include: [{
//         model: InfluencerRegistration,
//         attributes: ['id', 'userId'],
//         include: [{
//           model: User,              // بيانات المؤثر (User) المرتبط بالتسجيل
//           attributes: ['id', 'name', 'email', 'location']
//         }]
//       }],
//       raw: false
//     });

//     // نعيدّ الرد
//     return res.json(top);
//   } catch (err) {
//     console.error('getTopInfluencers error:', err);
//     return res.status(500).json({ message: 'خطأ في السيرفر' });
//   }
// };

exports.getTopInfluencers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 3;

    // 1) احسب عدد الحجوزات لكل influencerId
    const bookingCounts = await InfluencerBooking.findAll({
      attributes: [
        'influencerId',
        [ fn('COUNT', col('id')), 'bookingCount' ]
      ],
      group: ['influencerId'],
      order: [[ literal('"bookingCount"'), 'DESC' ]],
      limit,
      raw: true  // نُرجع مصفوفة مسطّحة: [{ influencerId, bookingCount }, …]
    });

    // 2) اجلب بيانات الـ InfluencerRegistration + الـ User لهؤلاء الـ IDs
    const influencerIds = bookingCounts.map(bc => bc.influencerId);
    const registrations = await InfluencerRegistration.findAll({
      where: { userId: influencerIds },
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'location']
      }],
      raw: true,
      nest: true
    });
    // registrations: [{ userId, bio, …, User: { id, name, … } }, …]

    // 3) دمج النتائج
    const top = bookingCounts.map(bc => {
      const reg = registrations.find(r => r.userId === bc.influencerId);
      return {
        influencerId: bc.influencerId,
        bookingCount: parseInt(bc.bookingCount, 10),
        user: reg ? reg.User : null
      };
    });

    return res.json(top);
  } catch (err) {
    console.error('getTopInfluencers error:', err);
    return res.status(500).json({ message: 'خطأ في السيرفر' });
  }
};



// GET /api/influencers/:id/booked-slots?start=2025-05-01&end=2025-05-31
exports.getBookedSlots = async (req, res) => {
  const influencerId = req.params.id;
  const { start, end } = req.query;

console.log(influencerId)
console.log(req.query)
  try {
    const where = {
      influencerId,
      // status: { [Op.in]: ACTIVE_STATUSES }
    };
    if (start && end) {
      where.requestedDate = { [Op.between]: [new Date(start), new Date(end)] };
    }

    const slots = await InfluencerBooking.findAll({
      where,
      attributes: ['requestedDate']   // نعيد فقط التاريخ/الوقت
    });
console.log("slots",slots)
    // نحولها لمصفوفة ISO strings أسهل على الفرونت
     const booked = slots.map((s) => {
      // إضافة ساعة قبل و ساعة بعد الحجز
      const startTime = new Date(s.requestedDate);
      const endTime = new Date(s.requestedDate);
      
      startTime.setHours(startTime.getHours() - 1);  // ساعة قبل الموعد
      endTime.setHours(endTime.getHours() + 1);  // ساعة بعد الموعد

      return { startTime, endTime };
    });
    return res.json(booked);
  } catch (err) {
    console.error('getBookedSlots error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





// POST /api/users/booking-preview
exports.previewBooking = async (req, res) => {
  const {
    userId,
    proposedPrice,
    requestedDate
  } = req.body;

  // 1) Validate inputs (similar to createAdRequest)
  const date = new Date(requestedDate);
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid requestedDate' });
  }

  // 2) Load user + plan
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const plan = user.subscriptionplan
    ? await UserSubscriptionPlan.findOne({ where: { title: user.subscriptionplan } })
    : null;

  const now = new Date();
  const isActive = plan
    && user.subscriptionexpiry
    && new Date(user.subscriptionexpiry) > now;

  // 3) Calculate discount exactly as in createAdRequest
  let discountApplied = false;
  let finalPrice = Number(proposedPrice);
  if (isActive && plan.discount_bookings_count > 0) {
    const periodStart = new Date(user.subscriptionexpiry);
    periodStart.setMonth(periodStart.getMonth() - plan.monthly_duration);

    const used = await InfluencerBooking.count({
      where: {
        userId,
        discount_applied: true,
        createdAt: { [Op.between]: [periodStart, user.subscriptionexpiry] }
      }
    });

    if (used < plan.discount_bookings_count) {
      discountApplied = true;
      finalPrice = +(proposedPrice * (100 - plan.discount_percentage) / 100).toFixed(2);
    }
  }

  // 4) Return the numbers
  res.json({
    originalPrice: Number(proposedPrice),
    finalPrice,
    discountApplied,
    savings: +(Number(proposedPrice) - finalPrice).toFixed(2)
  });
};
