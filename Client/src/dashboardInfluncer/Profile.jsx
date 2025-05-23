
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { X, PlusCircle, Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

const InfluencerProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
const [influencerId, setInfluencerId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  
  const [form, setForm] = useState({
    bio: '',
    stats: {
     avgLikes: '',
    followers: '', 
     engagementRate: '',
      totalPosts:'',
    },
   socialLinks: {
    instagram: { url: '', followers: '' },
    facebook:  { url: '', followers: '' },
    twitter:   { url: '', followers: '' },
    youtube:   { url: '', followers: '' },
    tiktok:    { url: '', followers: '' },
   
  },
    contentCategories: [],
    audienceDemo: {
   gender: '',
  ageGroups: '',
  topLocations: ''
    },
    previousCampaigns: [],
   
    advertisingcost: ''
  });

  const [newCategory, setNewCategory] = useState('');
  const [newCampaign, setNewCampaign] = useState({ name: '', brand: '', date: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
const prepareSocialLinksArray = (socialLinks) =>
  Object.entries(socialLinks).map(([platform, { url, followers }]) => ({
    platform,
    url,
    followers
  }));
  // تحميل البيانات
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/influencer/user/${id}`);
        setData(res.data);
        console.log(res.data);
          const defaultSocial = {
        instagram: { url: '', followers: '' },
        facebook:  { url: '', followers: '' },
        twitter:   { url: '', followers: '' },
        youtube:   { url: '', followers: '' },
        tiktok:    { url: '', followers: '' },
        linkedin:  { url: '', followers: '' }
      };
 const raw = res.data.socialLinks;
      let incoming = [];
      if (typeof raw === 'string') {
       try { incoming = JSON.parse(raw); } catch { incoming = []; }
     } else if (Array.isArray(raw)) {
        incoming = raw;
      } else if (typeof raw === 'object' && raw !== null) {
        incoming = prepareSocialLinksArray(raw);
      }
      const social = { ...defaultSocial };
      incoming.forEach(({ platform, url, followers }) => {
        if (social[platform]) {
          social[platform] = { url: url || '', followers: followers || '' };
        }
      });
      // 2. ادمج الـ defaults مع البيانات
      // const social = { ...defaultSocial };
      // res.data.socialLinks.forEach(({ platform, url, followers }) => {
      //   if (social[platform]) {
      //     social[platform] = {
      //       url: url || '',
      //       followers: followers || ''
      //     };
      //   }
      // });
  setInfluencerId(res.data.id); 
        setForm({
          bio: res.data.bio || '',
          stats: {
            followers: res.data.stats?.followers || '',
            engagementRate: res.data.stats?.engagementRate || '',
           avgLikes: res.data.stats?.avgLikes || '',
           totalPosts:res.data.stats?.totalPosts || ''
          },
         socialLinks: social,
          contentCategories: res.data.contentCategories || [],
          audienceDemo: {
           gender: res.data.audienceDemo?.gender || '',
           ageGroups: res.data.audienceDemo?.ageGroups || '',
            topLocations: res.data.audienceDemo?.topLocations || '',     
          },
          previousCampaigns: res.data.previousCampaigns || [],
          
          advertisingcost: res.data.advertisingcost || ''
        });
      } catch (err) {
        setError('Failed to load influencer data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // تحديث الحقول المتداخلة (stats, socialLinks, audienceDemo)
  const handleNestedChange = (parentField, childField, value) => {
    setForm(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  // إدارة الفئات
  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !form.contentCategories.includes(trimmed)) {
      setForm(prev => ({
        ...prev,
        contentCategories: [...prev.contentCategories, trimmed]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (index) => {
    setForm(prev => ({
      ...prev,
      contentCategories: prev.contentCategories.filter((_, i) => i !== index)
    }));
  };

  // إدارة الحملات السابقة
  const handleCampaignChange = (field, value) => {
    setNewCampaign(prev => ({ ...prev, [field]: value }));
  };

  const addCampaign = () => {
    if (newCampaign.name.trim() && newCampaign.brand.trim()) {
      setForm(prev => ({
        ...prev,
        previousCampaigns: [...prev.previousCampaigns, { ...newCampaign }]
      }));
      setNewCampaign({ name: '', brand: '', date: '' });
    }
  };

  const removeCampaign = (index) => {
    setForm(prev => ({
      ...prev,
      previousCampaigns: prev.previousCampaigns.filter((_, i) => i !== index)
    }));
  };

  // رفع الصور
  const handleImageChange = (e, type) => {
    if (type === 'profile') setProfileImage(e.target.files[0]);
    else if (type === 'cover') setCoverImage(e.target.files[0]);
  };
const handleSocialChange = (platform, field, value) => {
  setForm(prev => ({
    ...prev,
    socialLinks: {
      ...prev.socialLinks,
      [platform]: {
        ...prev.socialLinks[platform],
        [field]: value
      }
    }
  }));
};
  // الإرسال
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('bio', form.bio);
      formData.append('stats', JSON.stringify(form.stats));
      formData.append('socialLinks', JSON.stringify(
        prepareSocialLinksArray(form.socialLinks)
      ));  
         formData.append('contentCategories', JSON.stringify(form.contentCategories));
      formData.append('audienceDemo', JSON.stringify(form.audienceDemo));
      formData.append('previousCampaigns', JSON.stringify(form.previousCampaigns));
     
      formData.append('advertisingcost', form.advertisingcost);

      if (profileImage) formData.append('profileImage', profileImage);
      if (coverImage) formData.append('coverImage', coverImage);

      const res = await axios.put(`http://localhost:4000/api/influencer/update/${influencerId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Profile updated successfully');
      setData(res.data.influencer);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return <p className="text-red-600 text-center p-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Edit Influencer Profile</h2>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bio */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['followers', 'engagementRate', 'avgLikes','totalPosts', ].map(stat => (
            <div key={stat}>
              <label className="block font-semibold mb-2 capitalize text-gray-700">{stat.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                value={form.stats[stat]}
                onChange={(e) => handleNestedChange('stats', stat, e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={`Enter ${stat}`}
              />
            </div>
          ))}
        </div>

    
        <div>
  <h3 className="text-xl font-semibold mb-4">Social Links</h3>
  <div className="space-y-4">
    {Object.entries(form.socialLinks).map(([platform, { url, followers }]) => {
      const Icon = {
        instagram: Instagram,
        facebook:  Facebook,
        twitter:   Twitter,
        youtube:   Youtube,
        tiktok:    () => <div className="mr-2 text-purple-500">📱</div>,
        linkedin:  Linkedin
      }[platform];

      return (
        <div
          key={platform}
          className="flex items-center space-x-4"
        >
          <Icon size={20} className="text-purple-500" />

          {/* URL */}
          <input
            type="text"
            value={url}
            onChange={e => handleSocialChange(platform, 'url', e.target.value)}
            placeholder={`${platform} URL`}
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
          />

          {/* Followers */}
          <input
            type="text"
            value={followers}
            onChange={e => handleSocialChange(platform, 'followers', e.target.value)}
            placeholder="Followers e.g. 300k"
            className="w-32 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      );
    })}
  </div>
</div>

{/* <div>
  <h3 className="text-xl font-semibold mb-4">Social Links</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Object.entries(form.socialLinks).map(([platform, { url, followers }]) => {
      const Icon = {
        instagram: Instagram,
        facebook:  Facebook,
        twitter:   Twitter,
        youtube:   Youtube,
        tiktok:    () => <div className="mr-2 text-purple-500">📱</div>,
        linkedin:  Linkedin
      }[platform];

      return (
        <div key={platform} className="space-y-2">
          <div className="flex items-center">
            <Icon className="mr-2 text-purple-500" size={20} />
            <input
              type="text"
              value={url}
              onChange={e => handleSocialChange(platform, 'url', e.target.value)}
              placeholder={`${platform} URL`}
              className="flex-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2">Likes/Followers:</span>
            <input
              type="text"
              value={followers}
              onChange={e => handleSocialChange(platform, 'followers', e.target.value)}
              placeholder={`e.g. 300k`}
              className="flex-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      );
    })}
  </div>
</div> */}
        {/* Content Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Content Categories</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {form.contentCategories.map((category, index) => (
              <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                <span>{category}</span>
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 border border-gray-300 px-4 py-2 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add a category"
            />
            <button
              type="button"
              onClick={addCategory}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Audience Demo */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Audience Demographics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(form.audienceDemo).map(([field, val]) => (
              <div key={field}>
                <label className="block font-semibold mb-2 capitalize text-gray-700">{field}</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleNestedChange('audienceDemo', field, e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Previous Campaigns */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Previous Campaigns</h3>
          <div className="space-y-4 mb-4">
            {form.previousCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-sm text-gray-600">
                    {campaign.brand} {campaign.date ? `• ${campaign.date}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeCampaign(index)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              value={newCampaign.name}
              onChange={(e) => handleCampaignChange('name', e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Campaign name"
            />
            <input
              type="text"
              value={newCampaign.brand}
              onChange={(e) => handleCampaignChange('brand', e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Brand"
            />
            <input
              type="text"
              value={newCampaign.date}
              onChange={(e) => handleCampaignChange('date', e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Date (optional)"
            />
          </div>
          <button
            type="button"
            onClick={addCampaign}
            className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            <PlusCircle size={18} className="mr-1" /> Add Campaign
          </button>
        </div>

        {/* Primary Social Media and Advertising Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Advertising Cost (USD)</label>
            <input
              type="number"
              value={form.advertisingcost}
              onChange={(e) => handleChange('advertisingcost', e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 500"
            />
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Profile Image</label>
            {data?.profileImage && !profileImage && (
              <div className="mb-4">
                <img 
                  src={`http://localhost:4000/${data.profileImage}`} 
                  alt="Profile" 
                  className="w-24 h-24 object-cover rounded-full border-2 border-purple-300"
                />
              </div>
            )}
            {profileImage && (
              <div className="mb-4">
                <img 
                  src={URL.createObjectURL(profileImage)} 
                  alt="Profile Preview" 
                  className="w-24 h-24 object-cover rounded-full border-2 border-purple-300"
                />
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleImageChange(e, 'profile')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Cover Image</label>
            {data?.coverImage && !coverImage && (
              <div className="mb-4">
                <img 
                  src={`http://localhost:4000/${data.coverImage}`} 
                  alt="Cover" 
                  className="w-full h-36 object-cover rounded-lg border-2 border-purple-300" 
                />
              </div>
            )}
            {coverImage && (
              <div className="mb-4">
                <img 
                  src={URL.createObjectURL(coverImage)} 
                  alt="Cover Preview" 
                  className="w-full h-36 object-cover rounded-lg border-2 border-purple-300" 
                />
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleImageChange(e, 'cover')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-pink-700 shadow-md transition-all hover:shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfluencerProfile;













































































// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { useParams } from "react-router-dom";
// // // import { useSelector } from 'react-redux';
// // // const InfluencerProfile = () => {
// // //      const currentUser = useSelector((state) => state.user.currentUser);
    
// // //    const { id } = useParams(); 
// // //     console.log(currentUser ,id)
// // //   const [data, setData] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [form, setForm] = useState({
// // //     bio: '',
// // //     stats: '',
// // //     socialLinks: '',
// // //     contentCategories: '',
// // //     audienceDemo: '',
// // //     previousCampaigns: '',
// // //     primarySocialMedia: '',
// // //     advertisingcost: '',
// // //   });
// // //   const [profileImage, setProfileImage] = useState(null);
// // //   const [coverImage, setCoverImage] = useState(null);
// // //   const [error, setError] = useState(null);
// // //   const [success, setSuccess] = useState(null);

// // //   // تحميل البيانات
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await axios.get(`http://localhost:4000/api/influencer/user/${id}`);
// // //         setData(res.data);
// // //         // نهيئ الفورم بقيم البيانات (التحويل إلى نص JSON للحالات المعقدة)
// // //         setForm({
// // //           bio: res.data.bio || '',
// // //           stats: JSON.stringify(res.data.stats || {}, null, 2),
// // //           socialLinks: JSON.stringify(res.data.socialLinks || {}, null, 2),
// // //           contentCategories: JSON.stringify(res.data.contentCategories || [], null, 2),
// // //           audienceDemo: JSON.stringify(res.data.audienceDemo || {}, null, 2),
// // //           previousCampaigns: JSON.stringify(res.data.previousCampaigns || [], null, 2),
// // //           primarySocialMedia: res.data.primarySocialMedia || '',
// // //           advertisingcost: res.data.advertisingcost || '',
// // //         });
// // //       } catch (err) {
// // //         setError('Failed to load influencer data');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, [id]);

// // //   // handle input change
// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   // handle image change
// // //   const handleImageChange = (e, type) => {
// // //     if (type === 'profile') setProfileImage(e.target.files[0]);
// // //     else if (type === 'cover') setCoverImage(e.target.files[0]);
// // //   };

// // //   // submit form
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError(null);
// // //     setSuccess(null);

// // //     try {
// // //       const formData = new FormData();
// // //       formData.append('bio', form.bio);
// // //       formData.append('stats', form.stats);
// // //       formData.append('socialLinks', form.socialLinks);
// // //       formData.append('contentCategories', form.contentCategories);
// // //       formData.append('audienceDemo', form.audienceDemo);
// // //       formData.append('previousCampaigns', form.previousCampaigns);
// // //       formData.append('primarySocialMedia', form.primarySocialMedia);
// // //       formData.append('advertisingcost', form.advertisingcost);

// // //       if (profileImage) formData.append('profileImage', profileImage);
// // //       if (coverImage) formData.append('coverImage', coverImage);

// // //       const res = await axios.put(`http://localhost:4000/api/influencer/update/${id}`, formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' },
// // //       });

// // //       setSuccess('Profile updated successfully');
// // //       setData(res.data.influencer);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Update failed');
// // //     }
// // //   };

// // //   if (loading) return <p>Loading...</p>;
// // //   if (error) return <p className="text-red-600">{error}</p>;

// // //   return (
// // //     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
// // //       <h2 className="text-2xl font-bold mb-6">Edit Influencer Profile</h2>

// // //       {success && <p className="text-green-600 mb-4">{success}</p>}

// // //       <form onSubmit={handleSubmit} className="space-y-6">
// // //         <div>
// // //           <label className="block font-semibold mb-1">Bio</label>
// // //           <textarea
// // //             name="bio"
// // //             value={form.bio}
// // //             onChange={handleChange}
// // //             rows={4}
// // //             className="w-full border px-3 py-2 rounded"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Stats (JSON format)</label>
// // //           <textarea
// // //             name="stats"
// // //             value={form.stats}
// // //             onChange={handleChange}
// // //             rows={6}
// // //             className="w-full border px-3 py-2 rounded font-mono text-sm"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Social Links (JSON format)</label>
// // //           <textarea
// // //             name="socialLinks"
// // //             value={form.socialLinks}
// // //             onChange={handleChange}
// // //             rows={4}
// // //             className="w-full border px-3 py-2 rounded font-mono text-sm"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Content Categories (JSON format)</label>
// // //           <textarea
// // //             name="contentCategories"
// // //             value={form.contentCategories}
// // //             onChange={handleChange}
// // //             rows={4}
// // //             className="w-full border px-3 py-2 rounded font-mono text-sm"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Audience Demo (JSON format)</label>
// // //           <textarea
// // //             name="audienceDemo"
// // //             value={form.audienceDemo}
// // //             onChange={handleChange}
// // //             rows={4}
// // //             className="w-full border px-3 py-2 rounded font-mono text-sm"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Previous Campaigns (JSON format)</label>
// // //           <textarea
// // //             name="previousCampaigns"
// // //             value={form.previousCampaigns}
// // //             onChange={handleChange}
// // //             rows={4}
// // //             className="w-full border px-3 py-2 rounded font-mono text-sm"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Primary Social Media</label>
// // //           <input
// // //             type="text"
// // //             name="primarySocialMedia"
// // //             value={form.primarySocialMedia}
// // //             onChange={handleChange}
// // //             className="w-full border px-3 py-2 rounded"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Advertising Cost</label>
// // //           <input
// // //             type="number"
// // //             name="advertisingcost"
// // //             value={form.advertisingcost}
// // //             onChange={handleChange}
// // //             className="w-full border px-3 py-2 rounded"
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Profile Image</label>
// // //           {data.profileImage && (
// // //             <img src={`http://localhost:4000/${data.profileImage}`} alt="Profile" className="w-24 h-24 object-cover mb-2 rounded-full" />
// // //           )}
// // //           <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'profile')} />
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-1">Cover Image</label>
// // //           {data.coverImage && (
// // //             <img src={`http://localhost:4000/${data.coverImage}`} alt="Cover" className="w-full h-48 object-cover mb-2 rounded" />
// // //           )}
// // //           <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'cover')} />
// // //         </div>

// // //         <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
// // //           Save Changes
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default InfluencerProfile;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useParams } from "react-router-dom";
// // import { useSelector } from 'react-redux';
// // import { X, PlusCircle, Instagram, Facebook, Twitter, Youtube, Linkedin,  } from 'lucide-react';

// // const InfluencerProfile = () => {
// //   const currentUser = useSelector((state) => state.user.currentUser);
// //   const { id } = useParams();
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
  
// //   // Form state management
// //   const [bio, setBio] = useState('');
// //   const [followers, setFollowers] = useState('');
// //   const [engagement, setEngagement] = useState('');
// //   const [reach, setReach] = useState('');
  
// //   // Social links
// //   const [socialLinks, setSocialLinks] = useState({
// //     instagram: '',
// //     facebook: '',
// //     twitter: '',
// //     youtube: '',
// //     tiktok: '',
// //     linkedin: ''
// //   });
  
// //   // Categories are now array of strings
// //   const [categories, setCategories] = useState([]);
// //   const [newCategory, setNewCategory] = useState('');
  
// //   // Audience demographics
// //   const [audience, setAudience] = useState({
// //     age: '',
// //     gender: '',
// //     location: '',
// //     interests: ''
// //   });
  
// //   // Campaigns
// //   const [campaigns, setCampaigns] = useState([]);
// //   const [newCampaign, setNewCampaign] = useState({
// //     name: '',
// //     brand: '',
// //     date: ''
// //   });
  
// //   const [primarySocialMedia, setPrimarySocialMedia] = useState('');
// //   const [advertisingcost, setAdvertisingCost] = useState('');
// //   const [profileImage, setProfileImage] = useState(null);
// //   const [coverImage, setCoverImage] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);

// //   // Load data
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get(`http://localhost:4000/api/influencer/user/${id}`);
// //         setData(res.data);
// //         console.log(res.data)
// //         // Set form values from data
// //         setBio(res.data.bio || '');
// //         console.log(data);
// //         // Stats
// //         const stats = res.data.stats || {};
// //         setFollowers(stats.followers || '');
// //         setEngagement(stats.engagement || '');
// //         setReach(stats.reach || '');
        
// //         // Social links
// //         setSocialLinks(res.data.socialLinks || {
// //           instagram: '',
// //           facebook: '',
// //           twitter: '',
// //           youtube: '',
// //           tiktok: '',
// //           linkedin: ''
// //         });
        
// //         // Categories
// //         setCategories(res.data.contentCategories || []);
        
// //         // Audience
// //         const audienceData = res.data.audienceDemo || {};
// //         setAudience({
// //           age: audienceData.age || '',
// //           gender: audienceData.gender || '',
// //           location: audienceData.location || '',
// //           interests: audienceData.interests || ''
// //         });
        
// //         // Campaigns
// //         setCampaigns(res.data.previousCampaigns || []);
        
// //         // Other fields
// //         setPrimarySocialMedia(res.data.primarySocialMedia || '');
// //         setAdvertisingCost(res.data.advertisingcost || '');
// //       } catch (err) {
// //         setError('Failed to load influencer data');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [id]);

// //   // Social links handlers
// //   const handleSocialLinkChange = (platform, value) => {
// //     setSocialLinks(prev => ({
// //       ...prev,
// //       [platform]: value
// //     }));
// //   };
  
// //   // Categories handlers
// //   const addCategory = () => {
// //     if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
// //       setCategories([...categories, newCategory.trim()]);
// //       setNewCategory('');
// //     }
// //   };
  
// //   const removeCategory = (index) => {
// //     setCategories(categories.filter((_, i) => i !== index));
// //   };
  
// //   // Audience handlers
// //   const handleAudienceChange = (field, value) => {
// //     setAudience(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };
  
// //   // Campaign handlers
// //   const handleCampaignChange = (field, value) => {
// //     setNewCampaign(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };
  
// //   const addCampaign = () => {
// //     if (newCampaign.name.trim() !== '' && newCampaign.brand.trim() !== '') {
// //       setCampaigns([...campaigns, { ...newCampaign }]);
// //       setNewCampaign({ name: '', brand: '', date: '' });
// //     }
// //   };
  
// //   const removeCampaign = (index) => {
// //     setCampaigns(campaigns.filter((_, i) => i !== index));
// //   };

// //   // Handle image change
// //   const handleImageChange = (e, type) => {
// //     if (type === 'profile') setProfileImage(e.target.files[0]);
// //     else if (type === 'cover') setCoverImage(e.target.files[0]);
// //   };

// //   // Submit form
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setSuccess(null);

// //     try {
// //       // Prepare data in the format expected by the backend
// //       const statsJson = JSON.stringify({
// //         followers,
// //         engagement,
// //         reach
// //       });
      
// //       const socialLinksJson = JSON.stringify(socialLinks);
// //       const categoriesJson = JSON.stringify(categories);
// //       const audienceJson = JSON.stringify(audience);
// //       const campaignsJson = JSON.stringify(campaigns);

// //       const formData = new FormData();
// //       formData.append('bio', bio);
// //       formData.append('stats', statsJson);
// //       formData.append('socialLinks', socialLinksJson);
// //       formData.append('contentCategories', categoriesJson);
// //       formData.append('audienceDemo', audienceJson);
// //       formData.append('previousCampaigns', campaignsJson);
// //       formData.append('primarySocialMedia', primarySocialMedia);
// //       formData.append('advertisingcost', advertisingcost);

// //       if (profileImage) formData.append('profileImage', profileImage);
// //       if (coverImage) formData.append('coverImage', coverImage);

// //       const res = await axios.put(`http://localhost:4000/api/influencer/update/${data.id}`, formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       setSuccess('Profile updated successfully');
// //       setData(res.data.influencer);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Update failed');
// //     }
// //   };

// //   if (loading) return (
// //     <div className="flex justify-center items-center h-64">
// //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
// //     </div>
// //   );
  
// //   if (error) return <p className="text-red-600 text-center p-4">{error}</p>;

// //   return (
// //     <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
// //       <h2 className="text-3xl font-bold mb-8 text-gray-900 bg-clip-text ">Edit Influencer Profile</h2>

// //       {success && (
// //         <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
// //           {success}
// //         </div>
// //       )}

// //       <form onSubmit={handleSubmit} className="space-y-8">
// //         {/* Bio Section */}
// //         <div>
// //           <label className="block font-semibold mb-2 text-gray-700">Bio</label>
// //           <textarea
// //             value={bio}
// //             onChange={(e) => setBio(e.target.value)}
// //             rows={4}
// //             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //             placeholder="Tell us about yourself..."
// //           />
// //         </div>

// //         {/* Stats Section */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Followers</label>
// //             <input
// //               type="text"
// //               value={data.stats.followers}
// //               onChange={(e) => setFollowers(e.target.value)}
// //               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="Number of followers"
// //             />
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Engagement Rate</label>
// //             <input
// //               type="text"
// //               value={data.stats.engagement}
// //               onChange={(e) => setEngagement(e.target.value)}
// //               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="Average engagement rate"
// //             />
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Reach</label>
// //             <input
// //               type="text"
// //               value={data.stats.reach}
// //               onChange={(e) => setReach(e.target.value)}
// //               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="Average reach"
// //             />
// //           </div>
// //         </div>

// //         {/* Social Links Section */}
// //         <div>
// //           <h3 className="text-xl font-semibold mb-4 text-gray-800">Social Links</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div className="flex items-center">
// //               <Instagram className="mr-2 text-purple-500" size={20} />
// //               <input
// //                 type="text"
// //                 value={data.socialLinks.instagram}
// //                 onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
// //                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="Instagram URL"
// //               />
// //             </div>
// //             <div className="flex items-center">
// //               <Facebook className="mr-2 text-purple-500" size={20} />
// //               <input
// //                 type="text"
// //                 value={data.socialLinks.facebook}
// //                 onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
// //                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="Facebook URL"
// //               />
// //             </div>
// //             <div className="flex items-center">
// //               <Twitter className="mr-2 text-purple-500" size={20} />
// //               <input
// //                 type="text"
// //                 value={socialLinks.twitter}
// //                 onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
// //                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="Twitter URL"
// //               />
// //             </div>
// //             <div className="flex items-center">
// //               <Youtube className="mr-2 text-purple-500" size={20} />
// //               <input
// //                 type="text"
// //                 value={socialLinks.youtube}
// //                 onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
// //                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="YouTube URL"
// //               />
// //             </div>
// //             <div className="flex items-center">
// //               <div className="mr-2 text-purple-500" size={20} />
// //               <input
// //                 type="text"
// //                 value={socialLinks.tiktok}
// //                 onChange={(e) => handleSocialLinkChange('tiktok', e.target.value)}
// //                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="TikTok URL"
// //               />
// //             </div>
// //             <div className="flex items-center">
// //               <Linkedin className="mr-2 text-purple-500" size={20} />
// //               <input
// //                 type="text"
// //                 value={socialLinks.linkedin}
// //                 onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
// //                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="LinkedIn URL"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Content Categories Section */}
// //         <div>
// //           <h3 className="text-xl font-semibold mb-4 text-gray-800">Content Categories</h3>
// //           <div className="flex flex-wrap gap-2 mb-4">
// //             {categories.map((category, index) => (
// //               <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
// //                 <span>{category}</span>
// //                 <button
// //                   type="button"
// //                   onClick={() => removeCategory(index)}
// //                   className="ml-2 text-purple-600 hover:text-purple-800"
// //                 >
// //                   <X size={16} />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="flex">
// //             <input
// //               type="text"
// //               value={newCategory}
// //               onChange={(e) => setNewCategory(e.target.value)}
// //               className="flex-1 border border-gray-300 px-4 py-2 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="Add a category"
// //             />
// //             <button
// //               type="button"
// //               onClick={addCategory}
// //               className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg transition-colors"
// //             >
// //               Add
// //             </button>
// //           </div>
// //         </div>

// //         {/* Audience Demographics */}
// //         <div>
// //           <h3 className="text-xl font-semibold mb-4 text-gray-800">Audience Demographics</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block font-semibold mb-2 text-gray-700">Age Range</label>
// //               <input
// //                 type="text"
// //                 value={audience.age}
// //                 onChange={(e) => handleAudienceChange('age', e.target.value)}
// //                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="e.g., 18-24, 25-34"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-semibold mb-2 text-gray-700">Gender Split</label>
// //               <input
// //                 type="text"
// //                 value={audience.gender}
// //                 onChange={(e) => handleAudienceChange('gender', e.target.value)}
// //                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="e.g., 60% female, 40% male"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-semibold mb-2 text-gray-700">Top Locations</label>
// //               <input
// //                 type="text"
// //                 value={audience.location}
// //                 onChange={(e) => handleAudienceChange('location', e.target.value)}
// //                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="e.g., USA, Canada, UK"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-semibold mb-2 text-gray-700">Interests</label>
// //               <input
// //                 type="text"
// //                 value={audience.interests}
// //                 onChange={(e) => handleAudienceChange('interests', e.target.value)}
// //                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="e.g., Fashion, Travel, Fitness"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Previous Campaigns */}
// //         <div>
// //           <h3 className="text-xl font-semibold mb-4 text-gray-800">Previous Campaigns</h3>
// //           <div className="space-y-4 mb-4">
// //             {campaigns.map((campaign, index) => (
// //               <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
// //                 <div className="flex-1">
// //                   <p className="font-medium">{campaign.name}</p>
// //                   <p className="text-sm text-gray-600">
// //                     {campaign.brand} {campaign.date ? `• ${campaign.date}` : ''}
// //                   </p>
// //                 </div>
// //                 <button
// //                   type="button"
// //                   onClick={() => removeCampaign(index)}
// //                   className="text-gray-500 hover:text-red-600"
// //                 >
// //                   <X size={18} />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
// //             <input
// //               type="text"
// //               value={newCampaign.name}
// //               onChange={(e) => handleCampaignChange('name', e.target.value)}
// //               className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="Campaign name"
// //             />
// //             <input
// //               type="text"
// //               value={newCampaign.brand}
// //               onChange={(e) => handleCampaignChange('brand', e.target.value)}
// //               className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="Brand"
// //             />
// //             <input
// //               type="text"
// //               value={newCampaign.date}
// //               onChange={(e) => handleCampaignChange('date', e.target.value)}
// //               className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="Date (optional)"
// //             />
// //           </div>
// //           <button
// //             type="button"
// //             onClick={addCampaign}
// //             className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
// //           >
// //             <PlusCircle size={18} className="mr-1" /> Add Campaign
// //           </button>
// //         </div>

// //         {/* Primary Social Media and Cost */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Primary Social Media</label>
// //             <select
// //               value={primarySocialMedia}
// //               onChange={(e) => setPrimarySocialMedia(e.target.value)}
// //               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
// //             >
// //               <option value="">Select Platform</option>
// //               <option value="Instagram">Instagram</option>
// //               <option value="TikTok">TikTok</option>
// //               <option value="YouTube">YouTube</option>
// //               <option value="Twitter">Twitter</option>
// //               <option value="Facebook">Facebook</option>
// //               <option value="LinkedIn">LinkedIn</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Advertising Cost (USD)</label>
// //             <input
// //               type="number"
// //               value={advertisingcost}
// //               onChange={(e) => setAdvertisingCost(e.target.value)}
// //               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               placeholder="e.g., 500"
// //             />
// //           </div>
// //         </div>

// //         {/* Images */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Profile Image</label>
// //             {data.profileImage && (
// //               <div className="mb-4">
// //                 <img 
// //                   src={`http://localhost:4000/${data.profileImage}`} 
// //                   alt="Profile" 
// //                   className="w-24 h-24 object-cover rounded-full border-2 border-purple-300"
// //                 />
// //               </div>
// //             )}
// //             <div className="relative">
// //               <input 
// //                 type="file" 
// //                 accept="image/*" 
// //                 onChange={(e) => handleImageChange(e, 'profile')}
// //                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <label className="block font-semibold mb-2 text-gray-700">Cover Image</label>
// //             {data.coverImage && (
// //               <div className="mb-4">
// //                 <img 
// //                   src={`http://localhost:4000/${data.coverImage}`} 
// //                   alt="Cover" 
// //                   className="w-full h-36 object-cover rounded-lg border-2 border-purple-300" 
// //                 />
// //               </div>
// //             )}
// //             <div className="relative">
// //               <input 
// //                 type="file" 
// //                 accept="image/*" 
// //                 onChange={(e) => handleImageChange(e, 'cover')}
// //                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <div className="pt-4">
// //           <button 
// //             type="submit" 
// //             className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-pink-700 shadow-md transition-all hover:shadow-lg"
// //           >
// //             Save Changes
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default InfluencerProfile;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { X, PlusCircle, Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

// const InfluencerProfile = () => {
//   const currentUser = useSelector((state) => state.user.currentUser);
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Form state management
//   const [bio, setBio] = useState('');
//   const [followers, setFollowers] = useState('');
//   const [engagement, setEngagement] = useState('');
//   const [reach, setReach] = useState('');
  
//   // Social links
//   const [socialLinks, setSocialLinks] = useState({
//     instagram: '',
//     facebook: '',
//     twitter: '',
//     youtube: '',
//     tiktok: '',
//     linkedin: ''
//   });
  
//   // Categories are now array of strings
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState('');
  
//   // Audience demographics
//   const [audience, setAudience] = useState({
//     age: '',
//     gender: '',
//     location: '',
//     interests: ''
//   });
  
//   // Campaigns
//   const [campaigns, setCampaigns] = useState([]);
//   const [newCampaign, setNewCampaign] = useState({
//     name: '',
//     brand: '',
//     date: ''
//   });
  
//   const [primarySocialMedia, setPrimarySocialMedia] = useState('');
//   const [advertisingcost, setAdvertisingCost] = useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Load data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`http://localhost:4000/api/influencer/user/${id}`);
//         setData(res.data);
//         // Set form values from data
//         setBio(res.data.bio || '');
//         // Stats
//         const stats = res.data.stats || {};
//         setFollowers(stats.followers || '');
//         setEngagement(stats.engagement || '');
//         setReach(stats.reach || '');
        
//         // Social links
//         setSocialLinks(res.data.socialLinks || {
//           instagram: '',
//           facebook: '',
//           twitter: '',
//           youtube: '',
//           tiktok: '',
//           linkedin: ''
//         });
        
//         // Categories
//         setCategories(res.data.contentCategories || []);
        
//         // Audience
//         const audienceData = res.data.audienceDemo || {};
//         setAudience({
//           age: audienceData.age || '',
//           gender: audienceData.gender || '',
//           location: audienceData.location || '',
//           interests: audienceData.interests || ''
//         });
        
//         // Campaigns
//         setCampaigns(res.data.previousCampaigns || []);
        
//         // Other fields
//         setPrimarySocialMedia(res.data.primarySocialMedia || '');
//         setAdvertisingCost(res.data.advertisingcost || '');
//       } catch (err) {
//         setError('Failed to load influencer data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   // Social links handlers
//   const handleSocialLinkChange = (platform, value) => {
//     setSocialLinks(prev => ({
//       ...prev,
//       [platform]: value
//     }));
//   };
  
//   // Categories handlers
//   const addCategory = () => {
//     if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
//       setCategories([...categories, newCategory.trim()]);
//       setNewCategory('');
//     }
//   };
  
//   const removeCategory = (index) => {
//     setCategories(categories.filter((_, i) => i !== index));
//   };
  
//   // Audience handlers
//   const handleAudienceChange = (field, value) => {
//     setAudience(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };
  
//   // Campaign handlers
//   const handleCampaignChange = (field, value) => {
//     setNewCampaign(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };
  
//   const addCampaign = () => {
//     if (newCampaign.name.trim() !== '' && newCampaign.brand.trim() !== '') {
//       setCampaigns([...campaigns, { ...newCampaign }]);
//       setNewCampaign({ name: '', brand: '', date: '' });
//     }
//   };
  
//   const removeCampaign = (index) => {
//     setCampaigns(campaigns.filter((_, i) => i !== index));
//   };

//   // Handle image change
//   const handleImageChange = (e, type) => {
//     if (type === 'profile') setProfileImage(e.target.files[0]);
//     else if (type === 'cover') setCoverImage(e.target.files[0]);
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       // Prepare data in the format expected by the backend
//       const statsJson = JSON.stringify({
//         followers,
//         engagement,
//         reach
//       });
      
//       const socialLinksJson = JSON.stringify(socialLinks);
//       const categoriesJson = JSON.stringify(categories);
//       const audienceJson = JSON.stringify(audience);
//       const campaignsJson = JSON.stringify(campaigns);

//       const formData = new FormData();
//       formData.append('bio', bio);
//       formData.append('stats', statsJson);
//       formData.append('socialLinks', socialLinksJson);
//       formData.append('contentCategories', categoriesJson);
//       formData.append('audienceDemo', audienceJson);
//       formData.append('previousCampaigns', campaignsJson);
//       formData.append('primarySocialMedia', primarySocialMedia);
//       formData.append('advertisingcost', advertisingcost);

//       if (profileImage) formData.append('profileImage', profileImage);
//       if (coverImage) formData.append('coverImage', coverImage);

//       const res = await axios.put(`http://localhost:4000/api/influencer/update/${data.id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setSuccess('Profile updated successfully');
//       setData(res.data.influencer);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Update failed');
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//     </div>
//   );
  
//   if (error) return <p className="text-red-600 text-center p-4">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-8 text-gray-900 bg-clip-text ">Edit Influencer Profile</h2>

//       {success && (
//         <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
//           {success}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Bio Section */}
//         <div>
//           <label className="block font-semibold mb-2 text-gray-700">Bio</label>
//           <textarea
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             rows={4}
//             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             placeholder="Tell us about yourself..."
//           />
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Followers</label>
//             <input
//               type="text"
//               value={followers}
//               onChange={(e) => setFollowers(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Number of followers"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Engagement Rate</label>
//             <input
//               type="text"
//               value={engagement}
//               onChange={(e) => setEngagement(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Average engagement rate"
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Reach</label>
//             <input
//               type="text"
//               value={reach}
//               onChange={(e) => setReach(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Average reach"
//             />
//           </div>
//         </div>

//         {/* Social Links Section */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Social Links</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center">
//               <Instagram className="mr-2 text-purple-500" size={20} />
//               <input
//                 type="text"
//                 value={socialLinks.instagram}
//                 onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
//                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Instagram URL"
//               />
//             </div>
//             <div className="flex items-center">
//               <Facebook className="mr-2 text-purple-500" size={20} />
//               <input
//                 type="text"
//                 value={socialLinks.facebook}
//                 onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
//                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Facebook URL"
//               />
//             </div>
//             <div className="flex items-center">
//               <Twitter className="mr-2 text-purple-500" size={20} />
//               <input
//                 type="text"
//                 value={socialLinks.twitter}
//                 onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
//                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Twitter URL"
//               />
//             </div>
//             <div className="flex items-center">
//               <Youtube className="mr-2 text-purple-500" size={20} />
//               <input
//                 type="text"
//                 value={socialLinks.youtube}
//                 onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
//                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="YouTube URL"
//               />
//             </div>
//             <div className="flex items-center">
//               <div className="mr-2 text-purple-500" size={20} />
//               <input
//                 type="text"
//                 value={socialLinks.tiktok}
//                 onChange={(e) => handleSocialLinkChange('tiktok', e.target.value)}
//                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="TikTok URL"
//               />
//             </div>
//             <div className="flex items-center">
//               <Linkedin className="mr-2 text-purple-500" size={20} />
//               <input
//                 type="text"
//                 value={socialLinks.linkedin}
//                 onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
//                 className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="LinkedIn URL"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Content Categories Section */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Content Categories</h3>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {categories.map((category, index) => (
//               <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
//                 <span>{category}</span>
//                 <button
//                   type="button"
//                   onClick={() => removeCategory(index)}
//                   className="ml-2 text-purple-600 hover:text-purple-800"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="flex">
//             <input
//               type="text"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               className="flex-1 border border-gray-300 px-4 py-2 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Add a category"
//             />
//             <button
//               type="button"
//               onClick={addCategory}
//               className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg transition-colors"
//             >
//               Add
//             </button>
//           </div>
//         </div>

//         {/* Audience Demographics */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Audience Demographics</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700">Age Range</label>
//               <input
//                 type="text"
//                 value={audience.age}
//                 onChange={(e) => handleAudienceChange('age', e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="e.g., 18-24, 25-34"
//               />
//             </div>
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700">Gender Split</label>
//               <input
//                 type="text"
//                 value={audience.gender}
//                 onChange={(e) => handleAudienceChange('gender', e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="e.g., 60% female, 40% male"
//               />
//             </div>
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700">Top Locations</label>
//               <input
//                 type="text"
//                 value={audience.location}
//                 onChange={(e) => handleAudienceChange('location', e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="e.g., USA, Canada, UK"
//               />
//             </div>
//             <div>
//               <label className="block font-semibold mb-2 text-gray-700">Interests</label>
//               <input
//                 type="text"
//                 value={audience.interests}
//                 onChange={(e) => handleAudienceChange('interests', e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="e.g., Fashion, Travel, Fitness"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Previous Campaigns */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Previous Campaigns</h3>
//           <div className="space-y-4 mb-4">
//             {campaigns.map((campaign, index) => (
//               <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
//                 <div className="flex-1">
//                   <p className="font-medium">{campaign.name}</p>
//                   <p className="text-sm text-gray-600">
//                     {campaign.brand} {campaign.date ? `• ${campaign.date}` : ''}
//                   </p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => removeCampaign(index)}
//                   className="text-gray-500 hover:text-red-600"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
//             <input
//               type="text"
//               value={newCampaign.name}
//               onChange={(e) => handleCampaignChange('name', e.target.value)}
//               className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Campaign name"
//             />
//             <input
//               type="text"
//               value={newCampaign.brand}
//               onChange={(e) => handleCampaignChange('brand', e.target.value)}
//               className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Brand"
//             />
//             <input
//               type="text"
//               value={newCampaign.date}
//               onChange={(e) => handleCampaignChange('date', e.target.value)}
//               className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Date (optional)"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={addCampaign}
//             className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
//           >
//             <PlusCircle size={18} className="mr-1" /> Add Campaign
//           </button>
//         </div>

//         {/* Primary Social Media and Cost */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Primary Social Media</label>
//             <select
//               value={primarySocialMedia}
//               onChange={(e) => setPrimarySocialMedia(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
//             >
//               <option value="">Select Platform</option>
//               <option value="Instagram">Instagram</option>
//               <option value="TikTok">TikTok</option>
//               <option value="YouTube">YouTube</option>
//               <option value="Twitter">Twitter</option>
//               <option value="Facebook">Facebook</option>
//               <option value="LinkedIn">LinkedIn</option>
//             </select>
//           </div>
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Advertising Cost (USD)</label>
//             <input
//               type="number"
//               value={advertisingcost}
//               onChange={(e) => setAdvertisingCost(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="e.g., 500"
//             />
//           </div>
//         </div>

//         {/* Images */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Profile Image</label>
//             {data.profileImage && (
//               <div className="mb-4">
//                 <img 
//                   src={`http://localhost:4000/${data.profileImage}`} 
//                   alt="Profile" 
//                   className="w-24 h-24 object-cover rounded-full border-2 border-purple-300"
//                 />
//               </div>
//             )}
//             <div className="relative">
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 onChange={(e) => handleImageChange(e, 'profile')}
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block font-semibold mb-2 text-gray-700">Cover Image</label>
//             {data.coverImage && (
//               <div className="mb-4">
//                 <img 
//                   src={`http://localhost:4000/${data.coverImage}`} 
//                   alt="Cover" 
//                   className="w-full h-36 object-cover rounded-lg border-2 border-purple-300" 
//                 />
//               </div>
//             )}
//             <div className="relative">
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 onChange={(e) => handleImageChange(e, 'cover')}
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button 
//             type="submit" 
//             className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-pink-700 shadow-md transition-all hover:shadow-lg"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default InfluencerProfile;