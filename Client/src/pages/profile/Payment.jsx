// import React, { useState } from 'react';
// import axios from 'axios';

// const PaymentModal = ({ bookingId, onClose }) => {
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [paymentStatus, setPaymentStatus] = useState('');

//   const handlePayment = async () => {
//     try {
//       if (!paymentMethod) {
//         alert("Please select a payment method");
//         return;
//       }

//       // إرسال طلب دفع مع طريقة الدفع المحددة
//       const response = await axios.post(`http://localhost:4000/api/users/pay/${bookingId}`, { paymentMethod });

//       // حالما يتم الدفع بنجاح، تحديث الحالة إلى "paid"
//       if (response.status === 200) {
//         setPaymentStatus('Payment successful');
//         setTimeout(() => onClose(), 2000);  // إغلاق الـ modal بعد نجاح الدفع
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       setPaymentStatus('Payment failed. Please try again');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
        
//         {/* نموذج اختيار طريقة الدفع */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-700">Choose your payment method:</label>
//           <select
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Payment Method</option>
//             <option value="paypal">PayPal</option>
//             <option value="visa">Visa</option>
//             <option value="stripe">Stripe</option>
//             {/* يمكنك إضافة خيارات أخرى هنا */}
//           </select>
//         </div>

//         {/* عرض حالة الدفع */}
//         {paymentStatus && <div className="text-center text-sm text-gray-500 mt-4">{paymentStatus}</div>}

//         {/* زر الدفع */}
//         <div className="flex justify-between gap-2 mt-4">
//           <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
//             Pay Now
//           </button>
//           <button onClick={onClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdRequests = () => {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//   const handleOpenPaymentModal = (bookingId) => {
//     setSelectedBooking(bookingId);
//     setIsPaymentModalOpen(true);
//   };

//   const handleClosePaymentModal = () => {
//     setIsPaymentModalOpen(false);
//     setSelectedBooking(null);
//   };

//   return (
//     <div>
//       {/* عرض طلبات الحجز */}
//       <button onClick={() => handleOpenPaymentModal(bookingId)} className="btn btn-primary">
//         Pay Now
//       </button>

//       {/* عرض الـ Modal للدفع */}
//       {isPaymentModalOpen && (
//         <PaymentModal
//           bookingId={selectedBooking}
//           onClose={handleClosePaymentModal}
//         />
//       )}
//     </div>
//   );
// };

// export default AdRequests;
