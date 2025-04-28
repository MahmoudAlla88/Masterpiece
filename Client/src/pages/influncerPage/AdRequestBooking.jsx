// import React, { useState } from 'react';
// import axios from 'axios';

// const AdRequestBooking = () => {
    
//   const [influencerId, setInfluencerId] = useState('');
//   const [campaignTitle, setCampaignTitle] = useState('');
//   const [brief, setBrief] = useState('');
//   const [platform, setPlatform] = useState('instagram');
//   const [contentType, setContentType] = useState('reel');
//   const [proposedPrice, setProposedPrice] = useState('');
//   const [requestedDate, setRequestedDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/users/request-ad',  // تأكد من المسار الصحيح للـ backend
//         {
//           influencerId,
//           campaignTitle,
//           brief,
//           platform,
//           contentType,
//           proposedPrice,
//           requestedDate,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,  // إضافة token إذا كان موجود
//           },
//         }
//       );
//       setSuccessMessage('تم إرسال طلب الإعلان بنجاح');
//     } catch (error) {
//       setErrorMessage('حدث خطأ أثناء إرسال الطلب');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">طلب إعلان من مؤثّر</h2>
      
//       {errorMessage && (
//         <div className="mb-4 text-red-600">{errorMessage}</div>
//       )}
//       {successMessage && (
//         <div className="mb-4 text-green-600">{successMessage}</div>
//       )}

//       <form onSubmit={handleSubmit}>
      

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="campaignTitle">
//             عنوان الحملة
//           </label>
//           <input
//             id="campaignTitle"
//             type="text"
//             value={campaignTitle}
//             onChange={(e) => setCampaignTitle(e.target.value)}
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="brief">
//             وصف الحملة
//           </label>
//           <textarea
//             id="brief"
//             value={brief}
//             onChange={(e) => setBrief(e.target.value)}
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="platform">
//             المنصّة المستهدفة
//           </label>
//           <select
//             id="platform"
//             value={platform}
//             onChange={(e) => setPlatform(e.target.value)}
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//             required
//           >
//             <option value="instagram">Instagram</option>
//             <option value="tiktok">TikTok</option>
//             <option value="youtube">YouTube</option>
//             <option value="facebook">Facebook</option>
//             <option value="other">أخرى</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="contentType">
//             نوع المحتوى
//           </label>
//           <select
//             id="contentType"
//             value={contentType}
//             onChange={(e) => setContentType(e.target.value)}
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//             required
//           >
//             <option value="post">منشور</option>
//             <option value="story">ستوري</option>
//             <option value="reel">ريل</option>
//             <option value="video">فيديو</option>
//             <option value="blog">مدونة</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="proposedPrice">
//             السعر المقترح
//           </label>
//           <input
//             id="proposedPrice"
//             type="number"
//             value={proposedPrice}
//             onChange={(e) => setProposedPrice(e.target.value)}
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="requestedDate">
//             التاريخ المطلوب للنشر
//           </label>
//           <input
//             id="requestedDate"
//             type="datetime-local"
//             value={requestedDate}
//             onChange={(e) => setRequestedDate(e.target.value)}
//             className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className={`w-full p-3 mt-4 bg-blue-600 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={loading}
//         >
//           {loading ? 'جاري إرسال الطلب...' : 'إرسال الطلب'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdRequestBooking;
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';  // تأكد من استيراد axios
import {  toast } from 'react-toastify'; 

export default function AdRequestBooking() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser)
  const [influencerId, setInfluencerId] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [contentType, setContentType] = useState('reel');
  const [proposedPrice, setProposedPrice] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'http://localhost:4000/api/users/request-ad',  
        {
         userId: currentUser?.id,
          influencerId:id,
          campaignTitle,
          brief,
          platform,
          contentType,
          proposedPrice,
          requestedDate,
        }
      );
      setSuccessMessage('The advertisement request was successfully sent.');
      toast.success('The advertisement request was successfully sent.');
    } catch (error) {
      setErrorMessage('An error occurred while sending the request.');
      toast.error('An error occurred while sending the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black">Influencer Advertisement Booking</h1>
        <p className="text-gray-600 mt-2">Complete the form below to request promotional content from your selected influencer</p>
      </div>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="campaignTitle">
            Campaign Title <span className="text-red-500">*</span>
          </label>
          <input
            id="campaignTitle"
            type="text"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
            placeholder="e.g. Summer Fashion Collection Launch"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Enter a clear, concise title for your campaign</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="brief">
            Campaign Brief <span className="text-red-500">*</span>
          </label>
          <textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
            placeholder="Describe your product/service, campaign goals, key messages, and any specific instructions for the influencer..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">Provide detailed information to help the influencer understand your expectations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="platform">
              Target Platform <span className="text-red-500">*</span>
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
              required
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="facebook">Facebook</option>
              <option value="snapchat">Snapchat</option>
              <option value="twitter">Twitter</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contentType">
              Content Type <span className="text-red-500">*</span>
            </label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
              required
            >
              <option value="post">Static Post</option>
              <option value="story">Story</option>
              <option value="reel">Reel</option>
              <option value="video">Video</option>
              <option value="blog">Blog</option>
              <option value="review">Product Review</option>
              <option value="unboxing">Unboxing</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="proposedPrice">
              Proposed Price (JD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="proposedPrice"
                type="number"
                min="0"
                step="0.01"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
                placeholder="0.00"
                required
              />
              <span className="absolute left-3 top-3 text-gray-500">JD</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter your budget in Jordanian Dinars</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="requestedDate">
              Requested Publish Date <span className="text-red-500">*</span>
            </label>
            <input
              id="requestedDate"
              type="datetime-local"
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Select your preferred publishing date and time</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className={`w-full p-4 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Ad Request'}
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            By submitting this form, you agree to our terms of service and privacy policy
          </p>
        </div>
      </form>
    </div>
  );
}