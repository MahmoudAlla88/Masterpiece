
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Users,
  Briefcase,
  MessageCircle,
  UserPlus,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const AdminDashboard = () => {
 const [stats, setStats] = useState({
    influencers: null,
    campaigns: null,
    unreadMessages: null,
    users: null,
  });
  const [bookings, setBookings] = useState([]);          // ALL bookings → chart
  const [recentBookings, setRecentBookings] = useState([]); // last 5 list
  const [recentInfluencers, setRecentInfluencers] = useState([]);
  const [timeRange, setTimeRange] = useState(7); // 7 | 30 | 90 days
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------------------------ */
  /*  DATA FETCH                                                        */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [infRes, bookingRes, msgRes, userRes] = await Promise.all([
          axios.get("http://localhost:4000/api/influencer/get"),
          axios.get("http://localhost:4000/api/users/all", { params: { status: "all" } }),
          axios.get("http://localhost:4000/api/contact/getmessages", { params: { status: "unread" } }),
          axios.get("http://localhost:4000/user/users"),
        ]);

        const influencers = infRes.data.influencers ?? infRes.data;
        const bookingsArr = bookingRes.data;

        /* helpers */
        const sortDesc = (a, b) => {
          if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
          return (b.id ?? 0) - (a.id ?? 0);
        };

        /* update state */
        setStats({
          influencers: influencers.length,
          campaigns: bookingsArr.length,
          unreadMessages: msgRes.data.length,
          users: userRes.data.users.length,
        });
        setBookings(bookingsArr);
        setRecentBookings([...bookingsArr].sort(sortDesc).slice(0, 5));
        setRecentInfluencers([...influencers].sort(sortDesc).slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  CHART DATA                                                        */
  /* ------------------------------------------------------------------ */
  const chartData = useMemo(() => {
    // build bucket counts keyed by YYYY‑MM‑DD
    const now = Date.now();
    const start = now - timeRange * 24 * 60 * 60 * 1000;

    const buckets = {};
    bookings.forEach((bk) => {
      const d = new Date(bk.createdAt ?? bk.requestedDate ?? bk.date);
      if (d.getTime() >= start) {
        const key = d.toISOString().slice(0, 10);
        buckets[key] = (buckets[key] || 0) + 1;
      }
    });

    return Object.entries(buckets)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, cnt]) => ({ date, cnt }));
  }, [bookings, timeRange]);

  /* ------------------------------------------------------------------ */
  /*  DERIVED LOOKUP                                                    */
  /* ------------------------------------------------------------------ */
  const influencerNameById = useMemo(() => {
    const map = new Map();
    recentInfluencers.forEach((inf) => map.set(inf.id, inf.name));
    return map;
  }, [recentInfluencers]);

  /* ------------------------------------------------------------------ */
  /*  CARD CONFIG                                                       */
  /* ------------------------------------------------------------------ */
  const cardConfig = [
    {
      id: 1,
      title: "Total Influencers",
      value: stats.influencers,
      icon: <Users size={20} />,
      color: "from-purple-500 to-purple-700",
    },
    {
      id: 2,
      title: "Total Campaigns",
      value: stats.campaigns,
      icon: <Briefcase size={20} />,
      color: "from-pink-500 to-pink-700",
    },
    {
      id: 3,
      title: "Total Messages",
      value: stats.unreadMessages,
      icon: <MessageCircle size={20} />,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 4,
      title: "Total Users",
      value: stats.users,
      icon: <UserPlus size={20} />,
      color: "from-indigo-500 to-purple-600",
    },
  ];

  /* ------------------------------------------------------------------ */
  /*  RENDER                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER                                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
          <p className="text-gray-500">Monitor all influencer and campaign activities</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm px-4 py-2 border border-purple-100">
          <p className="text-sm font-medium text-gray-600">
            <Calendar size={16} className="inline mr-2 text-purple-500" />
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CARDS                                                        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardConfig.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className={`bg-gradient-to-r ${card.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                  {card.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {loading || card.value === null ? "--" : card.value.toLocaleString()}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{card.title}</p>
            </div>
            <div className={`h-1 bg-gradient-to-r ${card.color}`}></div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CHART + TABLES                                               */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --------------------- BOOKINGS CHART --------------------- */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Bookings per Day</h2>
            <select
              className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>

          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">Loading chart…</div>
            ) : chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">No bookings in selected range.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip  contentStyle={{ borderRadius: "0.75rem", borderColor: "#d9d6fe" }}
                labelStyle={{ fontSize: "0.75rem" }}
                  />
                  <Bar dataKey="cnt" radius={[4, 4, 0, 0]}
                   className="fill-purple-500 hover:fill-purple-600 transition-colors" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* --------------------- PLACEHOLDER / WIDGET --------------- */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100 text-center flex items-center justify-center">
          <p className="text-gray-500">Add another widget here if needed.</p>
        </div>
      </div>

      {/* --------------------- RECENT TABLES ----------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Latest Bookings */}
        

        {/* Recently Added Influencers */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recently Added Influencers</h2>
            <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
          </div>

          {recentInfluencers.length === 0 ? (
            <p className="text-sm text-gray-500">No influencers found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentInfluencers.map((inf) => (
                    <tr key={inf.id} className="hover:bg-purple-50">
                      <td className="py-3 pr-6 text-sm font-medium text-gray-800">{inf.name}</td>
                      <td className="py-3 text-sm text-gray-600">{inf.email ?? "—"}</td>
                      <td className="py-3 text-sm text-gray-600">
                        {inf.createdAt ? new Date(inf.createdAt).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Latest Bookings</h2>
            <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-sm text-gray-500">No bookings found.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentBookings.map((bk) => (
                <li key={bk.id} className="py-4 flex justify-between items-start hover:bg-purple-50 px-2 rounded-md">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{bk.campaignTitle ?? "Untitled Campaign"}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {bk.createdAt ? new Date(bk.createdAt).toLocaleDateString() : "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {influencerNameById.get(bk.influencerId) ?? `#${bk.influencerId}`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>




      </div>
    </div>
  );
};

export default AdminDashboard;























// // // import React from 'react';
// // // import { 
// // //   Users, 
// // //   TrendingUp, 
// // //   Calendar, 
// // //   Briefcase, 
// // //   Eye, 
// // //   ChevronUp, 
// // //   ChevronDown,
// // //   BarChart2,
// // //   MessageCircle,
// // //   DollarSign 
// // // } from 'lucide-react';

// // // const AdminDashboard = () => {
// // //   // Sample stats data
// // //   const stats = [
// // //     { 
// // //       id: 1, 
// // //       title: 'Total Influencers', 
// // //       value: '1,247', 
// // //       change: '+12.5%', 
// // //       isPositive: true, 
// // //       icon: <Users size={20} />,
// // //       color: 'from-purple-500 to-purple-700'
// // //     },
// // //     { 
// // //       id: 2, 
// // //       title: 'Active Campaigns', 
// // //       value: '24', 
// // //       change: '+3.2%', 
// // //       isPositive: true, 
// // //       icon: <Briefcase size={20} />,
// // //       color: 'from-pink-500 to-pink-700'
// // //     },
// // //     { 
// // //       id: 3, 
// // //       title: 'Monthly Views', 
// // //       value: '4.8M', 
// // //       change: '+24.3%', 
// // //       isPositive: true, 
// // //       icon: <Eye size={20} />,
// // //       color: 'from-purple-400 to-pink-500'
// // //     },
// // //     { 
// // //       id: 4, 
// // //       title: 'Conversion Rate', 
// // //       value: '3.75%', 
// // //       change: '-0.8%', 
// // //       isPositive: false, 
// // //       icon: <TrendingUp size={20} />,
// // //       color: 'from-indigo-500 to-purple-600'
// // //     },
// // //   ];

// // //   // Sample upcoming campaigns
// // //   const upcomingCampaigns = [
// // //     { id: 1, title: 'Summer Campaign 2025', dueDate: 'Jul 15', status: 'Planning', influencers: 24 },
// // //     { id: 2, title: 'New Product Launch', dueDate: 'Jun 02', status: 'In Progress', influencers: 12 },
// // //     { id: 3, title: 'End of Year Sale', dueDate: 'Oct 30', status: 'Scheduled', influencers: 18 },
// // //   ];

// // //   // Sample top influencers
// // //   const topInfluencers = [
// // //     { id: 1, name: 'Sarah Ahmed', category: 'Beauty', engagement: '8.7%', followers: '1.2M', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
// // //     { id: 2, name: 'Mohamed Khalid', category: 'Tech', engagement: '7.5%', followers: '850K', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
// // //     { id: 3, name: 'Layla Hassan', category: 'Fashion', engagement: '6.9%', followers: '2.5M', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
// // //     { id: 4, name: 'Omar Saeed', category: 'Sports', engagement: '6.2%', followers: '945K', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
// // //   ];

// // //   return (
// // //     <div className="bg-gray-50 min-h-screen p-6">
// // //       {/* Header and Date */}
// // //       <div className="flex justify-between items-center mb-8">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
// // //           <p className="text-gray-500">Monitor all influencer and campaign activities</p>
// // //         </div>
// // //         <div className="bg-white rounded-lg shadow-sm px-4 py-2 border border-purple-100">
// // //           <p className="text-sm font-medium text-gray-600">
// // //             <Calendar size={16} className="inline mr-2 text-purple-500" />
// // //             Friday, April 4, 2025
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Stats Cards */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //         {stats.map((stat) => (
// // //           <div key={stat.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
// // //             <div className="p-6">
// // //               <div className="flex justify-between items-center mb-4">
// // //                 <div className={`bg-gradient-to-r ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
// // //                   {stat.icon}
// // //                 </div>
// // //                 <div className={`flex items-center ${stat.isPositive ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
// // //                   {stat.change}
// // //                   {stat.isPositive ? 
// // //                     <ChevronUp size={16} className="ml-1" /> : 
// // //                     <ChevronDown size={16} className="ml-1" />
// // //                   }
// // //                 </div>
// // //               </div>
// // //               <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
// // //               <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
// // //             </div>
// // //             <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Main Content Grid */}
//       // <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       //   {/* Performance Chart */}
//       //   <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-purple-100">
//       //     <div className="flex justify-between items-center mb-6">
//       //       <h2 className="text-lg font-semibold text-gray-800">Campaign Performance</h2>
//       //       <div className="flex space-x-2">
//       //         <select className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300">
//       //           <option>Last 7 days</option>
//       //           <option>Last 30 days</option>
//       //           <option>Last 90 days</option>
//       //         </select>
//       //       </div>
//       //     </div>
//       //     <div className="h-64 flex items-center justify-center">
//       //       <div className="text-center">
//       //         <BarChart2 size={48} className="mx-auto text-purple-200" />
//       //         <p className="mt-4 text-sm text-gray-500">Chart visualization will appear here</p>
//       //         <p className="text-xs text-gray-400">The chart will display campaign performance metrics</p>
//       //       </div>
//       //     </div>
//       //   </div>

// // //         {/* Upcoming Campaigns */}
// // //         <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
// // //           <div className="flex justify-between items-center mb-6">
// // //             <h2 className="text-lg font-semibold text-gray-800">Upcoming Campaigns</h2>
// // //             <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
// // //           </div>
// // //           <div className="space-y-4">
// // //             {upcomingCampaigns.map((campaign) => (
// // //               <div key={campaign.id} className="p-4 border border-gray-100 rounded-lg hover:border-purple-200 transition-colors">
// // //                 <div className="flex justify-between items-start">
// // //                   <h3 className="font-medium text-gray-800">{campaign.title}</h3>
// // //                   <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">{campaign.status}</span>
// // //                 </div>
// // //                 <div className="mt-3 flex justify-between text-sm">
// // //                   <div className="text-gray-500">
// // //                     <Calendar size={14} className="inline mr-1" />
// // //                     Due: {campaign.dueDate}
// // //                   </div>
// // //                   <div className="text-gray-500">
// // //                     <Users size={14} className="inline mr-1" />
// // //                     {campaign.influencers} influencers
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //           <button className="mt-6 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
// // //             Create New Campaign
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Top Influencers */}
// // //       <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-purple-100">
// // //         <div className="flex justify-between items-center mb-6">
// // //           <h2 className="text-lg font-semibold text-gray-800">Top Performing Influencers</h2>
// // //           <button className="text-sm text-purple-600 hover:text-purple-800">View All Influencers</button>
// // //         </div>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead>
// // //               <tr className="border-b border-gray-100">
// // //                 <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
// // //                 <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
// // //                 <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
// // //                 <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
// // //                 <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-100">
// // //               {topInfluencers.map((influencer) => (
// // //                 <tr key={influencer.id} className="hover:bg-purple-50">
// // //                   <td className="py-4 pr-6">
// // //                     <div className="flex items-center">
// // //                       <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-purple-200">
// // //                         <img src={influencer.image} alt={influencer.name} className="h-full w-full object-cover" />
// // //                       </div>
// // //                       <div className="ml-3">
// // //                         <p className="text-sm font-medium text-gray-800">{influencer.name}</p>
// // //                       </div>
// // //                     </div>
// // //                   </td>
// // //                   <td className="py-4 text-sm text-gray-600">{influencer.category}</td>
// // //                   <td className="py-4 text-sm text-gray-600">{influencer.followers}</td>
// // //                   <td className="py-4">
// // //                     <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
// // //                       {influencer.engagement}
// // //                     </span>
// // //                   </td>
// // //                   <td className="py-4 text-right">
// // //                     <button className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors">
// // //                       View Profile
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // // export default AdminDashboard;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   Users,
// //   Briefcase,
// //   MessageCircle,
// //   UserPlus,
// //   ChevronUp,
// //   ChevronDown,
// //   Calendar,
// //   BarChart2,
// // } from "lucide-react";

// // /**
// //  * Admin dashboard that fetches real‑time numbers from the backend
// //  * instead of using the hard‑coded demo values.
// //  *
// //  * End‑points already available in your Express codebase:
// //  *   GET /api/influencers/approved            → InfluencerControllers.getApprovedInfluencers  (returns { influencers: [] })
// //  *   GET /api/bookings?status=all             → bookingControllers.getAllAdRequests          (returns Booking[])
// //  *   GET /api/messages?status=unread          → MessageControllers.getMessagesByReadStatus   (returns Message[])
// //  *   GET /api/users                           → UserControllers.getAllUsers                  (returns { users: [] })
// //  *
// //  * If you later create an aggregated "GET /api/admin/overview" endpoint you can
// //  * swap the Promise.all block for a single request, but this works today with
// //  * the files you shared.
// //  */
// // const AdminDashboard = () => {
// //   const [statsData, setStatsData] = useState({
// //     totalInfluencers: null,
// //     totalCampaigns: null,
// //     unreadMessages: null,
// //     totalUsers: null,
// //   });
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const [influencersRes, bookingsRes, messagesRes, usersRes] = await Promise.all([
// //           axios.get("http://localhost:4000/api/influencer/get"),
// //           axios.get("http://localhost:4000/api/users/all", { params: { status: "all" } }),
// //           axios.get("http://localhost:4000/api/contact/getmessages", { params: { status: "unread" } }),
// //           axios.get("http://localhost:4000/user/users"),
// //         ]);
// // console.log(influencersRes)
// // console.log( bookingsRes)
// // console.log(messagesRes)
// // console.log(usersRes)
// //         setStatsData({
// //           totalInfluencers: influencersRes.data.influencers.length,
// //           totalCampaigns: bookingsRes.data.length,
// //           unreadMessages: messagesRes.data.length,
// //           totalUsers: usersRes.data.users.length,
// //         });
// //       } catch (err) {
// //         console.error("Failed to load dashboard stats", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStats();
// //   }, []);

// //   const stats = [
// //     {
// //       id: 1,
// //       title: "Total Influencers",
// //       value:
// //         statsData.totalInfluencers !== null
// //           ? statsData.totalInfluencers.toLocaleString()
// //           : "--",
// //       change: "", // Fill in when you have history data
// //       isPositive: true,
// //       icon: <Users size={20} />,
// //       color: "from-purple-500 to-purple-700",
// //     },
// //     {
// //       id: 2,
// //       title: "Total Campaigns",
// //       value:
// //         statsData.totalCampaigns !== null
// //           ? statsData.totalCampaigns.toLocaleString()
// //           : "--",
// //       change: "",
// //       isPositive: true,
// //       icon: <Briefcase size={20} />,
// //       color: "from-pink-500 to-pink-700",
// //     },
// //     {
// //       id: 3,
// //       title: "Unread Messages",
// //       value:
// //         statsData.unreadMessages !== null
// //           ? statsData.unreadMessages.toLocaleString()
// //           : "--",
// //       change: "",
// //       isPositive: false,
// //       icon: <MessageCircle size={20} />,
// //       color: "from-purple-400 to-pink-500",
// //     },
// //     {
// //       id: 4,
// //       title: "Total Users",
// //       value:
// //         statsData.totalUsers !== null
// //           ? statsData.totalUsers.toLocaleString()
// //           : "--",
// //       change: "",
// //       isPositive: true,
// //       icon: <UserPlus size={20} />,
// //       color: "from-indigo-500 to-purple-600",
// //     },
// //   ];

// //   /* The rest of your original layout (charts, tables…) stays mostly intact. */
// //   return (
// //     <div className="bg-gray-50 min-h-screen p-6">
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-8">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
// //           <p className="text-gray-500">Monitor all influencer and campaign activities</p>
// //         </div>
// //         <div className="bg-white rounded-lg shadow-sm px-4 py-2 border border-purple-100">
// //           <p className="text-sm font-medium text-gray-600">
// //             <Calendar size={16} className="inline mr-2 text-purple-500" />
// //             {new Date().toLocaleDateString(undefined, {
// //               weekday: "long",
// //               year: "numeric",
// //               month: "long",
// //               day: "numeric",
// //             })}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //         {stats.map((stat) => (
// //           <div
// //             key={stat.id}
// //             className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100"
// //           >
// //             <div className="p-6">
// //               <div className="flex justify-between items-center mb-4">
// //                 <div
// //                   className={`bg-gradient-to-r ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}
// //                 >
// //                   {stat.icon}
// //                 </div>
// //                 {stat.change && (
// //                   <div
// //                     className={`flex items-center ${stat.isPositive ? "text-green-500" : "text-red-500"} text-sm font-medium`}
// //                   >
// //                     {stat.change}
// //                     {stat.isPositive ? (
// //                       <ChevronUp size={16} className="ml-1" />
// //                     ) : (
// //                       <ChevronDown size={16} className="ml-1" />
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //               <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
// //               <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
// //             </div>
// //             <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* --- KEEP THE REST OF YOUR ORIGINAL CONTENT BELOW --- */}
// //       {/* Placeholder for the rest of the dashboard */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //         {/* Performance chart, upcoming campaigns, etc. */}
// //         <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-purple-100 flex flex-col items-center justify-center h-64">
// //           <BarChart2 size={48} className="text-purple-200" />
// //           <p className="mt-4 text-sm text-gray-500">Chart visualization will appear here</p>
// //         </div>
// //         <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100 text-center">
// //           <p className="text-gray-500">You can replace the static Upcoming Campaigns block with dynamic data later.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import {
//   Users,
//   Briefcase,
//   MessageCircle,
//   UserPlus,
//   ChevronUp,
//   ChevronDown,
//   Calendar,
//   BarChart2,
// } from "lucide-react";

// /**
//  * Admin dashboard that fetches real‑time numbers + recent lists from the backend.
//  *
//  * Existing Express routes you showed (names may vary in your code):
//  *   • GET /api/influencer/get               → Influencer list
//  *   • GET /api/users/all                    → All bookings (❗ rename later to /api/booking)
//  *   • GET /api/contact/getmessages          → Messages (use ?status=unread)
//  *   • GET /user/users                       → All platform users
//  *
//  * TODO (optional): expose a dedicated /api/admin/overview that returns
//  *   {
//  *     metrics: { influencers: 0, campaigns: 0, unread: 0, users: 0 },
//  *     recentBookings: Booking[],
//  *     recentInfluencers: Influencer[]
//  *   }
//  * to replace the multiple network calls below.
//  */
// const AdminDashboard = () => {
//   /* ------------------------------------------------------------------ */
//   /*  STATE                                                            */
//   /* ------------------------------------------------------------------ */
//   const [stats, setStats] = useState({
//     influencers: null,
//     campaigns: null,
//     unreadMessages: null,
//     users: null,
//   });
//   const [recentBookings, setRecentBookings] = useState([]); // last 5
//   const [recentInfluencers, setRecentInfluencers] = useState([]); // last 5
//   const [loading, setLoading] = useState(true);

//   /* ------------------------------------------------------------------ */
//   /*  DATA FETCH                                                        */
//   /* ------------------------------------------------------------------ */
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [infRes, bookingRes, msgRes, userRes] = await Promise.all([
//           axios.get("http://localhost:4000/api/influencer/get"),
//           axios.get("http://localhost:4000/api/users/all", { params: { status: "all" } }),
//           axios.get("http://localhost:4000/api/contact/getmessages", {
//             params: { status: "unread" },
//           }),
//           axios.get("http://localhost:4000/user/users"),
//         ]);

//         const influencers = infRes.data.influencers ?? infRes.data; // support both shapes
//         const bookings = bookingRes.data;

//         /* ----------------- helper: sort desc by createdAt/id ---------------- */
//         const sortDesc = (a, b) => {
//           if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
//           return (b.id ?? 0) - (a.id ?? 0);
//         };

//         /* ----------------- store in state ----------------------------------- */
//         setStats({
//           influencers: influencers.length,
//           campaigns: bookings.length,
//           unreadMessages: msgRes.data.length,
//           users: userRes.data.users.length,
//         });

//         setRecentBookings(bookings.sort(sortDesc).slice(0, 5));
//         setRecentInfluencers(influencers.sort(sortDesc).slice(0, 5));
//       } catch (err) {
//         console.error("Failed to load dashboard stats", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   /* ------------------------------------------------------------------ */
//   /*  DERIVED LOOKUP: map influencerId ➜ name for quick access          */
//   /* ------------------------------------------------------------------ */
//   const influencerNameById = useMemo(() => {
//     const map = new Map();
//     recentInfluencers.forEach((inf) => map.set(inf.id, inf.name));
//     return map;
//   }, [recentInfluencers]);

//   /* ------------------------------------------------------------------ */
//   /*  CARD CONFIG                                                      */
//   /* ------------------------------------------------------------------ */
//   const cardConfig = [
//     {
//       id: 1,
//       title: "Total Influencers",
//       value: stats.influencers,
//       icon: <Users size={20} />,
//       color: "from-purple-500 to-purple-700",
//     },
//     {
//       id: 2,
//       title: "Total Campaigns",
//       value: stats.campaigns,
//       icon: <Briefcase size={20} />,
//       color: "from-pink-500 to-pink-700",
//     },
//     {
//       id: 3,
//       title: "Total Messages",
//       value: stats.unreadMessages,
//       icon: <MessageCircle size={20} />,
//       color: "from-purple-400 to-pink-500",
//     },
//     {
//       id: 4,
//       title: "Total Users",
//       value: stats.users,
//       icon: <UserPlus size={20} />,
//       color: "from-indigo-500 to-purple-600",
//     },
//   ];

//   /* ------------------------------------------------------------------ */
//   /*  RENDER                                                           */
//   /* ------------------------------------------------------------------ */
//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* --------------------------------------------------------------- */}
//       {/*  HEADER                                                      */}
//       {/* --------------------------------------------------------------- */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
//           <p className="text-gray-500">Monitor all influencer and campaign activities</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm px-4 py-2 border border-purple-100">
//           <p className="text-sm font-medium text-gray-600">
//             <Calendar size={16} className="inline mr-2 text-purple-500" />
//             {new Date().toLocaleDateString(undefined, {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>
//       </div>

//       {/* --------------------------------------------------------------- */}
//       {/*  STATS CARDS                                                 */}
//       {/* --------------------------------------------------------------- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {cardConfig.map((card) => (
//           <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <div className={`bg-gradient-to-r ${card.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
//                   {card.icon}
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">
//                 {loading || card.value === null ? "--" : card.value.toLocaleString()}
//               </h3>
//               <p className="text-gray-500 text-sm mt-1">{card.title}</p>
//             </div>
//             <div className={`h-1 bg-gradient-to-r ${card.color}`}></div>
//           </div>
//         ))}
//       </div>

//       {/* --------------------------------------------------------------- */}
//       {/*  MAIN GRID (chart placeholder + anything you like)            */}
//       {/* --------------------------------------------------------------- */}
//       {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
//         <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-purple-100 flex flex-col items-center justify-center h-64">
//           <BarChart2 size={48} className="text-purple-200" />
//           <p className="mt-4 text-sm text-gray-500">Chart visualization will appear here</p>
//         </div>
//          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100 text-center flex items-center justify-center">
//           <p className="text-gray-500">Placeholder – upcoming widgets</p>
//         </div>
//       </div> */}
    
//         {/* Performance Chart */}
//         <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-purple-100">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">Campaign Performance</h2>
//             <div className="flex space-x-2">
//               <select className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300">
//                 <option>Last 7 days</option>
//                 <option>Last 30 days</option>
//                 <option>Last 90 days</option>
//               </select>
//             </div>
//           </div>
//           <div className="h-64 flex items-center justify-center">
//             <div className="text-center">
//               <BarChart2 size={48} className="mx-auto text-purple-200" />
//               <p className="mt-4 text-sm text-gray-500">Chart visualization will appear here</p>
//               <p className="text-xs text-gray-400">The chart will display campaign performance metrics</p>
//             </div>
//           </div>
//         </div>
//       {/* --------------------------------------------------------------- */}
//       {/*  RECENT BOOKING + RECENT INFLUENCERS                          */}
//       {/* --------------------------------------------------------------- */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//         {/* -------------------- Latest Bookings -------------------- */}
//         <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">Latest Bookings</h2>
//             <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
//           </div>

//           {recentBookings.length === 0 ? (
//             <p className="text-sm text-gray-500">No bookings found.</p>
//           ) : (
//             <ul className="divide-y divide-gray-100">
//               {recentBookings.map((bk) => (
//                 <li key={bk.id} className="py-4 flex justify-between items-start hover:bg-purple-50 px-2 rounded-md">
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-800">{bk.campaignTitle ?? "Untitled Campaign"}</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {bk.createdAt ? new Date(bk.createdAt).toLocaleDateString() : "—"}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-600">
//                       {influencerNameById.get(bk.influencerId) ?? `#${bk.influencerId}`}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* -------------------- Recent Influencers ------------------- */}
//         <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">Recently Added Influencers</h2>
//             <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
//           </div>

//           {recentInfluencers.length === 0 ? (
//             <p className="text-sm text-gray-500">No influencers found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-100">
//                     <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
//                     <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {recentInfluencers.map((inf) => (
//                     <tr key={inf.id} className="hover:bg-purple-50">
//                       <td className="py-3 pr-6 text-sm font-medium text-gray-800">{inf.name}</td>
//                       <td className="py-3 text-sm text-gray-600">{inf.email ?? "—"}</td>
//                       <td className="py-3 text-sm text-gray-600">
//                         {inf.createdAt ? new Date(inf.createdAt).toLocaleDateString() : "—"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;