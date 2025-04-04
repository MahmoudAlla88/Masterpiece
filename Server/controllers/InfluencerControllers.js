const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
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
await user.update({ role: 'influencer' });
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


// exports.getApprovedInfluencers = async (req, res) => {
//   try {
//     // أولاً، جلب المستخدمين الذين لديهم role كـ 'influencer' و تم الموافقة عليهم من الأدمن
//     const users = await User.findAll({
//       where: {
//         role: 'influencer',
//         adminApproved: 'approve' 
//       }
//     });

//     // ثم جلب بيانات InfluencerRegistration الخاصة بكل مستخدم باستخدام استعلام منفصل
//     const influencerDataPromises = users.map(async (user) => {
//       const influencerRegistration = await InfluencerRegistration.findOne({
//         where: {
//           userId: user.id
//         }
//       });
//       return {
//         user,
//         influencerRegistration
//       };
//     });

//     // الانتظار حتى يتم جلب كل البيانات
//     const influencerData = await Promise.all(influencerDataPromises);

//     // إرسال البيانات إلى العميل
//     res.status(200).json({ influencers: influencerData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching approved influencers' });
//   }
// };
// exports.getApprovedInfluencers = async (req, res) => {
//   try {
//     // جلب معايير البحث والفئة من الـ query parameters
//     const { search, categories } = req.query;
    
//     // تحويل الـ categories إلى مصفوفة
//     const categoryList = categories ? categories.split(',') : [];

//     // إعداد معايير البحث
//     const whereConditions = {
//       role: 'influencer',
//       adminApproved: 'approve',
//     };

//     // إذا كان هناك بحث، أضف شرط البحث على الاسم أو الاسم المستخدم
//     if (search) {
//       whereConditions[Sequelize.Op.or] = [
//         { name: { [Sequelize.Op.iLike]: `%${search}%` } },
//         { username: { [Sequelize.Op.iLike]: `%${search}%` } }
//       ];
//     }

//     // البحث عن المستخدمين الذين لديهم role كـ 'influencer' وتم الموافقة عليهم من الأدمن
//     const users = await User.findAll({
//       where: whereConditions,
//     });

//     // إذا كانت هناك فئات محددة، نقوم بتصفية المؤثرين بناءً على هذه الفئات
//     let influencerData = [];
//     if (categoryList.length > 0) {
//       // جلب بيانات تسجيل المؤثرين فقط إذا كانت الفئات تم تحديدها
//       influencerData = await Promise.all(users.map(async (user) => {
//         const influencerRegistration = await InfluencerRegistration.findOne({
//           where: {
//             userId: user.id,
//           },
//         });

//         // تحقق إذا كان المؤثر ينتمي إلى أي من الفئات المحددة
//         const matchesCategories = influencerRegistration.contentCategories.some(category =>
//           categoryList.includes(category)
//         );

//         // إذا كان ينتمي إلى فئة من الفئات المحددة، أضفه
//         if (matchesCategories) {
//           return {
//             user,
//             influencerRegistration,
//           };
//         }
//         return null; // إذا لم ينتمي إلى أي فئة، لا تضاف البيانات
//       }));

//       // إزالة العناصر التي تحتوي على قيمة null
//       influencerData = influencerData.filter((data) => data !== null);
//     } else {
//       // إذا لم يتم تحديد فئات، يتم جلب جميع المؤثرين الذين تم الموافقة عليهم
//       influencerData = await Promise.all(users.map(async (user) => {
//         const influencerRegistration = await InfluencerRegistration.findOne({
//           where: {
//             userId: user.id,
//           },
//         });
//         return {
//           user,
//           influencerRegistration,
//         };
//       }));
//     }

//     // إرسال البيانات إلى العميل
//     res.status(200).json({ influencers: influencerData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching approved influencers' });
//   }
// };
// exports.getApprovedInfluencers = async (req, res) => {
//   try {
//     const { search, categories } = req.query;
//     const categoryList = categories ? categories.split(',') : [];

//     const whereConditions = {
//       role: 'influencer',
//       adminApproved: 'approve',
//     };

//     if (search) {
//       whereConditions[Sequelize.Op.or] = [
//         { name: { [Sequelize.Op.iLike]: `%${search}%` } }
//       ];
//     }

//     const users = await User.findAll({
//       where: whereConditions,
//     });

//     let influencerData = [];
//     if (categoryList && categoryList.length > 0) {
//       influencerData = await Promise.all(users.map(async (user) => {
//         const influencerRegistration = await InfluencerRegistration.findOne({
//           where: { userId: user.id },
//         });

//         // تحقق من أن contentCategories موجودة قبل استخدام 'some'
//         const matchesCategories = influencerRegistration.targetContent && influencerRegistration.targetContent.length > 0
//           ? influencerRegistration.targetContent.some(category =>
//               categoryList.includes(category)
//             )
//           : false;

//         if (matchesCategories) {
//           return { user, influencerRegistration };
//         }
//         return null;
//       }));

//       influencerData = influencerData.filter((data) => data !== null);
//     } else {
//       influencerData = await Promise.all(users.map(async (user) => {
//         const influencerRegistration = await InfluencerRegistration.findOne({
//           where: { userId: user.id },
//         });
//         return { user, influencerRegistration };
//       }));
//     }

//     res.status(200).json({ influencers: influencerData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching approved influencers' });
//   }
// };
exports.getApprovedInfluencers = async (req, res) => {
  try {
    const { search, categories } = req.query;
    const categoryList = categories ? categories.split(',') : [];
console.log(categoryList);
    const whereConditions = {
      role: 'influencer',
      adminApproved: 'approve',
    };

    if (search) {
      whereConditions[Sequelize.Op.or] = [
        { name: { [Sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    const users = await User.findAll({
      where: whereConditions,
    });

    let influencerData = [];
    if (categoryList && categoryList.length > 0) {
      influencerData = await Promise.all(users.map(async (user) => {
        const influencerRegistration = await InfluencerRegistration.findOne({
          where: { userId: user.id },
        });
        console.log(influencerRegistration.targetContent);
    
        const targetContentArray = Array.isArray(influencerRegistration.targetContent) 
          ? influencerRegistration.targetContent
          : influencerRegistration.targetContent ? [influencerRegistration.targetContent] : [];  // تحويل إلى مصفوفة إذا لم يكن مصفوفة

          console.log(targetContentArray); 


        const matchesCategories = targetContentArray.length > 0
          ? targetContentArray.some(category =>
              categoryList.includes(category)
            )
          : false;

        if (matchesCategories) {
          return { user, influencerRegistration };
        }
        return null;
      }));

      influencerData = influencerData.filter((data) => data !== null);
    } else {
      influencerData = await Promise.all(users.map(async (user) => {
        const influencerRegistration = await InfluencerRegistration.findOne({
          where: { userId: user.id },
        });
        return { user, influencerRegistration };
      }));
    }

    res.status(200).json({ influencers: influencerData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching approved influencers' });
  }
};
