// const bcrypt = require('bcrypt');
// const { Sequelize } = require('sequelize');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const InfluencerRegistration = require('../models/InfluencerRegistration');
// const upload = require('../utils/multer');
// exports.registerInfluencer = async (req, res) => {
 
//   try {
//     upload.single('profileImage')(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err.message });
//       }
//     const {
//       name,
//       email,
//       phone,
//       location,
//       password,
//       isInfluencer,
//       hasDonePreviousAds,
//       previousProduct,
//       joinReason,
//       otherReason,
//       profileImage,
//       socialLinks,
//       targetContent,
//       audienceGender,
//     } = req.body;

//     // تحقق من تطابق كلمة المرور وتأكيد كلمة المرور
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // تحقق إذا كان المستخدم موجودًا في جدول User
//     let user = await User.findOne({ where: { email } }); // نبحث عن المستخدم باستخدام البريد الإلكتروني

//     if (!user) {
//       // إذا كان المستخدم غير موجود، قم بإنشائه في جدول User
//       // تشفير كلمة المرور باستخدام bcrypt
//       const hashedPassword = await bcrypt.hash(password, 10);

//       user = await User.create({
//         name,
//         email,
//         phone,
//         location,
//         password: hashedPassword, // تخزين كلمة المرور المشفرة

//       });
//     }

  


//     // الآن قم بتخزين البيانات في جدول InfluencerRegistration مع ربطها بـ userId
//     const newInfluencer = await InfluencerRegistration.create({
//       userId: user.id,  // ربط البيانات بـ User
//       isInfluencer,
//       hasDonePreviousAds,
//       previousProduct,
//       joinReason,
//       otherReason,
//       profileImage: req.file ? req.file.path : null,
//       socialLinks,
//       targetContent,
//       audienceGender,
//     });

//     // إنشاء توكن JWT للمستخدم
//     const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
// await user.update({ role: 'influencer' });
//     res.status(201).json({
//       message: 'Influencer profile created successfully',
//       influencer: newInfluencer,
//       token, // إرسال التوكن مع الاستجابة
//     });
//   });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error occurred while creating influencer profile' });
//   }
// };

// exports.registerInfluencer = async (req, res) => {
//   try {
//     // استخدام multer للتعامل مع الحقلين: profileImage و coverImage.
//     upload.fields([
//       { name: 'profileImage', maxCount: 1 },
//       { name: 'coverImage', maxCount: 1 }
//     ])(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err.message });
//       }
      
//       // استخراج الحقول الأساسية من body
//       const {
//         name,
//         email,
//         phone,
//         location,
//         password,
//         bio,
//         stats,
//         socialLinks,
//         contentCategories,
//         audienceDemo,
//         previousCampaigns
//       } = req.body;
      
    
//       // محاولة تحويل الحقول المركبة (إن كانت مرسلة كـ string)
//       let parsedStats = stats;
//       try {
//         if (typeof stats === 'string') {
//           parsedStats = JSON.parse(stats);
//         }
//       } catch (e) {
//         return res.status(400).json({ message: 'Invalid stats format' });
//       }
      
//       let parsedSocialLinks = socialLinks;
//       try {
//         if (typeof socialLinks === 'string') {
//           parsedSocialLinks = JSON.parse(socialLinks);
//         }
//       } catch (e) {
//         return res.status(400).json({ message: 'Invalid socialLinks format' });
//       }
      
//       let parsedContentCategories = contentCategories;
//       try {
//         if (typeof contentCategories === 'string') {
//           parsedContentCategories = JSON.parse(contentCategories);
//         }
//       } catch (e) {
//         parsedContentCategories = [];
//       }
      
//       let parsedAudienceDemo = audienceDemo;
//       try {
//         if (typeof audienceDemo === 'string') {
//           parsedAudienceDemo = JSON.parse(audienceDemo);
//         }
//       } catch (e) {
//         return res.status(400).json({ message: 'Invalid audienceDemo format' });
//       }
      
//       let parsedPreviousCampaigns = previousCampaigns;
//       try {
//         if (typeof previousCampaigns === 'string') {
//           parsedPreviousCampaigns = JSON.parse(previousCampaigns);
//         }
//       } catch (e) {
//         parsedPreviousCampaigns = [];
//       }
      
//       // البحث عن المستخدم باستخدام البريد الإلكتروني.
//       let user = await User.findOne({ where: { email } });
//       if (!user) {
//         // تشفير كلمة المرور وإنشاء المستخدم إذا لم يكن موجودًا.
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user = await User.create({
//           name,
//           email,
//           phone,
//           location,
//           password: hashedPassword,
//         });
//       }
      
//       // الحصول على مسارات الصور المرفوعة.
//       const profileImgPath = (req.files && req.files.profileImage && req.files.profileImage.length > 0)
//     ? req.files.profileImage[0].path
//     : null;
//     const coverImgPath = (req.files && req.files.coverImage && req.files.coverImage.length > 0)
//     ? req.files.coverImage[0].path
//     : null;// إذا لم يتم رفع coverImage، استخدم profileImage.
//     if (!profileImgPath) {
//       return res.status(400).json({ message: "Profile image is required." });
//     }
//       // إنشاء سجل التسجيل للإنفلونسر وربطه بمعرّف المستخدم.
//       const newInfluencer = await InfluencerRegistration.create({
//         userId: user.id,
//         bio,
//         profileImage: profileImgPath,
//         coverImage: coverImgPath,
//         stats: parsedStats,
//         socialLinks: parsedSocialLinks,
//         contentCategories: parsedContentCategories, // تأكد من دعم هذا الحقل في نموذج InfluencerRegistration.
//         audienceDemo: parsedAudienceDemo,
//         previousCampaigns: parsedPreviousCampaigns
//       });
      
//       // تحديث دور المستخدم إلى "influencer".
//       await user.update({ role: 'influencer' });
      
//       // إنشاء توكن JWT.
//       const token = jwt.sign(
//         { userId: user.id, email: user.email },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
      
//       res.status(201).json({
//         message: 'Influencer profile created successfully',
//         influencer: newInfluencer,
//         token,
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error occurred while creating influencer profile' });
//   }
// };
// controllers/InfluencerControllers.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const InfluencerRegistration = require('../models/InfluencerRegistration');
const { User, InfluencerRegistration }=require("../models")
const upload = require('../utils/multer'); // تأكد من إعداد multer في هذا الملف
const { Op } = require('sequelize');
exports.registerInfluencer = async (req, res) => {
  try {
    // استخدام multer للتعامل مع رفع الصور: profileImage و coverImage
    upload.fields([
      { name: 'profileImage', maxCount: 1 },
      { name: 'coverImage', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      // استخراج الحقول من req.body
      const {
        name,
        email,
        phone,
        location,
        password,
        bio,
        stats,
        socialLinks,
        contentCategories,
        audienceDemo,
        previousCampaigns ,
        primarySocialMedia,
        advertisingcost
      } = req.body;
    
      console.log(req.body);
      // تحويل الحقول المركبة (إذا كانت مرسلة كسلسلة نصية)
      let parsedStats, parsedSocialLinks, parsedContentCategories, parsedAudienceDemo, parsedPreviousCampaigns;
      try {
        parsedStats = typeof stats === 'string' ? JSON.parse(stats) : stats;
      } catch (e) {
        return res.status(400).json({ message: 'Invalid stats format' });
      }
      try {
        parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
      } catch (e) {
        return res.status(400).json({ message: 'Invalid socialLinks format' });
      }
      try {
        parsedContentCategories = typeof contentCategories === 'string' ? JSON.parse(contentCategories) : contentCategories;
      } catch (e) {
        parsedContentCategories = [];
      }
      try {
        parsedAudienceDemo = typeof audienceDemo === 'string' ? JSON.parse(audienceDemo) : audienceDemo;
      } catch (e) {
        return res.status(400).json({ message: 'Invalid audienceDemo format' });
      }
      try {
        parsedPreviousCampaigns = typeof previousCampaigns === 'string' ? JSON.parse(previousCampaigns) : previousCampaigns;
      } catch (e) {
        parsedPreviousCampaigns = [];
      }
      const profileImgPath =
        req.files &&
        req.files.profileImage &&
        req.files.profileImage.length > 0
          ? req.files.profileImage[0].path
          : null;
      const coverImgPath =
        req.files &&
        req.files.coverImage &&
        req.files.coverImage.length > 0
          ? req.files.coverImage[0].path
          : null;
      
      if (!profileImgPath) {
        return res.status(400).json({ message: "Profile image is required." });
      }
      // البحث عن المستخدم بواسطة البريد الإلكتروني
      let user = await User.findOne({ where: { email } });
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
          name,
          email,
          phone,
          location,
          password: hashedPassword
        });
      }
      
      // إنشاء سجل تسجيل الإنفلونسر وربطه بمعرّف المستخدم
      const newInfluencer = await InfluencerRegistration.create({
        userId: user.id,
        bio,
        profileImage: profileImgPath,
        coverImage: coverImgPath, // قد يكون null إذا لم يتم رفع صورة غلاف
        stats: parsedStats,
        socialLinks: parsedSocialLinks,
        contentCategories: parsedContentCategories,
        audienceDemo: parsedAudienceDemo,
        previousCampaigns: parsedPreviousCampaigns,
        primarySocialMedia, // قد يُرسل من العميل أو يمكنك حسابه
        advertisingcost
      });
      
      // تحديث دور المستخدم إلى "influencer"
      await user.update({ role: 'influencer' });
      
      // إنشاء توكن JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1h' }
      );
      
      return res.status(201).json({
        message: 'Influencer profile created successfully',
        influencer: newInfluencer,
        token
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error occurred while creating influencer profile' });
  }
};


exports.getApprovedInfluencers = async (req, res) => {
  try {

    
    const approvedInfluencers = await User.findAll({
      where: {
        role: 'influencer',
        adminApproved: 'approved'
      },
      include: [{
        model: InfluencerRegistration,
        as: 'InfluencerRegistration', 
      }],
      attributes: { exclude: ['password'] }, 
      order: [['createdAt', 'DESC']]
    });
console.log(approvedInfluencers.dataValues);
    res.status(200).json({ influencers: approvedInfluencers });
  } catch (error) {
    console.error('Error fetching approved influencers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
//   try {
//     const { search, categories } = req.query;
//     const categoryList = categories ? categories.split(',').map(category => category.trim()) : [];
// console.log(categoryList);
//     const whereConditions = {
//       role: 'influencer',
//       adminApproved: 'approved',
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
//         console.log(influencerRegistration.targetContent);
    
//         const targetContentArray = Array.isArray(influencerRegistration.targetContent) 
//           ? influencerRegistration.targetContent
//           : influencerRegistration.targetContent ? [influencerRegistration.targetContent] : [];  // تحويل إلى مصفوفة إذا لم يكن مصفوفة

//           console.log(targetContentArray); 


//           // const matchesCategories = targetContentArray.length > 0
//           // ? targetContentArray.some(category =>
//           //   categoryList.includes(category)
//           //   )
//           // : false;
//           const matchesCategories = targetContentArray.length > 0
//           ? categoryList.some(category =>
//               targetContentArray.includes(category)  // تحقق إذا كانت كل فئة موجودة في targetContentArray
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
// try {
//   const { search, categories } = req.query;
  
//   let where = {};
//   let categoryWhere = {};
  
//   if (search) {
//     where[Op.or] = [
//       { name: { [Op.iLike]: `%${search}%` } },
//       { location: { [Op.iLike]: `%${search}%` } }
//     ];
//   }
  
//   if (categories) {
//     const categoryList = categories.split(',');
//     categoryWhere = { category: { [Op.in]: categoryList } };
//   }
  
//   const influencers = await InfluencerRegistration.findAll({
//     where,
//     // إذا كنت تستخدم JSON لتخزين روابط السوشيال ميديا والفئات
//     attributes: ['id', 'bio', 'profileImage', 'coverImage', 'stats', 'socialLinks', 'contentCategories'], // تحديد الحقول المطلوبة
//     order: [['createdAt', 'DESC']] // ترتيب حسب تاريخ الإنشاء
//   });
//   const formattedInfluencers = influencers.map(influencer => ({
//     ...influencer.get({ plain: true }),
//     contentCategories: influencer.categories.map(cat => cat.category),
//     stats: {
//       followers: influencer.followers,
//       engagementRate: influencer.engagementRate
//     },
//     socialLinks: influencer.socialLinks.map(link => ({
//       platform: link.platform,
//       url: link.url
//     }))
//   }));
//   res.json(formattedInfluencers);
// } catch (error) {
//   console.error('Error fetching influencers:', error);
//   res.status(500).json({ error: 'Internal server error' });
// }
// };

// Controller function to approve or reject influencers




// exports.getInfluencerById = async (req, res) => {
//   const  {id}  = req.params;
// console.log(id);
//   try {
//     const influencer = await InfluencerRegistration.findOne({
//       where: { id },
//       include: [
//         {
//           model: User,
//           attributes: ['name', 'email', 'location', 'phone'],
//         }
//       ]
//     });

//     if (!influencer) {
//       return res.status(404).json({ message: 'Influencer not found' });
//     }

//     // جمع البيانات بطريقة مناسبة للفرونت
//     const responseData = {
//       name: influencer.User.name,
//       email: influencer.User.email,
//       phone: influencer.User.phone,
//       location: influencer.User.location,
//       bio: influencer.bio,
//       profileImage: influencer.profileImage,
//       coverImage: influencer.coverImage,
//       stats: influencer.stats,
//       socialLinks: influencer.socialLinks,
//       contentCategories: influencer.contentCategories,
//       audienceDemo: influencer.audienceDemo,
//       previousCampaigns: influencer.previousCampaigns,
//       primarySocialMedia: influencer.primarySocialMedia
//     };

//     return res.status(200).json(responseData);
//   } catch (err) {
//     console.error('Error fetching influencer:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

exports.getInfluencerById = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id); // Debug log

  try {
      const influencer = await InfluencerRegistration.findOne({
          where: { id },
          include: [
              {
                  model: User,
                  attributes: ['name', 'email', 'location', 'phone'] // Fixed semicolon to comma
              }
          ]
      }); // Added missing parentheses and semicolon
console.log(influencer)
      if (!influencer) {
          return res.status(404).json({ message: "Influencer not found" });
      }

      res.json(influencer);
  } catch (error) {
      console.error("Error fetching influencer:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};





exports.updateInfluencerStatus = async (req, res) => {
  try {
    const { influencerId } = req.params;
    const { status } = req.body; // status could be 'approved' or 'rejected'
console.log(status);
console.log(influencerId);
    // تحقق من أن الحالة إما 'approved' أو 'rejected'
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // العثور على المؤثر في قاعدة البيانات
    const influencer = await InfluencerRegistration.findOne({
      where: { id: influencerId },
      include: [{ model: User }] // مهم: لازم تكون العلاقة معرفة
    });

    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }

    influencer.User.adminApproved = status;
    await influencer.User.save();

    // إرسال رد
    res.status(200).json({
      message: `Influencer ${status} successfully`,
      influencer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating influencer status' });
  }
};


// في الـ influencerController.js
exports.getAllInfluencers = async (req, res) => {
  try {
    const { search, categories } = req.query;
    const categoryList = categories ? categories.split(',') : [];
console.log(categoryList);
    const whereConditions = {
      role: 'influencer',
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
