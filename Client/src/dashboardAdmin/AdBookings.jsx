
// import React, { useState, useEffect } from 'react';
// import { Search, Grid, List, Filter,ChevronDown } from 'lucide-react';
// import axios from 'axios';
// const ITEMS_PER_PAGE = 7;
// const AdBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//    const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
//   const [searchTerm, setSearchTerm] = useState('');


//   const fetchBookings = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:4000/api/users/all`, {
//       params: { status: statusFilter, page}
//       });
//       console.log("resss", response);
//       setBookings(response.data);
//       setLoading(false);
    
//       setTotalCount(data.totalCount);
//       setTotalPages(Math.max(1, Math.ceil(data.totalCount / ITEMS_PER_PAGE)));
    
    
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
// const handlePageChange = (newPage) => {
//   if (newPage < 1 || newPage > totalPages) return;
//   setPage(newPage);
// };
//   // دالة للبحث
//   const handleSearch = () => {
//     // In your actual code, call fetchBookings() here
//     console.log("Searching for:", searchTerm);
//   };

//   // Toggle view mode
//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'table' ? 'card' : 'table');
//   };
// const filteredBookings = bookings.filter(b => {
//   // فلتر الحالة
//   const statusOk = statusFilter === 'all' || b.status === statusFilter;
//   // فلتر البحث (ابحث في العنوان أو اسم المستخدم أو الإيميل مثلاً)
//   const q = searchTerm.trim().toLowerCase();
//   const searchOk =
//     q === '' ||
//     b.campaignTitle?.toLowerCase().includes(q) ||
//     b.User?.name?.toLowerCase().includes(q) ||
//     b.User?.email?.toLowerCase().includes(q);
//   return statusOk && searchOk;
// });

// const filteredBookingsCount = filteredBookings.length;
// const totalBookingsCount    = bookings.length;
//   useEffect(() => {
//     setTotalPages(Math.ceil(filteredBookings.length / ITEMS_PER_PAGE));
//     setPage(1);
//   }, [filteredBookings]);

//   // حساب الحجوزات التي سيتم عرضها في الصفحة الحالية
//   const bookingsToDisplay = filteredBookings.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );
//   // Get status badge styling
//   const getStatusBadge = (status) => {
//     switch(status) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
//       case 'published':
//         return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
//       case 'rejected':
//         return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
//       default:
//         return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-6">
//        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
//       {/* عنوان الصفحة */}
//       <div>
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//           Ad Booking Requests
//         </h1>
//         <p className="text-gray-500">
//           Manage your campaign bookings and requests
//         </p>
//       </div>

//       {/* أزرار تبديل العرض */}
//       <div className="flex space-x-2">
//         {["table", "card"].map((mode) => (
//           <button
//             key={mode}
//             onClick={() => toggleViewMode(mode)}
//             className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//               viewMode === mode
//                 ? "bg-purple-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {mode === "table" ? "Table View" : "Card View"}
//           </button>
//         ))}
     
//       </div>
//  </div>
//       {/* لوحة التحكم */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-purple-100 w-full">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
//           {/* حقل البحث */}
//           <div className="relative w-full md:w-auto md:flex-grow">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search campaigns..."
//               className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* فلتر الحالة */}
//           <div className="flex items-center">
//             <Filter size={18} className="text-gray-500 mr-2" />
//             <span className="text-sm text-gray-500 mr-2 hidden md:inline">
//               Filter:
//             </span>

//             <div className="relative flex-grow">
//               <select
//                 value={statusFilter}
//                 onChange={handleStatusFilterChange}
//                 className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent cursor-pointer w-full"
//               >
//                 <option value="all">All</option>
//                 <option value="pending">Pending</option>
//                 <option value="published">Published</option>
//                 <option value="rejected">Rejected</option>

//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <ChevronDown size={16} className="text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* عدّاد النتائج */}
//         {typeof filteredBookingsCount === "number" &&
//           typeof totalBookingsCount === "number" && (
//             <div className="text-sm text-gray-500 mt-2">
//               Showing{" "}
//               <span className="font-medium text-gray-700">
//                 {filteredBookingsCount}
//               </span>{" "}
//               out of{" "}
//               <span className="font-medium text-gray-700">
//                 {totalBookingsCount}
//               </span>{" "}
//               bookings
//             </div>
//           )}
//       </div>
   
