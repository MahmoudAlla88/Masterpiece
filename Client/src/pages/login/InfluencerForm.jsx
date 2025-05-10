
import React, { useState } from 'react';
import axios from 'axios';
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Camera,
  Instagram,
  Youtube
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function InfluencerRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // حالات لتخزين الملفات المختارة للملف الشخصي وصورة الغلاف
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);

  // البيانات الابتدائية للـ form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    password: "",
    bio: "",
    profileImage: "", // URL للمعاينة فقط
    coverImage: "",
    stats: {
      followers: "",
      engagementRate: "",
      totalPosts: "",
      avgLikes: ""
    },
    socialLinks: [
      { platform: "instagram", url: "", followers: "" },
      { platform: "tiktok", url: "", followers: "" },
      { platform: "youtube", url: "", followers: "" },
      { platform: "facebook", url: "", followers: "" },
      { platform: "twitter", url: "", followers: "" }
    ],
    contentCategories: [],
    audienceDemo: {
      gender: "",
      ageGroups: "",
      topLocations: ""
    },
    previousCampaigns: [
      { brand: "", description: "", date: "" }
    ],
    AdvertisingCost:"",
  });

  const availableCategories = [
    "Fashion", "Lifestyle", "Beauty", "Travel", "Food", "Fitness", 
    "Tech", "Gaming", "Parenting", "Business", "Education", "Entertainment"
  ];

  // تحديث الحقول النصية
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // تحديث بيانات الإحصائيات
  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      stats: { ...prev.stats, [name]: value }
    }));
  };

  // تحديث روابط السوشيال ميديا
  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  // تحديث بيانات الجمهور
  const handleDemoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      audienceDemo: { ...prev.audienceDemo, [field]: value }
    }));
  };

  // اختيار الفئات (بحد أقصى 4)
  const toggleCategory = (category) => {
    setFormData(prev => {
      const currentCategories = [...prev.contentCategories];
      if (currentCategories.includes(category)) {
        return { ...prev, contentCategories: currentCategories.filter(cat => cat !== category) };
      } else {
        if (currentCategories.length >= 4) {
          toast.error("You can select a maximum of 4 categories.");
          return prev;
        }
        return { ...prev, contentCategories: [...currentCategories, category] };
      }
    });
  };

  // تحديث بيانات الحملات السابقة
  const handleCampaignChange = (index, field, value) => {
    const updatedCampaigns = [...formData.previousCampaigns];
    updatedCampaigns[index] = { ...updatedCampaigns[index], [field]: value };
    setFormData(prev => ({ ...prev, previousCampaigns: updatedCampaigns }));
  };

  // إضافة حملة جديدة
  const addCampaignField = () => {
    setFormData(prev => ({
      ...prev,
      previousCampaigns: [...prev.previousCampaigns, { brand: "", description: "", date: "" }]
    }));
  };

  // إزالة حملة (إذا كان هناك أكثر من واحدة)
  const removeCampaignField = (index) => {
    if (formData.previousCampaigns.length > 1) {
      setFormData(prev => ({
        ...prev,
        previousCampaigns: prev.previousCampaigns.filter((_, i) => i !== index)
      }));
    }
  };

  // التعامل مع رفع صورة الملف الشخصي: تخزين الملف وعرض معاينة
  const handleProfileImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, profileImage: previewUrl }));
      setSelectedProfileFile(file);
    }
  };

  // التعامل مع رفع صورة الغلاف
  const handleCoverImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, coverImage: previewUrl }));
      setSelectedCoverFile(file);
    }
  };

  // التحقق من تعبئة الحقول المطلوبة لكل خطوة
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: {
        const { name, email, phone, location, password } = formData;
        if (!name || !email || !phone || !location || !password) {
          toast.error("Please fill in all basic account information.");
          return false;
        }
        return true;
      }
      case 2: {
        const { bio, profileImage } = formData;
        if (!bio || !profileImage) {
          toast.error("Please fill in both the bio and the profile image. If cover image is not provided, profile image will be used.");
          return false;
        }
        return true;
      }
      case 3: {
        const { stats, socialLinks,AdvertisingCost } = formData;
        const { followers, engagementRate, totalPosts, avgLikes } = stats;
        if (!followers || !engagementRate || !totalPosts || !avgLikes) {
          toast.error("Please fill in all account statistics fields.");
          return false;
        }
        const hasAtLeastOneSocial = socialLinks.some(link => link.url.trim() !== "");
        if (!hasAtLeastOneSocial) {
          toast.error("Please fill in the URL for at least one social media platform.");
          return false;
        }
        if (!AdvertisingCost) {
          toast.error("Please fill in the URL for at least one AdvertisingCost platform.");
          return false;
        }
        return true;
      }
      case 5: {
        const { audienceDemo } = formData;
        const { gender, ageGroups, topLocations } = audienceDemo;
        if (!gender || !ageGroups || !topLocations) {
          toast.error("Please fill in all audience demographic fields.");
          return false;
        }
        return true;
      }
      default:
        return true; // الخطوة 4 اختيارية
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // تحديد المنصة الرئيسية من socialLinks
  const determinePrimarySocialPlatform = () => {
    const primary = formData.socialLinks.find(link => link.url.trim() !== "");
    return primary ? primary.platform : null;
  };

  // دالة الإرسال باستخدام FormData
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    // إذا لم يُختَر ملف cover، نستخدم ملف profile
    const coverImageFile = selectedCoverFile || selectedProfileFile;
    
    const dataToSubmit = new FormData();
    dataToSubmit.append('name', formData.name);
    dataToSubmit.append('email', formData.email);
    dataToSubmit.append('phone', formData.phone);
    dataToSubmit.append('location', formData.location);
    dataToSubmit.append('password', formData.password);
    dataToSubmit.append('bio', formData.bio);
    dataToSubmit.append('AdvertisingCost', formData.AdvertisingCost);
    if (selectedProfileFile) {
      dataToSubmit.append('profileImage', selectedProfileFile);
    } else {
      toast.error("Profile image is required.");
      return;
    }
    
    if (coverImageFile) {
      dataToSubmit.append('coverImage', coverImageFile);
    }
    
    dataToSubmit.append('stats', JSON.stringify(formData.stats));
    dataToSubmit.append('socialLinks', JSON.stringify(formData.socialLinks));
    dataToSubmit.append('contentCategories', JSON.stringify(formData.contentCategories));
    dataToSubmit.append('audienceDemo', JSON.stringify(formData.audienceDemo));
    dataToSubmit.append('previousCampaigns', JSON.stringify(formData.previousCampaigns));
    
    const primarySocial = determinePrimarySocialPlatform();
    dataToSubmit.append('primarySocialMedia', primarySocial);
    
    setIsSubmitting(true);
    setSubmitError(null);
    const formDataObj = Object.fromEntries(dataToSubmit.entries());
    console.log(formDataObj);
    
    
    try {
      const response = await axios.post(
        'http://localhost:4000/api/influencer/register',
        dataToSubmit,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setSubmitSuccess(true);
      console.log('Registration successful:', response.data);
    } catch (error) {
      setSubmitError('Registration failed. Please try again later.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // دوال عرض خطوات النموذج ومؤشرات التنقل
  const renderStepIndicators = () => {
    const steps = [
      { number: 1, label: "Account" },
      { number: 2, label: "Profile" },
      { number: 3, label: "Stats" },
      { number: 4, label: "Content" },
      { number: 5, label: "Audience" }
    ];
    return (
      <div className="flex justify-between items-center mb-8 px-4">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full 
              ${currentStep === step.number 
                ? 'bg-purple-600 text-white' 
                : currentStep > step.number 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500'} transition-colors duration-300`}>
              {currentStep > step.number ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <span className={`text-xs mt-1 ${currentStep === step.number ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="+1 (123) 456-7890"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="City, Country"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Create a strong password"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Tell brands about yourself and your content focus"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <label htmlFor="profileImage" className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center
                ${formData.profileImage ? 'border-purple-300 bg-purple-50' : 'border-gray-300 hover:border-purple-300'} 
                transition-colors cursor-pointer h-40`}>
              {formData.profileImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={formData.profileImage} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <p className="text-white text-sm">Change Image</p>
                  </div>
                </div>
              ) : (
                <>
                  <Camera className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Upload profile image</p>
                </>
              )}
            </label>
            <input 
              type="file" 
              id="profileImage"
              accept="image/*" 
              className="hidden" 
              onChange={handleProfileImageSelect}
            />
          </div>
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">Cover Image (Optional)</label>
            <label htmlFor="coverImage" className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center
                ${formData.coverImage ? 'border-purple-300 bg-purple-50' : 'border-gray-300 hover:border-purple-300'} 
                transition-colors cursor-pointer h-40`}>
              {formData.coverImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={formData.coverImage} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <p className="text-white text-sm">Change Image</p>
                  </div>
                </div>
              ) : (
                <>
                  <Camera className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Upload cover image (Optional)</p>
                </>
              )}
            </label>
            <input 
              type="file" 
              id="coverImage"
              accept="image/*" 
              className="hidden" 
              onChange={handleCoverImageSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Stats & Social Links</h2>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Account Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="followers" className="block text-sm font-medium text-gray-700 mb-1">Total Followers</label>
            <input
              type="text"
              id="followers"
              name="followers"
              value={formData.stats.followers}
              onChange={handleStatsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. 245K"
              required
            />
          </div>
          <div>
            <label htmlFor="engagementRate" className="block text-sm font-medium text-gray-700 mb-1">Engagement Rate</label>
            <input
              type="text"
              id="engagementRate"
              name="engagementRate"
              value={formData.stats.engagementRate}
              onChange={handleStatsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. 3.8%"
              required
            />
          </div>
          <div>
            <label htmlFor="totalPosts" className="block text-sm font-medium text-gray-700 mb-1">Total Posts</label>
            <input
              type="text"
              id="totalPosts"
              name="totalPosts"
              value={formData.stats.totalPosts}
              onChange={handleStatsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. 862"
              required
            />
          </div>
          <div>
            <label htmlFor="avgLikes" className="block text-sm font-medium text-gray-700 mb-1">Average Likes</label>
            <input
              type="text"
              id="avgLikes"
              name="avgLikes"
              value={formData.stats.avgLikes}
              onChange={handleStatsChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. 8.7K"
              required
            />
          </div>
          <div>
            <label htmlFor="AdvertisingCost" className="block text-sm font-medium text-gray-700 mb-1">AdvertisingCost</label>
            <input
              type="number"
              id="AdvertisingCost"
              name="AdvertisingCost"
              value={formData.AdvertisingCost }
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="300 JD"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Social Media Platforms</h3>
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="mb-5 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center mb-3">
              {link.platform === "instagram" && <Instagram className="text-purple-600 mr-2" />}
              {link.platform === "tiktok" && <span className="mr-2 text-xl">📱</span>}
              {link.platform === "youtube" && <Youtube className="text-red-600 mr-2" />}
              {link.platform === "facebook" && <span className="mr-2 text-blue-600">📘</span>}
              {link.platform === "twitter" && <span className="mr-2 text-blue-400">🐦</span>}
              <h4 className="text-md font-medium capitalize">{link.platform}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile URL</label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={`Your ${link.platform} URL`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
                <input
                  type="text"
                  value={link.followers}
                  onChange={(e) => handleSocialLinkChange(index, 'followers', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g. 120K"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Content & Experience</h2>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Content Categories (Max 4)</h3>
        <p className="text-sm text-gray-500 mb-4">Select all categories that apply to your content.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors
                ${formData.contentCategories.includes(category)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-700">Previous Campaigns (Optional)</h3>
          <button
            type="button"
            onClick={addCampaignField}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            + Add Campaign
          </button>
        </div>
        {formData.previousCampaigns.map((campaign, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input
                  type="text"
                  value={campaign.brand}
                  onChange={(e) => handleCampaignChange(index, 'brand', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Brand name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={campaign.description}
                  onChange={(e) => handleCampaignChange(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Campaign description"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={campaign.date}
                  onChange={(e) => handleCampaignChange(index, 'date', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Month Year"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeCampaignField(index)}
                    className="absolute right-2 top-9 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Audience Demographics</h2>
      <div className="space-y-5">
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender Distribution</label>
          <input
            type="text"
            id="gender"
            value={formData.audienceDemo.gender}
            onChange={(e) => handleDemoChange('gender', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g. 75% Female, 25% Male"
          />
        </div>
        <div>
          <label htmlFor="ageGroups" className="block text-sm font-medium text-gray-700 mb-1">Age Groups</label>
          <input
            type="text"
            id="ageGroups"
            value={formData.audienceDemo.ageGroups}
            onChange={(e) => handleDemoChange('ageGroups', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g. 18-24 (45%), 25-34 (38%), 35+ (17%)"
          />
        </div>
        <div>
          <label htmlFor="topLocations" className="block text-sm font-medium text-gray-700 mb-1">Top Locations</label>
          <input
            type="text"
            id="topLocations"
            value={formData.audienceDemo.topLocations}
            onChange={(e) => handleDemoChange('topLocations', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g. UAE, Saudi Arabia, Kuwait, Qatar"
          />
        </div>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="text-center py-8">
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
      {/* <p className="text-gray-600 mb-6">Your influencer profile has been submitted successfully.</p> */}
      <p className="text-gray-600 mb-6">
        Your influencer profile has been received and is <strong>pending admin approval</strong>. 
        You’ll gain access to the dashboard as soon as it’s approved.
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          onClick={() => window.location.href = '/Pricing'}
        >
          Go to Pricing
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (submitSuccess) {
      return renderSuccessMessage();
    }
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return null;
    }
  };

  const renderNavButtons = () => {
    if (submitSuccess) return null;
    
    return (
      <div className="flex justify-between mt-10">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center px-5 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        )}
        {currentStep < 5 ? (
          <button
            type="button"
            onClick={nextStep}
            className="ml-auto flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Next Step
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="ml-auto flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            {!isSubmitting && <CheckCircle className="w-5 h-5 ml-1" />}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Influencer Registration</h1>
          <p className="mt-3 text-lg text-gray-600">Join our platform and connect with brands</p>
        </div>
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gray-50 py-4 border-b border-gray-200">
            {renderStepIndicators()}
          </div>
          <div className="p-6 md:p-8">
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p>{submitError}</p>
              </div>
            )}
            <form onSubmit={(e) => e.preventDefault()}>
              {renderStepContent()}
              {renderNavButtons()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
