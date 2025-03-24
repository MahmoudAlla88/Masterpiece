// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Sparkles, Settings, Users, Brain } from "lucide-react";

// const AiInfluencer = () => {
//   const [loading, setLoading] = useState(false);
//   const [influencers, setInfluencers] = useState([]);

//   const aiRecommendedInfluencers = [
//     { id: 1, name: "Emily Chen", expertise: "Tech", followers: "1.2M+", img: "https://i.pravatar.cc/150?img=1" },
//     { id: 2, name: "Liam Scott", expertise: "Fitness", followers: "850K+", img: "https://i.pravatar.cc/150?img=2" },
//     { id: 3, name: "Sophia Brooks", expertise: "Beauty", followers: "1.5M+", img: "https://i.pravatar.cc/150?img=3" },
//     { id: 4, name: "Jackson Lee", expertise: "Travel", followers: "2M+", img: "https://i.pravatar.cc/150?img=4" },
//     { id: 5, name: "Olivia Carter", expertise: "Food", followers: "900K+", img: "https://i.pravatar.cc/150?img=5" },
//   ];

//   const handleAISelection = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setInfluencers(aiRecommendedInfluencers);
//       setLoading(false);
//     }, 2500);
//   };

//   return (
//     <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
//       <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10">
//         Let AI Pick Your Perfect Influencers!
//       </h2>
//       <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
//         Our AI scans millions of influencers to find the **best match** for your product. Let’s get started! 🔥
//       </p>

//       {/* AI Button */}
//       <motion.button
//         onClick={handleAISelection}
//         className="bg-gradient-to-r from-[#D63384] to-[#6F42C1] text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md flex items-center gap-3 mx-auto hover:brightness-110 transition-all"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Brain size={24} />
//         Let AI Work!
//       </motion.button>

//       {/* Loading Animation */}
//       {loading && (
//         <motion.div
//           className="flex justify-center items-center mt-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Settings size={40} className="animate-spin text-[#D63384]" />
//           <p className="text-lg font-semibold text-gray-800 ml-4">AI is selecting the best influencers for you...</p>
//         </motion.div>
//       )}

//       {/* Influencer Recommendations */}
//       {influencers.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mt-12">
//           {influencers.map((influencer, index) => (
//             <motion.div
//               key={influencer.id}
//               className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl p-6 text-center"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <div className="h-24 w-24 mx-auto rounded-full overflow-hidden mb-4">
//                 <img src={influencer.img} alt={influencer.name} className="w-full h-full object-cover" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">{influencer.name}</h3>
//               <p className="text-sm text-gray-600 mb-1">{influencer.expertise}</p>
//               <p className="text-sm text-gray-600">{influencer.followers}</p>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default AiInfluencer;


import React from 'react';

const AiInfluencer = () => {
  return (
    <div className="bg-purple-50 min-h-screen p-8 flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-4">
            <span className="bg-purple-200 text-purple-800 text-xs font-medium px-3 py-1 rounded-full flex items-center w-fit">
              <span className="mr-1">⚡</span> Launching Soon in Jordan & Globally
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Perfect Matches</span> 
            <span className="text-black"> Between</span>
            <br />
            <span className="text-black">Brands & Influencers</span>
          </h1>
          
          <p className="text-gray-600 mb-8">
            Our AI-powered platform identifies the ideal audience match,
            connecting brands with the perfect influencers for their
            campaigns and helping influencers find opportunities aligned
            with their authentic voice.
          </p>
          
          <div className="flex gap-4 mb-8">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full flex items-center">
              Find Your Perfect Match
              <span className="ml-2">→</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full">
              How It Works
            </button>
          </div>
          
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white text-xs">
                  {num}
                </div>
              ))}
            </div>
            <span className="text-gray-600 text-sm">Trusted by 500+ brands & influencers</span>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <div className="absolute w-64 h-64 rounded-full bg-pink-100 right-0 bottom-0 -z-10"></div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center mb-6">
              <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xl">◎</span>
              </div>
              <div>
                <h3 className="font-bold">Audience Matching</h3>
                <p className="text-gray-500 text-sm">AI-powered precision</p>
              </div>
              <span className="ml-auto text-green-500 text-xs font-medium">Live</span>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Target Audience Analysis</span>
              </div>
              
              <div className="space-y-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '64%'}}></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-gray-500">78%</span>
                <span className="text-gray-500">92%</span>
                <span className="text-gray-500">64%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Top Matches</h3>
                <a href="#" className="text-purple-500 text-xs">View all</a>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 1, match: '85%' },
                  { id: 2, match: '80%' },
                  { id: 3, match: '75%' }
                ].map((influencer) => (
                  <div key={influencer.id} className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-500 text-xs">{influencer.id}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm">Influencer {influencer.id}</span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: influencer.match}}></div>
                      </div>
                    </div>
                    <span className="text-green-500 text-xs ml-3">{influencer.match} match</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInfluencer;