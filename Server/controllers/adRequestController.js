const  Payment  = require('../models/payment');
const InfluencerAdRequest = require('../models/InfluencerAdRequest');
const { Op } = require('sequelize');
exports.createAdRequest = async (req, res) => {
  try {
    console.log('🧾 req.body:', req.body);
    console.log('🔐 req.user:', req.user);
    const { influencerId, adDetails, adTitle, adDuration, budget } = req.body;
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' });
    }
    // إنشاء الطلب
    const newRequest = await InfluencerAdRequest.create({
      userId,
      influencerId,
      adTitle,
      adDetails,
      adDuration,
      budget,
      status: 'pending',
    });

    const payment = await Payment.create({
      paymentMethod: 'credit card', // استخدم وسيلة الدفع المناسبة هنا
      paymentAmount: 100.00, // استخدم المبلغ المناسب هنا
      paymentDate: new Date(),
      referenceId: newRequest.id,
      referenceType: 'adRequest', // تحديد نوع العملية
      paymentStatus: 'pending',
    });

    res.status(201).json({ 
      message: 'Ad request sent and payment created successfully', 
      newRequest, 
      payment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send ad request' });
  }
};

exports.updateAdRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const adRequest = await InfluencerAdRequest.findByPk(requestId);
    if (!adRequest) {
      return res.status(404).json({ message: 'Ad request not found' });
    }

    adRequest.status = status;
    await adRequest.save();

    res.status(200).json(adRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update ad request status' });
  }
};


 
// const scheduleAd = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const { scheduledDate, scheduledTime } = req.body;
//     const influencerId = req.user.id;

//     // التحقق من وجود الطلب
//     const adRequest = await AdRequest.findByPk(requestId);
//     if (!adRequest) {
//       return res.status(404).json({ message: 'الطلب غير موجود' });
//     }

//     // التحقق من ملكية المؤثر للطلب
//     if (adRequest.influencerId !== influencerId) {
//       return res.status(403).json({ message: 'غير مصرح لك بجدولة هذا الطلب' });
//     }

//     // التحقق من أن الحالة "مقبول"
//     if (adRequest.status !== 'accepted') {
//       return res.status(400).json({ message: 'يمكن جدولة الطلبات المقبولة فقط' });
//     }

//     // التحقق من وجود التاريخ والوقت
//     if (!scheduledDate || !scheduledTime) {
//       return res.status(400).json({ message: 'يرجى تحديد التاريخ والوقت' });
//     }

//     // تحديث الجدولة
//     adRequest.scheduledDate = scheduledDate;
//     adRequest.scheduledTime = scheduledTime;
//     await adRequest.save();

//     res.status(200).json({ message: 'تمت جدولة الإعلان بنجاح', adRequest });
//   } catch (error) {
//     console.error('خطأ في جدولة الإعلان:', error);
//     res.status(500).json({ message: 'حدث خطأ أثناء الجدولة' });
//   }
// };

// module.exports = {
//   // الدوال الأخرى
//   scheduleAd,
// };
  

exports.scheduleAd = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { scheduledDate, scheduledTime } = req.body;

    // التأكد من وجود الطلب
    const request = await InfluencerAdRequest.findByPk(requestId);
    if (!request) return res.status(404).json({ message: 'الطلب غير موجود' });

    // تأكيد أن الحالة "مقبولة"
    if (request.status !== 'accepted') {
      return res.status(400).json({ message: 'يجب قبول الطلب قبل الجدولة' });
    }

    // التحقق من توفر الموعد
    const isTaken = await InfluencerAdRequest.findOne({
      where: {
        influencerId: request.influencerId,
        scheduledDate,
        scheduledTime,
        status: {
          [Op.in]: ['accepted', 'scheduled'],
        }
      }
    });

    if (isTaken) {
      return res.status(400).json({ message: 'هذا الموعد محجوز مسبقًا' });
    }

    // تحديث الجدولة
    request.scheduledDate = scheduledDate;
    request.scheduledTime = scheduledTime;
    request.status = 'scheduled';
    await request.save();

    // تحديث حالة الدفع إن وجدت
    const payment = await Payment.findOne({
      where: {
        referenceId: request.id,
        referenceType: 'adRequest',
        paymentStatus: 'pending',
      },
    });

    if (payment) {
      payment.paymentStatus = 'completed';
      await payment.save();
    }

    res.json({ message: 'تمت جدولة الإعلان بنجاح', request });

  } catch (error) {
    console.error('خطأ في جدولة الإعلان:', error);
    res.status(500).json({ message: 'فشل في جدولة الإعلان' });
  }
};



  // عرض جميع طلبات الإعلان
exports.getAllAdRequests = async (req, res) => {
  try {
    const adRequests = await InfluencerAdRequest.findAll();
    res.json(adRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve ad requests' });
  }
};

// عرض طلبات الإعلان لمؤثر معين
exports.getAdRequestsByInfluencer = async (req, res) => {
  try {
    const { influencerId } = req.params;
    console.log(influencerId); 

    const adRequests = await InfluencerAdRequest.findAll({
      where: {
        influencerId: influencerId
      }
    });

    if (!adRequests.length) {
      return res.status(404).json({ message: 'No ad requests found for this influencer' });
    }

    res.json(adRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve ad requests for this influencer' });
  }
};