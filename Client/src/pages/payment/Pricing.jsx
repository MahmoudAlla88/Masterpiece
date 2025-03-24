// import React from "react";
// import { motion } from "framer-motion";

// const pricingPlans = [
//   {
//     title: "Basic Plan",
//     price: "$19/month",
//     features: [
//       "Access to limited influencers",
//       "Basic analytics dashboard",
//       "Email support",
//     ],
//   },
//   {
//     title: "Pro Plan",
//     price: "$49/month",
//     features: [
//       "Access to premium influencers",
//       "Advanced analytics & insights",
//       "Priority email & chat support",
//       "AI-powered influencer recommendations",
//     ],
//   },
//   {
//     title: "Enterprise Plan",
//     price: "Custom Pricing",
//     features: [
//       "Unlimited influencer access",
//       "Dedicated account manager",
//       "Customized marketing strategy",
//       "24/7 VIP support",
//     ],
//   },
// ];

// const PricingPage = () => {


  
//   return (
//     <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
//       <motion.h2
//         className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Choose Your Plan
//       </motion.h2>
//       <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
//         Flexible pricing plans designed to meet your business needs.
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {pricingPlans.map((plan, index) => (
//           <motion.div
//             key={index}
//             className="bg-white flex flex-col justify-between p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D63384] to-[#6F42C1]"></div>
//             <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.title}</h3>
//             <p className="text-3xl font-bold text-[#D63384] mb-4">{plan.price}</p>
//             <ul className="text-gray-600 space-y-2 mb-6">
//               {plan.features.map((feature, idx) => (
//                 <li key={idx} className="flex items-center justify-center gap-2">
//                   ✅ {feature}
//                 </li>
//               ))}
//             </ul>
//             <motion.button
//               className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110 transition"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Get Started
//             </motion.button>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PricingPage;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PricingPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch subscription plans from your API
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/subscriptions");
        const data = await response.json();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load subscription plans.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
      <motion.h2
        className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Plan
      </motion.h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
        Flexible pricing plans designed to meet your business needs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-white flex flex-col justify-between p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
                
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D63384] to-[#6F42C1]"></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.title}</h3>
            <p className="text-3xl font-bold text-[#D63384] mb-4">{plan.price}JD/{plan.monthly_duration}monthly</p>
            <p className="space-y-2 mb-6 text-gray-600 mb-4">{plan.description}</p>
            <ul className="text-gray-600 space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center gap-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <motion.button
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingPage;
