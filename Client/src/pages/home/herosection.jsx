// // // // // // import { motion } from "framer-motion";


// // // // // // const HeroSection = () => {
// // // // // //   const stats = [
// // // // // //     { value: "250M+", label: "Creators on our database" },
// // // // // //     { value: "15K", label: "New influencers discovered daily" },
// // // // // //     { value: "80M+", label: "Content items tracked automatically" },
// // // // // //     { value: "300%", label: "Improved efficiency with AI" }
// // // // // // ];
// // // // // //   return (
// // // // // //     <>
  
// // // // // //     <div className="flex flex-wrap items-center justify-between px-10 py-20 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden min-h-[800px]">
// // // // // //       {/* Animated Background Effect */}
// // // // // //       <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-radial from-blue-300/10 to-transparent animate-pulse" />
      
// // // // // //       {/* Hero Text Section */}
// // // // // //       <motion.div 
// // // // // //         initial={{ opacity: 0, x: -50 }}
// // // // // //         animate={{ opacity: 1, x: 0 }}
// // // // // //         transition={{ duration: 1 }}
// // // // // //         className="max-w-[50%] flex-1 min-w-[300px] z-10"
// // // // // //       >
// // // // // //         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-500 bg-clip-text text-transparent mb-6">
// // // // // //           Find the Perfect Influencer for Your Brand
// // // // // //         </h1>
// // // // // //         <p className="text-lg text-gray-600 mb-6">
// // // // // //           Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
// // // // // //           Let AI match your brand with the ideal partner for impactful and successful partnerships.
// // // // // //         </p>
// // // // // //         <a 
// // // // // //           href="influncer.html" 
// // // // // //           className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl"
// // // // // //           style={{marginBottom:"20px"}}>
// // // // // //           Get Started
// // // // // //         </a>
// // // // // //       </motion.div>
      
// // // // // //       {/* Hero Image Section */}
// // // // // //       <motion.div 
// // // // // //         initial={{ opacity: 0, x: 50 }}
// // // // // //         animate={{ opacity: 1, x: 0 }}
// // // // // //         transition={{ duration: 1 }}
// // // // // //         className="max-w-[40%] flex-1 min-w-[300px] z-10"
// // // // // //       >
// // // // // //         <img 
// // // // // //           src="src/component/img/2025SOCMReport_HomepageTile.webp" 
// // // // // //           alt="Hero" 
// // // // // //           className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
// // // // // //         />
// // // // // //       </motion.div>
// // // // // //     </div>
// // // // // //     {/* state */}
// // // // // //     <section className="bg-[#001F54] text-white py-12">
// // // // // //             <div className="container mx-auto px-4">
// // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
// // // // // //                     {stats.map((stat, index) => (
// // // // // //                         <motion.div 
// // // // // //                             key={index} 
// // // // // //                             className="stats-item"
// // // // // //                             initial={{ opacity: 0, y: 50 }}
// // // // // //                             animate={{ opacity: 1, y: 0 }}
// // // // // //                             transition={{ duration: 0.5, delay: index * 0.2 }}
// // // // // //                         >
// // // // // //                             <h3 className="text-3xl font-bold">{stat.value}</h3>
// // // // // //                             <p className="text-gray-400">{stat.label}</p>
// // // // // //                         </motion.div>
// // // // // //                     ))}
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </section>




   
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default HeroSection;
// // // // // // import { motion } from "framer-motion";

// // // // // // const HeroSection = () => {
// // // // // //   const stats = [
// // // // // //     { value: "250M+", label: "Creators on our database" },
// // // // // //     { value: "15K", label: "New influencers discovered daily" },
// // // // // //     { value: "80M+", label: "Content items tracked automatically" },
// // // // // //     { value: "300%", label: "Improved efficiency with AI" }
// // // // // //   ];

// // // // // //   return (
// // // // // //     <>
// // // // // //       <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-10 py-10 md:py-20 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden min-h-[500px] md:min-h-[800px]">
// // // // // //         {/* Animated Background Effect */}
// // // // // //         <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-radial from-blue-300/10 to-transparent animate-pulse" />
        
// // // // // //         {/* Hero Text Section */}
// // // // // //         <motion.div
// // // // // //           initial={{ opacity: 0, x: -50 }}
// // // // // //           animate={{ opacity: 1, x: 0 }}
// // // // // //           transition={{ duration: 1 }}
// // // // // //           className="w-full md:max-w-[50%] flex-1 md:min-w-[300px] z-10 mb-8 md:mb-0"
// // // // // //         >
// // // // // //           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-500 bg-clip-text text-transparent mb-4 md:mb-6">
// // // // // //             Find the Perfect Influencer for Your Brand
// // // // // //           </h1>
// // // // // //           <p className="text-base md:text-lg text-gray-600 mb-6">
// // // // // //             Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
// // // // // //             Let AI match your brand with the ideal partner for impactful and successful partnerships.
// // // // // //           </p>
// // // // // //           <a
// // // // // //             href="influncer.html"
// // // // // //             className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl mb-5"
// // // // // //           >
// // // // // //             Get Started
// // // // // //           </a>
// // // // // //         </motion.div>
        
// // // // // //         {/* Hero Image Section */}
// // // // // //         <motion.div
// // // // // //           initial={{ opacity: 0, x: 50 }}
// // // // // //           animate={{ opacity: 1, x: 0 }}
// // // // // //           transition={{ duration: 1 }}
// // // // // //           className="w-full md:max-w-[40%] flex-1 min-w-[300px] z-10"
// // // // // //         >
// // // // // //           <img
// // // // // //             src="src/component/img/2025SOCMReport_HomepageTile.webp"
// // // // // //             alt="Hero"
// // // // // //             className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
// // // // // //           />
// // // // // //         </motion.div>
// // // // // //       </div>

// // // // // //       {/* Stats Section */}
// // // // // //       <section className="bg-[#001F54] text-white py-8 md:py-12">
// // // // // //         <div className="container mx-auto px-4">
// // // // // //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
// // // // // //             {stats.map((stat, index) => (
// // // // // //               <motion.div
// // // // // //                 key={index}
// // // // // //                 className="stats-item py-4"
// // // // // //                 initial={{ opacity: 0, y: 50 }}
// // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // //                 transition={{ duration: 0.5, delay: index * 0.2 }}
// // // // // //               >
// // // // // //                 <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
// // // // // //                 <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
// // // // // //               </motion.div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </section>
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default HeroSection;

// // // // // import { motion } from "framer-motion";

// // // // // const HeroSection = () => {
// // // // //   const stats = [
// // // // //     { value: "250M+", label: "Creators on our database" },
// // // // //     { value: "15K", label: "New influencers discovered daily" },
// // // // //     { value: "80M+", label: "Content items tracked automatically" },
// // // // //     { value: "300%", label: "Improved efficiency with AI" }
// // // // //   ];

// // // // //   return (
// // // // //     <>
// // // // //       <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-10 py-10 md:py-20 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden min-h-[500px] md:min-h-[800px]">
// // // // //         {/* Animated Background Effect */}
// // // // //         <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-radial from-red-300/10 to-transparent animate-pulse" />
        
// // // // //         {/* Hero Text Section */}
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, x: -50 }}
// // // // //           animate={{ opacity: 1, x: 0 }}
// // // // //           transition={{ duration: 1 }}
// // // // //           className="w-full md:max-w-[50%] flex-1 md:min-w-[300px] z-10 mb-8 md:mb-0"
// // // // //         >
// // // // //           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-[#EA0054] bg-clip-text text-transparent mb-4 md:mb-6">
// // // // //             Find the Perfect Influencer for Your Brand
// // // // //           </h1>
// // // // //           <p className="text-base md:text-lg text-gray-600 mb-6">
// // // // //             Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
// // // // //             Let AI match your brand with the ideal partner for impactful and successful partnerships.
// // // // //           </p>
// // // // //           <a
// // // // //             href="influncer.html"
// // // // //             className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl mb-5"
// // // // //             style={{ backgroundColor: "#EA0054" }}
// // // // //           >
// // // // //             Get Started
// // // // //           </a>
// // // // //         </motion.div>
        
// // // // //         {/* Hero Image Section */}
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, x: 50 }}
// // // // //           animate={{ opacity: 1, x: 0 }}
// // // // //           transition={{ duration: 1 }}
// // // // //           className="w-full md:max-w-[40%] flex-1 min-w-[300px] z-10"
// // // // //         >
// // // // //           <img
// // // // //             src="src/component/img/2025SOCMReport_HomepageTile.webp"
// // // // //             alt="Hero"
// // // // //             className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
// // // // //           />
// // // // //         </motion.div>
// // // // //       </div>

