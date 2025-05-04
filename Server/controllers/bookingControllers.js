const { User, InfluencerBooking, InfluencerRegistration } = require('../models');
const { Op ,fn, col } = require('sequelize'); 
// طلب إعلان من مؤثّر
exports.createAdRequest = async (req, res) => {
  const {userId, influencerId, campaignTitle, brief, platform, contentType, proposedPrice, requestedDate } = req.body;
console.log("req=",req.body);
  try {
    // تأكد من أن المؤثّر موجود في قاعدة البيانات
    if (!userId || !influencerId) {
        return res.status(400).json({ message: 'userId أو influencerId يجب أن يكونوا موجودين' });
      }
    // أنشئ طلب الإعلان في جدول InfluencerBooking
    const adRequest = await InfluencerBooking.create({
        userId: userId,
      influencerId: influencerId,
      campaignTitle,
      brief,
      platform,
      contentType,
      proposedPrice:parseFloat(proposedPrice),
      requestedDate:new Date(requestedDate),
      expiresAt: new Date(new Date(requestedDate).setDate(new Date(requestedDate).getDate() + 1)),  // مدة 24 ساعة فقط
    });
    console.log('Ad request successfully created:',adRequest);
    return res.status(201).json({
      message: 'تم إرسال طلب الإعلان بنجاح',
      adRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'حدث خطأ أثناء إرسال الطلب' });
  }
};

exports.getAllAdRequests = async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  console.log('Fetching bookings for:', { status, page, limit });
  try {
    // إعدادات التصفية والصفحات
    const offset = (page - 1) * limit;
    
    const where = {};
    if (status && status !== 'all') {
      where.status = status;  // التصفية حسب الحالة
    }

const bookings = await InfluencerBooking.findAll({
  where,
  limit,
  offset,
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
  
      await adRequest.save();  // حفظ التحديثات في قاعدة البيانات
  
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
            model: User,  // جلب بيانات المستخدم الذي قام بالحجز
           // جلب اسم و إيميل المستخدم
          
            attributes: ['name', 'email'], 
          },
         ]
      }
      ]  // يمكن إضافة الـ User لتفاصيله
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



exports.getCalendarBookingsForInfluencer = async (req, res) => {
  const { influencerId } = req.params;
  const { start, end } = req.query;      // تواريخ ISO اختيارية

  try {
    // نحضّر فلترة التاريخ
    const dateFilter = {};
    if (start && end) {
      dateFilter[Op.or] = [
        {                           // حجوزات مـجدولة
          scheduledDate: { [Op.between]: [new Date(start), new Date(end)] }
        },
        {                           // حجوزات غير مـجدولة (نستخدم requestedDate)
          scheduledDate: null,
          requestedDate: { [Op.between]: [new Date(start), new Date(end)] }
        }
      ];
    }

    // جلب الحجوزات
    const bookings = await InfluencerBooking.findAll({
      where: {
        influencerId,
        status: { [Op.notIn]: ['cancelled', 'rejected'] }, // استبعد الملغاة والمرفوضة
        ...dateFilter
      },
      include: [
        {
          model: User,
          
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
console.log(bookings)
    // نهيّئ الشكل المناسب للـ Calendar
    const events = bookings.map(b => ({
      id: b.id,
      title: b.campaignTitle,
      start: b.scheduledDate ? b.scheduledDate : b.requestedDate,
      end:   b.scheduledDate ? b.scheduledDate : b.requestedDate,
      status: b.status,
      User: {
        id:   b.User.id,
        name: b.User.name
      }
    }));

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