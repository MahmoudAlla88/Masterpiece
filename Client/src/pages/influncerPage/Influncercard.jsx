// // // import { useState } from "react";

// // // const influencersData = [
// // //   { id: 1, name: "Deep Smith", expertise: "Fashion", followers: "1M+", img: "img/pexels-photo-10412892.jpeg", category: "fashion" },
// // //   { id: 2, name: "Jane Smith", expertise: "Beauty", followers: "500K+", img: "img/pexels-photo-6953586.webp", category: "beauty" },
// // //   { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "img/pexels-photo-1486064.jpeg", category: "fitness" },
// // //   { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "img/istockphoto-1437816897-2048x2048.jpg", category: "travel" },
// // //   { id: 5, name: "David Wilson", expertise: "Tech", followers: "1.5M+", img: "img/istockphoto-1309328823-2048x2048.jpg", category: "tech" },
// // //   { id: 6, name: "Laura Martinez", expertise: "Food", followers: "700K+", img: "img/istockphoto-1476170969-2048x2048.jpg", category: "food" }
// // // ];

// // // const InfluencersPage = () => {
// // //   const [search, setSearch] = useState("");
// // //   const [category, setCategory] = useState("all");

// // //   const filteredInfluencers = influencersData.filter((influencer) => {
// // //     return (
// // //       (category === "all" || influencer.category === category) &&
// // //       influencer.name.toLowerCase().includes(search.toLowerCase())
// // //     );
// // //   });

// // //   return (
// // //     <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
// // //       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Our Influencers</h2>
      
// // //       <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
// // //         <input
// // //           type="text"
// // //           placeholder="Search by name..."
// // //           className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
// // //           value={search}
// // //           onChange={(e) => setSearch(e.target.value)}
// // //         />
// // //         <select
// // //           className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
// // //           onChange={(e) => setCategory(e.target.value)}
// // //         >
// // //           <option value="all">All Categories</option>
// // //           <option value="fashion">Fashion</option>
// // //           <option value="beauty">Beauty</option>
// // //           <option value="fitness">Fitness</option>
// // //           <option value="travel">Travel</option>
// // //           <option value="tech">Tech</option>
// // //           <option value="food">Food</option>
// // //         </select>
// // //       </div>
      
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
// // //         {filteredInfluencers.map((influencer) => (
// // //           <div key={influencer.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
// // //             <div className="h-48 w-full overflow-hidden rounded-lg">
// // //               <img src={influencer.img} alt={influencer.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
// // //             </div>
// // //             <h3 className="text-xl font-semibold text-gray-900 mt-4">{influencer.name}</h3>
// // //             <p className="text-gray-700 text-sm mt-2">Expertise: {influencer.expertise}</p>
// // //             <p className="text-gray-700 text-sm">Followers: {influencer.followers}</p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default InfluencersPage;
// // // import React, { useEffect, useState } from "react";

// // // const InfluencersPage = () => {
// // //   const [influencers, setInfluencers] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [category, setCategory] = useState("all");

// // //   useEffect(() => {
// // //     fetch("http://localhost:4000/api/influencer/get") // تأكد من استبدال العنوان بالعنوان الصحيح للـ API
// // //       .then((res) => res.json())
// // //       .then((data) => setInfluencers(data.influencers))
// // //       .catch((error) => console.error("Error fetching influencers:", error));
// // //   }, []);
// // // console.log(influencers);
// // //   const filteredInfluencers = influencers.filter((influencer) => {
// // //     const influencerName = influencer.name ? influencer.name.toLowerCase() : ""; // التأكد من أن الاسم موجود
// // //     return (
// // //       (category === "all" ||
// // //         (influencer.InfluencerRegistration &&
// // //          influencer.InfluencerRegistration.category === category)) &&
// // //       influencerName.includes(search.toLowerCase())  // استخدام الاسم المعدل
// // //     );
// // //   });
  

// // //   return (
// // //     <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
// // //       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Our Influencers</h2>
      
