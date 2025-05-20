

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const UserPricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/subscriptions/user//user-subscription-plans");
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
const handleGetStarted = (plan) => {
  console.log("plan",plan)
    navigate("/Paymentpricing", {
      state: {
       
        plan: plan,       
      },
    });
  };
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100">
      <motion.h2
        className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
           style={{ 
                background: 'linear-gradient(45deg, #D63384, #6F42C1)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}
      >
        Choose Your Plan
      </motion.h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto pb-10">
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
                
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left">{plan.title}</h3>
            <div className="mb-4 text-left">
        <span className="text-purple-600 text-4xl font-bold">{plan.price}</span>
        <span className="text-gray-500 ml-1 ">JD /{plan.monthly_duration} months</span>
      </div>

            <p className="space-y-2 mb-6 text-gray-600 mb-4 text-left">{plan.description}</p>
           <ul className="mb-4 space-y-2">
                      <li>🛍 Discount: {plan.discount_percentage}% off for up to {plan.discount_bookings_count} bookings</li>
                      {plan.ai_enabled && (
                        <li>🤖 AI Access for {plan.ai_duration_days} days</li>
                      )}
                    </ul>
            <h4 className="text-lg font-semibold text-gray-800 mb-3 text-left">Features</h4>

            <ul className="space-y-3 mb-6">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
            <motion.button
        className="w-full py-4 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 transition"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleGetStarted(plan)} 
    
      >
        Get Started
      </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserPricing;
