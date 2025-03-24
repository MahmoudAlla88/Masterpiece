
// import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
// export function FrequentlyQ(){
//      // State for FAQ accordion
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
// return(
    
//       <section className="py-16 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-[#EA0054]">
//             Frequently Asked Questions
//           </h2>
          
//           <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#EA0054]">
//             {faqItems.map((item, index) => (
//               <div key={index} className="border-b border-gray-100 last:border-b-0">
//                 <button 
//                   className={`w-full px-6 py-4 text-left flex justify-between items-center hover:bg-pink-50 transition-colors duration-300 focus:outline-none ${activeIndex === index ? 'bg-pink-50' : ''}`}
//                   onClick={() => toggleFAQ(index)}
//                 >
//                   <span className={`font-medium ${activeIndex === index ? 'text-[#EA0054]' : 'text-gray-800'}`}>{item.question}</span>
//                   <ChevronDown 
//                     className={`w-5 h-5 text-[#EA0054] transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`}
//                   />
//                 </button>
//                 <div 
//                   className={`overflow-hidden transition-all duration-300 ${
//                     activeIndex === index ? 'max-h-40' : 'max-h-0'
//                   }`}
//                 >
//                   <div className="px-6 py-4 bg-pink-50 text-gray-600 border-l-2 border-[#EA0054]">
//                     {item.answer}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
// )
// }

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FrequentlyQ() {
  // State for FAQ accordion
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "How can I find the right influencers?",
      answer: "You can use the search bar with advanced filters to find influencers based on their niche, follower count, and location."
    },
    {
      question: "Can I communicate directly with influencers?",
      answer: "Yes, you can communicate directly with influencers through the platform and manage conversations easily."
    },
    {
      question: "What is the cost of collaborating with influencers?",
      answer: "The cost varies depending on the influencer's popularity and follower count. You can negotiate directly with the influencer to agree on a budget."
    },
    {
      question: "How can I ensure the quality of the marketing campaign?",
      answer: "The platform provides analytical tools to track campaign performance and measure audience engagement."
    },
    {
      question: "Can I cancel the collaboration after agreeing?",
      answer: "Yes, but please review the cancellation policy and terms agreed upon with the influencer."
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Discover the tools that make influencer marketing simple and effective.
        </p>
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b last:border-b-0">
              <button 
                className={`w-full px-6 py-5 flex justify-between items-center text-left transition-all duration-300 ${activeIndex === index ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-semibold ${activeIndex === index ? 'text-[#D63384]' : 'text-gray-900'}`}>{item.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-[#D63384] transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40' : 'max-h-0'}`}
              >
                <div className="px-6 py-4 text-gray-700 bg-purple-50 border-l-4 border-[#D63384]">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
