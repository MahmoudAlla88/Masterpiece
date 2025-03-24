
// // // import { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const InfluencerForm = () => {
// // //   const [socialLinks, setSocialLinks] = useState({
// // //     instagram: { url: '', followers: '' },
// // //     youtube: { url: '', followers: '' },
// // //     twitter: { url: '', followers: '' },
// // //   });
// // //   const [adPrice, setAdPrice] = useState('');
// // //   const [targetAge, setTargetAge] = useState('');
// // //   const [gender, setGender] = useState('');
// // //   const [field, setField] = useState('');
// // //   const [contentType, setContentType] = useState('');
// // //   const [profileImage, setProfileImage] = useState(null);
// // //   const [imagePreview, setImagePreview] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [success, setSuccess] = useState(false);
// // //   const [errors, setErrors] = useState({});

// // //   // Check if at least one social media link is provided
// // //   const isAnySocialLinkProvided = () => {
// // //     return Object.values(socialLinks).some(link => link.url.trim() !== '');
// // //   };

// // //   // Handle image upload
// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setProfileImage(file);
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setImagePreview(reader.result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   // Update social link data
// // //   const handleSocialLinkChange = (platform, field, value) => {
// // //     setSocialLinks({
// // //       ...socialLinks,
// // //       [platform]: {
// // //         ...socialLinks[platform],
// // //         [field]: value
// // //       }
// // //     });
// // //   };

// // //   // Validate form before submission
// // //   const validateForm = () => {
// // //     const newErrors = {};

// // //     if (!isAnySocialLinkProvided()) {
// // //       newErrors.socialLinks = "At least one social media profile is required";
// // //     }

// // //     if (!profileImage) {
// // //       newErrors.profileImage = "Profile image is required";
// // //     }

// // //     if (!adPrice) {
// // //       newErrors.adPrice = "Ad price is required";
// // //     }

// // //     if (!targetAge) {
// // //       newErrors.targetAge = "Target age range is required";
// // //     }

// // //     if (!gender) {
// // //       newErrors.gender = "Audience gender is required";
// // //     }

// // //     if (!field) {
// // //       newErrors.field = "Field of advertising is required";
// // //     }

// // //     if (!contentType) {
// // //       newErrors.contentType = "Content type is required";
// // //     }

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (!validateForm()) {
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     // Create FormData for sending both file and text data
// // //     const formData = new FormData();
// // //     formData.append('profileImage', profileImage);
// // //     formData.append('socialLinks', JSON.stringify(socialLinks));
// // //     formData.append('adPrice', adPrice);
// // //     formData.append('targetAge', targetAge);
// // //     formData.append('gender', gender);
// // //     formData.append('field', field);
// // //     formData.append('contentType', contentType);

// // //     try {
// // //       const response = await axios.post('http://localhost:4000/influencer/register', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data'
// // //         }
// // //       });

// // //       if (response.data.message === 'Influencer profile created successfully') {
// // //         setSuccess(true);
// // //         setTimeout(() => setSuccess(false), 3000);
        
// // //         // Reset form after successful submission
// // //         setSocialLinks({
// // //           instagram: { url: '', followers: '' },
// // //           youtube: { url: '', followers: '' },
// // //           twitter: { url: '', followers: '' },
// // //         });
// // //         setAdPrice('');
// // //         setTargetAge('');
// // //         setGender('');
// // //         setField('');
// // //         setContentType('');
// // //         setProfileImage(null);
// // //         setImagePreview(null);
// // //       } else {
// // //         alert('There was an issue creating your profile');
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert('Something went wrong');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         <div className="text-center mb-10">
// // //           <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //             Influencer Registration
// // //           </h1>
// // //           <p className="mt-3 text-xl text-gray-600">
// // //             Join our network of influencers and get exclusive marketing opportunities
// // //           </p>
// // //         </div>

// // //         <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
// // //           <div className="h-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
          
// //           // <form onSubmit={handleSubmit} className="p-8 space-y-6">
// //           //   {/* Profile Image Upload */}
// //           //   <div className="text-center">
// //           //     <label className="block text-lg font-medium text-gray-700 mb-2">
// //           //       Profile Image
// //           //     </label>
// //           //     <div className="flex flex-col items-center">
// //           //       <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-purple-100">
// //           //         {imagePreview ? (
// //           //           <img 
// //           //             src={imagePreview} 
// //           //             alt="Profile Preview" 
// //           //             className="w-full h-full object-cover" 
// //           //           />
// //           //         ) : (
// //           //           <div className="flex items-center justify-center w-full h-full text-gray-400">
// //           //             <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// //           //               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
// //           //             </svg>
// //           //           </div>
// //           //         )}
// //           //       </div>
// //           //       <label className="relative cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
// //           //         <span>Upload Image</span>
// //           //         <input 
// //           //           type="file" 
// //           //           className="hidden" 
// //           //           accept="image/*" 
// //           //           onChange={handleImageChange} 
// //           //         />
// //           //       </label>
// //           //       {errors.profileImage && (
// //           //         <p className="mt-2 text-pink-600 text-sm">{errors.profileImage}</p>
// //           //       )}
// //           //     </div>
// //           //   </div>

// //           //   {/* Social Media Links */}
// //           //   <div>
// //           //     <label className="block text-lg font-medium text-gray-700 mb-2">
// //           //       Social Media Profiles <span className="text-sm text-pink-600">(at least one required)</span>
// //           //     </label>
// //           //     {errors.socialLinks && (
// //           //       <p className="mb-2 text-pink-600 text-sm">{errors.socialLinks}</p>
// //           //     )}
              
// //           //     <div className="space-y-4">
// //           //       {/* Instagram */}
// //           //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           //         <div className="md:col-span-2 relative">
// //           //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //           //             <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           //               <rect x="2" y="2" width="20" height="20" rx="5" />
// //           //               <circle cx="12" cy="12" r="4" />
// //           //               <circle cx="18" cy="6" r="1" />
// //           //             </svg>
// //           //           </div>
// //           //           <input
// //           //             type="url"
// //           //             placeholder="Instagram profile URL"
// //           //             value={socialLinks.instagram.url}
// //           //             onChange={(e) => handleSocialLinkChange('instagram', 'url', e.target.value)}
// //           //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //           />
// //           //         </div>
// //           //         <div>
// //           //           <input
// //           //             type="number"
// //           //             placeholder="Followers count"
// //           //             value={socialLinks.instagram.followers}
// //           //             onChange={(e) => handleSocialLinkChange('instagram', 'followers', e.target.value)}
// //           //             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //           />
// //           //         </div>
// //           //       </div>
                
// //           //       {/* YouTube */}
// //           //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           //         <div className="md:col-span-2 relative">
// //           //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //           //             <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           //               <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
// //           //               <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
// //           //             </svg>
// //           //           </div>
// //           //           <input
// //           //             type="url"
// //           //             placeholder="YouTube channel URL"
// //           //             value={socialLinks.youtube.url}
// //           //             onChange={(e) => handleSocialLinkChange('youtube', 'url', e.target.value)}
// //           //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //           />
// //           //         </div>
// //           //         <div>
// //           //           <input
// //           //             type="number"
// //           //             placeholder="Subscribers count"
// //           //             value={socialLinks.youtube.followers}
// //           //             onChange={(e) => handleSocialLinkChange('youtube', 'followers', e.target.value)}
// //           //             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //           />
// //           //         </div>
// //           //       </div>
                
// //           //       {/* Twitter */}
// //           //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           //         <div className="md:col-span-2 relative">
// //           //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //           //             <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           //               <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
// //           //             </svg>
// //           //           </div>
// //           //           <input
// //           //             type="url"
// //           //             placeholder="Twitter profile URL"
// //           //             value={socialLinks.twitter.url}
// //           //             onChange={(e) => handleSocialLinkChange('twitter', 'url', e.target.value)}
// //           //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //           />
// //           //         </div>
// //           //         <div>
// //           //           <input
// //           //             type="number"
// //           //             placeholder="Followers count"
// //           //             value={socialLinks.twitter.followers}
// //           //             onChange={(e) => handleSocialLinkChange('twitter', 'followers', e.target.value)}
// //           //             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //           />
// //           //         </div>
// //           //       </div>
// //           //     </div>
// //           //   </div>

// //           //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           //     <div>
// //           //       <label className="block text-lg font-medium text-gray-700 mb-2">Ad Price (USD)</label>
// //           //       <div className="relative">
// //           //         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //           //           <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           //             <line x1="12" y1="1" x2="12" y2="23"></line>
// //           //             <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
// //           //           </svg>
// //           //         </div>
// //           //         <input
// //           //           type="number"
// //           //           value={adPrice}
// //           //           onChange={(e) => setAdPrice(e.target.value)}
// //           //           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //           placeholder="Enter your ad price"
// //           //           required
// //           //         />
// //           //       </div>
// //           //       {errors.adPrice && (
// //           //         <p className="mt-1 text-pink-600 text-sm">{errors.adPrice}</p>
// //           //       )}
// //           //     </div>

// //           //     <div>
// //           //       <label className="block text-lg font-medium text-gray-700 mb-2">Target Age Range</label>
// //           //       <input
// //           //         type="text"
// //           //         value={targetAge}
// //           //         onChange={(e) => setTargetAge(e.target.value)}
// //           //         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //         placeholder="e.g., 18-34"
// //           //         required
// //           //       />
// //           //       {errors.targetAge && (
// //           //         <p className="mt-1 text-pink-600 text-sm">{errors.targetAge}</p>
// //           //       )}
// //           //     </div>

// //           //     <div>
// //           //       <label className="block text-lg font-medium text-gray-700 mb-2">Most Common Gender in Audience</label>
// //           //       <select
// //           //         value={gender}
// //           //         onChange={(e) => setGender(e.target.value)}
// //           //         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200 appearance-none bg-no-repeat bg-right"
// //           //         style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%236b7280%27%3e%3cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27%3e%3c/path%3e%3c/svg%3e')", backgroundPosition: "right 0.75rem center", backgroundSize: "1.5em 1.5em" }}
// //           //         required
// //           //       >
// //           //         <option value="">Select Gender</option>
// //           //         <option value="male">Male</option>
// //           //         <option value="female">Female</option>
// //           //         <option value="both">Both</option>
// //           //       </select>
// //           //       {errors.gender && (
// //           //         <p className="mt-1 text-pink-600 text-sm">{errors.gender}</p>
// //           //       )}
// //           //     </div>

// //           //     <div>
// //           //       <label className="block text-lg font-medium text-gray-700 mb-2">Field of Advertising</label>
// //           //       <input
// //           //         type="text"
// //           //         value={field}
// //           //         onChange={(e) => setField(e.target.value)}
// //           //         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //         placeholder="e.g., Fashion, Technology"
// //           //         required
// //           //       />
// //           //       {errors.field && (
// //           //         <p className="mt-1 text-pink-600 text-sm">{errors.field}</p>
// //           //       )}
// //           //     </div>

// //           //     <div>
// //           //       <label className="block text-lg font-medium text-gray-700 mb-2">Targeted Content Type</label>
// //           //       <input
// //           //         type="text"
// //           //         value={contentType}
// //           //         onChange={(e) => setContentType(e.target.value)}
// //           //         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
// //           //         placeholder="e.g., Travel, Technology, Food"
// //           //         required
// //           //       />
// //           //       {errors.contentType && (
// //           //         <p className="mt-1 text-pink-600 text-sm">{errors.contentType}</p>
// //           //       )}
// //           //     </div>
// //           //   </div>

// //           //   <div className="pt-6">
// //           //     <button
// //           //       type="submit"
// //           //       disabled={loading}
// //           //       className="w-full py-4 px-6 text-white text-lg font-medium rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300"
// //           //     >
// //           //       {loading ? (
// //           //         <span className="flex items-center justify-center">
// //           //           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //           //             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //           //             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //           //           </svg>
// //           //           Submitting...
// //           //         </span>
// //           //       ) : (
// //           //         "Submit Application"
// //           //       )}
// //           //     </button>
// //           //   </div>
            
// //           //   {success && (
// //           //     <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-500 p-4 mt-6 rounded-lg">
// //           //       <div className="flex">
// //           //         <div className="flex-shrink-0">
// //           //           <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //           //             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //           //           </svg>
// //           //         </div>
// //           //         <div className="ml-3">
// //           //           <p className="text-sm text-green-800">
// //           //             Profile created successfully!
// //           //           </p>
// //           //         </div>
// //           //       </div>
// //           //     </div>
// //           //   )}
// //           // </form>
// // //         </div>
        
// // //         <div className="mt-8 text-center">
// // //           <p className="text-sm text-gray-600">
// // //             Have questions? <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">Contact us</a>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default InfluencerForm;



// // import { useState } from 'react';
// // import axios from 'axios';

// // const InfluencerForm = () => {
// //   const [currentStep, setCurrentStep] = useState(1);

// //   // بيانات النموذج للمراحل
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     email: '',
// //     phone: '',
// //     password: '',
// //     reason: '',
// //     goal: '',
// //     followers: '',
// //     field: '',
// //     contentType: '',
// //   });

// //   // تعيين القيم في النموذج
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       [name]: value
// //     }));
// //   };

// //   // الانتقال إلى المرحلة التالية
// //   const nextStep = () => {
// //     if (validateStep(currentStep)) {
// //       setCurrentStep(prevStep => prevStep + 1);
// //     }
// //   };

// //   // التحقق من البيانات في كل مرحلة
// //   const validateStep = (step) => {
// //     switch (step) {
// //       case 1:
// //         return formData.fullName && formData.email && formData.phone && formData.password;
// //       case 2:
// //         return formData.reason && formData.goal;
// //       case 3:
// //         return formData.followers && formData.field && formData.contentType;
// //       default:
// //         return false;
// //     }
// //   };

// //   // إرسال النموذج بعد إتمام جميع المراحل
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:4000/influencer/register/cgcghj', formData);
// //       if (response.data.message === 'Influencer profile created successfully') {
// //         alert('Profile submitted successfully!');
// //         setFormData({
// //           fullName: '',
// //           email: '',
// //           phone: '',
// //           password: '',
// //           reason: '',
// //           goal: '',
// //           followers: '',
// //           field: '',
// //           contentType: '',
// //         });
// //         setCurrentStep(1);
// //       } else {
// //         alert('There was an issue with your submission.');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert('Something went wrong');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
// //         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
// //           Influencer Registration
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* المرحلة 1: الاسم والبريد وكلمة السر */}
// //           {currentStep === 1 && (
// //             <div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
// //                 <input
// //                   type="text"
// //                   name="fullName"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
// //                 <input
// //                   type="tel"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
// //                 <input
// //                   type="password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           {/* المرحلة 2: سبب الانضمام والهدف */}
// //           {currentStep === 2 && (
// //             <div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join as an influencer?</label>
// //                 <textarea
// //                   name="reason"
// //                   value={formData.reason}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">What is your goal as an influencer?</label>
// //                 <textarea
// //                   name="goal"
// //                   value={formData.goal}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           {/* المرحلة 3: البيانات المتقدمة (المتفاعلين، الجنس، المجال، المحتوى) */}
// //           {currentStep === 3 && (
// //             <div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Number of Followers</label>
// //                 <input
// //                   type="number"
// //                   name="followers"
// //                   value={formData.followers}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Field of Advertising</label>
// //                 <input
// //                   type="text"
// //                   name="field"
// //                   value={formData.field}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Targeted Content Type</label>
// //                 <input
// //                   type="text"
// //                   name="contentType"
// //                   value={formData.contentType}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender of Audience</label>
// //                 <select
// //                   name="gender"
// //                   value={formData.gender}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                 >
// //                   <option value="">Select Gender</option>
// //                   <option value="male">Male</option>
// //                   <option value="female">Female</option>
// //                   <option value="both">Both</option>
// //                 </select>
// //               </div>
// //             </div>
// //           )}

// //           {/* زر للانتقال إلى المرحلة التالية أو إرسال البيانات */}
// //           <div className="flex justify-between items-center">
// //             <button
// //               type="button"
// //               onClick={() => setCurrentStep(currentStep - 1)}
// //               disabled={currentStep === 1}
// //               className="bg-gray-500 text-white p-3 rounded-xl"
// //             >
// //               Previous
// //             </button>
// //             <button
// //               type="button"
// //               onClick={nextStep}
// //               className="bg-blue-500 text-white p-3 rounded-xl"
// //             >
// //               {currentStep === 3 ? 'Submit' : 'Next'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default InfluencerForm;


// import { useState } from 'react';
// import axios from 'axios';

// const InfluencerForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [profileImage, setProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   // بيانات النموذج للمراحل
//   const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//           setProfileImage(file);
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             setImagePreview(reader.result);
//           };
//           reader.readAsDataURL(file);
//         }
//       };
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     location: '',
//     reason: '',
//     goal: '',
//     followers: '',
//     field: '',
//     contentType: '',
//     socialLinks: { instagram: '', youtube: '', twitter: '' },
//   });

//   // تعيين القيم في النموذج
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // الانتقال إلى المرحلة التالية
//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prevStep => prevStep + 1);
//     }
//   };

//   // التحقق من البيانات في كل مرحلة
//   const validateStep = (step) => {
//     switch (step) {
//       case 1:
//         return formData.fullName && formData.email && formData.phone && formData.password && formData.confirmPassword && formData.location;
//       case 2:
//         return formData.reason && formData.goal;
//       case 3:
//         return formData.followers && formData.field && formData.contentType;
//       default:
//         return false;
//     }
//   };

//   // إرسال النموذج بعد إتمام جميع المراحل
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/influencer/register', formData);
//       if (response.data.message === 'Influencer profile created successfully') {
//         alert('Profile submitted successfully!');
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           password: '',
//           confirmPassword: '',
//           location: '',
//           reason: '',
//           goal: '',
//           followers: '',
//           field: '',
//           contentType: '',
//           socialLinks: { instagram: '', youtube: '', twitter: '' },
//         });
//         setCurrentStep(1);
//       } else {
//         alert('There was an issue with your submission.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
//           Influencer Registration
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* المرحلة 1: الاسم والبريد وكلمة السر */}
//   {/* المرحلة 1: الاسم والبريد وكلمة السر */}
//   {currentStep === 1 && (
//             <div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-xl"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-xl"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-xl"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-xl"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-xl"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-xl"
//                 />
//               </div>
//             </div>
//           )}
//         {/* المرحلة 2: سبب الانضمام */}
// {currentStep === 2 && (
//   <div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join as an influencer?</label>
      
//       <div className="space-y-4">
//         {/* Multiple choice for goals */}
//         <div className="flex items-center space-x-4">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               value="To market products"
//               onChange={(e) => handleGoalChange(e)}
//               className="w-4 h-4 text-purple-500 border-gray-300 rounded"
//             />
//             <span>Market products</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               value="To build personal brand"
//               onChange={(e) => handleGoalChange(e)}
//               className="w-4 h-4 text-purple-500 border-gray-300 rounded"
//             />
//             <span>Build personal brand</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               value="To collaborate with brands"
//               onChange={(e) => handleGoalChange(e)}
//               className="w-4 h-4 text-purple-500 border-gray-300 rounded"
//             />
//             <span>Collaborate with brands</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               value="To gain recognition"
//               onChange={(e) => handleGoalChange(e)}
//               className="w-4 h-4 text-purple-500 border-gray-300 rounded"
//             />
//             <span>Gain recognition</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               value="To make money"
//               onChange={(e) => handleGoalChange(e)}
//               className="w-4 h-4 text-purple-500 border-gray-300 rounded"
//             />
//             <span>Make money</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               value="Other"
//               onChange={(e) => handleGoalChange(e)}
//               className="w-4 h-4 text-purple-500 border-gray-300 rounded"
//             />
//             <span>Other (please specify)</span>
//           </label>
//         </div>
        
//         {/* If 'Other' is selected, show an input field */}
//         {formData.selectedGoals.includes('Other') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Please specify your goal</label>
//             <input
//               type="text"
//               name="otherGoal"
//               value={formData.otherGoal}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-xl"
//               placeholder="Enter your specific reason"
//             />
//           </div>
//         )}
//       </div>
//     </div>

//     {/* Additional Question */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">What is your primary target audience?</label>
//       <input
//         type="text"
//         name="targetAudience"
//         value={formData.targetAudience}
//         onChange={handleChange}
//         className="w-full p-3 border border-gray-300 rounded-xl"
//         placeholder="e.g., 18-24 year olds, Tech Enthusiasts, Foodies"
//       />
//     </div>
//   </div>
// )}

  
// <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
//          <div className="h-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
          
//  <form onSubmit={handleSubmit} className="p-8 space-y-6">
//   {/* Profile Image Upload */}
//   <div className="text-center">
//     <label className="block text-lg font-medium text-gray-700 mb-2">
//      Profile Image
//     </label>
//    <div className="flex flex-col items-center">
//    <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-purple-100">
// {imagePreview ? (
//                     <img 
//                       src={imagePreview} 
//                       alt="Profile Preview" 
//                       className="w-full h-full object-cover" 
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full text-gray-400">
//                       <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 <label className="relative cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
//                   <span>Upload Image</span>
//                   <input 
//                     type="file" 
//                     className="hidden" 
//                     accept="image/*" 
//                     onChange={handleImageChange} 
//                   />
//                 </label>
//                 {errors.profileImage && (
//                   <p className="mt-2 text-pink-600 text-sm">{errors.profileImage}</p>
//                 )}
//               </div>
//             </div>