// // // // //       {/* Stats Section */}
     
// // // // //       <section className="text-white py-8 md:py-12 bg-gradient-to-r from-gray-800 to-[#EA0054]">
// // // // //   <div className="container mx-auto px-4">
// // // // //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
// // // // //       {stats.map((stat, index) => (
// // // // //         <motion.div
// // // // //           key={index}
// // // // //           className="stats-item py-4"
// // // // //           initial={{ opacity: 0, y: 50 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           transition={{ duration: 0.5, delay: index * 0.2 }}
// // // // //         >
// // // // //           <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
// // // // //           <p className="text-gray-200 text-sm md:text-base">{stat.label}</p>
// // // // //         </motion.div>
// // // // //       ))}
// // // // //     </div>
// // // // //   </div>
// // // // // </section>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default HeroSection;
// // // // import { motion } from "framer-motion";

// // // // const HeroSection = () => {
// // // //   const stats = [
// // // //     { value: "250M+", label: "Creators on our database" },
// // // //     { value: "15K", label: "New influencers discovered daily" },
// // // //     { value: "80M+", label: "Content items tracked automatically" },
// // // //     { value: "300%", label: "Improved efficiency with AI" }
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-10 py-10 md:py-20 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden min-h-[500px] md:min-h-[800px]">
// // // //         {/* Animated Background Effect */}
// // // //         <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-radial from-red-300/10 to-transparent animate-pulse" />
        
// // // //         {/* Hero Text Section */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, x: -50 }}
// // // //           animate={{ opacity: 1, x: 0 }}
// // // //           transition={{ duration: 1 }}
// // // //           className="w-full md:max-w-[50%] flex-1 md:min-w-[300px] z-10 mb-8 md:mb-0"
// // // //         >
// // // //           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-[#EA0054] bg-clip-text text-transparent mb-4 md:mb-6">
// // // //             Find the Perfect Influencer for Your Brand
// // // //           </h1>
// // // //           <p className="text-base md:text-lg text-gray-600 mb-6">
// // // //             Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
// // // //             Let AI match your brand with the ideal partner for impactful and successful partnerships.
// // // //           </p>
// // // //           <a
// // // //             href="influncer.html"
// // // //             className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl mb-5"
// // // //             style={{ backgroundColor: "#EA0054" }}
// // // //           >
// // // //             Get Started
// // // //           </a>
// // // //         </motion.div>
        
// // // //         {/* Hero Image Section with Floating Icons */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, x: 50 }}
// // // //           animate={{ opacity: 1, x: 0 }}
// // // //           transition={{ duration: 1 }}
// // // //           className="relative w-full md:max-w-[40%] flex-1 min-w-[300px] z-10"
// // // //         >
// // // //           <img
// // // //             src="/src/assets/image 1.png"
// // // //             alt="Hero"
// // // //             className="w-full h-auto rounded-2xl shadow-lg"
// // // //           />
          
// // // //           {/* Floating Instagram Icon */}
// // // //           <motion.img
// // // //             src="/src/assets/image 2.png"
// // // //             alt="Instagram Icon"
// // // //             className="absolute top-[-20px] right-[-20px] w-16 sm:w-20"
// // // //             animate={{ y: [0, -10, 0] }}
// // // //             transition={{ repeat: Infinity, duration: 2 }}
// // // //           />
          
// // // //           {/* Chat Bubbles */}
// // // //           <motion.img
// // // //             src="/src/assets/Group 1.png"
// // // //             alt="Chat Message"
// // // //             className="absolute top-[30%] right-[-30px] w-48"
// // // //             initial={{ opacity: 0, scale: 0.8 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             transition={{ delay: 0.5, duration: 0.5 }}
// // // //           />
          
// // // //           <motion.img
// // // //             src="/src/assets/Group 2.png"
// // // //             alt="Chat Message"
// // // //             className="absolute bottom-[20%] right-[10px] w-40"
// // // //             initial={{ opacity: 0, scale: 0.8 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             transition={{ delay: 0.7, duration: 0.5 }}
// // // //           />
          
