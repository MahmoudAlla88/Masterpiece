// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
//  import axios from 'axios';
// const OverviewPage = () => {
//   // Instead of using Redux, we'll simulate having a user
//   const { currentUser: user } = useSelector(state => state.user);
//   const [data, setData] = useState(null);


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


//   const displayData = data ;

//   if (!displayData) return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
//       <div className="animate-pulse flex space-x-2">
//         <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
//         <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
//         <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
//       </div>
//     </div>
//   );

//   // Format date function
//   const formatDate = (dateString, format) => {
//     const date = new Date(dateString);
//     if (format === 'MMM') {
//       return new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
//     }
//     return new Intl.DateTimeFormat('en', { 
//       year: 'numeric', 
//       month: '2-digit', 
//       day: '2-digit',
//       hour: '2-digit', 
//       minute: '2-digit'
//     }).format(date);
//   };

//   /* تجهيز كروت الإحصائيات */
//   const cards = [
//     { label: 'Total Bookings', value: displayData.statusCounts.reduce((s, c) => s + Number(c.count), 0) },
//     ...displayData.statusCounts.map(s => ({ label: s.status, value: s.count })),
//     { label: 'Confirmed Revenue', value: `${displayData.totalRevenue} $` },
//   ];

//   // Custom gradient colors for different stat cards
//   const cardGradients = [
//     "from-purple-500 to-purple-700",
//     "from-blue-500 to-blue-700",
//     "from-indigo-500 to-indigo-700",
//     "from-violet-500 to-violet-700",
//     "from-fuchsia-500 to-fuchsia-700"
//   ];

//   // Function to get gradient for each card
//   const getCardGradient = (index) => {
//     return cardGradients[index % cardGradients.length];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
//             Dashboard Overview
//           </h2>
//           <button 
//             onClick={loadOverview}
//             className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md"
//           >
//             Refresh
//           </button>
//         </div>

//         {/* Cards Section */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {cards.map((card, index) => (
//             <div 
//               key={card.label} 
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-purple-100"
//             >
//               <div className={`h-2 bg-gradient-to-r ${getCardGradient(index)}`}></div>
//               <div className="p-6">
//                 <p className="text-gray-500 font-medium">{card.label}</p>
//                 <p className="text-2xl font-bold mt-2 text-gray-800">{card.value}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Next booking */}
//         {displayData.nextBooking && (
//           <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-600">
//             <div className="flex items-center space-x-3">
//               <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="font-bold text-lg text-gray-800">Next Upcoming Booking</h3>
//                 <p className="font-semibold text-purple-700">{displayData.nextBooking.campaignTitle}</p>
//                 <p className="text-gray-600">{formatDate(displayData.nextBooking.scheduledDate)}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold mb-4 text-gray-800">Bookings - Last 6 Months</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart 
//               data={displayData.monthly.map(m => ({
//                 month: formatDate(m.month, 'MMM'),
//                 bookings: m.bookings
//               }))}
//               margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
//             >
//               <XAxis dataKey="month" />
//               <YAxis allowDecimals={false}/>
//               <Tooltip 
//                 contentStyle={{ 
//                   borderRadius: '8px', 
//                   border: '1px solid #e2e8f0',
//                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                 }} 
//               />
//               <defs>
//                 <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#6F42C1" />
//                   <stop offset="100%" stopColor="#D63384" />
//                 </linearGradient>
//               </defs>
//               <Bar 
//                 dataKey="bookings" 
//                 fill="url(#barGradient)" 
//                 radius={[4, 4, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewPage;







// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// const OverviewPage = () => {
//   // Instead of using Redux, we'll simulate having a user
//   const { currentUser: user } = useSelector(state => state.user);
//   const [data, setData] = useState(null);

//   const loadOverview = async () => {
//     if (!user?.id) return;
  
//     try {
//       const token = Cookies.get('token');
  
//       // -- نحصل على الاستجابة --
//       const { data } = await axios.get(
//         `http://localhost:4000/api/users/influencers/${user.id}/overview`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//   console.log(data);
//       setData(data);
//     } catch (err) {
//       console.error('Failed to load overview:', err);
//     }
//   };
  
//   useEffect(() => { loadOverview(); }, [user?.id]);

//   if (!data) return <p className="p-6">Loading…</p>;

//   const displayData = data;

//   if (!displayData) return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="animate-pulse flex space-x-2">
//         <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
//         <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
//         <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
//       </div>
//     </div>
//   );

