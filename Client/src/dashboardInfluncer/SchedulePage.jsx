// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';
// // // // import Cookies from 'js-cookie';
// // // // import { useSelector } from 'react-redux';
// // // // import DatePicker from 'react-datepicker';
// // // // import 'react-datepicker/dist/react-datepicker.css';
// // // // import { toast } from 'react-toastify';

// // // // const SchedulePage = () => {
// // // //   const [acceptedRequests, setAcceptedRequests] = useState([]);
// // // //   const [scheduleData, setScheduleData] = useState({});
// // // //   const user = useSelector((state) => state.user.currentUser);

// // // //   useEffect(() => {
// // //     // const fetchAcceptedRequests = async () => {
// // //     //   try {
// // //     //     const token = Cookies.get('token');
// // //     //     const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
// // //     //       headers: { Authorization: `Bearer ${token}` },
// // //     //     });

// // //     //     const accepted = response.data.filter(req => req.status === 'accepted');
// // //     //     setAcceptedRequests(accepted);
// // //     //   } catch (error) {
// // //     //     console.error('فشل في جلب الطلبات:', error);
// // //     //   }
// // //     // };

// // // //     if (user?.userId) {
// // // //       fetchAcceptedRequests();
// // // //     }
// // // //   }, [user]);

// // // //   const handleDateChange = (requestId, date) => {
// // // //     setScheduleData(prev => ({
// // // //       ...prev,
// // // //       [requestId]: {
// // // //         ...prev[requestId],
// // // //         date,
// // // //       },
// // // //     }));
// // // //   };

// // // //   const handleTimeChange = (requestId, time) => {
// // // //     setScheduleData(prev => ({
// // // //       ...prev,
// // // //       [requestId]: {
// // // //         ...prev[requestId],
// // // //         time,
// // // //       },
// // // //     }));
// // // //   };

// // // //   const handleSaveSchedule = async (requestId) => {
// // // //     const { date, time } = scheduleData[requestId] || {};

// // // //     if (!date || !time) {
// // // //       toast.error('يرجى تحديد كل من التاريخ والوقت');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const token = Cookies.get('token');
// // // //       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/schedule`, {
// // // //         scheduledDate: date.toISOString().split('T')[0], // yyyy-mm-dd
// // // //         scheduledTime: time,
// // // //       }, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       toast.success('تم حفظ الجدولة بنجاح!');
// // // //     } catch (error) {
// // // //       console.error('فشل في حفظ الجدولة:', error);
// // // //       toast.error('فشل في حفظ الجدولة');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h2 className="text-2xl font-bold mb-6">جدولة الإعلانات المقبولة</h2>
// // // //       {acceptedRequests.length === 0 ? (
// // // //         <p className="text-gray-500">لا توجد طلبات مقبولة حاليًا.</p>
// // // //       ) : (
// // // //         <div className="grid gap-6">
// // // //           {acceptedRequests.map((request) => (
// // // //             <div key={request.id} className="bg-white shadow p-4 rounded-lg border border-gray-200">
// // // //               <p className="text-lg font-semibold">{request.adTitle}</p>
// // // //               <p className="text-sm text-gray-500">{request.adDetails}</p>
// // // //               <p className="text-sm text-gray-500">الميزانية: {request.budget}</p>

// // // //               <div className="flex flex-col md:flex-row gap-4 mt-4">
// // // //                 <div>
// // // //                   <label className="block text-sm font-medium mb-1">تاريخ النشر:</label>
// // // //                   <DatePicker
// // // //                     selected={scheduleData[request.id]?.date || null}
// // // //                     onChange={(date) => handleDateChange(request.id, date)}
// // // //                     dateFormat="yyyy-MM-dd"
// // // //                     className="border rounded px-3 py-2 w-full"
// // // //                     placeholderText="اختر التاريخ"
// // // //                   />
// // // //                 </div>

// // // //                 <div>
// // // //                   <label className="block text-sm font-medium mb-1">الوقت:</label>
// // // //                   <input
// // // //                     type="time"
// // // //                     className="border rounded px-3 py-2 w-full"
// // // //                     value={scheduleData[request.id]?.time || ''}
// // // //                     onChange={(e) => handleTimeChange(request.id, e.target.value)}
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <button
// // // //                 onClick={() => handleSaveSchedule(request.id)}
// // // //                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // //               >
// // // //                 حفظ الجدولة
// // // //               </button>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SchedulePage;
// // // import React, { useEffect, useState } from 'react';
// // // import { Calendar, momentLocalizer } from 'react-big-calendar';
// // // import { useSelector } from 'react-redux';
// // // import moment from 'moment';
// // // import axios from 'axios';
// // // import Cookies from 'js-cookie';
// // // import 'react-big-calendar/lib/css/react-big-calendar.css';

