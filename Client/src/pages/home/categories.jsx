// import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// export default function Categories() {
//   // State for FAQ accordion
//   const [activeIndex, setActiveIndex] = useState(null);

//   // Toggle FAQ item
//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   // FAQ data
//   const faqItems = [
//     {
//       question: "How can I find the right influencers?",
//       answer: "You can use the search bar with advanced filters to find influencers based on their niche, follower count, and location."
//     },
//     {
//       question: "Can I communicate directly with influencers?",
//       answer: "Yes, you can communicate directly with influencers through the platform and manage conversations easily."
//     },
//     {
//       question: "What is the cost of collaborating with influencers?",
//       answer: "The cost varies depending on the influencer's popularity and follower count. You can negotiate directly with the influencer to agree on a budget."
//     },
//     {
//       question: "How can I ensure the quality of the marketing campaign?",
//       answer: "The platform provides analytical tools to track campaign performance and measure audience engagement."
//     },
//     {
//       question: "Can I cancel the collaboration after agreeing?",
//       answer: "Yes, but please review the cancellation policy and terms agreed upon with the influencer."
//     }
//   ];

//   // Categories data
//   const categories = [
//     {
//       icon: "👗",
//       title: "Fashion",
//       description: "Find influencers in the fashion industry."
//     },
//     {
//       icon: "💄",
//       title: "Beauty",
//       description: "Connect with beauty experts and makeup artists."
//     },
//     {
//       icon: "💪",
//       title: "Fitness",
//       description: "Collaborate with fitness trainers and athletes."
//     },
//     {
//       icon: "🍲",
//       title: "Food",
//       description: "Partner with food bloggers and chefs."
//     },
//     {
//       icon: "✈️",
//       title: "Travel",
//       description: "Work with travel influencers and explorers."
//     },
//     {
//       icon: "💻",
//       title: "Tech",
//       description: "Find tech reviewers and gadget enthusiasts."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
    
      
//       {/* Categories Section */}
//       <section className="py-16 container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12 text-[#EA0054]">
//           Explore Categories
//         </h2>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {categories.map((category, index) => (
//             <div 
//               key={index} 
//               className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group border-t-4 border-[#EA0054]"
//             >
//               <div className="p-6 relative">
//                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.title}</h3>
//                 <p className="text-gray-600">{category.description}</p>
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <button className="text-[#EA0054] font-medium flex items-center hover:underline">
//                     Explore
//                     <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//           </div>
//   );
// }
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Categories() {
  // State for FAQ accordion
  const [activeIndex, setActiveIndex] = useState(null);


 

  // Categories data
  const categories = [
    {
      icon: "👕",
      title: "Fashion",
      description: "Find influencers in the fashion industry."
    },
    {
      icon: "💄",
      title: "Beauty",
      description: "Connect with beauty experts and makeup artists."
    },
    {
      icon: "💪",
      title: "Fitness",
      description: "Collaborate with fitness trainers and athletes."
    },
    {
      icon: "🍲",
      title: "Food",
      description: "Partner with food bloggers and chefs."
    },
    {
      icon: "✈️",
      title: "Travel",
      description: "Work with travel influencers and explorers."
    },
    {
      icon: "💻",
      title: "Tech",
      description: "Find tech reviewers and gadget enthusiasts."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">
          Explore Categories
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Discover the tools that make influencer marketing simple and effective.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group border-t-4 border-purple-600"
            >
              <div className="p-6 relative">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-purple-600 font-medium flex items-center hover:underline">
                    Explore
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
