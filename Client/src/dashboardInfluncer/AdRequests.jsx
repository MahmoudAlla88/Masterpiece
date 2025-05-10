
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { BadgeCheck, XCircle, Eye, RefreshCw } from 'lucide-react';
// // // import { useSelector } from 'react-redux';
// // // const AdRequests = () => {
// // //   const Influencer = useSelector((state) => state.user.currentUser);
// // //   console.log("Influencer",Influencer)
// // //   const [requests, setRequests] = useState([]);
// // //   const [filter, setFilter] = useState('all');
// // //   const [viewMode, setViewMode] = useState('cards');
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedRequest, setSelectedRequest] = useState(null);
// // //   const [scheduleDate, setScheduleDate] = useState('');
// // //   const [scheduleTime, setScheduleTime] = useState('');

 

// // //   const fetchAdRequests = async () => {
// // //     if (!Influencer  ) {
// // //       console.error('Influencer data or ID is missing');
// // //       return;
// // //     }
  
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.get(`http://localhost:4000/api/users/influencer/${Influencer.id}`); 
// // //      console.log("knkjh",response)
// // //       setRequests(response.data);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error('Error fetching requests:', error);
// // //       setLoading(false);
// // //     }
// // //   };
// // //  useEffect(() => {

// // //     fetchAdRequests();
// // //   },[Influencer]);
// // //   const handleStatusChange = async (requestId, status) => {
// // //     try {
// // //       const response = await axios.put(`http://localhost:4000/api/users/update-status/${requestId}`, {
// // //         status,
// // //         scheduledDate: `${scheduleDate}T${scheduleTime}:00`,  // دمج التاريخ مع الوقت
// // //       });
// // //       fetchAdRequests();  // تحديث الطلبات بعد التعديل
// // //     } catch (error) {
// // //       console.error('Error updating status:', error);
// // //     }
// // //   };

// // //   const handleViewDetails = (request) => {
// // //     setSelectedRequest(request);
// // //   };

// // //   const handleAddSchedule = async () => {
// // //     try {
// // //       await handleStatusChange(selectedRequest.id, 'scheduled');  
// // //       setSelectedRequest(null);
// // //       setScheduleDate('');
// // //       setScheduleTime('');
// // //     } catch (error) {
// // //       console.error('Error adding schedule:', error);
// // //     }
// // //   };

// // //   const getStatusText = (status) => {
// // //     switch (status) {
// // //       case 'pending':
// // //         return 'Pending';
// // //       case 'accepted':
// // //         return 'Accepted';
// // //       case 'rejected':
// // //         return 'Rejected';
// // //       case 'scheduled':
// // //         return 'Scheduled';
// // //         case 'paid':
// // //           return 'Paid';
// // //       default:
// // //         return 'Unknown';
// // //     }
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case 'pending':
// // //         return 'bg-yellow-500 text-white';
// // //       case 'accepted':
// // //         return 'bg-blue-300 text-white';
// // //       case 'rejected':
// // //         return 'bg-red-600 text-white';
// // //       case 'scheduled':
// // //         return 'bg-blue-600 text-white';
// // //         case 'paid':
// // //           return 'bg-green-600 text-white';
// // //       default:
// // //         return 'bg-gray-500 text-white';
// // //     }
// // //   };

// // //   const filteredRequests = requests.filter((request) => 
// // //     filter === 'all' || request.status === filter
// // //   );

// // //   return (
// // //     <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
// // //       <div className="mb-8">
// // //         <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Ad Requests</h2>
// // //         <p className="text-gray-600">Manage incoming advertisement requests from brands</p>
// // //       </div>

// // //       {/* Filter and View Toggle */}
// // //       <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
// // //         <div className="flex items-center space-x-4 mb-4 md:mb-0">
// // //           <span className="text-gray-700">Filter by:</span>
// // //           <div className="flex space-x-2">
// // //             <button 
// // //               onClick={() => setFilter('all')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               All
// // //             </button>
// // //             <button 
// // //               onClick={() => setFilter('pending')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               Pending
// // //             </button>
// // //             <button 
// // //               onClick={() => setFilter('accepted')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               Accepted
// // //             </button>
// // //             <button 
// // //               onClick={() => setFilter('rejected')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               Rejected
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="flex items-center space-x-4">
// // //           <button 
// // //             onClick={() => setViewMode('cards')} 
// // //             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'cards' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //           >
// // //             <span>Card View</span>
// // //           </button>
// // //           <button 
// // //             onClick={() => setViewMode('table')} 
// // //             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //           >
// // //             <span>Table View</span>
// // //           </button>
// // //           <button
// // //             onClick={fetchAdRequests}
// // //             className="p-2 bg-purple-100 rounded-full text-purple-700 hover:bg-purple-200 transition-colors"
// // //             title="Refresh"
// // //           >
// // //             <RefreshCw size={16} />
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Loading or No Requests Message */}
// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-40">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
// // //         </div>
// // //       ) : filteredRequests.length === 0 ? (
// // //         <div className="bg-white rounded-lg shadow-md p-8 text-center">
// // //           <p className="text-gray-500 text-lg">No {filter !== 'all' ? `${getStatusText(filter)} ` : ''}requests available.</p>
// // //         </div>
// // //       ) : viewMode === 'cards' ? (
// // //         // Card View
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {filteredRequests.map((request) => (
// // //             <div key={request.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
// // //               <div className="p-5 border-b border-gray-100">
// // //                 <div className="flex justify-between items-start">
// // //                   <h3 className="text-xl font-bold text-gray-800">{request.campaignTitle}</h3>
// // //                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
// // //                     {getStatusText(request.status)}
// // //                   </span>
// // //                 </div>
// // //                 <p className="mt-2 text-gray-600 line-clamp-2">{request.brief}</p>
// // //               </div>
// // //               <div className="p-4 bg-gray-50">
// // //                 <div className="flex justify-between items-center mb-3">
// // //                   <span className="text-sm text-gray-500">Budget:</span>
// // //                   <span className="font-semibold text-purple-700">${request.proposedPrice}</span>
// // //                 </div>
// // //                 <div className="flex justify-between items-center">
// // //                   <span className="text-sm text-gray-500">Date:</span>
// // //                   <span className="text-sm">{new Date(request.requestedDate).toLocaleDateString()} {new Date(request.requestedDate).toLocaleTimeString()}</span>
// // //                 </div>
// // //               </div>
// // //               <div className="p-4 flex gap-2 bg-gray-50 border-t border-gray-100">
// // //                 {request.status === 'pending' && (
// // //                   <>
// // //                     <button
// // //                       onClick={() => handleStatusChange(request.id, 'accepted')}
// // //                       className="flex-1 flex justify-center items-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
// // //                     >
// // //                       <BadgeCheck size={16} className="mr-2" />
// // //                       Accept
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleStatusChange(request.id, 'rejected')}
// // //                       className="flex-1 flex justify-center items-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
// // //                     >
// // //                       <XCircle size={16} className="mr-2" />
// // //                       Reject
// // //                     </button>
// // //                   </>
// // //                 )}
// // //                 <button
// // //                   onClick={() => handleViewDetails(request)}
// // //                   className="flex-1 flex justify-center items-center py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
// // //                 >
// // //                   <Eye size={16} className="mr-2" />
// // //                   View
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         // Table View
// // //         <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead className="bg-purple-50">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {filteredRequests.map((request) => (
// // //                 <tr key={request.id}>
// // //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.campaignTitle}</td>
// // //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${request.proposedPrice}</td>
// // //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // //                     {new Date(request.requestedDate).toLocaleDateString()} {new Date(request.requestedDate).toLocaleTimeString()}
// // //                   </td>
// // //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // //                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
// // //                       {getStatusText(request.status)}
// // //                     </span>
// // //                   </td>
// // //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // //                     {request.status === 'pending' && (
// // //                       <div className="flex gap-2">
// // //                         <button
// // //                           onClick={() => handleStatusChange(request.id, 'accepted')}
// // //                           className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
// // //                         >
// // //                           Accept
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleStatusChange(request.id, 'rejected')}
// // //                           className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
// // //                         >
// // //                           Reject
// // //                         </button>
// // //                       </div>
// // //                     )}
// // //                     <button
// // //                       onClick={() => handleViewDetails(request)}
// // //                       className="mt-2 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
// // //                     >
// // //                       View
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}

// // //       {/* Modal for viewing request details */}
// // //       {selectedRequest && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
// // //           <div className="bg-white p-6 rounded-lg shadow-md w-96">
// // //             <h3 className="text-xl font-bold mb-4">Request Details</h3>
// // //             <p className="text-gray-700 mb-2">Title: {selectedRequest.campaignTitle}</p>
// // //             <p className="text-gray-700 mb-2">Details: {selectedRequest.brief}</p>
// // //             <p className="text-gray-700 mb-2">Budget: ${selectedRequest.proposedPrice}</p>
// // //             <p className="text-gray-700 mb-2">Status: {getStatusText(selectedRequest.status)}</p>
           
// // //             {selectedRequest.status === 'paid' && (
// // //             <div className="mb-4">
// // //               <input
// // //                 type="date"
// // //                 value={scheduleDate}
// // //                 onChange={(e) => setScheduleDate(e.target.value)}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
// // //               />
// // //               <input
// // //                 type="time"
// // //                 value={scheduleTime}
// // //                 onChange={(e) => setScheduleTime(e.target.value)}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
// // //               />
// // //             </div>