//             {/* Social Media Links */}
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-2">
//                 Social Media Profiles <span className="text-sm text-pink-600">(at least one required)</span>
//               </label>
//               {errors.socialLinks && (
//                 <p className="mb-2 text-pink-600 text-sm">{errors.socialLinks}</p>
//               )}
              
//               <div className="space-y-4">
//                 {/* Instagram */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="md:col-span-2 relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <rect x="2" y="2" width="20" height="20" rx="5" />
//                         <circle cx="12" cy="12" r="4" />
//                         <circle cx="18" cy="6" r="1" />
//                       </svg>
//                     </div>
//                     <input
//                       type="url"
//                       placeholder="Instagram profile URL"
//                       value={socialLinks.instagram.url}
//                       onChange={(e) => handleSocialLinkChange('instagram', 'url', e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="number"
//                       placeholder="Followers count"
//                       value={socialLinks.instagram.followers}
//                       onChange={(e) => handleSocialLinkChange('instagram', 'followers', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                     />
//                   </div>
//                 </div>
                
//                 {/* YouTube */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="md:col-span-2 relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
//                         <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
//                       </svg>
//                     </div>
//                     <input
//                       type="url"
//                       placeholder="YouTube channel URL"
//                       value={socialLinks.youtube.url}
//                       onChange={(e) => handleSocialLinkChange('youtube', 'url', e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="number"
//                       placeholder="Subscribers count"
//                       value={socialLinks.youtube.followers}
//                       onChange={(e) => handleSocialLinkChange('youtube', 'followers', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                     />
//                   </div>
//                 </div>
                
