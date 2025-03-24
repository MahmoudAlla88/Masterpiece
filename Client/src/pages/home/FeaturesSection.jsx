// import { motion } from "framer-motion";
// import { Search, BarChart, Users, MessageCircle } from "lucide-react";

// const features = [
//   {
//     icon: <Search size={40} className="text-purple-500" />, 
//     title: "Smart Influencer Search",
//     description: "Find the perfect influencer for your brand with AI-powered search filters."
//   },
//   {
//     icon: <BarChart size={40} className="text-purple-500" />, 
//     title: "Advanced Analytics",
//     description: "Access detailed insights and engagement metrics to make informed decisions."
//   },
//   {
//     icon: <Users size={40} className="text-purple-500" />, 
//     title: "Campaign Management",
//     description: "Easily manage and track your influencer marketing campaigns in one place."
//   },
//   {
//     icon: <MessageCircle size={40} className="text-purple-500" />, 
//     title: "Seamless Communication",
//     description: "Connect and collaborate with influencers effortlessly through integrated messaging."
//   }
// ];

// const FeaturesSection = () => {
//   return (
//     <section className="py-16 bg-gray-50 text-center">
//       <div className="container mx-auto px-6 md:px-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//           Key Features of BrandBridge
//         </h2>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
//           Discover the tools that make influencer marketing simple and effective.
//         </p>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <motion.div 
//               key={index} 
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <div className="flex justify-center mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
//               <p className="text-gray-600 text-sm">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;
import { motion } from "framer-motion";
import { Search, BarChart, Users, MessageCircle } from "lucide-react";

const features = [
  {
    icon: <Search size={40} className="text-purple-500" />, 
    title: "Smart Influencer Search",
    description: "Find the perfect influencer for your brand with AI-powered search filters."
  },
  {
    icon: <BarChart size={40} className="text-purple-500" />, 
    title: "Advanced Analytics",
    description: "Access detailed insights and engagement metrics to make informed decisions."
  },
  {
    icon: <Users size={40} className="text-purple-500" />, 
    title: "Campaign Management",
    description: "Easily manage and track your influencer marketing campaigns in one place."
  },
  {
    icon: <MessageCircle size={40} className="text-purple-500" />, 
    title: "Seamless Communication",
    description: "Connect and collaborate with influencers effortlessly through integrated messaging."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold  text-purple-600 mb-6">
          Key Features of BrandBridge
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Discover the tools that make influencer marketing simple and effective.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 relative overflow-hidden border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-500 shadow-md">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;