// // // const localizer = momentLocalizer(moment);

// // // const SchedulePage = () => {
// // //   const user = useSelector((state) => state.user.currentUser);
// // //   const [events, setEvents] = useState([]);

// // //   const fetchScheduledAds = async () => {
// // //     try {
// // //       const token = Cookies.get('token');
// // //       const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       // فلترة الطلبات المجدوَلة فقط وتحويلها لأحداث في التقويم
// // //       const scheduledEvents = response.data
// // //         .filter((request) => request.status === 'scheduled')
// // //         .map((request) => ({
// // //           title: request.adTitle,
// // //           start: new Date(`${request.scheduledDate}T${request.scheduledTime}`),
// // //           end: new Date(moment(`${request.scheduledDate}T${request.scheduledTime}`).add(1, 'hour')),
// // //           allDay: false,
// // //         }));

// // //       setEvents(scheduledEvents);
// // //     } catch (error) {
// // //       console.error('Failed to load scheduled ads:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (user?.userId) {
// // //       fetchScheduledAds();
// // //     }
// // //   }, [user]);

// // //   return (
// // //     <div className="p-6">
// // //       <h2 className="text-2xl font-bold mb-4">Scheduled Ads Calendar</h2>
// // //       <Calendar
// // //         localizer={localizer}
// // //         events={events}
// // //         startAccessor="start"
// // //         endAccessor="end"
// // //         style={{ height: 600 }}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default SchedulePage;
// // import React, { useEffect, useState } from 'react';
// // import { Calendar, momentLocalizer } from 'react-big-calendar';
// // import { useSelector } from 'react-redux';
// // import moment from 'moment';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import 'react-big-calendar/lib/css/react-big-calendar.css';

// // const localizer = momentLocalizer(moment);

// // const SchedulePage = () => {
// //   const { currentUser: user } = useSelector((state) => state.user);
// //   const [events, setEvents] = useState([]);
// // console.log(user)
// //   /** جلب كل حجوزات المؤثّر (مجدولة وغير مجدولة) من الـ API الجديد */
// //   const fetchCalendarBookings = async () => {
// //     if (!user?.id) return;

// //     try {
    

// //       // نرسل مدى التواريخ الّتي يحمّلها التقويم (شهر واحد للأمام والخلف)
// //       const start = moment().startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
// //       const end   = moment().endOf('month').add(1, 'month').format('YYYY-MM-DD');

// //       const  response  = await axios.get(
// //         `http://localhost:4000/api/users/influencers/${user.id}/calendar`,
// //         {
// //           params: { start, end },
          
// //         },
// //       );
// // console.log("gg",response);
// //       /* data شكلها جاهز تقريباً لـ react-big-calendar
// //          → لكن نحولها إلى كائنات Date فعلية
// //       */
// //          const eventsArray = Array.isArray(response.data) ? response.data : [];

// //          /* ❸ نحول الحقول النصية لتواريخ فعلية */
// //          const parsed = eventsArray.map(evt => ({
// //            ...evt,
// //            start: new Date(evt.start),
// //            end:   new Date(evt.end),
// //            allDay: true,          // أو false إذا كان لديك ساعة محدّدة
// //          }));
     
// //          setEvents(parsed);
// //        } catch (error) {
// //          console.error('Failed to load calendar bookings:', error);
// //        }
// //      };

// //   useEffect(() => { fetchCalendarBookings(); }, [user?.id]);

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">إدارة حجوزاتك</h2>
// //       <Calendar
// //         localizer={localizer}
// //         events={events}
// //         startAccessor="start"
// //         endAccessor="end"
// //         style={{ height: 600 }}
// //       />
// //     </div>
// //   );
// // };

// // export default SchedulePage;
// import React, { useEffect, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import { useSelector } from 'react-redux';
// import moment from 'moment';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import Modal from 'react-modal';              // ⬅️ جديد
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment);
// Modal.setAppElement('#root');                 // (يمنع تحذير إمكانية الوصول)

// const SchedulePage = () => {
//   const { currentUser: user } = useSelector((state) => state.user);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);   // ⬅️ جديد

//   /* ----------------------- جلب البيانات ----------------------- */
//   const fetchCalendarBookings = async () => {
//     if (!user?.id) return;

//     try {
//       const token = Cookies.get('token');
//       const start = moment().startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
//       const end   = moment().endOf('month').add(1, 'month').format('YYYY-MM-DD');