//                 {/* Twitter */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="md:col-span-2 relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
//                       </svg>
//                     </div>
//                     <input
//                       type="url"
//                       placeholder="Twitter profile URL"
//                       value={socialLinks.twitter.url}
//                       onChange={(e) => handleSocialLinkChange('twitter', 'url', e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="number"
//                       placeholder="Followers count"
//                       value={socialLinks.twitter.followers}
//                       onChange={(e) => handleSocialLinkChange('twitter', 'followers', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-lg font-medium text-gray-700 mb-2">Ad Price (USD)</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <line x1="12" y1="1" x2="12" y2="23"></line>
//                       <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                     </svg>
//                   </div>
//                   <input
//                     type="number"
//                     value={adPrice}
//                     onChange={(e) => setAdPrice(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                     placeholder="Enter your ad price"
//                     required
//                   />
//                 </div>
//                 {errors.adPrice && (
//                   <p className="mt-1 text-pink-600 text-sm">{errors.adPrice}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-lg font-medium text-gray-700 mb-2">Target Age Range</label>
//                 <input
//                   type="text"
//                   value={targetAge}
//                   onChange={(e) => setTargetAge(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                   placeholder="e.g., 18-34"
//                   required
//                 />
//                 {errors.targetAge && (
//                   <p className="mt-1 text-pink-600 text-sm">{errors.targetAge}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-lg font-medium text-gray-700 mb-2">Most Common Gender in Audience</label>
//                 <select
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200 appearance-none bg-no-repeat bg-right"
//                   style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%236b7280%27%3e%3cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27%3e%3c/path%3e%3c/svg%3e')", backgroundPosition: "right 0.75rem center", backgroundSize: "1.5em 1.5em" }}
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="both">Both</option>
//                 </select>
//                 {errors.gender && (
//                   <p className="mt-1 text-pink-600 text-sm">{errors.gender}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-lg font-medium text-gray-700 mb-2">Field of Advertising</label>
//                 <input
//                   type="text"
//                   value={field}
//                   onChange={(e) => setField(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                   placeholder="e.g., Fashion, Technology"
//                   required
//                 />
//                 {errors.field && (
//                   <p className="mt-1 text-pink-600 text-sm">{errors.field}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-lg font-medium text-gray-700 mb-2">Targeted Content Type</label>
//                 <input
//                   type="text"
//                   value={contentType}
//                   onChange={(e) => setContentType(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-200"
//                   placeholder="e.g., Travel, Technology, Food"
//                   required
//                 />
//                 {errors.contentType && (
//                   <p className="mt-1 text-pink-600 text-sm">{errors.contentType}</p>
//                 )}
//               </div>
//             </div>