//   // Format date function
//   const formatDate = (dateString, format) => {
//     const date = new Date(dateString);
//     if (format === 'MMM') {
//       return new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
//     }
//     return new Intl.DateTimeFormat('en', { 
//       year: 'numeric', 
//       month: '2-digit', 
//       day: '2-digit',
//       hour: '2-digit', 
//       minute: '2-digit'
//     }).format(date);
//   };

//   // Mock data for latest bookings table
//   const latestBookings = displayData.bookings || [
//     { id: 1, campaignTitle: 'Summer Campaign', influencer: 'Omar Tarek', status: 'Confirmed', date: '2025-05-14' },
//     { id: 2, campaignTitle: 'Product Launch', influencer: 'Sara Ahmed', status: 'Pending', date: '2025-05-13' },
//     { id: 3, campaignTitle: 'Brand Awareness', influencer: 'Lina Khalid', status: 'Completed', date: '2025-05-12' },
//     { id: 4, campaignTitle: 'Holiday Special', influencer: 'Yousef Hamdy', status: 'Confirmed', date: '2025-05-10' },
//     { id: 5, campaignTitle: 'New Collection', influencer: 'Nour Ibrahim', status: 'Pending', date: '2025-05-09' },
//   ];

//   /* تجهيز كروت الإحصائيات */
//   const cards = [
//     { icon: "users", label: 'Total Influencers', value: displayData.statusCounts?.[0]?.count || 5 },
//     { icon: "briefcase", label: 'Total Campaigns', value: displayData.statusCounts?.[1]?.count || 10 },
//     { icon: "message", label: 'Total Messages', value: displayData.statusCounts?.[2]?.count || 6 },
//     { icon: "users", label: 'Total Users', value: displayData.statusCounts?.[3]?.count || 11 }
//   ];

//   // Status color mappings
//   const statusColors = {
//     Confirmed: "text-green-500",
//     Pending: "text-yellow-500",
//     Completed: "text-blue-500",
//     Cancelled: "text-red-500"
//   };

//   // Card icon components
//   const cardIcons = {
//     users: (
//       <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-500">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       </div>
//     ),
//     briefcase: (
//       <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-100 text-pink-500">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//       </div>
//     ),
//     message: (
//       <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-500">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//         </svg>
//       </div>
//     )
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-full mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Welcome to Dashboard
//           </h2>
//           <p className="text-gray-600">Monitor all influencer and campaign activities</p>
//         </div>

