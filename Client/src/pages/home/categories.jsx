
// import React, { useState } from 'react';

// export default function Categories() {
//   // State to track expanded category
//   const [expandedCategory, setExpandedCategory] = useState(null);

//   // Categories data with topic-specific icons
//   const categories = [
//     {
//       icon: "👔",
//       title: "Fashion",
//       description: "Find influencers in the fashion industry.",
//       details: "Connect with fashion designers, models, stylists and trend-setters who can showcase your products to their engaged audience."
//     },
//     {
//       icon: "💄",
//       title: "Beauty",
//       description: "Connect with beauty experts and makeup artists.",
//       details: "Partner with beauty bloggers, makeup artists and skincare enthusiasts who can demonstrate your products and share authentic reviews."
//     },
//     {
//       icon: "🏋️",
//       title: "Fitness",
//       description: "Collaborate with fitness trainers and athletes.",
//       details: "Work with personal trainers, athletes and fitness models who can promote your brand through workout videos and health-focused content."
//     },
//     {
//       icon: "🍽️",
//       title: "Food",
//       description: "Partner with food bloggers and chefs.",
//       details: "Engage with culinary experts, food photographers and recipe developers who can create appetizing content featuring your products."
//     },
//     {
//       icon: "✈️",
//       title: "Travel",
//       description: "Work with travel influencers and explorers.",
//       details: "Collaborate with travel photographers, adventure seekers and lifestyle bloggers who can showcase your brand in exotic and interesting locations."
//     },
//     {
//       icon: "💻",
//       title: "Tech",
//       description: "Find tech reviewers and gadget enthusiasts.",
//       details: "Connect with tech reviewers, IT professionals and digital innovators who can provide in-depth analysis and demonstrations of your products."
//     }
//   ];

//   // Toggle expanded view for a category
//   const toggleExpand = (index) => {
//     setExpandedCategory(expandedCategory === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Categories Section */}
//       <section className="py-16 container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">
//           Explore Categories
//         </h2>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
//           Discover the tools that make influencer marketing simple and effective.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {categories.map((category, index) => (
//             <div 
//               key={index} 
//               className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
//             >
//               {/* Decorative corner accent */}
//               <div className="absolute top-0 right-0 w-16 h-16 bg-purple-600 rounded-bl-full opacity-10"></div>
              
//               {/* Icon circle - positioned slightly above */}
//               <div className="absolute -top-5 left-6 bg-purple-600 text-white p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-2xl">{category.icon}</span>
//               </div>
              
//               <div className="p-8 pt-12 relative">
//                 <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
//                 <p className="text-gray-600 mb-6">{category.description}</p>
                
//                 {/* Expanded content with smooth transition */}
//                 <div 
//                   className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     expandedCategory === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
//                   }`}
//                 >
//                   <div className="pt-3 text-gray-700 border-t border-purple-100">
//                     {category.details}
//                   </div>
//                 </div>
                
//                 <div className="flex justify-end">
//                   <button 
//                     className="flex items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-600 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
//                     onClick={() => toggleExpand(index)}
//                   >
//                     {expandedCategory === index ? "Show Less" : "Explore"}
//                     <svg 
//                       className={`w-4 h-4 ml-2 transition-transform ${expandedCategory === index ? "rotate-90" : ""}`} 
//                       fill="none" 
//                       stroke="currentColor" 
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
              
//               {/* Subtle bottom accent */}
//               <div className="h-1 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 w-full"></div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function Categories() {
  // State to track expanded category
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Categories data with elegant imagery
  const categories = [
    {
      image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Fashion",
      description: "Find influencers in the fashion industry.",
      details: "Connect with fashion designers, models, stylists and trend-setters who can showcase your products to their engaged audience."
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&crop=center",
      title: "Beauty",
      description: "Connect with beauty experts and makeup artists.",
      details: "Partner with beauty bloggers, makeup artists and skincare enthusiasts who can demonstrate your products and share authentic reviews."
    },
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      title: "Fitness",
      description: "Collaborate with fitness trainers and athletes.",
      details: "Work with personal trainers, athletes and fitness models who can promote your brand through workout videos and health-focused content."
    },
    {
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Food",
      description: "Partner with food bloggers and chefs.",
      details: "Engage with culinary experts, food photographers and recipe developers who can create appetizing content featuring your products."
    },
    {
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Travel",
      description: "Work with travel influencers and explorers.",
      details: "Collaborate with travel photographers, adventure seekers and lifestyle bloggers who can showcase your brand in exotic and interesting locations."
    },
    {
      image: "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Tech",
      description: "Find tech reviewers and gadget enthusiasts.",
      details: "Connect with tech reviewers, IT professionals and digital innovators who can provide in-depth analysis and demonstrations of your products."
    }
  ];

  // Toggle expanded view for a category
  const toggleExpand = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 font-sans">
      {/* Categories Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  text-purple-600 mb-6">
            Explore Categories
          </h2>
          {/* <div className="w-24 h-0.5 bg-slate-400 mx-auto mb-6"></div> */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Discover the tools that make influencer marketing simple and effective.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-slate-200/50"
            >
              {/* Image section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-medium text-bg-purple-100 mb-3 tracking-wide">
                  {category.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  {category.description}
                </p>
                
                {/* Expanded content with smooth transition */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedCategory === index ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-4 text-slate-700 border-t border-slate-200 text-sm leading-relaxed">
                    {category.details}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    className="group/btn flex items-center justify-center  bg-purple-500 hover:bg-purple-600 text-white hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 text-sm tracking-wide"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedCategory === index ? "Show Less" : "Explore"}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-all duration-300 ${
                        expandedCategory === index ? "rotate-180" : "group-hover/btn:translate-x-1"
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d={expandedCategory === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                      />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Subtle bottom accent */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}