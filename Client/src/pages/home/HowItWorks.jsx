
import { motion } from "framer-motion";
import { Search, Mail, Rocket,UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
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
    title: "Request Ad", 
    description: "Go to the selected influencer’s profile and click “Request Ad” to submit your advertising request.", 
    icon: <Mail size={30} className="text-purple-500" />
  },
  { 
    id: 4, 
    title: "Ad Details & Payment", 
    description: "Fill in your ad details and proceed to payment securely.", 
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
      
      <motion.div
      
        className="inline-block mt-12 px-8 py-4 text-white font-semibold rounded-lg text-lg shadow-md transition bg-purple-500 hover:bg-purple-600"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(108, 99, 255, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={"/InfluencersPage"}>
        Get Started</Link>
      </motion.div>
    </section>
  );
};

export default HowItWorks;