//         {/* Cards Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {cards.map((card, index) => (
//             <div 
//               key={index} 
//               className="bg-white rounded-lg shadow-sm p-6 flex flex-col"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 {cardIcons[card.icon]}
//                 <div className={`h-1 w-16 bg-purple-500 rounded-full ${index === 1 ? 'bg-pink-500' : ''}`}></div>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-800">{card.value}</h1>
//               <p className="text-gray-500 font-medium mt-1">{card.label}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-sm col-span-2">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold text-gray-800">Bookings per Day</h3>
//               <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700">
//                 <option>Last 7 days</option>
//                 <option>Last 30 days</option>
//                 <option>Last 90 days</option>
//               </select>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart 
//                 data={displayData.monthly?.map(m => ({
//                   date: formatDate(m.month, 'MMM'),
//                   value: m.bookings
//                 })) || [
//                   { date: '2025-05-10', value: 1 },
//                   { date: '2025-05-11', value: 1 },
//                   { date: '2025-05-12', value: 0 },
//                   { date: '2025-05-13', value: 0 },
//                   { date: '2025-05-14', value: 0 },
//                   { date: '2025-05-15', value: 0 },
//                   { date: '2025-05-16', value: 0 },
//                 ]}
//                 margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
//               >
//                 <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                 <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     borderRadius: '8px', 
//                     border: '1px solid #e2e8f0',
//                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                   }} 
//                 />
//                 <Bar 
//                   dataKey="value" 
//                   fill="#a855f7" 
//                   radius={[4, 4, 0, 0]}
//                   barSize={60}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Latest Bookings Table */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold text-gray-800">Latest Bookings</h3>
//               <a href="#" className="text-purple-600 text-sm hover:underline">View All</a>
//             </div>
//             <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
//                     <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {latestBookings.map((booking, index) => (
//                     <tr key={booking.id} className={index !== latestBookings.length - 1 ? "border-b border-gray-200" : ""}>
//                       <td className="py-3 px-2">
//                         <div>
//                           <p className="font-medium text-gray-900">{booking.campaignTitle}</p>
//                           <p className="text-sm text-gray-500">{booking.influencer}</p>
//                         </div>
//                       </td>
//                       <td className="py-3 px-2 text-right">
//                         <span className={`${statusColors[booking.status]} font-medium`}>
//                           {booking.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
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
  const { currentUser: user } = useSelector(state => state.user);
  const [data, setData] = useState(null);
  const [latestBookings, setLatestBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOverview = async () => {
    if (!user?.id) return;
    try {
      const token = Cookies.get('token');
      const { data } = await axios.get(
        `http://localhost:4000/api/users/influencers/${user.id}/overview`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(data);
    } catch (err) {
      console.error('Failed to load overview:', err);
    }
  };

  // Fetch 5 latest bookings from your endpoint
  const fetchLatestBookings = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/users/influencer/${user.id}`);
      // فرضًا data هي قائمة الحجوزات كلها
      setLatestBookings(data.slice(0, 5)); // فقط أول 5 حجوزات
    } catch (err) {
      console.error('Failed to fetch latest bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
    fetchLatestBookings();
  }, [user?.id]);

  if (!data) return <p className="p-6">Loading…</p>;

  // Status color mappings (عدل أسماء الحالات حسب البيانات اللي عندك)
  const statusColors = {
    pending: "text-yellow-500",
    published: "text-green-500",
    cancelled: "text-red-500",
    Confirmed: "text-green-500",
    Pending: "text-yellow-500",
    Completed: "text-blue-500",
    Cancelled: "text-red-500"
  };

  // عرض كروت الإحصائيات بناءً على statusCounts و totalRevenue
  const cards = [
    { icon: "pending", label: 'Pending Bookings', value: data.statusCounts?.find(s => s.status === 'pending')?.count || 0 },
    { icon: "published", label: 'Published Bookings', value: data.statusCounts?.find(s => s.status === 'published')?.count || 0 },
    { icon: "cancelled", label: 'Cancelled Bookings', value: data.statusCounts?.find(s => s.status === 'cancelled')?.count || 0 },
    { icon: "revenue", label: 'Total Revenue', value: data.totalRevenue || 0 }
  ];

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

  // Card icon components
  // const cardIcons = {
  //   users: (
  //     <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-500">
  //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  //       </svg>
  //     </div>
  //   ),
  //   briefcase: (
  //     <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-100 text-pink-500">
  //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  //       </svg>
  //     </div>
  //   ),
  //   message: (
  //     <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-500">
  //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  //       </svg>
  //     </div>
  //   )
  // };
const cardIcons = {
  pending: (
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 text-yellow-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
  published: (
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 text-green-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  ),
  cancelled: (
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 text-red-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  ),
  revenue: (
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.105 0-2 .672-2 1.5S10.895 11 12 11s2 .672 2 1.5S13.105 14 12 14s-2 .672-2 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
      </svg>
    </div>
  )
};
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to Dashboard
          </h2>
          <p className="text-gray-600">Monitor all influencer and campaign activities</p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                {cardIcons[card.icon]}
                <div className={`h-1 w-16 bg-purple-500 rounded-full ${index === 1 ? 'bg-pink-500' : ''}`}></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">{card.value}</h1>
              <p className="text-gray-500 font-medium mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Bookings per Month</h3>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700">
                <option>Last 2 months</option>
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={data.monthly?.map(m => ({
                  date: formatDate(m.month, 'MMM'),
                  value: +m.bookings // حوّل string لرقم
                })) || []}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar 
                  dataKey="value" 
                  fill="#a855f7" 
                  radius={[4, 4, 0, 0]}
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Latest Bookings Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Latest Bookings</h3>
              <a href="#" className="text-purple-600 text-sm hover:underline">View All</a>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
              {loading ? (
                <p>Loading bookings...</p>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                      <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestBookings.length === 0 ? (
                      <tr><td colSpan={2} className="py-3 px-2 text-center text-gray-500">No bookings found</td></tr>
                    ) : (
                      latestBookings.map((booking, index) => (
                        <tr key={booking.id || index} className={index !== latestBookings.length - 1 ? "border-b border-gray-200" : ""}>
                          <td className="py-3 px-2">
                            <div>
                              <p className="font-medium text-gray-900">{booking.campaignTitle || booking.campaign || 'N/A'}</p>
                              <p className="text-sm text-gray-500">{booking.User.name || user?.name || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className={`${statusColors[booking.status?.toLowerCase()] || 'text-gray-500'} font-medium`}>
                              {booking.status || 'Unknown'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
