
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function PaymentPagePlan() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const currentUser = useSelector((state) => state.user.currentUser);

   useEffect(() => {
    if (location.state && location.state.plan) {
      setPaymentData(location.state.plan); 
  
  //  console.log("paymentData",paymentData)
    } else {
      console.log("No payment data found");
    }
  }, [location]);


  if (!paymentData || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-gray-700">No payment data available or invalid payment data.</p>
        </div>
      </div>
    );
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue.substring(0, 19)); // limit to 16 digits + 3 spaces
  };


const handleSubmit = async (method, extra = {}) => {
  setIsLoading(true);
  try {
     console.log("paymentData",paymentData)
   
    if (!paymentData || !paymentData.price || !paymentData.title || !paymentData.id) {
      toast.error("Payment data is incomplete.");
      return;
    }

    // Prepare the payment data
    const payload = {
      userId: currentUser.id,  
      subscriptionPlanId:paymentData.id,
      planTitle: paymentData.title,
      planPrice: paymentData.price,
      planDuration: paymentData.monthly_duration,
      paymentMethod: method, 
      ...(method === "paypal" && { orderID: extra.orderID, payerID: extra.payerID }), 
       paymentStatus:"completed"
    };


    const response = await axios.post("http://localhost:4000/api/payments", {  userId: currentUser.id,  
      subscriptionPlanId:paymentData.id,
      planTitle: paymentData.title,
      planPrice: paymentData.price,
      planDuration: paymentData.monthly_duration,
      paymentMethod: method,
      ...(method === "paypal" && { orderID: extra.orderID, payerID: extra.payerID }), 
       paymentStatus:"completed"}
    );

    // if (response.status === 200) {
        toast.success("Payment successful! Returning to previous page.", {
          autoClose: 3000,
          isClosable: true,
          onClose: () => navigate(-1),
        });
    

    // }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while processing the payment.");
  } finally {
    setIsLoading(false);
  }
};

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
          <div className="bg-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Complete Your Payment</h1>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Plan</p>
                    <p className="text-gray-800">{paymentData?.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price</p>
                    <p className="text-gray-800">{paymentData?.price} JD</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="text-gray-800">{paymentData?.monthly_duration} months</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                    <p className="text-xl font-bold text-purple-700">{paymentData?.price} JD</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setPaymentMethod("creditCard")}
                  className={`px-4 py-2 font-medium ${paymentMethod === "creditCard" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`px-4 py-2 font-medium ${paymentMethod === "paypal" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  PayPal
                </button>
              </div>
            </div>

            {paymentMethod === "creditCard" ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit("creditCard"); }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input type="text" id="cardName" placeholder="name" value={cardName} onChange={(e) => setCardName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input type="text"    placeholder="1234 5678 9012 3456" id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input type="text" id="expiryDate"     placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input type="text" id="cvv"  placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-medium"
                  >
                    {isLoading ? "Processing..." : `Pay ${paymentData?.price} JD`}
                  </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </form>
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id": "your-client-id",
                  components: "buttons",
                  currency: "USD"
                }}
              >
                <div className="w-full text-center">
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { value: paymentData.price.toFixed(2) }
                          }
                        ]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      await handleSubmit("paypal", {
                        orderID: data.orderID,
                        payerID: data.payerID
                      });
                      toast.success(`Payment completed by ${details.payer.name.given_name}`);
                    }}
                  />
                </div>
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div></>
  );
}