//       {/* Content - loading state */}
//       {loading && (
//         <div className="flex justify-center py-12">
//           <div className="animate-pulse flex space-x-4">
//             <div className="rounded-full bg-purple-200 h-10 w-10"></div>
//             <div className="flex-1 space-y-4 py-1">
//               <div className="h-4 bg-purple-200 rounded w-3/4"></div>
//               <div className="space-y-2">
//                 <div className="h-4 bg-purple-200 rounded"></div>
//                 <div className="h-4 bg-purple-200 rounded w-5/6"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Content - Table View */}
//       {!loading && viewMode === 'table' && (
//         <div className="overflow-x-auto shadow-md rounded-lg">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {bookingsToDisplay.length > 0 ? (
//                 bookingsToDisplay.map((booking) => (
//                   <tr key={booking.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">{booking?.User?.name}</div>
//                       <div className="text-sm text-gray-500">{booking?.User?.email}</div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">{booking?.InfluencerRegistration?.User?.name}</div>
//                       <div className="text-sm text-gray-500">{booking?.InfluencerRegistration?.User?.email}</div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-900">{booking?.campaignTitle || 'N/A'}</td>
//                     <td className="px-6 py-4">
//                       <span className={getStatusBadge(booking?.status)}>
//                         {booking?.status?.charAt(0).toUpperCase() + booking?.status?.slice(1) || 'N/A'}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
//                     No bookings found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Content - Card View */}
//       {!loading && viewMode === 'card' && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {bookingsToDisplay.length > 0 ? (
//             bookingsToDisplay.map((booking) => (
//               <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//                 <div className="p-5">
//                   <h3 className="text-lg font-bold text-gray-900">{booking?.campaignTitle || 'No Title'}</h3>
//                   <div className="mt-2">
//                     <span className={getStatusBadge(booking?.status)}>
//                       {booking?.status?.charAt(0).toUpperCase() + booking?.status?.slice(1) || 'N/A'}
//                     </span>
//                   </div>
                  
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <div className="mb-3">
//                       <p className="text-xs font-medium text-gray-500">BRAND</p>
//                       <p className="text-sm font-medium text-gray-900">{booking?.User?.name || 'N/A'}</p>
//                       <p className="text-xs text-gray-500">{booking?.User?.email || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs font-medium text-gray-500">INFLUENCER</p>
//                       <p className="text-sm font-medium text-gray-900">
//                         {booking?.InfluencerRegistration?.User?.name || 'N/A'}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {booking?.InfluencerRegistration?.User?.email || 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12 text-gray-500">
//               No bookings found
//             </div>
//           )}
//         </div>
//       )}

//       {/* Pagination */}
//       {!loading &&  totalPages > 0 && (
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page <= 1}
//             className="px-4 py-2 bg-purple-600 text-white rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 bg-white border-t border-b border-gray-300">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page >= totalPages}
//             className="px-4 py-2 bg-purple-600 text-white rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdBookings;

import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import axios from 'axios';

const ITEMS_PER_PAGE = 9;

const AdBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/users/all`);
      const data = response.data;
      setBookings(data);
      setLoading(false);
      setPage(1); // Reset to page 1 on new data fetch
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // فلترة الحجوزات حسب الحالة والبحث
  const filteredBookings = bookings.filter((b) => {
    const statusOk = statusFilter === 'all' || b.status === statusFilter;
    const q = searchTerm.trim().toLowerCase();
    const searchOk =
      q === '' ||
      b.campaignTitle?.toLowerCase().includes(q) ||
      b.User?.name?.toLowerCase().includes(q) ||
      b.User?.email?.toLowerCase().includes(q);
    return statusOk && searchOk;
  });

  // تحديث عدد الصفحات حسب عدد الحجوزات بعد الفلترة
useEffect(() => {
  setPage(1);
}, [statusFilter, searchTerm]);

// تحديث عدد الصفحات كل مرة تتغير فيها الحجوزات المفلترة فقط
useEffect(() => {
  setTotalPages(Math.ceil(filteredBookings.length / ITEMS_PER_PAGE));
}, [filteredBookings]);
  // الحجوزات المعروضة في الصفحة الحالية
  const bookingsToDisplay = filteredBookings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // دالة تغيير الفلتر
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // دالة تغيير الصفحة
  const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > totalPages) return;
  console.log('Changing page to', newPage);
  setPage(newPage);
};

  // دالة تبديل وضع العرض
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // دالة تنسيق حالة الحجز (badge)
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'published':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'rejected':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        {/* عنوان الصفحة */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Ad Booking Requests
          </h1>
          <p className="text-gray-500">Manage your campaign bookings and requests</p>
        </div>

        {/* أزرار تبديل العرض */}
        <div className="flex space-x-2">
          {['table', 'card'].map((mode) => (
            <button
              key={mode}
              onClick={() => toggleViewMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {mode === 'table' ? 'Table View' : 'Card View'}
            </button>
          ))}
        </div>
      </div>

      {/* لوحة التحكم */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-purple-100 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* حقل البحث */}
          <div className="relative w-full md:w-auto md:flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* فلتر الحالة */}
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-500 mr-2 hidden md:inline">Filter:</span>

            <div className="relative flex-grow">
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent cursor-pointer w-full"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* عدّاد النتائج */}
        <div className="text-sm text-gray-500 mt-2">
          Showing{' '}
          <span className="font-medium text-gray-700">{filteredBookings.length}</span>{' '}
          out of{' '}
          <span className="font-medium text-gray-700">{bookings.length}</span> bookings
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Influencer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookingsToDisplay.length > 0 ? (
                bookingsToDisplay.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{booking?.User?.name}</div>
                      <div className="text-sm text-gray-500">{booking?.User?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {booking?.InfluencerRegistration?.User?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking?.InfluencerRegistration?.User?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{booking?.campaignTitle || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(booking?.status)}>
                        {booking?.status
                          ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                          : 'N/A'}
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
          {bookingsToDisplay.length > 0 ? (
            bookingsToDisplay.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{booking?.campaignTitle || 'No Title'}</h3>
                  <div className="mt-2">
                    <span className={getStatusBadge(booking?.status)}>
                      {booking?.status
                        ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                        : 'N/A'}
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
            <div className="col-span-full text-center py-12 text-gray-500">No bookings found</div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 0 && (
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
