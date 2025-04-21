// // // // import { useParams } from 'react-router-dom';
// // // // import { useState } from 'react';
// // // // import axios from 'axios';

// // // // const AdRequestPage = () => {
// // // //   const { id } = useParams(); // influencerId
// // // //   const [adDetails, setAdDetails] = useState('');

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const res = await axios.post(
// // // //         'http://localhost:4000/api/ad-requests',
// // // //         { influencerId: id, adDetails },
// // // //         { withCredentials: true }
// // // //       );

// // // //       // Redirect to payment or confirmation page
// // // //       console.log('Request sent:', res.data);
// // // //     } catch (err) {
// // // //       console.error('Failed to send ad request', err);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="max-w-xl mx-auto p-4">
// // // //       <h1 className="text-2xl font-bold mb-4">Ad Request</h1>
// // // //       <form onSubmit={handleSubmit}>
// // // //         <textarea
// // // //           value={adDetails}
// // // //           onChange={(e) => setAdDetails(e.target.value)}
// // // //           placeholder="Write ad details here"
// // // //           className="w-full border rounded p-2 h-32"
// // // //         ></textarea>
// // // //         <button
// // // //           type="submit"
// // // //           className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
// // // //         >
// // // //           Submit and Proceed to Payment
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdRequestPage;
// // // import { useParams, useNavigate ,useLocation } from 'react-router-dom';
// // // import { useState } from 'react';
// // // import axios from 'axios';
// // // import { useSelector } from 'react-redux';
// // // const AdRequestPage = () => {
// // //     const location = useLocation();
// // //     const influencerPrice = location.state?.advertisingcost;
// // //   const { id } = useParams(); // influencerId
// // //   const navigate = useNavigate();
// // //   const user = useSelector((state) => state.user.currentUser);
// // //   const [adDetails, setAdDetails] = useState('');
// // //   const [adTitle, setAdTitle] = useState('');
// // //   const [adDuration, setAdDuration] = useState('7');
// // //   const [budget, setBudget] = useState('');
// // //   const [paymentMethod, setPaymentMethod] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [step, setStep] = useState(1); // 1: Details, 2: Payment
// // //   const currentUser = useSelector((state) => state.user.currentUser);
// // //   console.log('Logged in user:', currentUser);
// // //   const handleDetailsSubmit = (e) => {
// // //     e.preventDefault();
// // //     setStep(2);
// // //     window.scrollTo(0, 0);
// // //   };

// // //   const handlePaymentSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!paymentMethod) {
// // //       alert('Please select a payment method');
// // //       return;
// // //     }
    
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.post(
// // //         'http://localhost:4000/api/ad-requests',
// // //         {  
// // //             userId: currentUser?.id,
// // //           influencerId: id, 
// // //           adDetails,
// // //           adTitle,
// // //           adDuration,
// // //           budget:influencerPrice,
// // //           paymentMethod,
         
// // //         },
// // //         { withCredentials: true }
// // //       );
      
// // //       // Redirect to confirmation page
// // //       alert('Your ad request has been submitted successfully!');
// // //       navigate('/dashboard/ad-requests');
// // //     } catch (err) {
// // //       console.error('Failed to send ad request', err);
// // //       alert('Something went wrong. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
  
// // //   return (
// // //     <div className="bg-gray-50 min-h-screen py-8">
// // //       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
// // //         {/* Header */}
// // //         <div className="bg-purple-600 text-white p-6">
// // //           <h1 className="text-2xl font-bold">Create Ad Request</h1>
// // //           <p className="mt-1 text-purple-100">
// // //             Submit your advertisement details and complete payment
// // //           </p>
// // //         </div>
        
// // //         {/* Progress Steps */}
// // //         <div className="flex border-b border-gray-200">
// // //           <div 
// // //             className={`flex-1 py-4 px-6 text-center border-b-2 ${
// // //               step === 1 ? 'border-purple-600 text-purple-600' : 'border-transparent'
// // //             }`}
// // //           >
// // //             <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
// // //               1
// // //             </span>
// // //             Ad Details
// // //           </div>
// // //           <div 
// // //             className={`flex-1 py-4 px-6 text-center border-b-2 ${
// // //               step === 2 ? 'border-purple-600 text-purple-600' : 'border-transparent'
// // //             }`}
// // //           >
// // //             <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
// // //               2
// // //             </span>
// // //             Payment
// // //           </div>
// // //         </div>
        
// // //         {/* Step 1: Ad Details Form */}
// // //         {step === 1 && (
// // //           <form onSubmit={handleDetailsSubmit} className="p-6">
// // //             <div className="mb-6">
// // //               <label htmlFor="adTitle" className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Ad Title
// // //               </label>
// // //               <input
// // //                 id="adTitle"
// // //                 type="text"
// // //                 value={adTitle}
// // //                 onChange={(e) => setAdTitle(e.target.value)}
// // //                 placeholder="Enter a title for your advertisement"
// // //                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
// // //                 required
// // //               />
// // //             </div>
            
// // //             <div className="mb-6">
// // //               <label htmlFor="adDetails" className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Ad Details
// // //               </label>
// // //               <textarea
// // //                 id="adDetails"
// // //                 value={adDetails}
// // //                 onChange={(e) => setAdDetails(e.target.value)}
// // //                 placeholder="Describe your advertisement requirements, target audience, goals, etc."
// // //                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 h-36"
// // //                 required
// // //               ></textarea>
// // //             </div>
            
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// // //               <div>
// // //                 <label htmlFor="adDuration" className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Campaign Duration
// // //                 </label>
// // //                 <select
// // //                   id="adDuration"
// // //                   value={adDuration}
// // //                   onChange={(e) => setAdDuration(e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
// // //                 >
// // //                   <option value="7">7 days</option>
// // //                   <option value="14">14 days</option>
// // //                   <option value="30">30 days</option>
// // //                   <option value="60">60 days</option>
// // //                   <option value="90">90 days</option>
// // //                 </select>
// // //               </div>
              
// // //               <div>
// // //                 <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Budget (USD)
// // //                 </label>
// // //                 <input
// // //                   id="budget"
// // //                   type="number"
// // //                   min="50"
// // //                   value={budget}
// // //                   onChange={(e) => setBudget(e.target.value)}
// // //                   placeholder="Enter your campaign budget"
// // //                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="flex justify-end">
// // //               <button
// // //                 type="submit"
// // //                 className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
// // //               >
// // //                 Continue to Payment
// // //               </button>
// // //             </div>
// // //           </form>
// // //         )}
        
// // //         {/* Step 2: Payment Method Selection */}
// // //         {step === 2 && (
// // //           <form onSubmit={handlePaymentSubmit} className="p-6">
// // //             <div className="mb-6">
// // //               <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                 {/* Credit Card Option */}
// // //                 <div
// // //                   className={`border rounded-lg p-4 cursor-pointer transition-all ${
// // //                     paymentMethod === 'card' 
// // //                       ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' 
// // //                       : 'border-gray-200 hover:border-purple-300'
// // //                   }`}
// // //                   onClick={() => setPaymentMethod('card')}
// // //                 >
// // //                   <div className="flex justify-between items-center mb-2">
// // //                     <div className="font-medium text-gray-700">Credit Card</div>
// // //                     <div className="flex space-x-1">
// // //                       <div className="h-6 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold">VISA</div>
// // //                       <div className="h-6 w-10 bg-red-500 rounded-md flex items-center justify-center text-white text-xs font-bold">MC</div>
// // //                     </div>
// // //                   </div>
// // //                   <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or any credit card</p>
// // //                 </div>
                
// // //                 {/* PayPal Option */}
// // //                 <div
// // //                   className={`border rounded-lg p-4 cursor-pointer transition-all ${
// // //                     paymentMethod === 'paypal' 
// // //                       ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' 
// // //                       : 'border-gray-200 hover:border-purple-300'
// // //                   }`}
// // //                   onClick={() => setPaymentMethod('paypal')}
// // //                 >
// // //                   <div className="flex justify-between items-center mb-2">
// // //                     <div className="font-medium text-gray-700">PayPal</div>
// // //                     <div className="h-6 w-16 bg-blue-700 rounded-md flex items-center justify-center text-white text-xs font-bold">PayPal</div>
// // //                   </div>
// // //                   <p className="text-sm text-gray-500">Fast and secure payment via PayPal</p>
// // //                 </div>
                
// // //                 {/* Stripe Option */}
// // //                 <div
// // //                   className={`border rounded-lg p-4 cursor-pointer transition-all ${
// // //                     paymentMethod === 'stripe' 
// // //                       ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' 
// // //                       : 'border-gray-200 hover:border-purple-300'
// // //                   }`}
// // //                   onClick={() => setPaymentMethod('stripe')}
// // //                 >
// // //                   <div className="flex justify-between items-center mb-2">
// // //                     <div className="font-medium text-gray-700">Stripe</div>
// // //                     <div className="h-6 w-16 bg-purple-700 rounded-md flex items-center justify-center text-white text-xs font-bold">Stripe</div>
// // //                   </div>
// // //                   <p className="text-sm text-gray-500">Safe payment processing via Stripe</p>
// // //                 </div>
// // //               </div>
              
// // //               {paymentMethod && (
// // //                 <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
// // //                   <h3 className="font-medium text-gray-700 mb-2">Order Summary</h3>
// // //                   <div className="flex justify-between text-sm mb-1">
// // //                     <span className="text-gray-600">Ad Campaign ({adDuration} days)</span>
// // //                     <span className="text-gray-800">${budget}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm mb-1">
// // //                     <span className="text-gray-600">Processing Fee</span>
// // //                     <span className="text-gray-800">${Math.round(budget * 0.03)}</span>
// // //                   </div>
// // //                   <div className="border-t border-gray-200 my-2"></div>
// // //                   <div className="flex justify-between font-medium">
// // //                     <span>Total</span>
// // //                     <span className="text-purple-700">${Math.round(budget * 1.03)}</span>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setStep(1)}
// // //                 className="order-2 md:order-1 text-gray-600 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
// // //               >
// // //                 Back to Details
// // //               </button>
              
// // //               <button
// // //                 type="submit"
// // //                 disabled={!paymentMethod || loading}
// // //                 className="order-1 md:order-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-300 disabled:cursor-not-allowed"
// // //               >
// // //                 {loading ? (
// // //                   <span className="flex items-center justify-center">
// // //                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                     </svg>
// // //                     Processing...
// // //                   </span>
// // //                 ) : (
// // //                   <span>Complete Payment</span>
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </form>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdRequestPage;

// // import { useParams, useNavigate, useLocation } from 'react-router-dom';
// // import { useState } from 'react';
// // import axios from 'axios';
// // import { useSelector } from 'react-redux';

// // const AdRequestPage = () => {
// //   const location = useLocation();
// //   const influencerPrice = location.state?.advertisingcost;
// //   const { id } = useParams(); // influencerId
// //   const navigate = useNavigate();
// //   const currentUser = useSelector((state) => state.user.currentUser);
  
// //   const [adDetails, setAdDetails] = useState('');
// //   const [adTitle, setAdTitle] = useState('');
// //   const [adDuration, setAdDuration] = useState('7');
// //   const [budget, setBudget] = useState('');
// //   const [paymentMethod, setPaymentMethod] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [step, setStep] = useState(1); // 1: Details, 2: Payment

// //   const handleDetailsSubmit = (e) => {
// //     e.preventDefault();
// //     setStep(2);
// //     window.scrollTo(0, 0);
// //   };

// //   const handlePaymentSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!paymentMethod) {
// //       alert('Please select a payment method');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const res = await axios.post(
// //         'http://localhost:4000/api/ad-requests',
// //         {  
// //             userId: currentUser?.id,
// //             influencerId: id, 
// //             adDetails,
// //             adTitle,
// //             adDuration,
// //             budget: influencerPrice,
// //             paymentMethod,
// //         },
// //         { withCredentials: true }
// //       );

// //       // Redirect to confirmation page
// //       alert('Your ad request has been submitted successfully!');
// //       navigate('/dashboard/ad-requests');
// //     } catch (err) {
// //       console.error('Failed to send ad request', err);
// //       alert('Something went wrong. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-gray-50 min-h-screen py-8">
// //       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
// //         {/* Header */}
// //         <div className="bg-purple-600 text-white p-6">
// //           <h1 className="text-2xl font-bold">Create Ad Request</h1>
// //           <p className="mt-1 text-purple-100">
// //             Submit your advertisement details and complete payment
// //           </p>
// //         </div>

// //         {/* Progress Steps */}
// //         <div className="flex border-b border-gray-200">
// //           <div 
// //             className={`flex-1 py-4 px-6 text-center border-b-2 ${step === 1 ? 'border-purple-600 text-purple-600' : 'border-transparent'}`}
// //           >
// //             <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
// //               1
// //             </span>
// //             Ad Details
// //           </div>
// //           <div 
// //             className={`flex-1 py-4 px-6 text-center border-b-2 ${step === 2 ? 'border-purple-600 text-purple-600' : 'border-transparent'}`}
// //           >
// //             <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
// //               2
// //             </span>
// //             Payment
// //           </div>
// //         </div>

// //         {/* Step 1: Ad Details Form */}
// //         {step === 1 && (
// //           <form onSubmit={handleDetailsSubmit} className="p-6">
// //             <div className="mb-6">
// //               <label htmlFor="adTitle" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Ad Title
// //               </label>
// //               <input
// //                 id="adTitle"
// //                 type="text"
// //                 value={adTitle}
// //                 onChange={(e) => setAdTitle(e.target.value)}
// //                 placeholder="Enter a title for your advertisement"
// //                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //                 required
// //               />
// //             </div>

// //             <div className="mb-6">
// //               <label htmlFor="adDetails" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Ad Details
// //               </label>
// //               <textarea
// //                 id="adDetails"
// //                 value={adDetails}
// //                 onChange={(e) => setAdDetails(e.target.value)}
// //                 placeholder="Describe your advertisement requirements, target audience, goals, etc."
// //                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 h-36"
// //                 required
// //               ></textarea>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //               <div>
// //                 <label htmlFor="adDuration" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Campaign Duration
// //                 </label>
// //                 <select
// //                   id="adDuration"
// //                   value={adDuration}
// //                   onChange={(e) => setAdDuration(e.target.value)}
// //                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //                 >
// //                   <option value="7">7 days</option>
// //                   <option value="14">14 days</option>
// //                   <option value="30">30 days</option>
// //                   <option value="60">60 days</option>
// //                   <option value="90">90 days</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Budget (USD)
// //                 </label>
// //                 <input
// //                   id="budget"
// //                   type="number"
// //                   min="50"
// //                   value={budget}
// //                   onChange={(e) => setBudget(e.target.value)}
// //                   placeholder="Enter your campaign budget"
// //                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex justify-end">
// //               <button
// //                 type="submit"
// //                 className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
// //               >
// //                 Continue to Payment
// //               </button>
// //             </div>
// //           </form>
// //         )}

// //         {/* Step 2: Payment Method Selection */}
// //         {step === 2 && (
// //           <form onSubmit={handlePaymentSubmit} className="p-6">
// //             <div className="mb-6">
// //               <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 {/* Credit Card Option */}
// //                 <div
// //                   className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' : 'border-gray-200 hover:border-purple-300'}`}
// //                   onClick={() => setPaymentMethod('card')}
// //                 >
// //                   <div className="flex justify-between items-center mb-2">
// //                     <div className="font-medium text-gray-700">Credit Card</div>
// //                     <div className="flex space-x-1">
// //                       <div className="h-6 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold">VISA</div>
// //                       <div className="h-6 w-10 bg-red-500 rounded-md flex items-center justify-center text-white text-xs font-bold">MC</div>
// //                     </div>
// //                   </div>
// //                   <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or any credit card</p>
// //                 </div>

// //                 {/* PayPal Option */}
// //                 <div
// //                   className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' : 'border-gray-200 hover:border-purple-300'}`}
// //                   onClick={() => setPaymentMethod('paypal')}
// //                 >
// //                   <div className="flex justify-between items-center mb-2">
// //                     <div className="font-medium text-gray-700">PayPal</div>
// //                     <div className="h-6 w-16 bg-blue-700 rounded-md flex items-center justify-center text-white text-xs font-bold">PayPal</div>
// //                   </div>
// //                   <p className="text-sm text-gray-500">Fast and secure payment via PayPal</p>
// //                 </div>

// //                 {/* Stripe Option */}
// //                 <div
// //                   className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' : 'border-gray-200 hover:border-purple-300'}`}
// //                   onClick={() => setPaymentMethod('stripe')}
// //                 >
// //                   <div className="flex justify-between items-center mb-2">
// //                     <div className="font-medium text-gray-700">Stripe</div>
// //                     <div className="h-6 w-10 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs font-bold">STRIPE</div>
// //                   </div>
// //                   <p className="text-sm text-gray-500">Pay with your credit card using Stripe</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* PayPal Button */}
// //             {paymentMethod === 'paypal' && (
// //               <div className="mb-6">
// //                 <PayPalButtons
// //                   createOrder={(data, actions) => {
// //                     return actions.order.create({
// //                       purchase_units: [
// //                         {
// //                           amount: {
// //                             value: budget,
// //                           },
// //                         },
// //                       ],
// //                     });
// //                   }}
// //                   onApprove={(data, actions) => {
// //                     return actions.order.capture().then(() => {
// //                       alert('Payment successful!');
// //                     });
// //                   }}
// //                 />
// //               </div>
// //             )}

// //             <div className="flex justify-end">
// //               <button
// //                 type="submit"
// //                 className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
// //               >
// //                 Submit Request
// //               </button>
// //             </div>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdRequestPage;
// // import { PayPalButtons } from "@paypal/react-paypal-js"; // التأكد من استيراد PayPalButtons

// const AdRequestPage = () => {
//   const location = useLocation();
//   const influencerPrice = location.state?.advertisingcost; // التأكد من جلب القيمة بشكل صحيح
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const currentUser = useSelector((state) => state.user.currentUser);

//   const [adDetails, setAdDetails] = useState('');
//   const [adTitle, setAdTitle] = useState('');
//   const [adDuration, setAdDuration] = useState('7');
//   const [budget, setBudget] = useState(influencerPrice || ''); // تحديد قيمة الإعلانات مسبقًا
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1); // 1: Details, 2: Payment

//   const handleDetailsSubmit = (e) => {
//     e.preventDefault();
//     setStep(2);
//     window.scrollTo(0, 0);
//   };

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     if (!paymentMethod) {
//       alert('Please select a payment method');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         'http://localhost:4000/api/ad-requests',
//         {  
//             userId: currentUser?.id,
//             influencerId: id, 
//             adDetails,
//             adTitle,
//             adDuration,
//             budget: influencerPrice, // التأكد من تمرير القيمة بشكل صحيح
//             paymentMethod,
//         },
//         { withCredentials: true }
//       );

//       alert('Your ad request has been submitted successfully!');
//       navigate('/dashboard/ad-requests');
//     } catch (err) {
//       console.error('Failed to send ad request', err);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         {/* Header */}
//         <div className="bg-purple-600 text-white p-6">
//           <h1 className="text-2xl font-bold">Create Ad Request</h1>
//           <p className="mt-1 text-purple-100">
//             Submit your advertisement details and complete payment
//           </p>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex border-b border-gray-200">
//           <div 
//             className={`flex-1 py-4 px-6 text-center border-b-2 ${step === 1 ? 'border-purple-600 text-purple-600' : 'border-transparent'}`}
//           >
//             <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
//               1
//             </span>
//             Ad Details
//           </div>
//           <div 
//             className={`flex-1 py-4 px-6 text-center border-b-2 ${step === 2 ? 'border-purple-600 text-purple-600' : 'border-transparent'}`}
//           >
//             <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
//               2
//             </span>
//             Payment
//           </div>
//         </div>

//         {/* Step 1: Ad Details Form */}
//         {step === 1 && (
//           <form onSubmit={handleDetailsSubmit} className="p-6">
//             <div className="mb-6">
//               <label htmlFor="adTitle" className="block text-sm font-medium text-gray-700 mb-1">
//                 Ad Title
//               </label>
//               <input
//                 id="adTitle"
//                 type="text"
//                 value={adTitle}
//                 onChange={(e) => setAdTitle(e.target.value)}
//                 placeholder="Enter a title for your advertisement"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label htmlFor="adDetails" className="block text-sm font-medium text-gray-700 mb-1">
//                 Ad Details
//               </label>
//               <textarea
//                 id="adDetails"
//                 value={adDetails}
//                 onChange={(e) => setAdDetails(e.target.value)}
//                 placeholder="Describe your advertisement requirements, target audience, goals, etc."
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 h-36"
//                 required
//               ></textarea>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label htmlFor="adDuration" className="block text-sm font-medium text-gray-700 mb-1">
//                   Campaign Duration
//                 </label>
//                 <select
//                   id="adDuration"
//                   value={adDuration}
//                   onChange={(e) => setAdDuration(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 >
//                   <option value="7">7 days</option>
//                   <option value="14">14 days</option>
//                   <option value="30">30 days</option>
//                   <option value="60">60 days</option>
//                   <option value="90">90 days</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
//                   Budget (USD)
//                 </label>
//                 <input
//                   id="budget"
//                   type="number"
//                   min="50"
//                   value={budget} // القيمة تظهر هنا مباشرة
//                   onChange={(e) => setBudget(e.target.value)}
//                   placeholder="Enter your campaign budget"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 Continue to Payment
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Step 2: Payment Method Selection */}
//         {step === 2 && (
//           <form onSubmit={handlePaymentSubmit} className="p-6">
//             <div className="mb-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Visa Option */}
//                 <div
//                   className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' : 'border-gray-200 hover:border-purple-300'}`}
//                   onClick={() => setPaymentMethod('card')}
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="font-medium text-gray-700">Visa</div>
//                     <div className="h-6 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold">VISA</div>
//                   </div>
//                   <p className="text-sm text-gray-500">Pay with your Visa card</p>
//                 </div>

//                 {/* PayPal Option */}
//                 <div
//                   className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300' : 'border-gray-200 hover:border-purple-300'}`}
//                   onClick={() => setPaymentMethod('paypal')}
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="font-medium text-gray-700">PayPal</div>
//                     <div className="h-6 w-16 bg-blue-700 rounded-md flex items-center justify-center text-white text-xs font-bold">PayPal</div>
//                   </div>
//                   <p className="text-sm text-gray-500">Fast and secure payment via PayPal</p>
//                 </div>
//               </div>
//             </div>

//             {/* PayPal Button */}
//             {paymentMethod === 'paypal' && (
//               <div className="mb-6">
//                 <PayPalButtons
//                   createOrder={(data, actions) => {
//                     return actions.order.create({
//                       purchase_units: [
//                         {
//                           amount: {
//                             value: budget, // استخدام قيمة الإعلان هنا
//                           },
//                         },
//                       ],
//                     });
//                   }}
//                   onApprove={(data, actions) => {
//                     return actions.order.capture().then(() => {
//                       alert('Payment successful!');
//                     });
//                   }}
//                 />
//               </div>
//             )}

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 Submit Request
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AdRequestPage = () => {
  const location = useLocation();
  const influencerPrice = parseFloat(location.state?.influencerPrice || 0);

  console.log("mm?",influencerPrice);
  // الحصول على سعر الإعلان
  const { id } = useParams(); // influencerId
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [adDetails, setAdDetails] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [adDuration, setAdDuration] = useState('7');
  const [budget, setBudget] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment

  // التأكد من تحميل السكربت الخاص بـ PayPal
  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AU5e_yUL8prhNgnKaZSZzhXsTmTOlWeDW5YsAg3JIjdWJjehIpyy7wLKYjfakSXoUrPaP07FroujGFne&components=buttons';
      script.async = true;
      script.onload = () => console.log('PayPal script loaded');
      document.body.appendChild(script);
    }
  }, []);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  // const handlePaymentSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!paymentMethod) {
  //     alert('Please select a payment method');
  //     return;
  //   }
  //   if (paymentMethod === 'card') {
  //     const cardNumber = document.getElementById('cardNumber').value;
  //     const expiryDate = document.getElementById('expiryDate').value;
  //     const cvv = document.getElementById('cvv').value;
  //     const cardName = document.getElementById('cardName').value;
    
  //     if (!cardNumber || !expiryDate || !cvv || !cardName) {
  //       alert('Please fill out all card details.');
  //       setLoading(false);
  //       return;
  //     }
  //   }
  //   setLoading(true);
  //   try {
  //     const res = await axios.post(
  //       'http://localhost:4000/api/ad-requests',
  //       {  
  //         userId: currentUser?.id,
  //         influencerId: id, 
  //         adDetails,
  //         adTitle,
  //         adDuration,
  //         budget: influencerPrice, // إرسال قيمة الإعلان مباشرة من `location.state`
  //         paymentMethod,
  //       },
  //       { withCredentials: true }
  //     );

  //     // Redirect to confirmation page
  //     alert('Your ad request has been submitted successfully!');
  //     navigate('/dashboard/ad-requests');
  //   } catch (err) {
  //     console.error('Failed to send ad request', err);
  //     alert('Something went wrong. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🟣 Step: Submit Payment Pressed');
    console.log('Selected paymentMethod:', paymentMethod);
    
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
  
    if (paymentMethod === 'card') {
      const cardNumber = document.getElementById('cardNumber').value;
      const expiryDate = document.getElementById('expiryDate').value;
      const cvv = document.getElementById('cvv').value;
      const cardName = document.getElementById('cardName').value;
  
      console.log('🔵 Card Data:', {
        cardName,
        cardNumber,
        expiryDate,
        cvv
      });
  
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        alert('Please fill out all card details.');
        setLoading(false);
        return;
      }
    }
  
    setLoading(true);
  
    // Log all data before sending
    console.log('🟢 Preparing data for API:');
    console.log('currentUser:', currentUser);
    console.log('userId:', currentUser?.userId);
    console.log('influencerId:', id);
    console.log('adDetails:', adDetails);
    console.log('adTitle:', adTitle);
    console.log('adDuration:', adDuration);
    console.log('budget (influencerPrice):', influencerPrice);
    console.log('paymentMethod:', paymentMethod);
  
    try {
      const res = await axios.post(
        'http://localhost:4000/api/ad-request',
        {  
          userId: currentUser?.userId,
          influencerId: id, 
          adDetails,
          adTitle,
          adDuration,
          budget: influencerPrice,
          paymentMethod,
        },
        { withCredentials: true }
      );
  
      console.log('✅ Response from API:', res.data);
  
      alert('Your ad request has been submitted successfully!');
      navigate('/');
    } catch (err) {
      console.error('❌ Failed to send ad request', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white p-6">
          <h1 className="text-2xl font-bold">Create Ad Request</h1>
          <p className="mt-1 text-purple-100">
            Submit your advertisement details and complete payment
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex border-b border-gray-200">
          <div 
            className={`flex-1 py-4 px-6 text-center border-b-2 ${
              step === 1 ? 'border-purple-600 text-purple-600' : 'border-transparent'
            }`}
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
              1
            </span>
            Ad Details
          </div>
          <div 
            className={`flex-1 py-4 px-6 text-center border-b-2 ${
              step === 2 ? 'border-purple-600 text-purple-600' : 'border-transparent'
            }`}
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-2">
              2
            </span>
            Payment
          </div>
        </div>

        {/* Step 1: Ad Details Form */}
        {step === 1 && (
          <form onSubmit={handleDetailsSubmit} className="p-6">
            <div className="mb-6">
              <label htmlFor="adTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Ad Title
              </label>
              <input
                id="adTitle"
                type="text"
                value={adTitle}
                onChange={(e) => setAdTitle(e.target.value)}
                placeholder="Enter a title for your advertisement"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="adDetails" className="block text-sm font-medium text-gray-700 mb-1">
                Ad Details
              </label>
              <textarea
                id="adDetails"
                value={adDetails}
                onChange={(e) => setAdDetails(e.target.value)}
                placeholder="Describe your advertisement requirements, target audience, goals, etc."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 h-36"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="adDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Duration
                </label>
                <select
                  id="adDuration"
                  value={adDuration}
                  onChange={(e) => setAdDuration(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (USD)
                </label>
                <input
                  id="budget"
                  type="number"
                  min="50"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter your campaign budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method Selection */}
        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Credit Card Option */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-700">Credit Card</div>
                    <div className="flex space-x-1">
                      <div className="h-6 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold">VISA</div>
                      <div className="h-6 w-10 bg-red-500 rounded-md flex items-center justify-center text-white text-xs font-bold">MC</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or any credit card</p>
                </div>

                {/* PayPal Option */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-700">PayPal</div>
                    <div className="text-gray-500">Online payment</div>
                  </div>
                  <p className="text-sm text-gray-500">Pay securely via PayPal</p>
                </div>
              </div>
            </div>
            {paymentMethod === 'card' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div>
      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
        Cardholder Name
      </label>
      <input
        id="cardName"
        type="text"
        placeholder="John Doe"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        required
      />
    </div>

    <div>
      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
        Card Number
      </label>
      <input
        id="cardNumber"
        type="text"
        maxLength="16"
        placeholder="1234 5678 9012 3456"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        required
      />
    </div>

    <div>
      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
        Expiry Date
      </label>
      <input
        id="expiryDate"
        type="text"
        placeholder="MM/YY"
        maxLength="5"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        required
      />
    </div>

    <div>
      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
        CVV
      </label>
      <input
        id="cvv"
        type="password"
        maxLength="4"
        placeholder="123"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        required
      />
    </div>
  </div>
)}
            {paymentMethod === 'paypal' && (
              <div id="paypal-button-container">
                {window.paypal && (
                  <div
                    ref={(container) => {
                      if (container && window.paypal) {
                        window.paypal.Buttons({
                          createOrder: (data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: influencerPrice, // المبلغ المطلوب دفعه
                                  },
                                },
                              ],
                            });
                          },
                          onApprove: (data, actions) => {
                            return actions.order.capture().then(() => {
                              alert('Payment successful!');
                            });
                          },
                        }).render(container);
                      }
                    }}
                  />
                )}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {loading ? 'Processing Payment...' : 'Submit Payment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdRequestPage;
