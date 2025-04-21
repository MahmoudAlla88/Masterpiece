
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const SubscriptionCardForm = () => {
//   const [plans, setPlans] = useState([]);
//   const [deletedPlans, setDeletedPlans] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [newPlan, setNewPlan] = useState({
//     title: "",
//     price: "",
//     monthly_duration: "",
//     description: "",
//     features: [],
//   });
//   const [editingPlan, setEditingPlan] = useState(null);

//   // جلب الخطط العادية والخطط المحذوفة
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         // جلب الخطط العادية
//         const response = await axios.get("http://localhost:4000/api/subscriptions");
//         setPlans(response.data);

//         // جلب الخطط المحذوفة
//         const deletedPlansResponse = await axios.get("http://localhost:4000/api/subscriptions/deleted/all");
//         setDeletedPlans(deletedPlansResponse.data);

//         setLoading(false);
//       } catch (error) {
//         setError("Failed to load subscription plans.");
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   // إضافة أو تحديث خطة
//   const handleAddPlan = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingPlan) {
//         // Update existing plan
//         const response = await axios.put(`http://localhost:4000/api/subscriptions/${editingPlan.id}`, newPlan);
//         const updatedPlan = response.data;
//         setPlans(plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)));
//       } else {
//         // Add new plan
//         const response = await axios.post("http://localhost:4000/api/subscriptions", newPlan);
//         const addedPlan = response.data;
//         setPlans([...plans, addedPlan]);
//       }
//       setNewPlan({
//         title: "",
//         price: "",
//         description: "",
//         features: [],
//         monthly_duration: "",
//       });
//       setFormVisible(false);
//       setEditingPlan(null);
//     } catch (error) {
//       console.error("Error during API call:", error);
//       setError("Failed to add or update plan.");
//     }
//   };

//   // تحرير الخطة
//   const handleEditPlan = (plan) => {
//     setNewPlan(plan);
//     setEditingPlan(plan); // تعيين الخطة المعدلة
//     setFormVisible(true);
//   };

//   // حذف الخطة
//   const handleDeletePlan = async (planId) => {
//     if (!planId) {
//       setError("Plan ID is required to delete a plan");
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:4000/api/subscriptions/${planId}`);
//       setPlans(plans.filter((plan) => plan.id !== planId));
//     } catch (error) {
//       console.error("Error during delete:", error);
//       setError("Failed to delete plan.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

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

//       <button
//         onClick={() => setFormVisible(true)}
//         className="mb-6 py-2 px-4 bg-[#D63384] text-white font-semibold rounded-lg hover:bg-[#6F42C1] transition"
//       >
//         Add New Plan
//       </button>

//       {formVisible && (
//         <form
//           onSubmit={handleAddPlan}
//           className="mb-8 p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto"
//         >
//           <input
//             type="text"
//             placeholder="Title"
//             value={newPlan.title}
//             onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
//             className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newPlan.price}
//             onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
//             className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Duration (in months)"
//             value={newPlan.monthly_duration}
//             onChange={(e) => setNewPlan({ ...newPlan, monthly_duration: e.target.value })}
//             className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={newPlan.description}
//             onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
//             className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Features (comma separated)"
//             value={newPlan.features.join(", ")}
//             onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value.split(", ") })}
//             className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <button
//             type="submit"
//             className="py-2 px-4 bg-[#D63384] text-white font-semibold rounded-lg hover:bg-[#6F42C1] transition"
//           >
//             {editingPlan ? "Update Plan" : "Add Plan"}
//           </button>
//         </form>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {/* عرض الخطط العادية */}
//         {plans.map((plan, index) => (
//           <motion.div
//             key={plan.id}
//             className="bg-white flex flex-col justify-between p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D63384] to-[#6F42C1]"></div>
//             <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.title}</h3>
//             <p className="text-3xl font-bold text-[#D63384] mb-4">{plan.price} JD/{plan.monthly_duration} monthly</p>
//             <p className="space-y-2 mb-6 text-gray-600">{plan.description}</p>
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
//             <div className="absolute top-2 right-2">
//               <button
//                 onClick={() => handleEditPlan(plan)}
//                 className="mr-2 text-blue-500 hover:underline"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeletePlan(plan.id)}
//                 className="text-red-500 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* عرض الخطط المحذوفة */}
//       <motion.h2
//         className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mt-16"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Deleted Plans
//       </motion.h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {deletedPlans.map((plan, index) => (
//           <motion.div
//             key={plan.id}
//             className="bg-white flex flex-col justify-between p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D63384] to-[#6F42C1]"></div>
//             <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.title}</h3>
//             <p className="text-3xl font-bold text-[#D63384] mb-4">{plan.price} JD/{plan.monthly_duration} monthly</p>
//             <p className="space-y-2 mb-6 text-gray-600">{plan.description}</p>
//             <ul className="text-gray-600 space-y-2 mb-6">
//               {plan.features.map((feature, idx) => (
//                 <li key={idx} className="flex items-center justify-center gap-2">
//                   ✅ {feature}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SubscriptionCardForm;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SubscriptionCardForm = () => {
  const [plans, setPlans] = useState([]);
  const [deletedPlans, setDeletedPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [viewMode, setViewMode] = useState("card"); // "card" or "table"
  const [newPlan, setNewPlan] = useState({
    title: "",
    price: "",
    monthly_duration: "",
    description: "",
    features: [],
  });
  const [editingPlan, setEditingPlan] = useState(null);

  // جلب الخطط العادية والخطط المحذوفة
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // جلب الخطط العادية
        const response = await axios.get("http://localhost:4000/api/subscriptions");
        setPlans(response.data);

        // جلب الخطط المحذوفة
        const deletedPlansResponse = await axios.get("http://localhost:4000/api/subscriptions/deleted/all");
        setDeletedPlans(deletedPlansResponse.data);

        setLoading(false);
      } catch (error) {
        setError("Failed to load subscription plans.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // إضافة أو تحديث خطة
  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        // Update existing plan
        const response = await axios.put(`http://localhost:4000/api/subscriptions/${editingPlan.id}`, newPlan);
        const updatedPlan = response.data;
        setPlans(plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)));
      } else {
        // Add new plan
        const response = await axios.post("http://localhost:4000/api/subscriptions", newPlan);
        const addedPlan = response.data;
        setPlans([...plans, addedPlan]);
      }
      setNewPlan({
        title: "",
        price: "",
        description: "",
        features: [],
        monthly_duration: "",
      });
      setFormVisible(false);
      setEditingPlan(null);
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Failed to add or update plan.");
    }
  };

  // تحرير الخطة
  const handleEditPlan = (plan) => {
    setNewPlan(plan);
    setEditingPlan(plan); // تعيين الخطة المعدلة
    setFormVisible(true);
  };

  // حذف الخطة
  const handleDeletePlan = async (planId) => {
    if (!planId) {
      setError("Plan ID is required to delete a plan");
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/api/subscriptions/${planId}`);
      setPlans(plans.filter((plan) => plan.id !== planId));
    } catch (error) {
      console.error("Error during delete:", error);
      setError("Failed to delete plan.");
    }
  };

  // استعادة خطة محذوفة
  const handleRestorePlan = async (planId) => {
    if (!planId) {
      setError("Plan ID is required to restore a plan");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:4000/api/subscriptions/restore/${planId}`);
      const restoredPlan = response.data;
      setDeletedPlans(deletedPlans.filter((plan) => plan.id !== planId));
      setPlans([...plans, restoredPlan]);
    } catch (error) {
      console.error("Error during restore:", error);
      setError("Failed to restore plan.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-100 p-4 rounded text-red-700">{error}</div>;
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-pink-50 to-purple-100 min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Subscription Plans
          </motion.h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Boost your influence with our premium subscription packages designed for content creators
          </p>

          {/* Control Buttons */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <button
              onClick={() => setFormVisible(true)}
              className="py-2 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Plan
            </button>

            <div className="bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setViewMode("card")}
                className={`py-2 px-4 rounded-full ${
                  viewMode === "card"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-600"
                } font-medium transition`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`py-2 px-4 rounded-full ${
                  viewMode === "table"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-600"
                } font-medium transition`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Form for adding/editing plans */}
        {formVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form
              onSubmit={handleAddPlan}
              className="mb-12 p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-purple-700 mb-6">
                {editingPlan ? "Edit Subscription Plan" : "Create New Subscription Plan"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Premium Plan"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Price (JD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 99.99"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Duration (months)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1, 3, 6, 12"
                    value={newPlan.monthly_duration}
                    onChange={(e) => setNewPlan({ ...newPlan, monthly_duration: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Brief description of the plan"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Features (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 24/7 Support, Up to 5 profiles, Analytics dashboard"
                    value={newPlan.features.join(", ")}
                    onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value.split(", ") })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="py-3 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition transform hover:scale-105"
                >
                  {editingPlan ? "Update Plan" : "Create Plan"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormVisible(false);
                    setEditingPlan(null);
                    setNewPlan({
                      title: "",
                      price: "",
                      description: "",
                      features: [],
                      monthly_duration: "",
                    });
                  }}
                  className="py-3 px-8 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Active Plans Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-8 bg-purple-600 rounded-full mr-3"></span>
            Active Plans
          </h3>

          {/* Card View */}
          {viewMode === "card" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-8">No active plans found.</p>
              ) : (
                plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    className="bg-white flex flex-col justify-between p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Gradient Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                    
                    {/* Actions Menu */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPlan(plan)}
                          className="p-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan.id)}
                          className="p-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.title}</h3>
                      <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-bold text-purple-600">{plan.price}</span>
                        <span className="text-gray-500 ml-2">JD / {plan.monthly_duration} {plan.monthly_duration > 1 ? 'months' : 'month'}</span>
                      </div>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      <div className="border-t border-gray-100 pt-6 mb-6">
                        <h4 className="font-semibold text-gray-800 mb-4">Features</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 mt-1 text-purple-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </span>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <motion.button
                      className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition mt-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Table View */}
          {viewMode === "table" && (
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
              {plans.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No active plans found.</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Features
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {plans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{plan.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-purple-600">{plan.price} JD</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{plan.monthly_duration} {plan.monthly_duration > 1 ? 'months' : 'month'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-500 truncate max-w-xs">{plan.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-500">
                            {plan.features.slice(0, 2).join(", ")}
                            {plan.features.length > 2 && "..."}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditPlan(plan)}
                            className="text-purple-600 hover:text-purple-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="text-pink-600 hover:text-pink-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Deleted Plans Section */}
        {deletedPlans.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-pink-600 rounded-full mr-3"></span>
              Deleted Plans
            </h3>

            {/* Card View for Deleted Plans */}
            {viewMode === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {deletedPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    className="bg-white flex flex-col justify-between p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl relative overflow-hidden opacity-75 group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 0.75, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Deleted Indicator */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-400"></div>
                    <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      Deleted
                    </div>
                    
                    {/* Restore Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleRestorePlan(plan.id)}
                        className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                        title="Restore"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-600 mb-4">{plan.title}</h3>
                      <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-bold text-gray-500">{plan.price}</span>
                        <span className="text-gray-400 ml-2">JD / {plan.monthly_duration} {plan.monthly_duration > 1 ? 'months' : 'month'}</span>
                      </div>
                      <p className="text-gray-500 mb-6">{plan.description}</p>
                      <div className="border-t border-gray-100 pt-6 mb-6">
                        <h4 className="font-semibold text-gray-600 mb-4">Features</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 mt-1 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </span>
                              <span className="text-gray-500">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Table View for Deleted Plans */}
            {viewMode === "table" && (
              <div className="overflow-x-auto bg-white rounded-2xl shadow-lg opacity-75">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Features
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deletedPlans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-500">{plan.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-500">{plan.price} JD</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-400">{plan.monthly_duration} {plan.monthly_duration > 1 ? 'months' : 'month'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-400 truncate max-w-xs">{plan.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-400">
                            {plan.features.slice(0, 2).join(", ")}
                            {plan.features.length > 2 && "..."}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRestorePlan(plan.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default SubscriptionCardForm;