// // //  )}

// // //             <div className="flex justify-between gap-2">
// // //             {selectedRequest.status === 'paid' && ( 
// // //                  <button onClick={handleAddSchedule} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
// // //                 Add Schedule
// // //               </button>
           
// // //             )}
          
// // //               <button onClick={() => setSelectedRequest(null)} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">
// // //                 Close
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AdRequests;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import {
// //   BadgeCheck,
// //   XCircle,
// //   Eye,
// //   RefreshCw,
// //   UploadCloud,
// //   Ban
// // } from 'lucide-react';
// // import { useSelector } from 'react-redux';

// // const AdRequests = () => {
// //   /* ====================== STATE ====================== */
// //   const influencer = useSelector((state) => state.user.currentUser);
// //   const [requests, setRequests] = useState([]);
// //   const [filter, setFilter] = useState('all');
// //   const [viewMode, setViewMode] = useState('cards');
// //   const [loading, setLoading] = useState(true);

// //   /* ----- modal ----- */
// //   const [selectedRequest, setSelectedRequest] = useState(null);
// //   const [scheduleDate, setScheduleDate] = useState('');
// //   const [scheduleTime, setScheduleTime] = useState('');
// //   const [postUrl, setPostUrl] = useState('');
// //   const [actionError, setActionError] = useState('');

// //   /* ====================== API ====================== */
// //   const api = axios.create({
// //     baseURL: 'http://localhost:4000/api/users'
// //   });

// //   const fetchAdRequests = async () => {
// //     if (!influencer) return;
// //     setLoading(true);
// //     try {
// //       const { data } = await api.get(`/influencer/${influencer.id}`);
// //       setRequests(data);
// //     } catch (err) {
// //       console.error('Error fetching requests:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* تحديث حالة (accept / reject / scheduled) –ـ المسار القديم */
// //   const handleStatusChange = async (requestId, status, scheduledAt = null) => {
// //     try {
// //       await api.put(`/update-status/${requestId}`, {
// //         status,
// //         scheduledDate: scheduledAt
// //       });
// //       fetchAdRequests();
// //     } catch (err) {
// //       console.error('Error updating status:', err);
// //     }
// //   };

// //   /* ===================================================
// //      PUBLISH  &  CANCEL  (المسار الجديد /status/:id)
// //      =================================================== */
// //   const callInfluencerAction = async ({ action, postUrlValue = '' }) => {
// //     if (!selectedRequest) return;
// //     try {
// //       await api.put(`/status/${selectedRequest.id}`, {
// //         action,
// //         ...(action === 'publish' && { postUrl: postUrlValue })
// //       });
// //       closeModal();
// //       fetchAdRequests();
// //     } catch (err) {
// //       const msg =
// //         err?.response?.data?.message ||
// //         'Unexpected error, please try again later.';
// //       setActionError(msg);
// //       console.error('Influencer action error:', err);
// //     }
// //   };

// //   /* ================ helpers ================ */
// //   const closeModal = () => {
// //     setSelectedRequest(null);
// //     setScheduleDate('');
// //     setScheduleTime('');
// //     setPostUrl('');
// //     setActionError('');
// //   };

// //   const getStatusText = (status) =>
// //     ({
// //       pending: 'Pending',
// //       accepted: 'Accepted',
// //       rejected: 'Rejected',
// //       scheduled: 'Scheduled',
// //       paid: 'Paid',
// //       published: 'Published',
// //       cancelled: 'Cancelled'
// //     }[status] || 'Unknown');

// //   const getStatusColor = (status) =>
// //     ({
// //       pending: 'bg-yellow-500 text-white',
// //       accepted: 'bg-blue-300 text-white',
// //       rejected: 'bg-red-600 text-white',
// //       scheduled: 'bg-blue-600 text-white',
// //       paid: 'bg-green-600 text-white',
// //       published: 'bg-purple-700 text-white',
// //       cancelled: 'bg-gray-500 text-white'
// //     }[status] || 'bg-gray-500 text-white');

// //   /* ============== effects ============== */
// //   useEffect(() => {
// //     fetchAdRequests();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [influencer]);

// //   /* ============== derived ============== */
// //   const filteredRequests = requests.filter(
// //     (r) => filter === 'all' || r.status === filter
// //   );

// //   /* ============== RENDER ============== */
// //   return (
// //     <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
// //       {/* ============= Header ============= */}
// //       <div className="mb-8">
// //         <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
// //           Ad Requests
// //         </h2>
// //         <p className="text-gray-600">
// //           Manage incoming advertisement requests from brands
// //         </p>
// //       </div>

// //       {/* ============= Controls ============= */}
// //       <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
// //         {/* ---- filter ---- */}
// //         <div className="flex items-center space-x-4 mb-4 md:mb-0">
// //           <span className="text-gray-700">Filter by:</span>
// //           {[
// //             { value: 'all', label: 'All' },
// //             { value: 'pending', label: 'Pending' },
// //             { value: 'accepted', label: 'Accepted' },
// //             { value: 'rejected', label: 'Rejected' },
// //             { value: 'scheduled', label: 'Scheduled' },
// //             { value: 'published', label: 'Published' }
// //           ].map(({ value, label }) => (
// //             <button
// //               key={value}
// //               onClick={() => setFilter(value)}
// //               className={`px-3 py-1 rounded-full text-sm ${
// //                 filter === value
// //                   ? 'bg-purple-600 text-white'
// //                   : 'bg-gray-200 text-gray-700'
// //               }`}
// //             >
// //               {label}
// //             </button>
// //           ))}
// //         </div>

// //         {/* ---- view / refresh ---- */}
// //         <div className="flex items-center space-x-4">
// //           <button
// //             onClick={() => setViewMode('cards')}
// //             className={`px-3 py-1 rounded-md text-sm ${
// //               viewMode === 'cards'
// //                 ? 'bg-purple-600 text-white'
// //                 : 'bg-gray-200 text-gray-700'
// //             }`}
// //           >
// //             Card View
// //           </button>
// //           <button
// //             onClick={() => setViewMode('table')}
// //             className={`px-3 py-1 rounded-md text-sm ${
// //               viewMode === 'table'
// //                 ? 'bg-purple-600 text-white'
// //                 : 'bg-gray-200 text-gray-700'
// //             }`}
// //           >
// //             Table View
// //           </button>
// //           <button
// //             onClick={fetchAdRequests}
// //             className="p-2 bg-purple-100 rounded-full text-purple-700 hover:bg-purple-200 transition-colors"
// //             title="Refresh"
// //           >
// //             <RefreshCw size={16} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* ============= Loading / Empty ============= */}
// //       {loading ? (
// //         <div className="flex justify-center items-center h-40">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
// //         </div>
// //       ) : filteredRequests.length === 0 ? (
// //         <div className="bg-white rounded-lg shadow-md p-8 text-center">
// //           <p className="text-gray-500 text-lg">
// //             No {filter !== 'all' ? `${getStatusText(filter)} ` : ''}requests
// //             available.
// //           </p>
// //         </div>
// //       ) : viewMode === 'cards' ? (
// //         /* ============= CARD VIEW ============= */
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredRequests.map((req) => (
// //             <div
// //               key={req.id}
// //               className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
// //             >
// //               <div className="p-5 border-b border-gray-100">
// //                 <div className="flex justify-between items-start">
// //                   <h3 className="text-xl font-bold text-gray-800">
// //                     {req.campaignTitle}
// //                   </h3>
// //                   <span
// //                     className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
// //                       req.status
// //                     )}`}
// //                   >
// //                     {getStatusText(req.status)}
// //                   </span>
// //                 </div>
// //                 <p className="mt-2 text-gray-600 line-clamp-2">{req.brief}</p>
// //               </div>

// //               <div className="p-4 bg-gray-50">
// //                 <div className="flex justify-between items-center mb-3">
// //                   <span className="text-sm text-gray-500">Budget:</span>
// //                   <span className="font-semibold text-purple-700">
// //                     ${req.proposedPrice}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-sm text-gray-500">Date:</span>
// //                   <span className="text-sm">
// //                     {new Date(req.requestedDate).toLocaleDateString()}{' '}
// //                     {new Date(req.requestedDate).toLocaleTimeString()}
// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="p-4 flex gap-2 bg-gray-50 border-t border-gray-100">
// //                 {/* Pending → Accept / Reject */}
// //                 {req.status === 'pending' && (
// //                   <>
// //                     <button
// //                       onClick={() => handleStatusChange(req.id, 'accepted')}
// //                       className="flex-1 flex justify-center items-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
// //                     >
// //                       <BadgeCheck size={16} className="mr-2" />
// //                       Accept
// //                     </button>
// //                     <button
// //                       onClick={() => handleStatusChange(req.id, 'rejected')}
// //                       className="flex-1 flex justify-center items-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
// //                     >
// //                       <XCircle size={16} className="mr-2" />
// //                       Reject
// //                     </button>
// //                   </>
// //                 )}

// //                 {/* Scheduled → Publish / Cancel */}
// //                 {req.status === 'scheduled' && (
// //                   <>
// //                     <button
// //                       onClick={() => {
// //                         setSelectedRequest(req);
// //                         setPostUrl('');
// //                       }}
// //                       className="flex-1 flex justify-center items-center py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
// //                     >
// //                       <UploadCloud size={16} className="mr-2" />
// //                       Publish
// //                     </button>
// //                     <button
// //                       onClick={() => {
// //                         setSelectedRequest(req);
// //                         setActionError('');
// //                       }}
// //                       className="flex-1 flex justify-center items-center py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
// //                     >
// //                       <Ban size={16} className="mr-2" />
// //                       Cancel
// //                     </button>
// //                   </>
// //                 )}

// //                 {/* View (always) */}
// //                 <button
// //                   onClick={() => setSelectedRequest(req)}
// //                   className="flex-1 flex justify-center items-center py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
// //                 >
// //                   <Eye size={16} className="mr-2" />
// //                   View
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         /* ============= TABLE VIEW ============= */
// //         <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-purple-50">
// //               <tr>
// //                 {['Title', 'Budget', 'Date', 'Status', 'Actions'].map((h) => (
// //                   <th
// //                     key={h}
// //                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
// //                   >
// //                     {h}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredRequests.map((req) => (
// //                 <tr key={req.id}>
// //                   <td className="px-6 py-4 text-sm text-gray-500">
// //                     {req.campaignTitle}
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-500">
// //                     ${req.proposedPrice}
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-500">
// //                     {new Date(req.requestedDate).toLocaleDateString()}{' '}
// //                     {new Date(req.requestedDate).toLocaleTimeString()}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
// //                         req.status
// //                       )}`}
// //                     >
// //                       {getStatusText(req.status)}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 space-x-2">
// //                     {req.status === 'pending' && (
// //                       <>
// //                         <button
// //                           onClick={() => handleStatusChange(req.id, 'accepted')}
// //                           className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
// //                         >
// //                           Accept
// //                         </button>
// //                         <button
// //                           onClick={() => handleStatusChange(req.id, 'rejected')}
// //                           className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
// //                         >
// //                           Reject
// //                         </button>
// //                       </>
// //                     )}

// //                     {req.status === 'scheduled' && (
// //                       <>
// //                         <button
// //                           onClick={() => {
// //                             setSelectedRequest(req);
// //                             setPostUrl('');
// //                           }}
// //                           className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
// //                         >
// //                           Publish
// //                         </button>
// //                         <button
// //                           onClick={() => {
// //                             setSelectedRequest(req);
// //                             setActionError('');
// //                           }}
// //                           className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
// //                         >
// //                           Cancel
// //                         </button>
// //                       </>
// //                     )}

// //                     <button
// //                       onClick={() => setSelectedRequest(req)}
// //                       className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
// //                     >
// //                       View
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* ============= MODAL ============= */}
// //       {selectedRequest && (
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
// //             {/* close */}
// //             <button
// //               onClick={closeModal}
// //               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
// //             >
// //               ✕
// //             </button>

// //             <h3 className="text-xl font-bold mb-4">
// //               {selectedRequest.campaignTitle}
// //             </h3>

// //             {/* -------- basic info -------- */}
// //             <div className="space-y-2 text-gray-700 text-sm mb-4">
// //               <p>
// //                 <span className="font-medium">Details: </span>
// //                 {selectedRequest.brief}
// //               </p>
// //               <p>
// //                 <span className="font-medium">Budget: </span>$
// //                 {selectedRequest.proposedPrice}
// //               </p>
// //               <p>
// //                 <span className="font-medium">Status: </span>
// //                 {getStatusText(selectedRequest.status)}
// //               </p>
// //             </div>

// //             {/* -------- schedule (if paid) -------- */}
// //             {selectedRequest.status === 'paid' && (
// //               <>
// //                 <div className="mb-4">
// //                   <input
// //                     type="date"
// //                     value={scheduleDate}
// //                     onChange={(e) => setScheduleDate(e.target.value)}
// //                     className="w-full px-3 py-2 border rounded-md"
// //                   />
// //                   <input
// //                     type="time"
// //                     value={scheduleTime}
// //                     onChange={(e) => setScheduleTime(e.target.value)}
// //                     className="w-full px-3 py-2 border rounded-md mt-2"
// //                   />
// //                 </div>
// //                 <button
// //                   onClick={() =>
// //                     handleStatusChange(
// //                       selectedRequest.id,
// //                       'scheduled',
// //                       `${scheduleDate}T${scheduleTime}:00`
// //                     )
// //                   }
// //                   className="w-full mb-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
// //                   disabled={!scheduleDate || !scheduleTime}
// //                 >
// //                   Add Schedule
// //                 </button>
// //               </>
// //             )}

// //             {/* -------- publish / cancel (if scheduled) -------- */}
// //             {selectedRequest.status === 'scheduled' && (
// //               <>
// //                 {/* Publish */}
// //                 <div className="mb-4">
// //                   <label className="block text-sm font-medium mb-1">
// //                     Post URL
// //                   </label>
// //                   <input
// //                     type="url"
// //                     placeholder="https://…"
// //                     value={postUrl}
// //                     onChange={(e) => setPostUrl(e.target.value)}
// //                     className="w-full px-3 py-2 border rounded-md"
// //                   />
// //                 </div>
// //                 <button
// //                   onClick={() =>
// //                     callInfluencerAction({
// //                       action: 'publish',
// //                       postUrlValue: postUrl.trim()
// //                     })
// //                   }
// //                   disabled={!postUrl.trim()}
// //                   className="w-full mb-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50"
// //                 >
// //                   Publish
// //                 </button>

// //                 {/* Cancel */}
// //                 <button
// //                   onClick={() => callInfluencerAction({ action: 'cancel' })}
// //                   className="w-full mb-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
// //                 >
// //                   Cancel Booking
// //                 </button>
// //               </>
// //             )}

// //             {/* -------- error -------- */}
// //             {actionError && (
// //               <p className="text-red-600 text-sm mb-2">{actionError}</p>
// //             )}

// //             {/* -------- close -------- */}
// //             <button
// //               onClick={closeModal}
// //               className="w-full py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md mt-1"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdRequests;
// /* AdRequests.jsx  ─  الإصدار النهائي
//    ▸ الحالات الممكنة: pending → (Publish | Cancel) → published / cancelled
//    ▸ تبديل بين Card و Table
//    ▸ الألوان المسموح بها: الخلفيات بيضاء، نصوص سوداء/رمادي، البنفسجي أو تدرّج بنفسجي-وردي للعناوين والأزرار
// */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { UploadCloud, Ban, Eye, RefreshCw, LayoutGrid, Table } from 'lucide-react';
// import { useSelector } from 'react-redux';

// const AdRequests = () => {
//   /* ================ state ================ */
//   const influencer = useSelector((s) => s.user.currentUser);
//   const [requests, setRequests]   = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [view, setView]           = useState('cards');        // cards | table
//   const [filter, setFilter]       = useState('all');          // all | pending | published | cancelled
//   const [selected, setSelected]   = useState(null);           // الحجز المعروض في المودال
//   const [postUrl, setPostUrl]     = useState('');
//   const [err, setErr]             = useState('');

//   /* ================ api ================ */


//   const fetchAll = async () => {
//     if (!influencer) return;
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/users/influencer/${influencer.id}`);
//       setRequests(data);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(fetchAll, [influencer]);

//   /* ================ actions ================ */
//   const act = async (action, url = '') => {
//     if (!selected) return;
//     try {
//       await axios.put(`http://localhost:4000/api/users/status/${selected.id}`, {
//         action,
//         ...(action === 'publish' && { postUrl: url.trim() })
//       });
//       close();
//       fetchAll();
//     } catch (e) {
//       setErr(e?.response?.data?.message || 'Unexpected error');
//     }
//   };

//   /* ================ helpers ================ */
//   const close = () => {
//     setSelected(null);
//     setPostUrl('');
//     setErr('');
//   };

//   const shown = requests.filter((r) => filter === 'all' || r.status === filter);

//   /* ================ ui utils ================ */
//   const purpleBtn   = 'px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700';
//   const outlineBtn  = 'px-3 py-1 bg-white text-purple-600 border border-purple-600 rounded hover:bg-purple-50';
//   const badge       = 'px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700';

//   const statusText  = { pending: 'Pending', published: 'Published', cancelled: 'Cancelled' };

//   /* ================ render ================ */
//   return (
//     <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
//       {/* ---------- Header ---------- */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//           Ad Requests
//         </h2>
//         <p className="text-gray-600">Manage incoming advertisement requests</p>
//       </div>

//       {/* ---------- Controls ---------- */}
//       <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 items-center mb-6">
//         {['all', 'pending', 'published', 'cancelled'].map((v) => (
//           <button
//             key={v}
//             onClick={() => setFilter(v)}
//             className={`px-4 py-1 rounded-full border ${
//               filter === v
//                 ? 'bg-purple-600 text-white'
//                 : 'bg-white text-gray-700 border-gray-300'
//             }`}
//           >
//             {v[0].toUpperCase() + v.slice(1)}
//           </button>
//         ))}

//         {/* view toggle */}
//         <div className="ml-auto flex gap-2">
//           <button
//             onClick={() => setView('cards')}
//             className={`p-2 rounded ${view === 'cards' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
//           >
//             <LayoutGrid size={16} />
//           </button>
//           <button
//             onClick={() => setView('table')}
//             className={`p-2 rounded ${view === 'table' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
//           >
//             <Table size={16} />
//           </button>
//           <button
//             onClick={fetchAll}
//             className="p-2 rounded bg-purple-100 text-purple-700"
//           >
//             <RefreshCw size={16} />
//           </button>
//         </div>
//       </div>

//       {/* ---------- Content ---------- */}
//       {loading ? (
//         <p className="text-center text-gray-600">Loading…</p>
//       ) : shown.length === 0 ? (
//         <p className="text-center text-gray-600">No requests found.</p>
//       ) : view === 'cards' ? (
//         /* -------- Card View -------- */
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {shown.map((r) => (
//             <div key={r.id} className="bg-white shadow rounded-lg p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-bold">{r.campaignTitle}</h3>
//                 <span className={badge}>{statusText[r.status]}</span>
//               </div>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">{r.brief}</p>
//               <p className="text-gray-800 text-sm mb-1">Budget: ${r.proposedPrice}</p>
//               <p className="text-gray-600 text-sm mb-4">{new Date(r.requestedDate).toLocaleString()}</p>

//               {r.status === 'pending' && (
//                 <div className="flex gap-2 mb-3">
//                   <button onClick={() => { setSelected(r); }} className={`${purpleBtn} flex-1 flex items-center justify-center`}>
//                     <UploadCloud size={16} className="mr-1" /> Publish
//                   </button>
//                   <button onClick={() => { setSelected(r); }} className={`${outlineBtn} flex-1 flex items-center justify-center`}>
//                     <Ban size={16} className="mr-1" /> Cancel
//                   </button>
//                 </div>
//               )}

//               <button
//                 onClick={() => setSelected(r)}
//                 className="w-full py-2 bg-purple-50 text-purple-700 rounded flex items-center justify-center"
//               >
//                 <Eye size={16} className="mr-1" /> View
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         /* -------- Table View -------- */
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-left border-b">
//                 {['Title', 'Budget', 'Date', 'Status', 'Actions'].map((h) => (
//                   <th key={h} className="px-6 py-3 text-gray-600 font-medium">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {shown.map((r) => (
//                 <tr key={r.id} className="border-b last:border-0">
//                   <td className="px-6 py-3">{r.campaignTitle}</td>
//                   <td className="px-6 py-3">${r.proposedPrice}</td>
//                   <td className="px-6 py-3">{new Date(r.requestedDate).toLocaleString()}</td>
//                   <td className="px-6 py-3">
//                     <span className={badge}>{statusText[r.status]}</span>
//                   </td>
//                   <td className="px-6 py-3 space-x-2">
//                     {r.status === 'pending' && (
//                       <>
//                         <button onClick={() => setSelected(r)} className={purpleBtn}>Publish</button>
//                         <button onClick={() => setSelected(r)} className={outlineBtn}>Cancel</button>
//                       </>
//                     )}
//                     <button onClick={() => setSelected(r)} className="text-purple-600 underline">View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ---------- Modal ---------- */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 p-6 rounded-lg relative shadow">
//             <button onClick={close} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">×</button>

//             <h4 className="font-bold text-lg mb-4">{selected.campaignTitle}</h4>
//             <p className="text-gray-600 text-sm mb-4">{selected.brief}</p>

//             {selected.status === 'pending' && (
//               <>
//                 <label className="block text-sm font-medium mb-1">Post URL</label>
//                 <input
//                   type="url"
//                   placeholder="https://…"
//                   value={postUrl}
//                   onChange={(e) => setPostUrl(e.target.value)}
//                   className="w-full px-3 py-2 border rounded mb-4"
//                 />

//                 <button
//                   disabled={!postUrl.trim()}
//                   onClick={() => act('publish', postUrl)}
//                   className={`${purpleBtn} w-full mb-2 disabled:opacity-50`}
//                 >
//                   Publish
//                 </button>

//                 <button onClick={() => act('cancel')} className={`${outlineBtn} w-full mb-2`}>
//                   Cancel Booking
//                 </button>
//               </>
//             )}

//             {err && <p className="text-red-600 text-sm mb-2">{err}</p>}

//             <button onClick={close} className="w-full py-2 bg-gray-100 text-gray-700 rounded">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdRequests;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, Ban, Eye, RefreshCw, LayoutGrid, Table } from 'lucide-react';
import { useSelector } from 'react-redux';

const AdRequests = () => {
  /* ================ state ================ */
  const influencer = useSelector((s) => s.user.currentUser);
  const [requests, setRequests]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [view, setView]           = useState('cards');        // cards | table
  const [filter, setFilter]       = useState('all');          // all | pending | published | cancelled
  const [selected, setSelected]   = useState(null);           // الحجز المعروض في المودال
  const [postUrl, setPostUrl]     = useState('');
  const [err, setErr]             = useState('');

  /* ================ api ================ */
  const fetchAll = async () => {
    if (!influencer) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/users/influencer/${influencer.id}`);
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  /* ================ effects ================ */
  useEffect(() => {
    // لا تمرر دالة async مباشرةً إلى useEffect
    fetchAll();
  }, [influencer]);

  /* ================ actions ================ */
  const act = async (action, url = '') => {
    if (!selected) return;
    try {
      await axios.put(`http://localhost:4000/api/users/status/${selected.id}`, {
        action,
        ...(action === 'publish' && { postUrl: url.trim() })
      });
      close();
      fetchAll();
    } catch (e) {
      setErr(e?.response?.data?.message || 'Unexpected error');
    }
  };

  /* ================ helpers ================ */
  const close = () => {
    setSelected(null);
    setPostUrl('');
    setErr('');
  };

  const shown = requests.filter((r) => filter === 'all' || r.status === filter);

  /* ================ ui utils ================ */
  const purpleBtn   = 'px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700';
  const outlineBtn  = 'px-3 py-1 bg-white text-purple-600 border border-purple-600 rounded hover:bg-purple-50';
  const badge       = 'px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700';
  const statusText  = { pending: 'Pending', published: 'Published', cancelled: 'Cancelled' };

  /* ================ render ================ */
  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      {/* ---------- Header ---------- */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Ad Requests
        </h2>
        <p className="text-gray-600">Manage incoming advertisement requests</p>
      </div>

      {/* ---------- Controls ---------- */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 items-center mb-6">
        {['all', 'pending', 'published', 'cancelled'].map((v) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`px-4 py-1 rounded-full border ${
              filter === v
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}

        {/* view toggle */}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView('cards')}
            className={`p-2 rounded ${
              view === 'cards'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded ${
              view === 'table'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Table size={16} />
          </button>
          <button
            onClick={fetchAll}
            className="p-2 rounded bg-purple-100 text-purple-700"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      {loading ? (
        <p className="text-center text-gray-600">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="text-center text-gray-600">No requests found.</p>
      ) : view === 'cards' ? (
        /* -------- Card View -------- */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((r) => (
            <div key={r.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-black">{r.campaignTitle}</h3>
                <span className={badge}>{statusText[r.status]}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{r.brief}</p>
              <p className="text-gray-800 text-sm mb-1">Budget: ${r.proposedPrice}</p>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(r.requestedDate).toLocaleString()}
              </p>

              {r.status === 'pending' && (
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setSelected(r)}
                    className={`${purpleBtn} flex-1 flex items-center justify-center`}
                  >
                    <UploadCloud size={16} className="mr-1" /> Publish
                  </button>
                  <button
                    onClick={() => setSelected(r)}
                    className={`${outlineBtn} flex-1 flex items-center justify-center`}
                  >
                    <Ban size={16} className="mr-1" /> Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelected(r)}
                className="w-full py-2 bg-purple-50 text-purple-700 rounded flex items-center justify-center"
              >
                <Eye size={16} className="mr-1" /> View
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* -------- Table View -------- */
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                {['Title', 'Budget', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3 text-gray-600 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="px-6 py-3">{r.campaignTitle}</td>
                  <td className="px-6 py-3">${r.proposedPrice}</td>
                  <td className="px-6 py-3">{new Date(r.requestedDate).toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={badge}>{statusText[r.status]}</span>
                  </td>
                  <td className="px-6 py-3 space-x-2">
                    {r.status === 'pending' && (
                      <>
                        <button onClick={() => setSelected(r)} className={purpleBtn}>Publish</button>
                        <button onClick={() => setSelected(r)} className={outlineBtn}>Cancel</button>
                      </>
                    )}
                    <button onClick={() => setSelected(r)} className="text-purple-600 underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- Modal ---------- */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative shadow">
            <button
              onClick={close}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>

            <h4 className="font-bold text-lg mb-4">{selected.campaignTitle}</h4>
            <p className="text-gray-600 text-sm mb-4">{selected.brief}</p>

            {selected.status === 'pending' && (
              <>
                <label className="block text-sm font-medium mb-1">Post URL</label>
                <input
                  type="url"
                  placeholder="https://…"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                />

                <button
                  disabled={!postUrl.trim()}
                  onClick={() => act('publish', postUrl)}
                  className={`${purpleBtn} w-full mb-2 disabled:opacity-50`}
                >
                  Publish
                </button>

                <button
                  onClick={() => act('cancel')}
                  className={`${outlineBtn} w-full mb-2`}
                >
                  Cancel Booking
                </button>
              </>
            )}

            {err && <p className="text-red-600 text-sm mb-2">{err}</p>}

            <button
              onClick={close}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdRequests;
