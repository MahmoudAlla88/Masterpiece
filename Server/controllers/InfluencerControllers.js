
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


exports.getInfluencerById = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id); 

  try {
      const influencer = await InfluencerRegistration.findOne({
          where: { id },
          include: [
              {
                  model: User,
                  attributes: ['name', 'email', 'location', 'phone']
              }
          ]
      }); n
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
    const { status } = req.body; 
console.log("vv",status);
console.log(influencerId);
   
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Invalid status' });
    }

   
    const influencer = await InfluencerRegistration.findOne({
      where: { id: influencerId },
      include: [{ model: User }] 
    });
console.log(influencer)
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }

    influencer.User.adminApproved = status;
    await influencer.User.save();

   
    res.status(200).json({
      message: `Influencer ${status} successfully`,
      influencer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating influencer status' });
  }
};



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
          : influencerRegistration.targetContent ? [influencerRegistration.targetContent] : [];  

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

exports.featuresInfluencers = async (req, res) => {
  try {

    
    const featuresInfluencers = await User.findAll({
      where: {
        role: 'influencer',
        adminApproved: 'approved',
         subscriptionexpiry:{ [Op.gt]: new Date() },
      },
      include: [{
        model: InfluencerRegistration,
        as: 'InfluencerRegistration', 
      }],
      attributes: { exclude: ['password'] }, 
      order: [['createdAt', 'DESC']]
    });
console.log(featuresInfluencers.dataValues);
    res.status(200).json({ influencers: featuresInfluencers });
  } catch (error) {
    console.error('Error fetching approved influencers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.updateInfluencer = async (req, res) => {
  try {
    upload.fields([
      { name: 'profileImage', maxCount: 1 },
      { name: 'coverImage', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });

      const influencerId = req.params.id;
      const {
        bio,
        stats,
        socialLinks,
        contentCategories,
        audienceDemo,
        previousCampaigns,
        primarySocialMedia,
        advertisingcost,
        
      } = req.body;

      // تحويل الحقول المركبة (JSON.parse) كما في create
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
        req.files?.profileImage?.[0]?.path || null;
      const coverImgPath =
        req.files?.coverImage?.[0]?.path || null;

      const influencer = await InfluencerRegistration.findByPk(influencerId);
      if (!influencer) return res.status(404).json({ message: 'Influencer not found' });

      // تحديث الحقول
      await influencer.update({
        bio,
        profileImage: profileImgPath || influencer.profileImage,
        coverImage: coverImgPath || influencer.coverImage,
        stats: parsedStats,
        socialLinks: parsedSocialLinks,
        contentCategories: parsedContentCategories,
        audienceDemo: parsedAudienceDemo,
        previousCampaigns: parsedPreviousCampaigns,
        primarySocialMedia,
        advertisingcost
      });
const user = await User.findByPk(influencer.userId);
if (user) {
  await user.update({ adminApproved: 'pending' });
}
      return res.status(200).json({ message: 'Profile updated successfully', influencer });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error occurred while updating profile' });
  }
};


exports.getInfluencerByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
     console.log("hh",userId);
    const influencer = await InfluencerRegistration.findOne({ where: { userId } });
    if (!influencer) return res.status(404).json({ message: 'Influencer not found' });
    res.json(influencer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
