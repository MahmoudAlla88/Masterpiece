const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const InfluencerRegistration = require('../models/InfluencerRegistration');
const upload = require('../utils/multer');
exports.registerInfluencer = async (req, res) => {
 
  try {
    upload.single('profileImage')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
    const {
      name,
      email,
      phone,
      location,
      password,
      confirmPassword,
      isInfluencer,
      hasDonePreviousAds,
      previousProduct,
      joinReason,
      otherReason,
      profileImage,
      socialLinks,
      targetContent,
      audienceGender,
    } = req.body;

    // تحقق من تطابق كلمة المرور وتأكيد كلمة المرور
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // تحقق إذا كان المستخدم موجودًا في جدول User
    let user = await User.findOne({ where: { email } }); // نبحث عن المستخدم باستخدام البريد الإلكتروني

    if (!user) {
      // إذا كان المستخدم غير موجود، قم بإنشائه في جدول User
      // تشفير كلمة المرور باستخدام bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        phone,
        location,
        password: hashedPassword, // تخزين كلمة المرور المشفرة
      });
    }

  


    // الآن قم بتخزين البيانات في جدول InfluencerRegistration مع ربطها بـ userId
    const newInfluencer = await InfluencerRegistration.create({
      userId: user.id,  // ربط البيانات بـ User
      isInfluencer,
      hasDonePreviousAds,
      previousProduct,
      joinReason,
      otherReason,
      profileImage: req.file ? req.file.path : null,
      socialLinks,
      targetContent,
      audienceGender,
    });

    // إنشاء توكن JWT للمستخدم
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    res.status(201).json({
      message: 'Influencer profile created successfully',
      influencer: newInfluencer,
      token, // إرسال التوكن مع الاستجابة
    });
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while creating influencer profile' });
  }
};
