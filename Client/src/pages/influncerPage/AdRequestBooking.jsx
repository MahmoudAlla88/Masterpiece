

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';  
import {  toast } from 'react-toastify'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AdRequestBooking() {
  const location = useLocation();
  console.log(location.state)
  const influencerPrice = parseFloat(location.state?.influencerPrice || 0);
 const influncerName=location.state?.influencerName;
 console.log(influncerName);
  console.log("influencerPrice",influencerPrice);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
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
 const [bookedSlots, setBookedSlots] = useState([]);
 useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/influencers/${id}/booked-slots`, {
          params: { start: new Date().toISOString(), end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() }
        });
            const formattedBookedSlots = response.data.map((slot) => {
          const start = new Date(slot.startTime);
          const end = new Date(slot.endTime);

          return { start, end };
        });
        setBookedSlots(formattedBookedSlots); 
        console.log("date",formattedBookedSlots);
      } catch (err) {
        toast.error('حدث خطأ أثناء جلب المواعيد المحجوزة');
      }
    };

    fetchBookedSlots();
  }, [id]);
   const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth()    === d2.getMonth() &&
    d1.getDate()     === d2.getDate();
const getExcludedTimes = (bookedSlots) => {
    const excludedTimes = [];

    bookedSlots.forEach((slot) => {
      let currentTime = new Date(slot.start);
      while (currentTime <= slot.end) {
        excludedTimes.push(new Date(currentTime)); 
        currentTime.setMinutes(currentTime.getMinutes() + 1);  
      }
    });

    return excludedTimes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const payload = {
      userId: currentUser?.id,
      influencerId: id,
      influncerName,
      campaignTitle,
      brief,
      platform,
      contentType,
      proposedPrice: influencerPrice,
      requestedDate,
   
    };

    // Navigate to payment page with all data
    navigate('/payment', { state: payload });
  };
  return (
    <div  className="bg-gradient-to-br from-blue-50 to-purple-100 w-[100%] p-10 flex-grow">
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent">Influencer Advertisement Booking</h1>
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
        
        value={influencerPrice}
  
        readOnly
        className="w-full p-3 pl-10 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
        placeholder="0.00"
        required
      />
              <span className="absolute left-3 top-3 text-gray-500">JD</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter your budget in Jordanian Dinars</p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="requestedDate">
              Requested Publish Date <span className="text-red-500">*</span>
            </label>
            {/* <input
              id="requestedDate"
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}  
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
              required
            /> */}
               {/* حقل الـ DatePicker مع استبعاد المواعيد المحجوزة */}
               
       <DatePicker
        id="requestedDate"
        selected={requestedDate}
        onChange={(date) => setRequestedDate(date)}  // تحديث التاريخ عند تغييره
        showTimeSelect
        minDate={new Date()}  // منع اختيار تواريخ ماضية
        // excludeTimes={getExcludedTimes(bookedSlots)}  // استبعاد الأوقات بين start و end
       filterTime={(time) =>                         // ✔️ أضفت هذا
    !bookedSlots.some(slot =>
      isSameDay(time, slot.start) &&            // زِمِن نفس اليوم
     time.getTime() >= slot.start.getTime() && // داخل المدة المحجوزة
      time.getTime() <= slot.end.getTime()
    )
  }
        dateFormat="Pp"  // تنسيق عرض التاريخ والوقت
        placeholderText="Select a date and time"  // النص الافتراضي في الـ input
        required
        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"  // تخصيص التصميم

      />
            <p className="text-xs text-gray-500 mt-1">Select your preferred publishing date and time</p> 
              {/* <DatePicker
        selected={requestedDate}
        onChange={(date) => setRequestedDate(date)}
        showTimeSelect
        minDate={new Date()}
        excludeTimes={bookedSlots.map(d => new Date(d))}
        dateFormat="Pp"
      /> */}
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
    </div></div>
  );
}