//             <div className="pt-6">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-4 px-6 text-white text-lg font-medium rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting...
//                   </span>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </button>
//             </div>
            
//             {success && (
//               <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-500 p-4 mt-6 rounded-lg">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-green-800">
//                       Profile created successfully!
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </form>
//         </div>
//           {/* زر للانتقال إلى المرحلة التالية أو إرسال البيانات */}
//           <div className="flex justify-between items-center">
//             <button
//               type="button"
//               onClick={() => setCurrentStep(currentStep - 1)}
//               disabled={currentStep === 1}
//               className="bg-gray-500 text-white p-3 rounded-xl"
//             >
//               Previous
//             </button>
//             <button
//               type="button"
//               onClick={nextStep}
//               className="bg-blue-500 text-white p-3 rounded-xl"
//             >
//               {currentStep === 3 ? 'Submit' : 'Next'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InfluencerForm;













import React, { useState } from 'react';
import axios from 'axios'
import { toast } from "react-toastify";
const InfluencerRegistrationForm = () => {
  // State for all form fields
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    
    // Step 2
    isInfluencer: '',
    hasDonePreviousAds: '',
    previousProduct: '',
    joinReason: [],
    otherReason: '',
    
    // Step 3
    profileImage: null,
    socialLinks: [{ platform: '', followers: '', url: '' }],
    targetContent: [],
    audienceGender: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e, group) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({ ...formData, [group]: [...formData[group], value] });
    } else {
      setFormData({ 
        ...formData, 
        [group]: formData[group].filter(item => item !== value) 
      });
    }
  };

  // Handle social media links
  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  // Add new social media link field
  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: '', followers: '', url: '' }]
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  // Handle form submission
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//     const response = await axios.post("",formData)
//     // Send data to API - this would be implemented with fetch or axios
//     console.log("Form data to send to API:", formData);
//   //  toast.success("Form submitted successfully!");
//   if (response.status === 200) {
//     toast.success("Form submitted successfully!");
//   } else {
//     toast.error("There was an error with the submission.");
//   }
//   }catch (error) {
//     console.error("Error:", error);
//     toast.error("There was an error with the submission.");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  // التحقق من الحقول قبل الإرسال
  if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.password || !formData.confirmPassword) {
    toast.error("Please fill all required fields in Step 1.");
    return;
  }

  if (!formData.profileImage) {
    toast.error("Please upload a profile image.");
    return;
  }

  // إنشاء FormData لإرسال البيانات
  const form = new FormData();
  form.append('name', formData.name);
  form.append('email', formData.email);
  form.append('phone', formData.phone);
  form.append('location', formData.location);
  form.append('password', formData.password);
  form.append('confirmPassword', formData.confirmPassword);
  form.append('isInfluencer', formData.isInfluencer);
  form.append('hasDonePreviousAds', formData.hasDonePreviousAds);
  form.append('previousProduct', formData.previousProduct);
  form.append('joinReason', formData.joinReason);
  form.append('otherReason', formData.otherReason);
  form.append('targetContent', formData.targetContent);
  form.append('audienceGender', formData.audienceGender);
  if (formData.profileImage) {
    form.append('profileImage', formData.profileImage);
  }

  // إضافة الروابط الاجتماعية (إذا كانت موجودة)
  formData.socialLinks.forEach((link, index) => {
    form.append(`socialLinks[${index}][platform]`, link.platform);
    form.append(`socialLinks[${index}][followers]`, link.followers);
    form.append(`socialLinks[${index}][url]`, link.url);
  });
  try {
    const response = await axios.post("http://localhost:4000/api/influencer/register", form, {
      headers: {
        'Content-Type': 'multipart/form-data', // تأكد من أنك تستخدم هذا النوع من البيانات
      },
    });

  
      toast.success("Form submitted successfully!");
    
  } catch (error) {
    toast.error("There was an error with the submission.");
    console.error("Error:", error);
  }
};







  // Next step
  const nextStep = () => {
    if (currentStep === 1) {
      // تحقق من الحقول في الخطوة الأولى
      if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill all required fields in Step 1.");
        return;
      }
    } else if (currentStep === 2) {
      // تحقق من الحقول في الخطوة الثانية (مثل اختيار إذا كنت مؤثرًا أم لا)
      if (!formData.isInfluencer) {
        toast.error("Please answer if you are an influencer in Step 2.");
        return;
      }
    } else if (currentStep === 3) {
      // تحقق من رفع صورة في الخطوة الثالثة
      if (!formData.profileImage) {
        toast.error("Please upload a profile image.");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  // Previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Influencer Registration
          </h2>
          <div className="flex justify-between mt-6 mb-8">
            <span className={`w-1/3 text-center py-2 rounded-lg font-medium text-sm ${currentStep === 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              Step 1
            </span>
            <span className={`w-1/3 mx-2 text-center py-2 rounded-lg font-medium text-sm ${currentStep === 2 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              Step 2
            </span>
            <span className={`w-1/3 text-center py-2 rounded-lg font-medium text-sm ${currentStep === 3 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              Step 3
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Influencer Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Are you an influencer?</p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isInfluencer"
                      value="yes"
                      checked={formData.isInfluencer === 'yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isInfluencer"
                      value="no"
                      checked={formData.isInfluencer === 'no'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Have you done advertisements before?</p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasDonePreviousAds"
                      value="yes"
                      checked={formData.hasDonePreviousAds === 'yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasDonePreviousAds"
                      value="no"
                      checked={formData.hasDonePreviousAds === 'no'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </div>
              
              {formData.hasDonePreviousAds === 'yes' && (
                <div>
                  <label htmlFor="previousProduct" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="previousProduct"
                    name="previousProduct"
                    value={formData.previousProduct}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              )}
              
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Reason for joining</p>
                <div className="space-y-2">
                  {['Increase Followers', 'Earn Money', 'Find New Brands', 'Network with Influencers', 'Other'].map((reason) => (
                    <label key={reason} className="inline-flex items-center block">
                      <input
                        type="checkbox"
                        value={reason}
                        checked={formData.joinReason.includes(reason)}
                        onChange={(e) => handleCheckboxChange(e, 'joinReason')}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
                
                {formData.joinReason.includes('Other') && (
                  <div className="mt-3">
                    <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700">Please specify</label>
                    <input
                      type="text"
                      id="otherReason"
                      name="otherReason"
                      value={formData.otherReason}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Profile and Social Media */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Profile Image</p>
                <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {formData.profileImage ? (
                      <div className="text-purple-500">
                        Image selected: {formData.profileImage.name}
                      </div>
                    ) : (
                      <>
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="profileImage" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-500 hover:text-purple-600 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id="profileImage" name="profileImage" type="file" className="sr-only" onChange={handleImageUpload} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</p>
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <select
                        value={link.platform}
                        onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Platform</option>
                        <option value="instagram">Instagram</option>
                        <option value="tiktok">TikTok</option>
                        <option value="youtube">YouTube</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Followers (e.g. 10K)"
                        value={link.followers}
                        onChange={(e) => handleSocialLinkChange(index, 'followers', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  + Add Another
                </button>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Target Content</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Fashion', 'Beauty', 'Lifestyle', 'Tech', 'Food', 'Travel'].map((content) => (
                    <label key={content} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={content}
                        checked={formData.targetContent.includes(content)}
                        onChange={(e) => handleCheckboxChange(e, 'targetContent')}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{content}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Audience Gender Majority</p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="audienceGender"
                      value="male"
                      checked={formData.audienceGender === 'male'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="audienceGender"
                      value="female"
                      checked={formData.audienceGender === 'female'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="audienceGender"
                      value="balanced"
                      checked={formData.audienceGender === 'balanced'}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Balanced</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InfluencerRegistrationForm;

  