//       const { data: eventsArray } = await axios.get(
//         `http://localhost:4000/api/users/influencers/${user.id}/calendar`,
//         { params: { start, end }, headers: { Authorization: `Bearer ${token}` } }
//       );

//       const parsed = eventsArray.map(evt => ({
//         ...evt,
//         start: new Date(evt.start),
//         end:   new Date(evt.end),
//         allDay: true,
//       }));

//       setEvents(parsed);
//     } catch (err) {
//       console.error('Failed to load calendar bookings:', err);
//     }
//   };

//   useEffect(() => { fetchCalendarBookings(); }, [user?.id]);

//   /* -------------------- معالجات (Handlers) -------------------- */
//   const handleEventSelect = event => setSelectedEvent(event);
//   const closeModal       = ()   => setSelectedEvent(null);

//   /* ------------------------- JSX ------------------------- */
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">إدارة حجوزاتك</h2>

//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 600 }}
//         onSelectEvent={handleEventSelect}   // ⬅️ أهمّ سطر
//       />

//       {/* ---------- Modal لعرض تفاصيل الحجز ---------- */}
//       <Modal
//         isOpen={!!selectedEvent}
//         onRequestClose={closeModal}
//         contentLabel="تفاصيل الحجز"
//         className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24 outline-none"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center"
//       >
//         {selectedEvent && (
//           <>
//             <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>

//             <p className="mb-1">
//               <span className="font-semibold">الحالة:</span> {selectedEvent.status}
//             </p>
//             <p className="mb-1">
//               <span className="font-semibold">التاريخ:</span>{' '}
//               {moment(selectedEvent.start).format('YYYY-MM-DD')}
//             </p>
//             <p className="mb-1">
//               <span className="font-semibold">العميل:</span> {selectedEvent.user?.name}
//             </p>

//             {/* أضف أي حقول إضافية تحتاجها (سعر، منصّة، …) */}

//             <button
//               onClick={closeModal}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               إغلاق
//             </button>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default SchedulePage;
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
Modal.setAppElement('#root');

const SchedulePage = () => {
  const { currentUser: user } = useSelector((state) => state.user);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* 🔸 حالة التاريخ ونوع العرض */
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  /* ------------------- جلب البيانات ------------------- */
  const fetchCalendarBookings = async () => {
    if (!user?.id) return;
    try {
      const token = Cookies.get('token');
      const start = moment(currentDate).startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
      const end   = moment(currentDate).endOf('month').add(1, 'month').format('YYYY-MM-DD');

      const { data: eventsArray } = await axios.get(
        `http://localhost:4000/api/users/influencers/${user.id}/calendar`,
        { params: { start, end }, headers: { Authorization: `Bearer ${token}` } }
      );
console.log(eventsArray);
      const parsed = eventsArray.map(evt => ({
        ...evt,
        start: new Date(evt.start),
        end:   new Date(evt.end),
        allDay: true,
      }));

      setEvents(parsed);
    } catch (err) {
      console.error('Failed to load calendar bookings:', err);
    }
  };

  /* كلما تغيّر التاريخ (بعد navigate) أعد التحميل */
  useEffect(() => { fetchCalendarBookings(); }, [user?.id, currentDate]);

  /* ----------------- Handlers ----------------- */
  const handleNavigate = (date) => setCurrentDate(date);
  const handleView     = (view) => setCurrentView(view);
  const handleSelect   = (event) => setSelectedEvent(event);
  const closeModal     = () => setSelectedEvent(null);

  /* --------------------- JSX --------------------- */
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">إدارة حجوزاتك</h2>

      <Calendar
        localizer={localizer}
        events={events}
        view={currentView}          /* ← مكوّن متحكَّم */
        date={currentDate}          /* ← مكوّن متحكَّم */
        onNavigate={handleNavigate} /* ← يستدعى عند Back / Next / Today */
        onView={handleView}         /* ← يستدعى عند Month / Week / Day */
        onSelectEvent={handleSelect}
        style={{ height: 600 }}
      />

      {/* Modal لعرض التفاصيل */}
      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center"
      >
        {selectedEvent && (
          <>
            <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
            <p className="mb-1"><span className="font-semibold">الحالة:</span> {selectedEvent.status}</p>
            <p className="mb-1"><span className="font-semibold">التاريخ:</span> {moment(selectedEvent.start).format('YYYY-MM-DD')}</p>
            <p className="mb-1"><span className="font-semibold">العميل:</span> {selectedEvent.user?.name}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              إغلاق
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SchedulePage;
