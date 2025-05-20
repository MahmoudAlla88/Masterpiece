
import React, { useState } from 'react';

export default function Categories() {
  // State to track expanded category
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Categories data with topic-specific icons
  const categories = [
    {
      icon: "👔",
      title: "Fashion",
      description: "Find influencers in the fashion industry.",
      details: "Connect with fashion designers, models, stylists and trend-setters who can showcase your products to their engaged audience."
    },
    {
      icon: "💄",
      title: "Beauty",
      description: "Connect with beauty experts and makeup artists.",
      details: "Partner with beauty bloggers, makeup artists and skincare enthusiasts who can demonstrate your products and share authentic reviews."
    },
    {
      icon: "🏋️",
      title: "Fitness",
      description: "Collaborate with fitness trainers and athletes.",
      details: "Work with personal trainers, athletes and fitness models who can promote your brand through workout videos and health-focused content."
    },
    {
      icon: "🍽️",
      title: "Food",
      description: "Partner with food bloggers and chefs.",
      details: "Engage with culinary experts, food photographers and recipe developers who can create appetizing content featuring your products."
    },
    {
      icon: "✈️",
      title: "Travel",
      description: "Work with travel influencers and explorers.",
      details: "Collaborate with travel photographers, adventure seekers and lifestyle bloggers who can showcase your brand in exotic and interesting locations."
    },
    {
      icon: "💻",
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
              className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-600 rounded-bl-full opacity-10"></div>
              
              {/* Icon circle - positioned slightly above */}
              <div className="absolute -top-5 left-6 bg-purple-600 text-white p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{category.icon}</span>
              </div>
              
              <div className="p-8 pt-12 relative">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                {/* Expanded content with smooth transition */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedCategory === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-3 text-gray-700 border-t border-purple-100">
                    {category.details}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    className="flex items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-600 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedCategory === index ? "Show Less" : "Explore"}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform ${expandedCategory === index ? "rotate-90" : ""}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Subtle bottom accent */}
              <div className="h-1 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 w-full"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}