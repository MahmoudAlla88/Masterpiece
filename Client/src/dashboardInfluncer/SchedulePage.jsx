// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useSelector } from 'react-redux';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { toast } from 'react-toastify';

// const SchedulePage = () => {
//   const [acceptedRequests, setAcceptedRequests] = useState([]);
//   const [scheduleData, setScheduleData] = useState({});
//   const user = useSelector((state) => state.user.currentUser);

//   useEffect(() => {
    // const fetchAcceptedRequests = async () => {
    //   try {
    //     const token = Cookies.get('token');
    //     const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });

    //     const accepted = response.data.filter(req => req.status === 'accepted');
    //     setAcceptedRequests(accepted);
    //   } catch (error) {
    //     console.error('فشل في جلب الطلبات:', error);
    //   }
    // };

//     if (user?.userId) {
//       fetchAcceptedRequests();
//     }
//   }, [user]);

//   const handleDateChange = (requestId, date) => {
//     setScheduleData(prev => ({
//       ...prev,
//       [requestId]: {
//         ...prev[requestId],
//         date,
//       },
//     }));
//   };

//   const handleTimeChange = (requestId, time) => {
//     setScheduleData(prev => ({
//       ...prev,
//       [requestId]: {
//         ...prev[requestId],
//         time,
//       },
//     }));
//   };

//   const handleSaveSchedule = async (requestId) => {
//     const { date, time } = scheduleData[requestId] || {};

//     if (!date || !time) {
//       toast.error('يرجى تحديد كل من التاريخ والوقت');
//       return;
//     }

//     try {
//       const token = Cookies.get('token');
//       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/schedule`, {
//         scheduledDate: date.toISOString().split('T')[0], // yyyy-mm-dd
//         scheduledTime: time,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success('تم حفظ الجدولة بنجاح!');
//     } catch (error) {
//       console.error('فشل في حفظ الجدولة:', error);
//       toast.error('فشل في حفظ الجدولة');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">جدولة الإعلانات المقبولة</h2>
//       {acceptedRequests.length === 0 ? (
//         <p className="text-gray-500">لا توجد طلبات مقبولة حاليًا.</p>
//       ) : (
//         <div className="grid gap-6">
//           {acceptedRequests.map((request) => (
//             <div key={request.id} className="bg-white shadow p-4 rounded-lg border border-gray-200">
//               <p className="text-lg font-semibold">{request.adTitle}</p>
//               <p className="text-sm text-gray-500">{request.adDetails}</p>
//               <p className="text-sm text-gray-500">الميزانية: {request.budget}</p>

//               <div className="flex flex-col md:flex-row gap-4 mt-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">تاريخ النشر:</label>
//                   <DatePicker
//                     selected={scheduleData[request.id]?.date || null}
//                     onChange={(date) => handleDateChange(request.id, date)}
//                     dateFormat="yyyy-MM-dd"
//                     className="border rounded px-3 py-2 w-full"
//                     placeholderText="اختر التاريخ"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">الوقت:</label>
//                   <input
//                     type="time"
//                     className="border rounded px-3 py-2 w-full"
//                     value={scheduleData[request.id]?.time || ''}
//                     onChange={(e) => handleTimeChange(request.id, e.target.value)}
//                   />
//                 </div>
//               </div>

//               <button
//                 onClick={() => handleSaveSchedule(request.id)}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 حفظ الجدولة
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SchedulePage;
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const SchedulePage = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [events, setEvents] = useState([]);

  const fetchScheduledAds = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // فلترة الطلبات المجدوَلة فقط وتحويلها لأحداث في التقويم
      const scheduledEvents = response.data
        .filter((request) => request.status === 'scheduled')
        .map((request) => ({
          title: request.adTitle,
          start: new Date(`${request.scheduledDate}T${request.scheduledTime}`),
          end: new Date(moment(`${request.scheduledDate}T${request.scheduledTime}`).add(1, 'hour')),
          allDay: false,
        }));

      setEvents(scheduledEvents);
    } catch (error) {
      console.error('Failed to load scheduled ads:', error);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchScheduledAds();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Scheduled Ads Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default SchedulePage;
