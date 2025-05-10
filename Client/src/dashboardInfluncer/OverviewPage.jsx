// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import moment from 'moment';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const OverviewPage = () => {
//   const { currentUser: user } = useSelector(state => state.user);
//   const [data, setData] = useState(null);

// //   const loadOverview = async () => {
// //     if (!user?.id) return;
   

// //     const  data = await axios.get(
// //       `http://localhost:4000/api/users/influencers/${user.id}/overview`,
      
// //     );
// //     console.log("kk",data);
// //     setData(data);
// //   };
// const loadOverview = async () => {
//     if (!user?.id) return;
  
//     try {
//       const token = Cookies.get('token');
  
//       // -- نحصل على الاستجابة --
//       const { data } = await axios.get(
//         `http://localhost:4000/api/users/influencers/${user.id}/overview`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       // -- نخزّن الحمولة فقط (ليس الكائن كله) --
//       setData(data);
//     } catch (err) {
//       console.error('Failed to load overview:', err);
//     }
//   };
//   useEffect(() => { loadOverview(); }, [user?.id]);

//   if (!data) return <p className="p-6">Loading…</p>;

//   /* تجهيز كروت الإحصائيات */
//   const cards = [
//     { label: 'Total Bookings', value: data.statusCounts.reduce((s, c) => s + Number(c.count), 0) },
//     ...data.statusCounts.map(s => ({ label: s.status, value: s.count })),
//     { label: 'Confirmed Revenue', value: `${data.totalRevenue} $` },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-3xl font-bold">Dashboard</h2>

//       {/* ------- Cards ------- */}
//       <div className="grid md:grid-cols-3 gap-4">
//         {cards.map(card => (
//           <div key={card.label} className="bg-white shadow p-4 rounded-xl">
//             <p className="text-gray-500">{card.label}</p>
//             <p className="text-2xl font-bold">{card.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* ------- Next booking ------- */}
//       {data.nextBooking && (
//         <div className="bg-blue-50 p-4 rounded-xl">
//           <p>أقرب حجز قادم:</p>
//           <p className="font-semibold">{data.nextBooking.campaignTitle}</p>
//           <p>{moment(data.nextBooking.scheduledDate).format('YYYY-MM-DD HH:mm')}</p>
//         </div>
//       )}

//       {/* ------- Chart ------- */}
//       <div className="bg-white shadow p-4 rounded-xl">
//         <h3 className="font-semibold mb-2">Bookings last 6 months</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={data.monthly.map(m => ({
//             month: moment(m.month).format('MMM'),
//             bookings: m.bookings
//           }))}>
//             <XAxis dataKey="month" />
//             <YAxis allowDecimals={false}/>
//             <Tooltip />
//             <Bar dataKey="bookings" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default OverviewPage;
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
 import axios from 'axios';
const OverviewPage = () => {
  // Instead of using Redux, we'll simulate having a user
  const { currentUser: user } = useSelector(state => state.user);
  const [data, setData] = useState(null);

//   const loadOverview = async () => {
//     if (!user?.id) return;
   

//     const  data = await axios.get(
//       `http://localhost:4000/api/users/influencers/${user.id}/overview`,
      
//     );
//     console.log("kk",data);
//     setData(data);
//   };
const loadOverview = async () => {
    if (!user?.id) return;
  
    try {
      const token = Cookies.get('token');
  
      // -- نحصل على الاستجابة --
      const { data } = await axios.get(
        `http://localhost:4000/api/users/influencers/${user.id}/overview`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // -- نخزّن الحمولة فقط (ليس الكائن كله) --
      setData(data);
    } catch (err) {
      console.error('Failed to load overview:', err);
    }
  };
  useEffect(() => { loadOverview(); }, [user?.id]);

  if (!data) return <p className="p-6">Loading…</p>;

  /* تجهيز كروت الإحصائيات */
  // const cards = [
  //   { label: 'Total Bookings', value: data.statusCounts.reduce((s, c) => s + Number(c.count), 0) },
  //   ...data.statusCounts.map(s => ({ label: s.status, value: s.count })),
  //   { label: 'Confirmed Revenue', value: `${data.totalRevenue} $` },
  // ];
  // For demonstration purposes, using mock data
  // const mockData = {
  //   statusCounts: [
  //     { status: 'Pending', count: 12 },
  //     { status: 'Confirmed', count: 24 },
  //     { status: 'Completed', count: 35 }
  //   ],
  //   totalRevenue: 4250,
  //   nextBooking: {
  //     campaignTitle: 'Summer Product Launch',
  //     scheduledDate: '2025-05-15T14:00:00'
  //   },
  //   monthly: [
  //     { month: '2024-12', bookings: 5 },
  //     { month: '2025-01', bookings: 8 },
  //     { month: '2025-02', bookings: 12 },
  //     { month: '2025-03', bookings: 9 },
  //     { month: '2025-04', bookings: 15 },
  //     { month: '2025-05', bookings: 7 }
  //   ]
  // };

  const displayData = data ;

  if (!displayData) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="animate-pulse flex space-x-2">
        <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
        <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
        <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
      </div>
    </div>
  );

  // Format date function
  const formatDate = (dateString, format) => {
    const date = new Date(dateString);
    if (format === 'MMM') {
      return new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    }
    return new Intl.DateTimeFormat('en', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };

  /* تجهيز كروت الإحصائيات */
  const cards = [
    { label: 'Total Bookings', value: displayData.statusCounts.reduce((s, c) => s + Number(c.count), 0) },
    ...displayData.statusCounts.map(s => ({ label: s.status, value: s.count })),
    { label: 'Confirmed Revenue', value: `${displayData.totalRevenue} $` },
  ];

  // Custom gradient colors for different stat cards
  const cardGradients = [
    "from-purple-500 to-purple-700",
    "from-blue-500 to-blue-700",
    "from-indigo-500 to-indigo-700",
    "from-violet-500 to-violet-700",
    "from-fuchsia-500 to-fuchsia-700"
  ];

  // Function to get gradient for each card
  const getCardGradient = (index) => {
    return cardGradients[index % cardGradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <button 
            onClick={loadOverview}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md"
          >
            Refresh
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={card.label} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-purple-100"
            >
              <div className={`h-2 bg-gradient-to-r ${getCardGradient(index)}`}></div>
              <div className="p-6">
                <p className="text-gray-500 font-medium">{card.label}</p>
                <p className="text-2xl font-bold mt-2 text-gray-800">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Next booking */}
        {displayData.nextBooking && (
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-600">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Next Upcoming Booking</h3>
                <p className="font-semibold text-purple-700">{displayData.nextBooking.campaignTitle}</p>
                <p className="text-gray-600">{formatDate(displayData.nextBooking.scheduledDate)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Bookings - Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={displayData.monthly.map(m => ({
                month: formatDate(m.month, 'MMM'),
                bookings: m.bookings
              }))}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false}/>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6F42C1" />
                  <stop offset="100%" stopColor="#D63384" />
                </linearGradient>
              </defs>
              <Bar 
                dataKey="bookings" 
                fill="url(#barGradient)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;