// // // //           <motion.img
// // // //             src="/src/assets/Group 3.png"
// // // //             alt="Chat Message"
// // // //             className="absolute bottom-[5%] right-[50px] w-32"
// // // //             initial={{ opacity: 0, scale: 0.8 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             transition={{ delay: 0.9, duration: 0.5 }}
// // // //           />
// // // //         </motion.div>
// // // //       </div>

// // // //       {/* Stats Section */}
// // // //       <section className="text-white py-8 md:py-12 bg-gradient-to-r from-gray-800 to-[#EA0054]">
// // // //         <div className="container mx-auto px-4">
// // // //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
// // // //             {stats.map((stat, index) => (
// // // //               <motion.div
// // // //                 key={index}
// // // //                 className="stats-item py-4"
// // // //                 initial={{ opacity: 0, y: 50 }}
// // // //                 animate={{ opacity: 1, y: 0 }}
// // // //                 transition={{ duration: 0.5, delay: index * 0.2 }}
// // // //               >
// // // //                 <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
// // // //                 <p className="text-gray-200 text-sm md:text-base">{stat.label}</p>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </section>
// // // //     </>
// // // //   );
// // // // };

// // // // export default HeroSection;
// // // import { motion } from "framer-motion";

// // // const HeroSection = () => {
// // //   const stats = [
// // //     { value: "250M+", label: "Creators on our database" },
// // //     { value: "15K", label: "New influencers discovered daily" },
// // //     { value: "80M+", label: "Content items tracked automatically" },
// // //     { value: "300%", label: "Improved efficiency with AI" }
// // //   ];

// // //   return (
// // //     <>
// // //       <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-10 py-10 md:py-20 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden min-h-[500px] md:min-h-[800px]">
// // //         {/* Hero Text Section */}
// // //         <motion.div
// // //           initial={{ opacity: 0, x: -50 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           transition={{ duration: 1 }}
// // //           className="w-full md:w-1/2 text-center md:text-left z-10"
// // //         >
// // //           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-[#EA0054] bg-clip-text text-transparent mb-4 md:mb-6">
// // //             Find the Perfect Influencer for Your Brand
// // //           </h1>
// // //           <p className="text-base md:text-lg text-gray-600 mb-6">
// // //             Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
// // //             Let AI match your brand with the ideal partner for impactful and successful partnerships.
// // //           </p>
// // //           <a
// // //             href="influncer.html"
// // //             className="inline-block px-6 py-3 text-lg font-medium text-white rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl"
// // //             style={{ backgroundColor: "#EA0054" }}
// // //           >
// // //             Get Started
// // //           </a>
// // //         </motion.div>
        
// // //         {/* Hero Image Section with Floating Icons */}
// // //         <motion.div
// // //           initial={{ opacity: 0, x: 50 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           transition={{ duration: 1 }}
// // //           className="relative w-full md:w-1/2 flex justify-center z-10"
// // //         >
// // //           <div className="relative w-96">
// // //             <img
// // //               src="/src/assets/image 1.png"
// // //               alt="Hero"
// // //               className="w-full h-auto rounded-2xl shadow-lg"
// // //             />
// // //             <motion.img
// // //               src="/src/assets/image 2.png"
// // //               alt="Instagram Icon"
// // //               className="absolute top-[-20px] right-[-20px] w-16 sm:w-20"
// // //               animate={{ y: [0, -10, 0] }}
// // //               transition={{ repeat: Infinity, duration: 2 }}
// // //             />
// // //             <motion.img
// // //               src="/src/assets/Group 1.png"
// // //               alt="Chat Message"
// // //               className="absolute top-[20%] right-[-40px] w-48"
// // //               initial={{ opacity: 0, scale: 0.8 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ delay: 0.5, duration: 0.5 }}
// // //             />
// // //             <motion.img
// // //               src="/src/assets/Group 2.png"
// // //               alt="Chat Message"
// // //               className="absolute bottom-[30%] right-[10px] w-40"
// // //               initial={{ opacity: 0, scale: 0.8 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ delay: 0.7, duration: 0.5 }}
// // //             />
// // //             <motion.img
// // //               src="/src/assets/Group 3.png"
// // //               alt="Chat Message"
// // //               className="absolute bottom-[10%] right-[50px] w-32"
// // //               initial={{ opacity: 0, scale: 0.8 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ delay: 0.9, duration: 0.5 }}
// // //             />
// // //           </div>
// // //         </motion.div>
// // //       </div>

// // //       {/* Stats Section */}
// // //       <section className="text-white py-8 md:py-12 bg-gradient-to-r from-gray-800 to-[#EA0054]">
// // //         <div className="container mx-auto px-4">
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
// // //             {stats.map((stat, index) => (
// // //               <motion.div
// // //                 key={index}
// // //                 className="stats-item py-4"
// // //                 initial={{ opacity: 0, y: 50 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ duration: 0.5, delay: index * 0.2 }}
// // //               >
// // //                 <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
// // //                 <p className="text-gray-200 text-sm md:text-base">{stat.label}</p>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </>
// // //   );
// // // };

// // // export default HeroSection;
// // import { motion } from "framer-motion";

// // const HeroSection = () => {
// //   const stats = [
// //     { value: "250M+", label: "Creators on our database" },
// //     { value: "15K", label: "New influencers discovered daily" },
// //     { value: "80M+", label: "Content items tracked automatically" },
// //     { value: "300%", label: "Improved efficiency with AI" }
// //   ];

// //   return (
// //     <>
// //       <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-10 py-10 md:py-20 bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden min-h-[500px] md:min-h-[800px]">
// //         {/* Hero Text Section */}
// //         <motion.div
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 1 }}
// //           className="w-full md:w-1/2 text-center md:text-left z-10"
// //         >
// //           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-4 md:mb-6">
// //             Find the Perfect Influencer for Your Brand
// //           </h1>
// //           <p className="text-base md:text-lg text-gray-700 mb-6">
// //             Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
// //             Let AI match your brand with the ideal partner for impactful and successful partnerships.
// //           </p>
// //           <a
// //             href="influncer.html"
// //             className="inline-block px-6 py-3 text-lg font-medium text-white rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110"
// //           >
// //             Get Started
// //           </a>
// //         </motion.div>
        
// //         {/* Hero Image Section with Floating Icons */}
// //         <motion.div
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 1 }}
// //           className="relative w-full md:w-1/2 flex justify-center z-10"
// //         >
// //           <div className="relative w-96">
// //             <img
// //               src="/src/assets/image 1.png"
// //               alt="Hero"
// //               className="w-full h-auto rounded-2xl shadow-lg"
// //             />
// //             <motion.img
// //               src="/src/assets/image 2.png"
// //               alt="Instagram Icon"
// //               className="absolute top-[-20px] right-[-20px] w-16 sm:w-20 opacity-90"
// //               animate={{ y: [0, -10, 0] }}
// //               transition={{ repeat: Infinity, duration: 2 }}
// //             />
// //             <motion.img
// //               src="/src/assets/Group 1.png"
// //               alt="Chat Message"
// //               className="absolute top-[20%] right-[-40px] w-48 opacity-95"
// //               initial={{ opacity: 0, scale: 0.8 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.5, duration: 0.5 }}
// //             />
// //             <motion.img
// //               src="/src/assets/Group 2.png"
// //               alt="Chat Message"
// //               className="absolute bottom-[30%] right-[10px] w-40 opacity-95"
// //               initial={{ opacity: 0, scale: 0.8 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.7, duration: 0.5 }}
// //             />
// //             <motion.img
// //               src="/src/assets/Group 3.png"
// //               alt="Chat Message"
// //               className="absolute bottom-[10%] right-[50px] w-32 opacity-95"
// //               initial={{ opacity: 0, scale: 0.8 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.9, duration: 0.5 }}
// //             />
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Stats Section */}
// //       <section className="text-white py-8 md:py-12 bg-gradient-to-r from-[#6F42C1] to-[#D63384]">
// //         <div className="container mx-auto px-4">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
// //             {stats.map((stat, index) => (
// //               <motion.div
// //                 key={index}
// //                 className="stats-item py-4"
// //                 initial={{ opacity: 0, y: 50 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.2 }}
// //               >
// //                 <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
// //                 <p className="text-gray-200 text-sm md:text-base">{stat.label}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default HeroSection;
// import { motion } from "framer-motion";

// const HeroSection = () => {
//   const stats = [
//     { value: "250M+", label: "Creators on our database" },
//     { value: "15K", label: "New influencers discovered daily" },
//     { value: "80M+", label: "Content items tracked automatically" },
//     { value: "300%", label: "Improved efficiency with AI" }
//   ];

