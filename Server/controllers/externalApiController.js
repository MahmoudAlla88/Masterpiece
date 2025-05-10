// controllers/externalApiController.js
const axios = require('axios');
const Influencer = require('../models/InfluencerRegistration');
const User = require('../models/User');
const Brand = require('../models/Brand');


exports.sendInfluencersAndBrand = async (req, res) => {
  try {
    const { brandName, brandDescription, minAdPrice, maxAdPrice } = req.body;
    console.log(req.body);

  
    const brand = await Brand.create({
      brandName,
      brandDescription,
      minAdPrice,
      maxAdPrice,
    });

    console.log("brand==========", brand);

    // جلب كل المؤثرين
    const influencers = await Influencer.findAll({
      include: {
        model: User,
         where: {
      adminApproved: 'approved'
    },
     required: true, 
        attributes: ['id', 'name', 'email', 'location'],
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
  
    // بناء البيانات لإرسالها إلى الـ API
    const requestBody = {
      brand: {
        id: brand.id,
        name: brand.brandName,
        description: brand.brandDescription,
        minAdPrice: brand.minAdPrice,
        maxAdPrice: brand.maxAdPrice,
      },
      influencers: influencers.map((inf) => ({
        id: inf.id,
        user: {
          name: inf.User.name,
          email: inf.User.email,
          location: inf.User.location
        },
        bio: inf.bio,
        stats: inf.stats,
        socialLinks: inf.socialLinks,
        contentCategories: inf.contentCategories,
        audienceDemo: inf.audienceDemo,
        advertisingcost: inf.advertisingcost,
        profileImage:inf.profileImage
      }))
    };

    console.log("requestBody=", requestBody);

    // إرسال البيانات إلى الـ API الخارجية
    const response = await axios.post('http://136.243.72.107:8000/choose-influencer', requestBody);

    console.log("response.data=", response.data);

    const { top_influencers, rankings } = response.data;

   
    const selectedInfluencers = influencers.filter((inf) =>
      top_influencers.includes(Number(inf.id))
    );

    if (selectedInfluencers.length > 0) {
      return res.status(200).json({
        message: 'Top influencers selected successfully',
        influencers: selectedInfluencers.map((influencer, index) => ({
          id: influencer.id,
          name: influencer.User.name,
          email: influencer.User.email,
          bio: influencer.bio,
          stats: influencer.stats,
          socialLinks: influencer.socialLinks,
          contentCategories: influencer.contentCategories,
          audienceDemo: influencer.audienceDemo,
          advertisingcost: influencer.advertisingcost,
          rankingExplanation: rankings[String(index + 1)] || null, 
          profileImage:influencer.profileImage
        }))
      });
    } else {
      return res.status(404).json({
        message: 'No matching influencers found in top_influencers',
      });
    }

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};
