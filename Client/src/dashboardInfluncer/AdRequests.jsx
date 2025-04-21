// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import { BadgeCheck, XCircle, Eye } from 'lucide-react';
// // // // // // // import { useSelector } from 'react-redux';

// // // // // // // const AdRequests = () => {
// // // // // // //   const [requests, setRequests] = useState([]);
// // // // // // //   const user = useSelector((state) => state.user.currentUser); // المؤثر المسجّل دخول
// // // // // // // console.log("ss=",user),
// // // // // // //   useEffect(() => {
// // // // // // //     if (user?.id) {
// // // // // // //       fetchAdRequests();
// // // // // // //     }
// // // // // // //   }, [user]);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchAdRequests = async () => {
// // // // // // //       try {
// // // // // // //         const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`);
// // // // // // //         setRequests(response.data);
// // // // // // //       } catch (error) {
// // // // // // //         console.error('Failed to fetch ad requests:', error);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     if (user?.userId) {
// // // // // // //       fetchAdRequests();
// // // // // // //     }
// // // // // // //   }, [user]);

// // // // // // //   const handleStatusChange = async (requestId, status) => {
// // // // // // //     try {
// // // // // // //       console.log(`Sending PATCH request to: http://localhost:4000/api/ad-request/${requestId}/status`);
// // // // // // //       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/status`, { status });
// // // // // // //       fetchAdRequests(); // إعادة التحميل بعد التحديث
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Failed to update status:', error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="p-6">
// // // // // // //       <h2 className="text-2xl font-bold mb-6">طلبات الإعلان</h2>
// // // // // // //       {requests.length === 0 ? (
// // // // // // //         <p className="text-gray-500">لا توجد طلبات حاليًا.</p>
// // // // // // //       ) : (
// // // // // // //         <div className="grid gap-4">
// // // // // // //           {requests.map((request) => (
// // // // // // //             <div key={request.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
// // // // // // //               <div>
// // // // // // //                 <p className="text-lg font-semibold text-gray-800">{request.title}</p>
// // // // // // //                 <p className="text-sm text-gray-500">من: {request.advertiserName}</p>
// // // // // // //                 <p className="text-sm text-gray-500">المنصة: {request.platform}</p>
// // // // // // //                 <p className="text-sm text-gray-500">التاريخ: {new Date(request.createdAt).toLocaleDateString()}</p>
// // // // // // //               </div>
// // // // // // //               <div className="flex gap-3 mt-4 md:mt-0">
// // // // // // //                 <button
// // // // // // //                   onClick={() => handleStatusChange(request.id, 'accepted')}
// // // // // // //                   className="flex items-center px-3 py-2 text-green-600 border border-green-300 rounded hover:bg-green-50"
// // // // // // //                 >
// // // // // // //                   <BadgeCheck size={16} className="mr-1" /> قبول
// // // // // // //                 </button>
// // // // // // //                 <button
// // // // // // //                   onClick={() => handleStatusChange(request.id, 'rejected')}
// // // // // // //                   className="flex items-center px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
// // // // // // //                 >
// // // // // // //                   <XCircle size={16} className="mr-1" /> رفض
// // // // // // //                 </button>
// // // // // // //                 <button
// // // // // // //                   className="flex items-center px-3 py-2 text-purple-600 border border-purple-300 rounded hover:bg-purple-50"
// // // // // // //                   onClick={() => console.log('عرض التفاصيل', request.id)}
// // // // // // //                 >
// // // // // // //                   <Eye size={16} className="mr-1" /> تفاصيل
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default AdRequests;
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import axios from "axios";
// // // // // // import { BadgeCheck, XCircle, Eye } from "lucide-react";
// // // // // // import { useSelector } from "react-redux";
// // // // // // import Cookies from "js-cookie";

// // // // // // const AdRequests = () => {
// // // // // //   const [requests, setRequests] = useState([]);
// // // // // //   const user = useSelector((state) => state.user.currentUser); // المؤثر المسجّل دخول

// // // // // //   // تعريف دالة fetchAdRequests خارج useEffect
// // // // // //   const fetchAdRequests = async () => {
// // // // // //     try {
// // // // // //       const token = Cookies.get("token"); // استرجاع الـ token من الكوكيز
// // // // // //       const response = await axios.get(
// // // // // //         `http://localhost:4000/api/ad-request/influencer/${user.userId}`,
// // // // // //         {
// // // // // //           headers: { Authorization: `Bearer ${token}` }, // إرسال الـ token مع الطلب
// // // // // //         }
// // // // // //       );
// // // // // //       setRequests(response.data);
// // // // // //     } catch (error) {
// // // // // //       console.error("Failed to fetch ad requests:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   // استخدام useEffect لتحميل الطلبات عند تغيير المستخدم
// // // // // //   useEffect(() => {
// // // // // //     if (user?.userId) {
// // // // // //       fetchAdRequests();
// // // // // //     }
// // // // // //   }, [user]);

// // // // // //   const handleStatusChange = async (requestId, status) => {
// // // // // //     try {
// // // // // //       const token = Cookies.get("token"); // استرجاع الـ token من الكوكيز
// // // // // //       await axios.patch(
// // // // // //         `http://localhost:4000/api/ad-request/${requestId}/status`,
// // // // // //         { status },
// // // // // //         {
// // // // // //           headers: { Authorization: `Bearer ${token}` }, // إرسال الـ token مع الطلب
// // // // // //         }
// // // // // //       );
// // // // // //       fetchAdRequests(); // إعادة تحميل الطلبات بعد التحديث
// // // // // //     } catch (error) {
// // // // // //       console.error("Failed to update status:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-6">
// // // // // //       <h2 className="text-2xl font-bold mb-6">طلبات الإعلان</h2>
// // // // // //       {requests.length === 0 ? (
// // // // // //         <p className="text-gray-500">لا توجد طلبات حاليًا.</p>
// // // // // //       ) : (
// // // // // //         <div className="grid gap-4">
// // // // // //           {requests.map((request) => (
// // // // // //             <div
// // // // // //               key={request.id}
// // // // // //               className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center"
// // // // // //             >
// // // // // //               <div>
// // // // // //                 <p className="text-lg font-semibold text-gray-800">
// // // // // //                   {request.title}
// // // // // //                 </p>
// // // // // //                 <p className="text-sm text-gray-500">
// // // // // //                   من: {request.advertiserName}
// // // // // //                 </p>
// // // // // //                 <p className="text-sm text-gray-500">
// // // // // //                   المنصة: {request.platform}
// // // // // //                 </p>
// // // // // //                 <p className="text-sm text-gray-500">
// // // // // //                   التاريخ: {new Date(request.createdAt).toLocaleDateString()}
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //               <div className="flex gap-3 mt-4 md:mt-0">
// // // // // //                 <button
// // // // // //                   onClick={() => handleStatusChange(request.id, "accepted")}
// // // // // //                   className="flex items-center px-3 py-2 text-green-600 border border-green-300 rounded hover:bg-green-50"
// // // // // //                 >
// // // // // //                   <BadgeCheck size={16} className="mr-1" /> قبول
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   onClick={() => handleStatusChange(request.id, "rejected")}
// // // // // //                   className="flex items-center px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
// // // // // //                 >
// // // // // //                   <XCircle size={16} className="mr-1" /> رفض
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   className="flex items-center px-3 py-2 text-purple-600 border border-purple-300 rounded hover:bg-purple-50"
// // // // // //                   onClick={() => console.log("عرض التفاصيل", request.id)}
// // // // // //                 >
// // // // // //                   <Eye size={16} className="mr-1" /> تفاصيل
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AdRequests;
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import axios from 'axios';
// // // // // import { BadgeCheck, XCircle, Eye } from 'lucide-react';
// // // // // import { useSelector } from 'react-redux';
// // // // // import Cookies from 'js-cookie';
// // // // // import { toast } from 'react-toastify'; // استيراد مكتبة التوست

// // // // // const AdRequests = () => {
// // // // //   const [requests, setRequests] = useState([]);
// // // // //   const [selectedRequest, setSelectedRequest] = useState(null); // لحفظ الطلب المحدد لعرض التفاصيل
// // // // //   const user = useSelector((state) => state.user.currentUser);

// // // // //   const fetchAdRequests = async () => {
// // // // //     try {
// // // // //       const token = Cookies.get('token');
// // // // //       const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
// // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // //       });
// // // // //       setRequests(response.data);
// // // // //       console.log(response.data)
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch ad requests:', error);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (user?.userId) {
// // // // //       fetchAdRequests();
// // // // //     }
// // // // //   }, [user]);

// // // // //   const handleStatusChange = async (requestId, status) => {
// // // // //     try {
// // // // //       const token = Cookies.get('token');
// // // // //       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/status`, { status }, {
// // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // //       });

// // // // //       // تحديث الحالة مباشرة في واجهة المستخدم
// // // // //       setRequests(prevRequests =>
// // // // //         prevRequests.map(request =>
// // // // //           request.id === requestId ? { ...request, status } : request
// // // // //         )
// // // // //       );

// // // // //       toast.success('تم تحديث الحالة بنجاح!'); // عرض رسالة توست بعد النجاح
// // // // //     } catch (error) {
// // // // //       console.error('Failed to update status:', error);
// // // // //       toast.error('فشل في تحديث الحالة!'); // عرض رسالة توست عند الفشل
// // // // //     }
// // // // //   };

// // // // //   const handleViewDetails = (request) => {
// // // // //     setSelectedRequest(request); // حفظ الطلب المحدد لعرض التفاصيل
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-6">
// // // // //       <h2 className="text-2xl font-bold mb-6">طلبات الإعلان</h2>
// // // // //       {requests.length === 0 ? (
// // // // //         <p className="text-gray-500">لا توجد طلبات حاليًا.</p>
// // // // //       ) : (
// // // // //         <div className="grid gap-4">
// // // // //           {requests.map((request) => (
// // // // //             <div key={request.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
// // // // //               <div>
// // // // //                 <p className="text-lg font-semibold text-gray-800">{request.adTitle}</p>
// // // // //                 <p className="text-sm text-gray-500">من: {request.adDetails}</p>
// // // // //                 <p className="text-sm text-gray-500">المنصة: {request.budget}</p>
// // // // //                 <p className="text-sm text-gray-500">التاريخ: {new Date(request.createdAt).toLocaleDateString()}</p>
// // // // //                 <p className="text-sm text-gray-500">الحالة: {request.status}</p> {/* عرض الحالة */}
// // // // //               </div>
// // // // //               <div className="flex gap-3 mt-4 md:mt-0">
// // // // //                 <button
// // // // //                   onClick={() => handleStatusChange(request.id, 'accepted')}
// // // // //                   className="flex items-center px-3 py-2 text-green-600 border border-green-300 rounded hover:bg-green-50"
// // // // //                 >
// // // // //                   <BadgeCheck size={16} className="mr-1" /> قبول
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => handleStatusChange(request.id, 'rejected')}
// // // // //                   className="flex items-center px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
// // // // //                 >
// // // // //                   <XCircle size={16} className="mr-1" /> رفض
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => handleViewDetails(request)}
// // // // //                   className="flex items-center px-3 py-2 text-purple-600 border border-purple-300 rounded hover:bg-purple-50"
// // // // //                 >
// // // // //                   <Eye size={16} className="mr-1" /> تفاصيل
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}

// // // // //       {selectedRequest && (
// // // // //         <div className="mt-6 p-4 bg-gray-100 rounded-md">
// // // // //           <h3 className="text-xl font-bold">تفاصيل الطلب</h3>
// // // // //           <p><strong>العنوان:</strong> {selectedRequest.adTitle}</p>
// // // // //           <p><strong>المنصة:</strong> {selectedRequest.adDetails}</p>
// // // // //           <p><strong>التاريخ:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
// // // // //           <p><strong>الحالة:</strong> {selectedRequest.status}</p>
// // // // //           <p><strong>الاعلان من:</strong> {selectedRequest.budget}</p>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AdRequests;
// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';
// // // // import { BadgeCheck, XCircle, Eye } from 'lucide-react';
// // // // import { useSelector } from 'react-redux';
// // // // import Cookies from 'js-cookie';
// // // // import { toast } from 'react-toastify'; // استيراد مكتبة التوست

// // // // const AdRequests = () => {
// // // //   const [requests, setRequests] = useState([]);
// // // //   const [selectedRequest, setSelectedRequest] = useState(null); // لحفظ الطلب المحدد لعرض التفاصيل
// // // //   const user = useSelector((state) => state.user.currentUser);

// // // //   const fetchAdRequests = async () => {
// // // //     try {
// // // //       const token = Cookies.get('token');
// // // //       const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
// // // //         headers: { Authorization: `Bearer ${token}` }
// // // //       });
// // // //       setRequests(response.data);
// // // //       console.log(response.data)
// // // //     } catch (error) {
// // // //       console.error('Failed to fetch ad requests:', error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (user?.userId) {
// // // //       fetchAdRequests();
// // // //     }
// // // //   }, [user]);

// // // //   const handleStatusChange = async (requestId, status) => {
// // // //     try {
// // // //       const token = Cookies.get('token');
// // // //       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/status`, { status }, {
// // // //         headers: { Authorization: `Bearer ${token}` }
// // // //       });

// // // //       // تحديث الحالة مباشرة في واجهة المستخدم
// // // //       setRequests(prevRequests =>
// // // //         prevRequests.map(request =>
// // // //           request.id === requestId ? { ...request, status } : request
// // // //         )
// // // //       );

// // // //       toast.success('تم تحديث الحالة بنجاح!'); // عرض رسالة توست بعد النجاح
// // // //     } catch (error) {
// // // //       console.error('Failed to update status:', error);
// // // //       toast.error('فشل في تحديث الحالة!'); // عرض رسالة توست عند الفشل
// // // //     }
// // // //   };

// // // //   const handleViewDetails = (request) => {
// // // //     setSelectedRequest(request); // حفظ الطلب المحدد لعرض التفاصيل
// // // //   };

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h2 className="text-2xl font-bold mb-6">طلبات الإعلان</h2>
// // // //       {requests.length === 0 ? (
// // // //         <p className="text-gray-500">لا توجد طلبات حاليًا.</p>
// // // //       ) : (
// // // //         <div className="grid gap-4">
// // // //           {requests.map((request) => (
// // // //             <div key={request.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
// // // //               <div>
// // // //                 <p className="text-lg font-semibold text-gray-800">{request.adTitle}</p>
// // // //                 <p className="text-sm text-gray-500">التفاصيل: {request.adDetails}</p>
// // // //                 <p className="text-sm text-gray-500">الميزانية: {request.budget}</p>
// // // //                 <p className="text-sm text-gray-500">التاريخ: {new Date(request.createdAt).toLocaleDateString()}</p>
// // // //                 <p className="text-sm text-gray-500">الحالة: {request.status}</p> {/* عرض الحالة */}
// // // //               </div>
// // // //               <div className="flex gap-3 mt-4 md:mt-0">
// // // //                 <button
// // // //                   onClick={() => handleStatusChange(request.id, 'accepted')}
// // // //                   className="flex items-center px-3 py-2 text-green-600 border border-green-300 rounded hover:bg-green-50"
// // // //                 >
// // // //                   <BadgeCheck size={16} className="mr-1" /> قبول
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => handleStatusChange(request.id, 'rejected')}
// // // //                   className="flex items-center px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
// // // //                 >
// // // //                   <XCircle size={16} className="mr-1" /> رفض
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => handleViewDetails(request)}
// // // //                   className="flex items-center px-3 py-2 text-purple-600 border border-purple-300 rounded hover:bg-purple-50"
// // // //                 >
// // // //                   <Eye size={16} className="mr-1" /> تفاصيل
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {selectedRequest && (
// // // //         <div className="mt-6 p-4 bg-gray-100 rounded-md">
// // // //           <h3 className="text-xl font-bold">تفاصيل الطلب</h3>
// // // //           <p><strong>العنوان:</strong> {selectedRequest.adTitle}</p>
// // // //           <p><strong>التفاصيل:</strong> {selectedRequest.adDetails}</p>
// // // //           <p><strong>الميزانية:</strong> {selectedRequest.budget}</p>
// // // //           <p><strong>التاريخ:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
// // // //           <p><strong>الحالة:</strong> {selectedRequest.status}</p>
// // // //           <p><strong>مدة الإعلان:</strong> {selectedRequest.adDuration} أيام</p> {/* إضافة مدة الإعلان */}
// // // //           <p><strong>تاريخ التحديد:</strong> {selectedRequest.scheduledDate ? new Date(selectedRequest.scheduledDate).toLocaleDateString() : 'غير محدد'}</p> {/* عرض تاريخ التحديد إن وجد */}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdRequests;
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { BadgeCheck, XCircle, Eye, Filter, RefreshCw } from 'lucide-react';
// // // import { useSelector } from 'react-redux';
// // // import Cookies from 'js-cookie';
// // // import { toast } from 'react-toastify';

// // // const AdRequests = () => {
// // //   const [requests, setRequests] = useState([]);
// // //   const [selectedRequest, setSelectedRequest] = useState(null);
// // //   const [viewMode, setViewMode] = useState('cards'); // 'cards' أو 'table'
// // //   const [loading, setLoading] = useState(true);
// // //   const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
// // //   const user = useSelector((state) => state.user.currentUser);

// // //   const fetchAdRequests = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const token = Cookies.get('token');
// // //       const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
// // //         headers: { Authorization: `Bearer ${token}` }
// // //       });
// // //       setRequests(response.data);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error('فشل في جلب طلبات الإعلان:', error);
// // //       setLoading(false);
// // //       toast.error('حدث خطأ أثناء تحميل الطلبات');
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (user?.userId) {
// // //       fetchAdRequests();
// // //     }
// // //   }, [user]);

// // //   const handleStatusChange = async (requestId, status) => {
// // //     try {
// // //       const token = Cookies.get('token');
// // //       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/status`, { status }, {
// // //         headers: { Authorization: `Bearer ${token}` }
// // //       });

// // //       setRequests(prevRequests =>
// // //         prevRequests.map(request =>
// // //           request.id === requestId ? { ...request, status } : request
// // //         )
// // //       );

// // //       toast.success(status === 'accepted' ? 'تم قبول الطلب بنجاح!' : 'تم رفض الطلب بنجاح!');
// // //     } catch (error) {
// // //       console.error('فشل في تحديث الحالة:', error);
// // //       toast.error('فشل في تحديث حالة الطلب');
// // //     }
// // //   };

// // //   const handleViewDetails = (request) => {
// // //     setSelectedRequest(request);
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case 'pending': return 'bg-yellow-100 text-yellow-800';
// // //       case 'accepted': return 'bg-green-100 text-green-800';
// // //       case 'rejected': return 'bg-red-100 text-red-800';
// // //       default: return 'bg-gray-100 text-gray-800';
// // //     }
// // //   };

// // //   const getStatusText = (status) => {
// // //     switch (status) {
// // //       case 'pending': return 'قيد الانتظار';
// // //       case 'accepted': return 'مقبول';
// // //       case 'rejected': return 'مرفوض';
// // //       default: return status;
// // //     }
// // //   };

// // //   const filteredRequests = filter === 'all' 
// // //     ? requests 
// // //     : requests.filter(request => request.status === filter);

// // //   return (
// // //     <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
// // //       <div className="mb-8">
// // //         <h2 className="text-3xl font-bold text-purple-800 mb-2">طلبات الإعلان</h2>
// // //         <p className="text-gray-600">إدارة طلبات الإعلانات الواردة من العلامات التجارية</p>
// // //       </div>

// // //       {/* فلتر وتبديل العرض */}
// // //       <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
// // //         <div className="flex items-center space-x-4 mb-4 md:mb-0">
// // //           <span className="text-gray-700 ml-2">تصفية حسب:</span>
// // //           <div className="flex space-x-2 rtl:space-x-reverse">
// // //             <button 
// // //               onClick={() => setFilter('all')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               الكل
// // //             </button>
// // //             <button 
// // //               onClick={() => setFilter('pending')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               قيد الانتظار
// // //             </button>
// // //             <button 
// // //               onClick={() => setFilter('accepted')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               مقبول
// // //             </button>
// // //             <button 
// // //               onClick={() => setFilter('rejected')} 
// // //               className={`px-3 py-1 rounded-full text-sm ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //             >
// // //               مرفوض
// // //             </button>
// // //           </div>
// // //         </div>
// // //         <div className="flex items-center space-x-4 rtl:space-x-reverse">
// // //           <button 
// // //             onClick={() => setViewMode('cards')} 
// // //             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'cards' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //           >
// // //             <span>عرض البطاقات</span>
// // //           </button>
// // //           <button 
// // //             onClick={() => setViewMode('table')} 
// // //             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// // //           >
// // //             <span>عرض الجدول</span>
// // //           </button>
// // //           <button
// // //             onClick={fetchAdRequests}
// // //             className="p-2 bg-purple-100 rounded-full text-purple-700 hover:bg-purple-200 transition-colors"
// // //             title="تحديث"
// // //           >
// // //             <RefreshCw size={16} />
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-40">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
// // //         </div>
// // //       ) : filteredRequests.length === 0 ? (
// // //         <div className="bg-white rounded-lg shadow-md p-8 text-center">
// // //           <p className="text-gray-500 text-lg">لا توجد طلبات {filter !== 'all' ? `بحالة ${getStatusText(filter)}` : ''} حالياً.</p>
// // //         </div>
// // //       ) : viewMode === 'cards' ? (
// // //         // طريقة عرض البطاقات
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {filteredRequests.map((request) => (
// // //             <div key={request.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
// // //               <div className="p-5 border-b border-gray-100">
// // //                 <div className="flex justify-between items-start">
// // //                   <h3 className="text-xl font-bold text-gray-800">{request.adTitle}</h3>
// // //                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
// // //                     {getStatusText(request.status)}
// // //                   </span>
// // //                 </div>
// // //                 <p className="mt-2 text-gray-600 line-clamp-2">{request.adDetails}</p>
// // //               </div>
// // //               <div className="p-4 bg-gray-50">
// // //                 <div className="flex justify-between items-center mb-3">
// // //                   <span className="text-sm text-gray-500">الميزانية:</span>
// // //                   <span className="font-semibold text-purple-700">{request.budget} $</span>
// // //                 </div>
// // //                 <div className="flex justify-between items-center">
// // //                   <span className="text-sm text-gray-500">التاريخ:</span>
// // //                   <span className="text-sm">{new Date(request.createdAt).toLocaleDateString('ar-EG')}</span>
// // //                 </div>
// // //               </div>
// // //               <div className="p-4 flex gap-2 bg-gray-50 border-t border-gray-100">
// // //                 {request.status === 'pending' && (
// // //                   <>
// // //                     <button
// // //                       onClick={() => handleStatusChange(request.id, 'accepted')}
// // //                       className="flex-1 flex justify-center items-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
// // //                     >
// // //                       <BadgeCheck size={16} className="ml-1" /> قبول
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleStatusChange(request.id, 'rejected')}
// // //                       className="flex-1 flex justify-center items-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
// // //                     >
// // //                       <XCircle size={16} className="ml-1" /> رفض
// // //                     </button>
// // //                   </>
// // //                 )}
// // //                 <button
// // //                   onClick={() => handleViewDetails(request)}
// // //                   className="flex-1 flex justify-center items-center py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
// // //                 >
// // //                   <Eye size={16} className="ml-1" /> التفاصيل
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         // طريقة عرض الجدول
// // //         <div className="overflow-x-auto bg-white rounded-lg shadow-md">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   العنوان
// // //                 </th>
// // //                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   الميزانية
// // //                 </th>
// // //                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   التاريخ
// // //                 </th>
// // //                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   الحالة
// // //                 </th>
// // //                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   الإجراءات
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {filteredRequests.map((request) => (
// // //                 <tr key={request.id} className="hover:bg-gray-50">
// // //                   <td className="px-6 py-4 whitespace-nowrap">
// // //                     <div className="text-sm font-medium text-gray-900">{request.adTitle}</div>
// // //                     <div className="text-sm text-gray-500 line-clamp-1">{request.adDetails}</div>
// // //                   </td>
// // //                   <td className="px-6 py-4 whitespace-nowrap">
// // //                     <div className="text-sm font-semibold text-purple-700">{request.budget} $</div>
// // //                   </td>
// // //                   <td className="px-6 py-4 whitespace-nowrap">
// // //                     <div className="text-sm text-gray-500">{new Date(request.createdAt).toLocaleDateString('ar-EG')}</div>
// // //                   </td>
// // //                   <td className="px-6 py-4 whitespace-nowrap">
// // //                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
// // //                       {getStatusText(request.status)}
// // //                     </span>
// // //                   </td>
// // //                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// // //                     <div className="flex space-x-2 rtl:space-x-reverse">
// // //                       {request.status === 'pending' && (
// // //                         <>
// // //                           <button
// // //                             onClick={() => handleStatusChange(request.id, 'accepted')}
// // //                             className="text-green-600 hover:text-green-900 flex items-center"
// // //                           >
// // //                             <BadgeCheck size={16} className="ml-1" /> قبول
// // //                           </button>
// // //                           <button
// // //                             onClick={() => handleStatusChange(request.id, 'rejected')}
// // //                             className="text-red-600 hover:text-red-900 flex items-center"
// // //                           >
// // //                             <XCircle size={16} className="ml-1" /> رفض
// // //                           </button>
// // //                         </>
// // //                       )}
// // //                       <button
// // //                         onClick={() => handleViewDetails(request)}
// // //                         className="text-purple-600 hover:text-purple-900 flex items-center"
// // //                       >
// // //                         <Eye size={16} className="ml-1" /> التفاصيل
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}

// // //       {/* Modal لعرض التفاصيل */}
// // //       {selectedRequest && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
// // //             <div className="p-6 border-b border-gray-200">
// // //               <div className="flex justify-between items-center">
// // //                 <h3 className="text-2xl font-bold text-gray-800">تفاصيل الطلب</h3>
// // //                 <button 
// // //                   onClick={() => setSelectedRequest(null)}
// // //                   className="text-gray-500 hover:text-gray-700"
// // //                 >
// // //                   <XCircle size={20} />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //             <div className="p-6 max-h-96 overflow-y-auto">
// // //               <div className="mb-4">
// // //                 <span className="text-sm text-gray-500 block mb-1">العنوان</span>
// // //                 <span className="text-lg font-semibold text-gray-800">{selectedRequest.adTitle}</span>
// // //               </div>
// // //               <div className="mb-4">
// // //                 <span className="text-sm text-gray-500 block mb-1">التفاصيل</span>
// // //                 <p className="text-gray-700">{selectedRequest.adDetails}</p>
// // //               </div>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// // //                 <div>
// // //                   <span className="text-sm text-gray-500 block mb-1">الميزانية</span>
// // //                   <span className="text-lg font-semibold text-purple-700">{selectedRequest.budget} $</span>
// // //                 </div>
// // //                 <div>
// // //                   <span className="text-sm text-gray-500 block mb-1">الحالة</span>
// // //                   <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
// // //                     {getStatusText(selectedRequest.status)}
// // //                   </span>
// // //                 </div>
// // //                 <div>
// // //                   <span className="text-sm text-gray-500 block mb-1">تاريخ الطلب</span>
// // //                   <span>{new Date(selectedRequest.createdAt).toLocaleDateString('ar-EG')}</span>
// // //                 </div>
// // //                 <div>
// // //                   <span className="text-sm text-gray-500 block mb-1">مدة الإعلان</span>
// // //                   <span>{selectedRequest.adDuration} أيام</span>
// // //                 </div>
// // //                 <div>
// // //                   <span className="text-sm text-gray-500 block mb-1">تاريخ التحديد</span>
// // //                   <span>{selectedRequest.scheduledDate ? new Date(selectedRequest.scheduledDate).toLocaleDateString('ar-EG') : 'غير محدد'}</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div className="p-4 bg-gray-50 flex justify-end space-x-3 rtl:space-x-reverse">
// // //               {selectedRequest.status === 'pending' && (
// // //                 <>
// // //                   <button
// // //                     onClick={() => {
// // //                       handleStatusChange(selectedRequest.id, 'accepted');
// // //                       setSelectedRequest(null);
// // //                     }}
// // //                     className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
// // //                   >
// // //                     قبول الطلب
// // //                   </button>
// // //                   <button
// // //                     onClick={() => {
// // //                       handleStatusChange(selectedRequest.id, 'rejected');
// // //                       setSelectedRequest(null);
// // //                     }}
// // //                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
// // //                   >
// // //                     رفض الطلب
// // //                   </button>
// // //                 </>
// // //               )}
// // //               <button
// // //                 onClick={() => setSelectedRequest(null)}
// // //                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
// // //               >
// // //                 إغلاق
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AdRequests;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { BadgeCheck, XCircle, Eye, Filter, RefreshCw } from 'lucide-react';
// // import { useSelector } from 'react-redux';
// // import Cookies from 'js-cookie';
// // import { toast } from 'react-toastify';

// // const AdRequests = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [selectedRequest, setSelectedRequest] = useState(null);
// //   const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
// //   const [loading, setLoading] = useState(true);
// //   const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
// //   const user = useSelector((state) => state.user.currentUser);
// //   const [scheduleDate, setScheduleDate] = useState(''); // Added for scheduling

// //   const fetchAdRequests = async () => {
// //     try {
// //       setLoading(true);
// //       const token = Cookies.get('token');
// //       const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setRequests(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Failed to fetch ad requests:', error);
// //       setLoading(false);
// //       toast.error('Error loading requests');
// //     }
// //   };

// //   useEffect(() => {
// //     if (user?.userId) {
// //       fetchAdRequests();
// //     }
// //   }, [user]);

// //   const handleStatusChange = async (requestId, status) => {
// //     try {
// //       const token = Cookies.get('token');
// //       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/status`, { status }, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });

// //       setRequests(prevRequests =>
// //         prevRequests.map(request =>
// //           request.id === requestId ? { ...request, status } : request
// //         )
// //       );

// //       toast.success(status === 'accepted' ? 'Request accepted successfully!' : 'Request rejected successfully!');
// //     } catch (error) {
// //       console.error('Failed to update status:', error);
// //       toast.error('Failed to update request status');
// //     }
// //   };

// //   const handleViewDetails = (request) => {
// //     setSelectedRequest(request);
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'pending': return 'bg-yellow-100 text-yellow-800';
// //       case 'accepted': return 'bg-green-100 text-green-800';
// //       case 'rejected': return 'bg-red-100 text-red-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };
// //   const handleAddSchedule = async () => {
// //     try {
// //       const token = Cookies.get('token');
// //       await axios.patch(`http://localhost:4000/api/ad-request/${selectedRequest.id}/schedule`, { scheduledDate }, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });

// //       setSelectedRequest({ ...selectedRequest, scheduledDate }); // Update selected request with the scheduled date
// //       toast.success('Schedule added successfully!');
// //     } catch (error) {
// //       console.error('Failed to add schedule:', error);
// //       toast.error('Failed to add schedule');
// //     }
// //   };
// //   const getStatusText = (status) => {
// //     switch (status) {
// //       case 'pending': return 'Pending';
// //       case 'accepted': return 'Accepted';
// //       case 'rejected': return 'Rejected';
// //       default: return status;
// //     }
// //   };

// //   const filteredRequests = filter === 'all' 
// //     ? requests 
// //     : requests.filter(request => request.status === filter);

// //   return (
// //     <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
// //       <div className="mb-8">
// //         <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Ad Requests</h2>
// //         <p className="text-gray-600">Manage incoming advertisement requests from brands</p>
// //       </div>

// //       {/* Filter and View Toggle */}
// //       <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
// //         <div className="flex items-center space-x-4 mb-4 md:mb-0">
// //           <span className="text-gray-700">Filter by:</span>
// //           <div className="flex space-x-2">
// //             <button 
// //               onClick={() => setFilter('all')} 
// //               className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// //             >
// //               All
// //             </button>
// //             <button 
// //               onClick={() => setFilter('pending')} 
// //               className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
// //             >
// //               Pending
// //             </button>
// //             <button 
// //               onClick={() => setFilter('accepted')} 
// //               className={`px-3 py-1 rounded-full text-sm ${filter === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// //             >
// //               Accepted
// //             </button>
// //             <button 
// //               onClick={() => setFilter('rejected')} 
// //               className={`px-3 py-1 rounded-full text-sm ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// //             >
// //               Rejected
// //             </button>
// //           </div>
// //         </div>
// //         <div className="flex items-center space-x-4">
// //           <button 
// //             onClick={() => setViewMode('cards')} 
// //             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'cards' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// //           >
// //             <span>Card View</span>
// //           </button>
// //           <button 
// //             onClick={() => setViewMode('table')} 
// //             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
// //           >
// //             <span>Table View</span>
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

// //       {loading ? (
// //         <div className="flex justify-center items-center h-40">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
// //         </div>
// //       ) : filteredRequests.length === 0 ? (
// //         <div className="bg-white rounded-lg shadow-md p-8 text-center">
// //           <p className="text-gray-500 text-lg">No {filter !== 'all' ? `${getStatusText(filter)} ` : ''}requests available.</p>
// //         </div>
// //       ) : viewMode === 'cards' ? (
// //         // Card View
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredRequests.map((request) => (
// //             <div key={request.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
// //               <div className="p-5 border-b border-gray-100">
// //                 <div className="flex justify-between items-start">
// //                   <h3 className="text-xl font-bold text-gray-800">{request.adTitle}</h3>
// //                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
// //                     {getStatusText(request.status)}
// //                   </span>
// //                 </div>
// //                 <p className="mt-2 text-gray-600 line-clamp-2">{request.adDetails}</p>
// //               </div>
// //               <div className="p-4 bg-gray-50">
// //                 <div className="flex justify-between items-center mb-3">
// //                   <span className="text-sm text-gray-500">Budget:</span>
// //                   <span className="font-semibold text-purple-700">${request.budget}</span>
// //                 </div>
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-sm text-gray-500">Date:</span>
// //                   <span className="text-sm">{new Date(request.createdAt).toLocaleDateString()}</span>
// //                 </div>
// //               </div>
// //               <div className="p-4 flex gap-2 bg-gray-50 border-t border-gray-100">
// //                 {request.status === 'pending' && (
// //                   <>
// //                     <button
// //                       onClick={() => handleStatusChange(request.id, 'accepted')}
// //                       className="flex-1 flex justify-center items-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
// //                     >
// //                       <BadgeCheck size={16} className="mr-1" /> Accept
// //                     </button>
// //                     <button
// //                       onClick={() => handleStatusChange(request.id, 'rejected')}
// //                       className="flex-1 flex justify-center items-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
// //                     >
// //                       <XCircle size={16} className="mr-1" /> Reject
// //                     </button>
// //                   </>
// //                 )}
// //                 <button
// //                   onClick={() => handleViewDetails(request)}
// //                   className="flex-1 flex justify-center items-center py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
// //                 >
// //                   <Eye size={16} className="mr-1" /> Details
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         // Table View
// //         <div className="overflow-x-auto bg-white rounded-lg shadow-md">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Title
// //                 </th>
// //                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Budget
// //                 </th>
// //                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Date
// //                 </th>
// //                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Status
// //                 </th>
// //                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredRequests.map((request) => (
// //                 <tr key={request.id} className="hover:bg-gray-50">
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="text-sm font-medium text-gray-900">{request.adTitle}</div>
// //                     <div className="text-sm text-gray-500 line-clamp-1">{request.adDetails}</div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="text-sm font-semibold text-purple-700">${request.budget}</div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="text-sm text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
// //                       {getStatusText(request.status)}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                     <div className="flex space-x-2">
// //                       {request.status === 'pending' && (
// //                         <>
// //                           <button
// //                             onClick={() => handleStatusChange(request.id, 'accepted')}
// //                             className="text-green-600 hover:text-green-900 flex items-center"
// //                           >
// //                             <BadgeCheck size={16} className="mr-1" /> Accept
// //                           </button>
// //                           <button
// //                             onClick={() => handleStatusChange(request.id, 'rejected')}
// //                             className="text-red-600 hover:text-red-900 flex items-center"
// //                           >
// //                             <XCircle size={16} className="mr-1" /> Reject
// //                           </button>
// //                         </>
// //                       )}
// //                       <button
// //                         onClick={() => handleViewDetails(request)}
// //                         className="text-purple-600 hover:text-purple-900 flex items-center"
// //                       >
// //                         <Eye size={16} className="mr-1" /> Details
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Details Modal */}
// //       {selectedRequest && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
// //             <div className="p-6 border-b border-gray-200">
// //               <div className="flex justify-between items-center">
// //                 <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                   Request Details
// //                 </h3>
// //                 <button 
// //                   onClick={() => setSelectedRequest(null)}
// //                   className="text-gray-500 hover:text-gray-700"
// //                 >
// //                   <XCircle size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //             <div className="p-6 max-h-96 overflow-y-auto">
// //               <div className="mb-4">
// //                 <span className="text-sm text-gray-500 block mb-1">Title</span>
// //                 <span className="text-lg font-semibold text-gray-800">{selectedRequest.adTitle}</span>
// //               </div>
// //               <div className="mb-4">
// //                 <span className="text-sm text-gray-500 block mb-1">Details</span>
// //                 <p className="text-gray-700">{selectedRequest.adDetails}</p>
// //               </div>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Budget</span>
// //                   <span className="text-lg font-semibold text-purple-700">${selectedRequest.budget}</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Status</span>
// //                   <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
// //                     {getStatusText(selectedRequest.status)}
// //                   </span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Request Date</span>
// //                   <span>{new Date(selectedRequest.createdAt).toLocaleDateString()}</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Ad Duration</span>
// //                   <span>{selectedRequest.adDuration} days</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Scheduled Date</span>
// //                   <span>{selectedRequest.scheduledDate ? new Date(selectedRequest.scheduledDate).toLocaleDateString() : 'Not specified'}</span>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="p-4 bg-gray-50 flex justify-end space-x-3">
// //               {selectedRequest.status === 'pending' && (
// //                 <>
// //                   <button
// //                     onClick={() => {
// //                       handleStatusChange(selectedRequest.id, 'accepted');
// //                       setSelectedRequest(null);
// //                     }}
// //                     className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
// //                   >
// //                     Accept Request
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       handleStatusChange(selectedRequest.id, 'rejected');
// //                       setSelectedRequest(null);
// //                     }}
// //                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
// //                   >
// //                     Reject Request
// //                   </button>
// //                 </>
// //               )}
// //               <button
// //                 onClick={() => setSelectedRequest(null)}
// //                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //        {/* {selectedRequest && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
// //             <div className="p-6 border-b border-gray-200">
// //               <div className="flex justify-between items-center">
// //                 <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                   Request Details
// //                 </h3>
// //                 <button 
// //                   onClick={() => setSelectedRequest(null)}
// //                   className="text-gray-500 hover:text-gray-700"
// //                 >
// //                   <XCircle size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //             <div className="p-6 max-h-96 overflow-y-auto">
// //               <div className="mb-4">
// //                 <span className="text-sm text-gray-500 block mb-1">Title</span>
// //                 <span className="text-lg font-semibold text-gray-800">{selectedRequest.adTitle}</span>
// //               </div>
// //               <div className="mb-4">
// //                 <span className="text-sm text-gray-500 block mb-1">Details</span>
// //                 <p className="text-gray-700">{selectedRequest.adDetails}</p>
// //               </div>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Budget</span>
// //                   <span className="text-lg font-semibold text-purple-700">${selectedRequest.budget}</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Status</span>
// //                   <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
// //                     {getStatusText(selectedRequest.status)}
// //                   </span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Request Date</span>
// //                   <span>{new Date(selectedRequest.createdAt).toLocaleDateString()}</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Ad Duration</span>
// //                   <span>{selectedRequest.adDuration} days</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-500 block mb-1">Scheduled Date</span>
// //                   <span>{selectedRequest.scheduledDate ? new Date(selectedRequest.scheduledDate).toLocaleDateString() : 'Not specified'}</span>
// //                 </div>
// //               </div>

// //               {selectedRequest.status === 'accepted' && !selectedRequest.scheduledDate && (
// //                 <div className="mt-4">
// //                   <label className="block text-sm text-gray-500 mb-2">Add Schedule</label>
// //                   <input 
// //                     type="date" 
// //                     value={scheduleDate} 
// //                     onChange={(e) => setScheduleDate(e.target.value)} 
// //                     className="w-full p-2 border border-gray-300 rounded-md"
// //                   />
// //                   <button
// //                     onClick={handleAddSchedule}
// //                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// //                   >
// //                     Add Schedule
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //             <div className="p-4 bg-gray-50 flex justify-end space-x-3">
// //               {selectedRequest.status === 'pending' && (
// //                 <>
// //                   <button
// //                     onClick={() => {
// //                       handleStatusChange(selectedRequest.id, 'accepted');
// //                       setSelectedRequest(null);
// //                     }}
// //                     className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
// //                   >
// //                     Accept Request
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       handleStatusChange(selectedRequest.id, 'rejected');
// //                       setSelectedRequest(null);
// //                     }}
// //                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
// //                   >
// //                     Reject Request
// //                   </button>
// //                 </>
// //               )}
// //               <button
// //                 onClick={() => setSelectedRequest(null)}
// //                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )} */}
// //     </div>
// //   );
// // };

// // export default AdRequests;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BadgeCheck, XCircle, Eye, Filter, RefreshCw } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';

// const AdRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
//   const user = useSelector((state) => state.user.currentUser);
//   const [scheduleDate, setScheduleDate] = useState(''); // Added for scheduling
//   const [scheduleTime, setScheduleTime] = useState('');
//   const fetchAdRequests = async () => {
//     try {
//       setLoading(true);
//       const token = Cookies.get('token');
//       const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setRequests(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to fetch ad requests:', error);
//       setLoading(false);
//       toast.error('Error loading requests');
//     }
//   };

//   useEffect(() => {
//     if (user?.userId) {
//       fetchAdRequests();
//     }
//   }, [user]);

//   const handleStatusChange = async (requestId, status) => {
//     try {
//       const token = Cookies.get('token');
//       await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/status`, { status }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setRequests(prevRequests =>
//         prevRequests.map(request =>
//           request.id === requestId ? { ...request, status } : request
//         )
//       );

//       toast.success(status === 'accepted' ? 'Request accepted successfully!' : 'Request rejected successfully!');
//     } catch (error) {
//       console.error('Failed to update status:', error);
//       toast.error('Failed to update request status');
//     }
//   };

//   const handleViewDetails = (request) => {
//     setSelectedRequest(request);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'accepted': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleAddSchedule = async () => {
//     if (!scheduleDate || !scheduleTime) {
//       toast.error('Please select both date and time');
//       return;
//     }

//     const scheduledDateTime = `${scheduleDate}T${scheduleTime}:00`; // Combine date and time

//     try {
//       const token = Cookies.get('token');
//       await axios.patch(`http://localhost:4000/api/ad-request/${selectedRequest.id}/schedule`, { scheduledDateTime }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setSelectedRequest({ ...selectedRequest, scheduledDateTime }); // Update selected request with the scheduled date and time
//       toast.success('Schedule added successfully!');
//     } catch (error) {
//       console.error('Failed to add schedule:', error);
//       toast.error('Failed to add schedule');
//     }
//   };
//   const getStatusText = (status) => {
//     switch (status) {
//       case 'pending': return 'Pending';
//       case 'accepted': return 'Accepted';
//       case 'rejected': return 'Rejected';
//       default: return status;
//     }
//   };

//   const filteredRequests = filter === 'all' 
//     ? requests 
//     : requests.filter(request => request.status === filter);

//   return (
//     <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Ad Requests</h2>
//         <p className="text-gray-600">Manage incoming advertisement requests from brands</p>
//       </div>

//       {/* Filter and View Toggle */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
//         <div className="flex items-center space-x-4 mb-4 md:mb-0">
//           <span className="text-gray-700">Filter by:</span>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => setFilter('all')} 
//               className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               All
//             </button>
//             <button 
//               onClick={() => setFilter('pending')} 
//               className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Pending
//             </button>
//             <button 
//               onClick={() => setFilter('accepted')} 
//               className={`px-3 py-1 rounded-full text-sm ${filter === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Accepted
//             </button>
//             <button 
//               onClick={() => setFilter('rejected')} 
//               className={`px-3 py-1 rounded-full text-sm ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//             >
//               Rejected
//             </button>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={() => setViewMode('cards')} 
//             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'cards' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//           >
//             <span>Card View</span>
//           </button>
//           <button 
//             onClick={() => setViewMode('table')} 
//             className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//           >
//             <span>Table View</span>
//           </button>
//           <button
//             onClick={fetchAdRequests}
//             className="p-2 bg-purple-100 rounded-full text-purple-700 hover:bg-purple-200 transition-colors"
//             title="Refresh"
//           >
//             <RefreshCw size={16} />
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//         </div>
//       ) : filteredRequests.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <p className="text-gray-500 text-lg">No {filter !== 'all' ? `${getStatusText(filter)} ` : ''}requests available.</p>
//         </div>
//       ) : viewMode === 'cards' ? (
//         // Card View
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRequests.map((request) => (
//             <div key={request.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="p-5 border-b border-gray-100">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-xl font-bold text-gray-800">{request.adTitle}</h3>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
//                     {getStatusText(request.status)}
//                   </span>
//                 </div>
//                 <p className="mt-2 text-gray-600 line-clamp-2">{request.adDetails}</p>
//               </div>
//               <div className="p-4 bg-gray-50">
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-sm text-gray-500">Budget:</span>
//                   <span className="font-semibold text-purple-700">${request.budget}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-500">Date:</span>
//                   <span className="text-sm">{new Date(request.createdAt).toLocaleDateString()} {new Date(request.createdAt).toLocaleTimeString()}</span>
//                 </div>
//               </div>
//               <div className="p-4 flex gap-2 bg-gray-50 border-t border-gray-100">
//                 {request.status === 'pending' && (
//                   <>
//                     <button
//                       onClick={() => handleStatusChange(request.id, 'accepted')}
//                       className="flex-1 flex justify-center items-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
//                     >
//                       <BadgeCheck size={16} className="mr-2" />
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(request.id, 'rejected')}
//                       className="flex-1 flex justify-center items-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
//                     >
//                       <XCircle size={16} className="mr-2" />
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 <button
//                   onClick={() => handleViewDetails(request)}
//                   className="flex-1 flex justify-center items-center py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
//                 >
//                   <Eye size={16} className="mr-2" />
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         // Table View
//         <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-purple-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRequests.map((request) => (
//                 <tr key={request.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.adTitle}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${request.budget}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(request.createdAt).toLocaleDateString()} {new Date(request.createdAt).toLocaleTimeString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
//                       {getStatusText(request.status)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {request.status === 'pending' && (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleStatusChange(request.id, 'accepted')}
//                           className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => handleStatusChange(request.id, 'rejected')}
//                           className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                     <button
//                       onClick={() => handleViewDetails(request)}
//                       className="mt-2 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selectedRequest && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-md w-96">
//             <h3 className="text-xl font-bold mb-4">Request Details</h3>
//             <p className="text-gray-700 mb-2">Title: {selectedRequest.adTitle}</p>
//             <p className="text-gray-700 mb-2">Details: {selectedRequest.adDetails}</p>
//             <p className="text-gray-700 mb-2">Budget: ${selectedRequest.budget}</p>
//             <p className="text-gray-700 mb-2">Status: {getStatusText(selectedRequest.status)}</p>
//             <div className="mb-4">
//               <input
//                 type="date"
//                 value={scheduleDate}
//                 onChange={(e) => setScheduleDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="flex justify-between gap-2">
//               <button onClick={handleAddSchedule} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
//                 Add Schedule
//               </button>
//               <button onClick={() => setSelectedRequest(null)} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdRequests;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BadgeCheck, XCircle, Eye, Filter, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const AdRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
  const user = useSelector((state) => state.user.currentUser);
  const [scheduleDate, setScheduleDate] = useState(''); // Added for scheduling
  const [scheduleTime, setScheduleTime] = useState(''); // Added for scheduling time

  const fetchAdRequests = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const response = await axios.get(`http://localhost:4000/api/ad-request/influencer/${user.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch ad requests:', error);
      setLoading(false);
      toast.error('Error loading requests');
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchAdRequests();
    }
  }, [user]);

  const handleStatusChange = async (requestId, status) => {
    try {
      const token = Cookies.get('token');
      await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId ? { ...request, status } : request
        )
      );

      toast.success(status === 'accepted' ? 'Request accepted successfully!' : 'Request rejected successfully!');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update request status');
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const handleAddSchedule = async () => {
    if (!scheduleDate || !scheduleTime) {
      toast.error('Please select both date and time');
      return;
    }
  
    // دمج التاريخ والوقت معًا
    const scheduledDateTime = `${scheduleDate}T${scheduleTime}:00`; // Combine date and time
  
    try {
      const token = Cookies.get('token');
      const requestId = selectedRequest.id; 
      // استخدم scheduleDate بدلاً من date
      await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/schedule`, {
        scheduledDate: scheduleDate, // استخدم القيمة المحددة
        scheduledTime: scheduleTime,  // استخدم وقت الجدولة
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setSelectedRequest({ ...selectedRequest, scheduledDateTime }); // Update selected request with the scheduled date and time
      toast.success('Schedule added successfully!');
    } catch (error) {
      console.error('Failed to add schedule:', error);
      toast.error('Failed to add schedule');
    }
  };
  // const handleAddSchedule = async () => {
  //   if (!scheduleDate || !scheduleTime) {
  //     toast.error('Please select both date and time');
  //     return;
  //   }

  //   // const scheduledDateTime = `${scheduleDate}T${scheduleTime}:00`; // Combine date and time

  //   try {
  //     const token = Cookies.get('token');
  //     const requestId = selectedRequest.id; 
  //   await axios.patch(`http://localhost:4000/api/ad-request/${requestId}/schedule`, {
  //               scheduledDate: date.toISOString().split('T')[0], // yyyy-mm-dd
  //               scheduledTime: time,
  //             }, {
  //               headers: { Authorization: `Bearer ${token}` },
  //             });

  //     setSelectedRequest({ ...selectedRequest, scheduledDateTime }); // Update selected request with the scheduled date and time
  //     toast.success('Schedule added successfully!');
  //   } catch (error) {
  //     console.error('Failed to add schedule:', error);
  //     toast.error('Failed to add schedule');
  //   }
  // };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(request => request.status === filter);

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Ad Requests</h2>
        <p className="text-gray-600">Manage incoming advertisement requests from brands</p>
      </div>

      {/* Filter and View Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <span className="text-gray-700">Filter by:</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('accepted')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Accepted
            </button>
            <button 
              onClick={() => setFilter('rejected')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Rejected
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setViewMode('cards')} 
            className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'cards' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <span>Card View</span>
          </button>
          <button 
            onClick={() => setViewMode('table')} 
            className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <span>Table View</span>
          </button>
          <button
            onClick={fetchAdRequests}
            className="p-2 bg-purple-100 rounded-full text-purple-700 hover:bg-purple-200 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No {filter !== 'all' ? `${getStatusText(filter)} ` : ''}requests available.</p>
        </div>
      ) : viewMode === 'cards' ? (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">{request.adTitle}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">{request.adDetails}</p>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">Budget:</span>
                  <span className="font-semibold text-purple-700">${request.budget}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="text-sm">{new Date(request.createdAt).toLocaleDateString()} {new Date(request.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="p-4 flex gap-2 bg-gray-50 border-t border-gray-100">
                {request.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(request.id, 'accepted')}
                      className="flex-1 flex justify-center items-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                    >
                      <BadgeCheck size={16} className="mr-2" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                      className="flex-1 flex justify-center items-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleViewDetails(request)}
                  className="flex-1 flex justify-center items-center py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
                >
                  <Eye size={16} className="mr-2" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.adTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${request.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()} {new Date(request.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(request.id, 'accepted')}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'rejected')}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="mt-2 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Request Details</h3>
            <p className="text-gray-700 mb-2">Title: {selectedRequest.adTitle}</p>
            <p className="text-gray-700 mb-2">Details: {selectedRequest.adDetails}</p>
            <p className="text-gray-700 mb-2">Budget: ${selectedRequest.budget}</p>
            <p className="text-gray-700 mb-2">Status: {getStatusText(selectedRequest.status)}</p>
            <div className="mb-4">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>
            <div className="flex justify-between gap-2">
              <button onClick={handleAddSchedule} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                Add Schedule
              </button>
              <button onClick={() => setSelectedRequest(null)} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdRequests;
