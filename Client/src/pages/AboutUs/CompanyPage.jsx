import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaTrophy, FaHandshake } from 'react-icons/fa';

const CompanyPage = () => {
  const stats = [
    { value: "250M+", label: "Users Worldwide", icon: <FaUsers size={40} className="text-blue-500" /> },
    { value: "99%", label: "Customer Satisfaction Rate", icon: <FaChartLine size={40} className="text-purple-500" /> },
    { value: "300K", label: "Partner Companies", icon: <FaHandshake size={40} className="text-green-500" /> },
    { value: "5K+", label: "Successful Projects", icon: <FaTrophy size={40} className="text-yellow-500" /> },
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto text-center">
        {/* Company Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">BrandBridge</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We connect brands with top influencers, using AI-powered matching to ensure the success of your marketing campaigns. Join us and boost your brand with the best influencers.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Ready to Join Us?
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            We help brands reach their ideal audience through top influencers. Let’s start your journey with us today.
          </p>
          <a 
            href="/get-started"
            className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg hover:brightness-110 transition-all"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyPage;
