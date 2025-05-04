// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   // دالة لجلب جميع الحجوزات
//   const fetchBookings = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:4000/api/users/all`, {
//         params: { status: statusFilter, page, limit: 10 }
//       });
//       console.log("resss",response)
//       setBookings(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [statusFilter, page]);

//   // دالة لتغيير الفلتر
//   const handleStatusFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//     setPage(1); // عند تغيير الفلتر نعيد الصفحة إلى الأولى
//   };

//   // دالة لتغيير الصفحة
//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-4">Ad Booking Requests</h2>

//       {/* فلتر الحالة */}
//       <div className="mb-6">
//         <label className="mr-4">Filter by status:</label>
//         <select
//           value={statusFilter}
//           onChange={handleStatusFilterChange}
//           className="p-2 border border-gray-300 rounded-md"
//         >
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="accepted">Accepted</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>

//       {/* جدول عرض الحجوزات */}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <table className="min-w-full table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-2 text-left">User Name</th>
//               <th className="px-6 py-2 text-left">Influencer Name</th>
//               <th className="px-6 py-2 text-left">Campaign Title</th>
//               <th className="px-6 py-2 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td className="px-6 py-4">{booking?.User?.name}<div></div>{booking?.User?.email}</td>
//                 {/* <td className="px-6 py-4">{booking?.User?.email}</td> */}
//                 <td className="px-6 py-4">{booking?.InfluencerRegistration?.User?.name}<div></div>{booking?.InfluencerRegistration?.User?.email}</td>
//                 <td className="px-6 py-4">{booking?.campaignTitle}</td>
//                 <td className="px-6 py-4">{booking?.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Pagination */}
//       <div className="mt-4 flex justify-center">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page <= 1}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Previous
//         </button>
//         <span className="px-4 py-2">{page}</span>
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page >= totalPages}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdBookings;


import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import axios from 'axios';
const AdBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for the example
  // useEffect(() => {
  //   setLoading(true);
  //   // Simulating API call - in your actual code, you'll use your axios logic here
  //   setTimeout(() => {
  //     setBookings([
  //       {
  //         id: 1,
  //         User: { name: "Sarah Johnson", email: "sarah@example.com" },
  //         InfluencerRegistration: { User: { name: "Alex Peterson", email: "alex@influencer.com" } },
  //         campaignTitle: "Summer Fashion Collection",
  //         status: "pending"
  //       },
  //       {
  //         id: 2,
  //         User: { name: "Michael Chen", email: "mchen@company.com" },
  //         InfluencerRegistration: { User: { name: "Lisa Wang", email: "lisa@creator.net" } },
  //         campaignTitle: "Fitness App Launch",
  //         status: "accepted"
  //       },
  //       {
  //         id: 3,
  //         User: { name: "James Wilson", email: "jwilson@brand.co" },
  //         InfluencerRegistration: { User: { name: "Emma Roberts", email: "emma@social.me" } },
  //         campaignTitle: "Organic Food Awareness",
  //         status: "rejected"
  //       }
  //     ]);
  //     setLoading(false);
  //   }, 800);
  // }, []);

  // دالة لجلب جميع الحجوزات
  // In your actual code, replace this comment with your fetchBookings function:
 
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/users/all`, {
      params: { status: statusFilter, page, limit: 10 }
      });
      console.log("resss", response);
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, page]);


  // دالة لتغيير الفلتر
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // عند تغيير الفلتر نعيد الصفحة إلى الأولى
  };

  // دالة لتغيير الصفحة
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // دالة للبحث
  const handleSearch = () => {
    // In your actual code, call fetchBookings() here
    console.log("Searching for:", searchTerm);
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'accepted':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'rejected':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header with title */}
      <div className="bg-purple-600 text-white p-6 rounded-t-lg">
        <h2 className="text-3xl font-bold">Ad Booking Requests</h2>
        <p className="text-purple-100 mt-1">Manage your campaign bookings and requests</p>
      </div>

      {/* Control panel */}
      <div className="bg-white p-6 border-x border-b rounded-b-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="md:w-1/3">
            <div className="flex">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search campaigns..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Status filter */}
            <div className="flex items-center">
              <label className="mr-2">Filter:</label>
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* View toggle */}
            <button
              onClick={toggleViewMode}
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              title={viewMode === 'table' ? 'Switch to card view' : 'Switch to table view'}
            >
              {viewMode === 'table' ? (
                <Grid className="h-5 w-5 text-gray-600" />
              ) : (
                <List className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content - loading state */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-purple-200 h-10 w-10"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-purple-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-purple-200 rounded"></div>
                <div className="h-4 bg-purple-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content - Table View */}
      {!loading && viewMode === 'table' && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{booking?.User?.name}</div>
                      <div className="text-sm text-gray-500">{booking?.User?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{booking?.InfluencerRegistration?.User?.name}</div>
                      <div className="text-sm text-gray-500">{booking?.InfluencerRegistration?.User?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{booking?.campaignTitle || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(booking?.status)}>
                        {booking?.status?.charAt(0).toUpperCase() + booking?.status?.slice(1) || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Content - Card View */}
      {!loading && viewMode === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{booking?.campaignTitle || 'No Title'}</h3>
                  <div className="mt-2">
                    <span className={getStatusBadge(booking?.status)}>
                      {booking?.status?.charAt(0).toUpperCase() + booking?.status?.slice(1) || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-500">BRAND</p>
                      <p className="text-sm font-medium text-gray-900">{booking?.User?.name || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{booking?.User?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">INFLUENCER</p>
                      <p className="text-sm font-medium text-gray-900">
                        {booking?.InfluencerRegistration?.User?.name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking?.InfluencerRegistration?.User?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No bookings found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && bookings.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-purple-600 text-white rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-white border-t border-b border-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-purple-600 text-white rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdBookings;