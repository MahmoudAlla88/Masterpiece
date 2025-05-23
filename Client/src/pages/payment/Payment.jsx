import { useState, useEffect } from "react";
import { Navigate, useLocation ,useNavigate } from "react-router-dom";
import axios from 'axios';  
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function PaymentPage() {
    const navigate = useNavigate();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log("s",currentUser)
  const [preview, setPreview] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(true);
  useEffect(() => {
    //الداتا الي من صفحه requestbooking
    if (location.state) {
      setPaymentData(location.state);
    }
     if (!location.state) return;
    const { userId, proposedPrice, requestedDate } = location.state;

    axios.post('http://localhost:4000/api/users/booking-preview', {
      userId, proposedPrice, requestedDate
    })
    .then(res => setPreview(res.data))
    .catch(err => toast.error('Failed to load discount preview'))
    .finally(() => setLoadingPreview(false));
  }, [location]);
 

   if (loadingPreview) {
    return <p>Loading price…</p>;
  }

  if (!preview) {
    return <p>Couldn’t calculate your price. Please try again.</p>;
  }
  
    const { originalPrice, finalPrice, discountApplied, savings } = preview;
  const expiryDate1 = new Date(currentUser.subscriptionexpiry);
const isActive   = expiryDate1 > new Date();
const hasSlots   = preview.savings > 0; 
  
    const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue.substring(0, 19)); // limit to 16 digits + 3 spaces
  };


const handleSubmit = async (method, extra = {}) => {
  
    setIsLoading(true);
    try {
        const payload = {
            userId: currentUser.id,       
            influencerId: paymentData.influencerId,
            campaignTitle: paymentData.campaignTitle,
            brief: paymentData.brief,
            platform: paymentData.platform,
            contentType: paymentData.contentType,
            proposedPrice: paymentData.proposedPrice,
            requestedDate: paymentData.requestedDate,
            paymentMethod: method,
          
            ...(method === 'paypal' && { orderID: extra.orderID, payerID: extra.payerID }),
          };
      console.log(payload);
      await axios.post('http://localhost:4000/api/users/request-ad', payload);
  
            toast.success("Payment successful! Returning to previous page.");
     setTimeout(() => navigate("/InfluencersPage"), 3000);

        // setPaymentData(null);
    setCardName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while sending the request.');
    } finally {
      setIsLoading(false);
    }
  };
  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-gray-700">No payment data available.</p>
        </div>
      </div>
    );
  }
const priceToPay = preview.discountApplied
  ? preview.finalPrice
  : preview.originalPrice;
  return (
    <>
          <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Complete Your Payment</h1>
          </div>

          <div className="p-6 md:p-8">
            {/* Order Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Campaign</p>
                    <p className="text-gray-800">{paymentData.campaignTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Influencer</p>
                    <p className="text-gray-800">{paymentData.influncerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Platform</p>
                    <p className="text-gray-800">{paymentData.platform}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Content Type</p>
                    <p className="text-gray-800">{paymentData.contentType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivery Date</p>
                    <p className="text-gray-800">{new Date(paymentData.requestedDate).toLocaleDateString()}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium text-gray-500">Payment Provider</p>
                    <p className="text-gray-800">{paymentData.paymentProvider}</p>
                  </div> */}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                     {preview.discountApplied ? (
    <p className="text-xl font-bold text-purple-700">
      {/* Old price crossed out */}
      <span className="line-through text-gray-500 mr-2">
        ${paymentData.proposedPrice.toFixed(2)}
      </span>
      {/* New discounted price */}
      ${preview.finalPrice.toFixed(2)}
    </p>
  ) : (
    <p className="text-xl font-bold text-purple-700">
      {/* No discount, just show original */}
      ${paymentData.proposedPrice.toFixed(2)}
    </p>
  )}     </div>
                </div>
              </div>
            </div>

            {/* Payment Method Tabs */}
           <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setPaymentMethod("creditCard")}
                  className={`px-4 py-2 font-medium ${
                    paymentMethod === "creditCard"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`px-4 py-2 font-medium ${
                    paymentMethod === "paypal"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  PayPal
                </button>
              </div>
            </div> 

       
            {/* Payment Form */}
            {paymentMethod === "creditCard" ? (
              <form   onSubmit={e => {
                e.preventDefault();
                handleSubmit('creditCard');
              }}
            >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) :preview?.discountApplied ? (
    // Discounted pay text
    <span>
      <span className="line-through text-gray-300 mr-2">
        ${preview.originalPrice.toFixed(2)}
      </span>
      Pay ${preview.finalPrice.toFixed(2)}
    </span>
  ) : (
    // No discount
    `Pay $${preview?.originalPrice.toFixed(2)}`
  )}
                  </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </form>
            ) : (
            //   <div className="text-center py-6">
            //     <p className="mb-4 text-gray-700">You will be redirected to PayPal to complete your payment.</p>
            //     <button
            //       onClick={handleSubmit}
            //       className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            //     >
            //       {isLoading ? (
            //         <span className="flex items-center justify-center">
            //           <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            //             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            //             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            //           </svg>
            //           Redirecting...
            //         </span>
            //       ) : (
            //         "Continue to PayPal"
            //       )}
            //     </button>
            //   </div>
            <PayPalScriptProvider
              options={{
                "client-id": "AU5e_yUL8prhNgnKaZSZzhXsTmTOlWeDW5YsAg3JIjdWJjehIpyy7wLKYjfakSXoUrPaP07FroujGFne",
                components: "buttons",
                currency: "USD"
              }}
            >
              <div className="w-full text-center">
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
                  className="w-full"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                              value: priceToPay.toFixed(2)
                          }
                        }
                      ]
                    });
                  }}
                  onApprove={async (data, actions) => {
                    setIsLoading(true);
                    const details = await actions.order.capture();
                    // يُرسل طريقة الدفع + الـ IDs اللي تحتاجها
                    await handleSubmit('paypal', {
                      orderID: data.orderID,
                      payerID: data.payerID
                    });
                    toast.success(`Payment completed by ${details.payer.name.given_name}`);
                  }}
                  onError={(err) => {
                    console.error(err);
                    alert("An error occurred with your payment. Please try again.");
                  }}
                  onCancel={() => {
                    alert("Payment cancelled.");
                  }}
                />
              </div>
            </PayPalScriptProvider>
       
            )}
          </div>

          {/* Brief Details */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer">
                <span className="text-gray-700">Show Campaign Brief</span>
                <span className="text-purple-600 transition group-open:rotate-180">
                  <svg fill="none" height="24" width="24" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="text-gray-700 mt-3 group-open:animate-fadeIn">
                <p className="whitespace-pre-line">{paymentData.brief}</p>
              </div>
            </details>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            &larr; Back to campaign
          </button>
        </div>
      </div>
    </div></>
  );
}