// // //       <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
// // //         <input
// // //           type="text"
// // //           placeholder="Search by name..."
// // //           className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
// // //           value={search}
// // //           onChange={(e) => setSearch(e.target.value)}
// // //         />
// // //         <select
// // //           className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
// // //           onChange={(e) => setCategory(e.target.value)}
// // //         >
// // //           <option value="all">All Categories</option>
// // //           <option value="fashion">Fashion</option>
// // //           <option value="beauty">Beauty</option>
// // //           <option value="fitness">Fitness</option>
// // //           <option value="travel">Travel</option>
// // //           <option value="tech">Tech</option>
// // //           <option value="food">Food</option>
// // //         </select>
// // //       </div>
      
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
// // //       {filteredInfluencers.map((influencerData) => {
// // //   const { user, influencerRegistration } = influencerData;
// // //   return (
// // //     <div key={user.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
// // //       <div className="h-48 w-full overflow-hidden rounded-lg">
// // //         <img 
// // //           src={`${influencerRegistration.profileImage} `|| "default-image-path.jpg"} 
// // //           alt={user.name} 
// // //           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
// // //         />
// // //       </div>
// // //       <h3 className="text-xl font-semibold text-gray-900 mt-4">{user.name}</h3>
// // //       <p className="text-gray-700 text-sm mt-2">Expertise: {influencerRegistration?.targetContent || "N/A"}</p>
// // //       <p className="text-gray-700 text-sm">Followers: {influencerRegistration?.followers || "N/A"}</p>
// // //     </div>
// // //   );
// // // })}

// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default InfluencersPage;

// // import React, { useEffect, useState } from "react";

// // const InfluencersPage = () => {
// //   const [influencers, setInfluencers] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [category, setCategory] = useState("all");

// //   useEffect(() => {
// //     fetch("http://localhost:4000/api/influencer/get") 
// //       .then((res) => res.json())
// //       .then((data) => {
// //         console.log(data); 
// //         setInfluencers(data.influencers);
// //       })
// //       .catch((error) => console.error("Error fetching influencers:", error));
// //   }, []);

// //   const filteredInfluencers = influencers.filter((influencer) => {
// //     const influencerName = influencer.user?.name ? influencer.user.name.toLowerCase() : ""; // التأكد من أن الاسم موجود
// //     return (
// //       (category === "all" ||
// //         (influencer.influencerRegistration &&
// //          influencer.influencerRegistration.category === category)) &&
// //       influencerName.includes(search.toLowerCase())  // استخدام الاسم المعدل
// //     );
// //   });

// //   return (
// //     <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
// //       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Our Influencers</h2>
      
// //       <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
// //         <input
// //           type="text"
// //           placeholder="Search by name..."
// //           className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         <select
// //           className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
// //           onChange={(e) => setCategory(e.target.value)}
// //         >
// //           <option value="all">All Categories</option>
// //           <option value="fashion">Fashion</option>
// //           <option value="beauty">Beauty</option>
// //           <option value="fitness">Fitness</option>
// //           <option value="travel">Travel</option>
// //           <option value="tech">Tech</option>
// //           <option value="food">Food</option>
// //         </select>
// //       </div>
      
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
// //         {filteredInfluencers.map((influencerData) => {
// //           const { user, influencerRegistration } = influencerData;
// //           return (
// //             <div key={user.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
// //               <div className="h-48 w-full overflow-hidden rounded-lg">
// //                 <img 
// //                   src={influencerRegistration?.profileImage || "default-image-path.jpg"} 
// //                   alt={user.name} 
// //                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
// //                 />
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mt-4">{user.name}</h3>
// //               <p className="text-gray-700 text-sm mt-2">Expertise: {influencerRegistration?.targetContent || "N/A"}</p>
// //               <p className="text-gray-700 text-sm">Followers: {influencerRegistration?.followers || "N/A"}</p>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </section>
// //   );
// // };

// // export default InfluencersPage;


// ///////////////////////////////////////////////
// // import React, { useState } from 'react';
// // import { Instagram, Youtube, Camera, Search, Filter, ExternalLink, Calendar, MapPin } from 'lucide-react';

// // const InfluencersList = () => {
// //   // Sample influencer data
// //   const [influencers, setInfluencers] = useState([
// //     {
// //       id: 1,
// //       name: "Sarah Johnson",
// //       username: "@sarah_johnson",
// //       location: "Dubai, UAE",
// //       profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2PmKtswxnRlPBc1kBmglpvWgIz3SnfWtBQ&s",
// //       socialLinks: [
// //         { platform: "instagram", url: "https://instagram.com/sarahjohnson", followers: "120K" },
// //         { platform: "youtube", url: "https://youtube.com/sarahjohnson", followers: "30K" }
// //       ],
// //       contentCategories: ["Fashion", "Beauty", "Travel"],
// //       bio: "Lifestyle and fashion content creator with a passion for sustainable brands"
// //     },
// //     {
// //       id: 2,
// //       name: "Ahmed Al-Shamri",
// //       username: "@ahmed_tech",
// //       location: "Riyadh, Saudi Arabia",
// //       profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2PmKtswxnRlPBc1kBmglpvWgIz3SnfWtBQ&s",
// //       socialLinks: [
// //         { platform: "instagram", url: "https://instagram.com/ahmedtech", followers: "87K" },
// //         { platform: "youtube", url: "https://youtube.com/ahmedtech", followers: "156K" }
// //       ],
// //       contentCategories: ["Tech", "Reviews", "Gaming"],
// //       bio: "Professional tech reviewer specializing in the latest technology and video games"
// //     },
// //     {
// //       id: 3,
// //       name: "Nora Ahmed",
// //       username: "@nora_kitchen",
// //       location: "Cairo, Egypt",
// //       profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2PmKtswxnRlPBc1kBmglpvWgIz3SnfWtBQ&s",
// //       socialLinks: [
// //         { platform: "instagram", url: "https://instagram.com/nora_kitchen", followers: "230K" },
// //         { platform: "youtube", url: "https://youtube.com/nora_kitchen", followers: "320K" }
// //       ],
// //       contentCategories: ["Cooking", "Health", "Lifestyle"],
// //       bio: "Professional chef offering healthy and easy-to-prepare recipes for the family"
// //     },
// //     {
// //       id: 4,
// //       name: "Omar Al-Khatib",
// //       username: "@omar_fitness",
// //       location: "Amman, Jordan",
// //       profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2PmKtswxnRlPBc1kBmglpvWgIz3SnfWtBQ&s",
// //       socialLinks: [
// //         { platform: "instagram", url: "https://instagram.com/omar_fitness", followers: "140K" },
// //         { platform: "youtube", url: "https://youtube.com/omar_fitness", followers: "85K" }
// //       ],
// //       contentCategories: ["Fitness", "Nutrition", "Health"],
// //       bio: "Certified fitness trainer and nutrition expert for athletes"
// //     }
// //   ]);

// //   // Search and filter states
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedCategories, setSelectedCategories] = useState([]);
// //   const [showFilters, setShowFilters] = useState(false);
  
// //   // Get all unique categories
// //   const allCategories = [...new Set(influencers.flatMap(inf => inf.contentCategories))];
  
// //   // Handle category toggle
// //   const handleCategoryToggle = (category) => {
// //     if (selectedCategories.includes(category)) {
// //       setSelectedCategories(selectedCategories.filter(cat => cat !== category));
// //     } else {
// //       setSelectedCategories([...selectedCategories, category]);
// //     }
// //   };

// //   // Filter results
// //   const filteredInfluencers = influencers.filter(influencer => {
// //     const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                          influencer.username.toLowerCase().includes(searchQuery.toLowerCase());
    
// //     const matchesCategories = selectedCategories.length === 0 || 
// //                              selectedCategories.some(cat => influencer.contentCategories.includes(cat));
    
// //     return matchesSearch && matchesCategories;
// //   });

// //   // Platform icon component
// //   const PlatformIcon = ({ platform }) => {
// //     switch (platform) {
// //       case 'instagram':
// //         return <Instagram className="h-5 w-5" />;
// //       case 'youtube':
// //         return <Youtube className="h-5 w-5" />;
// //       default:
// //         return <ExternalLink className="h-5 w-5" />;
// //     }
// //   };

// //   // Influencer card component
// //   const InfluencerCard = ({ influencer }) => {
// //     const [showDetails, setShowDetails] = useState(false);

// //     return (
// //       <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
// //         <div className="p-4">
// //           <div className="flex items-center">
// //             <div className="h-16 w-16 rounded-full overflow-hidden bg-purple-200 flex-shrink-0 border-2 border-purple-300">
// //               {influencer.profileImage ? (
// //                 <img src={influencer.profileImage} alt={influencer.name} className="h-full w-full object-cover" />
// //               ) : (
// //                 <Camera className="h-full w-full p-4 text-purple-500" />
// //               )}
// //             </div>
// //             <div className="ml-4 flex-grow">
// //               <h3 className="font-bold text-gray-800">{influencer.name}</h3>
// //               <p className="text-gray-500 text-sm">{influencer.username}</p>
// //               <div className="flex items-center text-xs text-gray-500 mt-1">
// //                 <MapPin className="h-3 w-3 mr-1" />
// //                 <span>{influencer.location}</span>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Social Media Links */}
// //           <div className="mt-4 flex space-x-3">
// //             {influencer.socialLinks.map((social, index) => (
// //               <div key={index} className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
// //                 <div className="text-purple-500 mr-1">
// //                   <PlatformIcon platform={social.platform} />
// //                 </div>
// //                 <span className="text-sm font-medium text-purple-800">{social.followers}</span>
// //               </div>
// //             ))}
// //           </div>
          
// //           {/* Categories */}
// //           <div className="mt-3 flex flex-wrap gap-2">
// //             {influencer.contentCategories.map((category, index) => (
// //               <span 
// //                 key={index} 
// //                 className="px-2 py-1 rounded-full text-xs font-medium text-purple-800 bg-purple-200"
// //               >
// //                 {category}
// //               </span>
// //             ))}
// //           </div>
          
// //           {/* Toggle Details */}
// //           {showDetails && (
// //             <div className="mt-3 text-gray-600 text-sm border-t pt-3">
// //               <p>{influencer.bio}</p>
// //             </div>
// //           )}
          
// //           {/* Action buttons */}
// //           <div className="mt-4 flex justify-between">
// //             <button 
// //               onClick={() => setShowDetails(!showDetails)} 
// //               className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors"
// //             >
// //               {showDetails ? "Hide Details" : "View Details"}
// //             </button>
// //             <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center">
// //               <Calendar className="h-4 w-4 mr-1" />
// //               Book Now
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="font-sans bg-purple-50 min-h-screen p-4">
// //       <div className="max-w-6xl mx-auto">
// //         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Influencers Directory</h1>
        
// //         {/* Search and Filter */}
// //         <div className="bg-white p-4 rounded-lg shadow-md mb-6">
// //           <div className="flex flex-col sm:flex-row gap-4">
// //             <div className="relative flex-grow">
// //               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
// //                 <Search className="h-5 w-5" />
// //               </div>
// //               <input
// //                 type="text"
// //                 className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 placeholder="Search for an influencer..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //             </div>
// //             <button 
// //               className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
// //               onClick={() => setShowFilters(!showFilters)}
// //             >
// //               <Filter className="h-5 w-5 mr-2" />
// //               <span>Filter</span>
// //             </button>
// //           </div>
          
// //           {/* Categories Filter */}
// //           {showFilters && (
// //             <div className="mt-4 border-t pt-4">
// //               <h3 className="font-medium text-gray-700 mb-2">Filter by category:</h3>
// //               <div className="flex flex-wrap gap-2">
// //                 {allCategories.map((category, index) => (
// //                   <button
// //                     key={index}
// //                     onClick={() => handleCategoryToggle(category)}
// //                     className={`px-3 py-1 rounded-full text-sm transition-colors ${
// //                       selectedCategories.includes(category)
// //                         ? 'bg-purple-500 text-white'
// //                         : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
// //                     }`}
// //                   >
// //                     {category}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
        
// //         {/* Influencers Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredInfluencers.map(influencer => (
// //             <InfluencerCard key={influencer.id} influencer={influencer} />
// //           ))}
// //         </div>
        
// //         {/* Empty State */}
// //         {filteredInfluencers.length === 0 && (
// //           <div className="text-center py-10">
// //             <p className="text-gray-500 text-lg">No matching results found</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default InfluencersList;


// import React, { useState, useEffect } from 'react';
// import { Instagram, Youtube, Camera, Search, Filter, ExternalLink, Calendar, MapPin } from 'lucide-react';

// const InfluencersList = () => {
//   const [influencers, setInfluencers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);

//   // Get all unique categories (this should now come from the backend too)
//   const allCategories = ["Fashion", "Beauty", "Travel", "Tech", "Reviews", "Gaming", "Cooking", "Health", "Fitness"];

//   useEffect(() => {
//     const fetchInfluencers = async () => {
//       try {
//         // إعداد معايير البحث والفلترة
//         const params = new URLSearchParams();
//         if (searchQuery) params.append("search", searchQuery);
//         if (selectedCategories.length > 0) {
//           params.append("categories", selectedCategories.join(','));
//         }

//         // استدعاء API جلب المؤثرين
//         const response = await fetch(`http://localhost:4000/api/influencer/get?${params.toString()}`);
//         const data = await response.json();
//         console.log(data);
//         setInfluencers(data.influencers);
//       } catch (error) {
//         console.error("Error fetching influencers:", error);
//       }
//     };

//     fetchInfluencers();
//   }, [searchQuery, selectedCategories]);  // سيقوم بإعادة الجلب عند تغيير البحث أو الفئات المختارة

//   const handleCategoryToggle = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter(cat => cat !== category));
//     } else {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };

//   // Platform icon component
//   const PlatformIcon = ({ platform }) => {
//     switch (platform) {
//       case 'instagram':
//         return <Instagram className="h-5 w-5" />;
//       case 'youtube':
//         return <Youtube className="h-5 w-5" />;
//       default:
//         return <ExternalLink className="h-5 w-5" />;
//     }
//   };

//   // Influencer card component
//   const InfluencerCard = ({ influencer }) => {
//     const [showDetails, setShowDetails] = useState(false);
  
//     return (
//       <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//         <div className="p-4">
//           <div className="flex items-center">
//             <div className="h-16 w-16 rounded-full overflow-hidden bg-purple-200 flex-shrink-0 border-2 border-purple-300">
//               {influencer.profileImage ? (
//                 <img src={influencer.profileImage} alt={influencer.name} className="h-full w-full object-cover" />
//               ) : (
//                 <Camera className="h-full w-full p-4 text-purple-500" />
//               )}
//             </div>
//             <div className="ml-4 flex-grow">
//               <h3 className="font-bold text-gray-800">{influencer.name}</h3>
//               <p className="text-gray-500 text-sm">{influencer.username}</p>
//               <div className="flex items-center text-xs text-gray-500 mt-1">
//                 <MapPin className="h-3 w-3 mr-1" />
//                 <span>{influencer.location}</span>
//               </div>
//             </div>
//           </div>
  
//           {/* Social Media Links */}
//           <div className="mt-4 flex space-x-3">
//             {influencer.socialLinks && influencer.socialLinks.length > 0 ? (
//               influencer.socialLinks.map((social, index) => (
//                 <div key={index} className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
//                   <div className="text-purple-500 mr-1">
//                     <PlatformIcon platform={social.platform} />
//                   </div>
//                   <span className="text-sm font-medium text-purple-800">{social.followers}</span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm">No social links available</p>
//             )}
//           </div>
  
//           {/* Categories */}
//           <div className="mt-3 flex flex-wrap gap-2">
//             {influencer.contentCategories && influencer.contentCategories.length > 0 ? (
//               influencer.contentCategories.map((category, index) => (
//                 <span 
//                   key={index} 
//                   className="px-2 py-1 rounded-full text-xs font-medium text-purple-800 bg-purple-200"
//                 >
//                   {category}
//                 </span>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm">No categories available</p>
//             )}
//           </div>
  
//           {/* Toggle Details */}
//           {showDetails && (
//             <div className="mt-3 text-gray-600 text-sm border-t pt-3">
//               <p>{influencer.bio}</p>
//             </div>
//           )}
  
//           {/* Action buttons */}
//           <div className="mt-4 flex justify-between">
//             <button 
//               onClick={() => setShowDetails(!showDetails)} 
//               className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors"
//             >
//               {showDetails ? "Hide Details" : "View Details"}
//             </button>
//             <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center">
//               <Calendar className="h-4 w-4 mr-1" />
//               Book Now
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="font-sans bg-purple-50 min-h-screen p-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Influencers Directory</h1>
        
//         {/* Search and Filter */}
//         <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-grow">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
//                 <Search className="h-5 w-5" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Search for an influencer..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <button 
//               className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <Filter className="h-5 w-5 mr-2" />
//               <span>Filter</span>
//             </button>
//           </div>
          
//           {/* Categories Filter */}
//           {showFilters && (
//             <div className="mt-4 border-t pt-4">
//               <h3 className="font-medium text-gray-700 mb-2">Filter by category:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {allCategories.map((category, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleCategoryToggle(category)}
//                     className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                       selectedCategories.includes(category)
//                         ? 'bg-purple-500 text-white'
//                         : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Influencers Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {influencers.map(influencer => (
//             <InfluencerCard key={influencer.user.id} influencer={influencer} />
//           ))}
//         </div>
        
//         {/* Empty State */}
//         {influencers.length === 0 && (
//           <div className="text-center py-10">
//             <p className="text-gray-500 text-lg">No matching results found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InfluencersList;




import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Camera, Search, Filter, ExternalLink, Calendar, MapPin } from 'lucide-react';

const InfluencersList = () => {
  const [influencers, setInfluencers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique categories (this should now come from the backend too)
  const allCategories = ["Fashion", "Beauty", "Travel", "Tech", "Lifestyle", "Gaming", "Cooking", "Food", "Fitness"];

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        // إعداد معايير البحث والفلترة
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (selectedCategories.length > 0) {
          params.append("categories", selectedCategories.join(','));
        }

        // استدعاء API جلب المؤثرين
        const response = await fetch(`http://localhost:4000/api/influencer/get?${params.toString()}`);
        console.log(response);
        const data = await response.json();
        console.log(data);  // افحص البيانات هنا
        setInfluencers(data.influencers);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };

    fetchInfluencers();
  }, [searchQuery, selectedCategories]);  // سيقوم بإعادة الجلب عند تغيير البحث أو الفئات المختارة

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Platform icon component
  const PlatformIcon = ({ platform }) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  // Influencer card component
  const InfluencerCard = ({ influencer }) => {
    const [showDetails, setShowDetails] = useState(false);

    // تأكد من أن البيانات تأتي في هيكل مناسب
    const { user, influencerRegistration } = influencer;  // الحصول على بيانات المستخدم و بيانات التسجيل
    if (!user || !influencerRegistration) {
      return <p>Loading...</p>;  // في حال كانت البيانات غير موجودة
    }

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-purple-200 flex-shrink-0 border-2 border-purple-300">
              {influencerRegistration.profileImage ? (
                <img src={`http://localhost:4000/${influencerRegistration.profileImage}`}  alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <Camera className="h-full w-full p-4 text-purple-500" />
              )}
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.username}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-4 flex space-x-3">
            {influencerRegistration.socialLinks && influencerRegistration.socialLinks.length > 0 ? (
              influencerRegistration.socialLinks.map((social, index) => (
                <div key={index} className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                  <div className="text-purple-500 mr-1">
                    <PlatformIcon platform={social.platform} />
                  </div>
                  <span className="text-sm font-medium text-purple-800">{social.followers}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No social links available</p>
            )}
          </div>

          {/* Categories */}
          <div className="mt-3 flex flex-wrap gap-2">
            {influencerRegistration.targetContent && influencerRegistration.targetContent.split(',').map((category, index) => (
              <span key={index} className="px-2 py-1 rounded-full text-xs font-medium text-purple-800 bg-purple-200">
                {category}
              </span>
            ))}
          </div>

          {/* Toggle Details */}
          {showDetails && (
            <div className="mt-3 text-gray-600 text-sm border-t pt-3">
              <p>{influencerRegistration.previousProduct || 'No bio available'}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-4 flex justify-between">
            <button 
              onClick={() => setShowDetails(!showDetails)} 
              className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors"
            >
              {showDetails ? "Hide Details" : "View Details"}
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans bg-purple-50 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Influencers Directory</h1>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search for an influencer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              <span>Filter</span>
            </button>
          </div>
          
          {/* Categories Filter */}
          {showFilters && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-medium text-gray-700 mb-2">Filter by category:</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Influencers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <InfluencerCard key={influencer.user.id} influencer={influencer} />
          ))}
        </div>
        
        {/* Empty State */}
        {influencers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No matching results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencersList;
