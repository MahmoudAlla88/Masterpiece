// // import { motion } from "framer-motion";

// // const HowItWorks = () => {
// //   const steps = [
// //     { id: 1, title: "Find Influencers", description: "Use the search bar to find influencers in your niche." },
// //     { id: 2, title: "Contact Them", description: "Reach out to influencers directly or through the platform." },
// //     { id: 3, title: "Launch Your Campaign", description: "Negotiate terms and start your marketing campaign." },
// //   ];

// //   return (
// //     <section className="py-16 px-6 bg-gray-100 text-center">
// //       <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">How It Works</h2>
// //       <div className="flex flex-wrap justify-center gap-6">
// //         {steps.map((step) => (
// //           <motion.div
// //             key={step.id}
// //             className="w-full sm:w-1/2 lg:w-1/4 bg-white p-6 rounded-xl shadow-lg"
// //             initial={{ opacity: 0, y: 50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5, delay: step.id * 0.2 }}
// //           >
// //             <div className="w-14 h-14 bg-blue-500 text-white text-xl font-bold flex items-center justify-center rounded-full mx-auto mb-4">
// //               {step.id}
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
// //             <p className="text-gray-600 text-sm">{step.description}</p>
// //           </motion.div>
// //         ))}
// //       </div>
// //       <motion.a
// //         href="#"
// //         className="inline-block mt-10 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg text-lg transition hover:bg-blue-600"
// //         whileHover={{ scale: 1.05 }}
// //         whileTap={{ scale: 0.95 }}
// //       >
// //         Get Started
// //       </motion.a>
// //     </section>
// //   );
// // };

// // export default HowItWorks;
// import { motion } from "framer-motion";
// import { FaSearch, FaComments, FaRocket } from "react-icons/fa";

// const HowItWorks = () => {
//   const steps = [
//     { 
//       id: 1, 
//       title: "Find Influencers", 
//       description: "Use the search bar to find influencers in your niche.", 
//       icon: <FaSearch className="text-2xl" />
//     },
//     { 
//       id: 2, 
//       title: "Contact Them", 
//       description: "Reach out to influencers directly or through the platform.", 
//       icon: <FaComments className="text-2xl" />
//     },
//     { 
//       id: 3, 
//       title: "Launch Your Campaign", 
//       description: "Negotiate terms and start your marketing campaign.", 
//       icon: <FaRocket className="text-2xl" />
//     },
//   ];
  
//   return (
//     <section className="py-16 px-6 bg-gray-50 text-center">
//       <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-[#EA0054] bg-clip-text text-transparent mb-10">
//         How It Works
//       </h2>
      
//       <div className="flex flex-wrap justify-center gap-8">
//         {steps.map((step, index) => (
//           <motion.div
//             key={step.id}
//             className="w-full sm:w-1/2 lg:w-1/4 bg-white p-6 rounded-xl shadow-lg relative overflow-hidden border border-gray-100"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             {/* Decorative line connecting steps */}
//             {index < steps.length - 1 && (
//               <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-gray-200 translate-x-full" />
//             )}
            
//             {/* Step number with improved styling */}
//             <div className="absolute top-4 left-4 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center" 
//                  style={{ backgroundColor: "#EA0054", color: "white" }}>
//               {step.id}
//             </div>
            
//             {/* Icon in circle */}
//             <div className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 text-white"
//                  style={{ backgroundColor: "#EA0054" }}>
//               {step.icon}
//             </div>
            
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
//             <p className="text-gray-600">{step.description}</p>
//           </motion.div>
//         ))}
//       </div>
      
//       <motion.a
//         href="#"
//         className="inline-block mt-12 px-8 py-4 text-white font-semibold rounded-lg text-lg shadow-md transition"
//         style={{ backgroundColor: "#EA0054" }}
//         whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(234, 0, 84, 0.4)" }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Get Started
//       </motion.a>
//     </section>
//   );
// };

// export default HowItWorks;
import { motion } from "framer-motion";
import { Search, Mail, Rocket,UserPlus } from "lucide-react";

const steps = [
  { 
    id: 1, 
    title: "Sign Up or Log In", 
    description: "Create an account or log in to access the full range of features.", 
    icon: <UserPlus size={30} className="text-purple-500" />
  },
  { 
    id: 2, 
    title: "Find the Right Influencers", 
    description: "Use our advanced search filters to discover influencers who match your brand's needs.", 
    icon: <Search size={30} className="text-purple-500" />
  },
  { 
    id: 3, 
    title: "Connect & Collaborate", 
    description: "Message influencers directly and discuss campaign details seamlessly.", 
    icon: <Mail size={30} className="text-purple-500" />
  },
  { 
    id: 4, 
    title: "Launch Your Campaign", 
    description: "Negotiate terms, track performance, and maximize your marketing impact.", 
    icon: <Rocket size={30} className="text-purple-500" />
  }
];

const HowItWorks = () => {
  return (
    // <section className="py-16 px-6 bg-white text-center">
    //   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
    //     How BrandBridge Works
    //   </h2>
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10">
    How BrandBridge Works
    </h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Discover the tools that make influencer marketing simple and effective.
        </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Step number */}
            <div className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full text-white bg-purple-500">
              {step.id}
            </div>
            
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 bg-purple-100">
              {step.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.a
        href="#"
        className="inline-block mt-12 px-8 py-4 text-white font-semibold rounded-lg text-lg shadow-md transition bg-purple-500 hover:bg-purple-600"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(108, 99, 255, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.a>
    </section>
  );
};

export default HowItWorks;