//   return (
//     <>
//       <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-10 py-10 md:py-20 bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden min-h-[500px] md:min-h-[800px]">
//         {/* Hero Text Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="w-full md:w-[45%] text-center md:text-left z-10"
//         >
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-4 md:mb-6">
//             Find the Perfect Influencer for Your Brand
//           </h1>
//           <p className="text-base md:text-lg text-gray-700 mb-6">
//             Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
//             Let AI match your brand with the ideal partner for impactful and successful partnerships.
//           </p>
//           <a
//             href="influncer.html"
//             className="inline-block px-6 py-3 text-lg font-medium text-white rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110"
//           >
//             Get Started
//           </a>
//         </motion.div>
        
//         {/* Hero Image Section with Floating Icons (Hidden on Mobile) */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="relative w-full md:w-[45%] flex justify-center z-10 hidden md:flex"
//         >
//           <div className="relative w-96">
//             <img
//               src="/src/assets/image 1.png"
//               alt="Hero"
//               className="w-full h-auto rounded-2xl shadow-lg"
//             />
//             <motion.img
//               src="/src/assets/image 2.png"
//               alt="Instagram Icon"
//               className="absolute top-[-20px] right-[-20px] w-16 sm:w-20 opacity-90"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//             />
//             <motion.img
//               src="/src/assets/Group 1.png"
//               alt="Chat Message"
//               className="absolute top-[20%] right-[-40px] w-48 opacity-95"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             />
//             <motion.img
//               src="/src/assets/Group 2.png"
//               alt="Chat Message"
//               className="absolute bottom-[30%] right-[10px] w-40 opacity-95"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//             />
//             <motion.img
//               src="/src/assets/Group 3.png"
//               alt="Chat Message"
//               className="absolute bottom-[10%] right-[50px] w-32 opacity-95"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.9, duration: 0.5 }}
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* Stats Section */}
//       <section className="text-white py-8 md:py-12 bg-gradient-to-r from-[#6F42C1] to-[#D63384]">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="stats-item py-4"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//               >
//                 <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
//                 <p className="text-gray-200 text-sm md:text-base">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HeroSection;
import { motion } from "framer-motion";

const HeroSection = () => {
  const stats = [
    { value: "250M+", label: "Creators on our database" },
    { value: "15K", label: "New influencers discovered daily" },
    { value: "80M+", label: "Content items tracked automatically" },
    { value: "300%", label: "Improved efficiency with AI" }
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-10 py-10 md:py-12 bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden min-h-[500px] md:min-h-[700px]">
        {/* Hero Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-[45%] text-center md:text-left z-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-4 md:mb-6">
            Find the Perfect Influencer for Your Brand
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Our platform connects companies with top influencers to ensure the success of your marketing campaigns.
            Let AI match your brand with the ideal partner for impactful and successful partnerships.
          </p>
          <a
            href="influncer.html"
            className="inline-block px-6 py-3 text-lg font-medium text-white rounded-full shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-xl bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110"
          >
            Get Started
          </a>
        </motion.div>
        
        {/* Hero Image Section with Floating Icons (Hidden on Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-[45%] flex justify-center z-10 hidden md:flex"
        >
          <div className="relative w-125 ">
            <img
              src="/src/assets/image 1.png"
              alt="Hero"
              className="w-full h-[600px] rounded-2xl shadow-lg"

              
            />
            <motion.img
              src="/src/assets/image 2.png"
              alt="Instagram Icon"
              className="absolute top-[-20px] right-[-20px] w-16 sm:w-20 opacity-90"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.img
              src="/src/assets/Group 1.png"
              alt="Chat Message"
              className="absolute top-[20%] right-[-40px] w-48 opacity-95"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.img
              src="/src/assets/Group 3.png"
              alt="Chat Message"
              className="absolute bottom-[30%] right-[10px] w-40 opacity-95"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            <motion.img
              src="/src/assets/Group 2.png"
              alt="Chat Message"
              className="absolute bottom-[10%] right-[50px] w-32 opacity-95"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="text-white py-8 md:py-12 bg-gradient-to-r from-[#6F42C1] to-[#D63384]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stats-item py-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-200 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
