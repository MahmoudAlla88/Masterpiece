// import { motion } from "framer-motion";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";

// const FeaturedInfluencers = () => {
//   const influencers = [
//     { id: 1, name: "Leen Doe", expertise: "Fashion", followers: "1M+", img: "src/component/img/pexels-photo-6953586.webp" },
//     { id: 2, name: "Deep Smith", expertise: "Beauty", followers: "500K+", img: "src/component/img/pexels-photo-19172451.webp" },
//     { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "src/component/img/pexels-photo-19172451.webp" },
//     { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "src/component/img/pexels-photo-6635041.webp" },
//   ];

//   return (
//     <section className=" py-16 px-6 bg-white text-center">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">Featured Influencers</h2>
//       {/* <Swiper spaceBetween={20} slidesPerView={1} breakpoints={{
//         640: { slidesPerView: 2 },
//         1024: { slidesPerView: 3 }
//       }}> */}
//       <div className="flex flex-wrap justify-center gap-6">
//         {influencers.map((influencer) => (
//           <div key={influencer.id}>
//             <motion.div
//               className="bg-gray-100 p-6 rounded-xl shadow-lg text-center"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: influencer.id * 0.2 }}
//             >
//               <img
//                 src={influencer.img}
//                 alt={influencer.name}
//                 className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
//               />
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{influencer.name}</h3>
//               <p className="text-gray-600 text-sm"><i className="fas fa-tag mr-2 text-blue-500"></i>{influencer.expertise}</p>
//               <p className="text-gray-600 text-sm"><i className="fas fa-users mr-2 text-blue-500"></i>{influencer.followers}</p>
//             </motion.div>
//           </div>
//         ))}
//     </div>
//     </section>
//   );
// };

// export default FeaturedInfluencers;

// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import { FaTag, FaUsers, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const MostPopularInfluencers = () => {
//   const influencers = [
//     { id: 1, name: "Leen Doe", expertise: "Fashion", followers: "1M+", img: "/src/assets/img/pexels-photo-6635041.webp", rating: 4.8 },
//     { id: 2, name: "Deep Smith", expertise: "Beauty", followers: "500K+", img: "src/component/img/pexels-photo-19172451.webp", rating: 4.9 },
//     { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "src/component/img/pexels-photo-19172451.webp", rating: 4.7 },
//     { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "src/component/img/pexels-photo-6635041.webp", rating: 4.9 },
//     { id: 5, name: "Alex Wong", expertise: "Tech", followers: "1.2M+", img: "src/component/img/pexels-photo-6953586.webp", rating: 4.6 },
//     { id: 6, name: "Emma Davis", expertise: "Lifestyle", followers: "950K+", img: "src/component/img/pexels-photo-19172451.webp", rating: 4.8 },
//     { id: 7, name: "James Wilson", expertise: "Gaming", followers: "3M+", img: "src/component/img/pexels-photo-6635041.webp", rating: 4.7 },
//     { id: 8, name: "Olivia Chen", expertise: "Food", followers: "1.5M+", img: "src/component/img/pexels-photo-6953586.webp", rating: 4.9 },
//   ];
  
//   const carouselRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cardsPerView, setCardsPerView] = useState(4);
  
//   // Determine cards per view based on screen width
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setCardsPerView(1);
//       } else if (window.innerWidth < 1024) {
//         setCardsPerView(2);
//       } else if (window.innerWidth < 1280) {
//         setCardsPerView(3);
//       } else {
//         setCardsPerView(4);
//       }
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const totalSlides = Math.ceil(influencers.length / cardsPerView);
  
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex + 1 >= totalSlides ? 0 : prevIndex + 1
//     );
//   };
  
//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex - 1 < 0 ? totalSlides - 1 : prevIndex - 1
//     );
//   };
  
//   return (
//     <section className="py-16 px-6 bg-white text-center relative">
//       <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-[#EA0054] bg-clip-text text-transparent mb-10">
//       Most Popular Influencers
//       </h2>
      
//       <div className="relative overflow-hidden px-4 py-2">
//         {/* Navigation Buttons */}
//         <button 
//           onClick={prevSlide}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-100"
//           style={{ color: "#EA0054" }}
//         >
//           <FaChevronLeft />
//         </button>
        
//         <button 
//           onClick={nextSlide}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-100"
//           style={{ color: "#EA0054" }}
//         >
//           <FaChevronRight />
//         </button>
        
//         {/* Carousel Container */}
//         <div 
//           ref={carouselRef}
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//             <div key={slideIndex} className="min-w-full flex flex-wrap justify-center gap-6">
//               {influencers
//                 .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
//                 .map((influencer) => (
//                   <motion.div 
//                     key={influencer.id}
//                     className={`bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl`}
//                     style={{ width: `calc(${100 / cardsPerView}% - 1.5rem)` }}
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     whileHover={{ y: -5 }}
//                   >
//                     {/* Image with colored top bar */}
//                     <div className="relative">
//                       <div className="h-2 w-full" style={{ backgroundColor: "#EA0054" }}></div>
//                       <div className="h-48 overflow-hidden">
//                         <img
//                           src={influencer.img}
//                           alt={influencer.name}
//                           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                         />
//                       </div>
//                       <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
//                       <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
//                         <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
//                           <img
//                             src={influencer.img}
//                             alt={influencer.name}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Content */}
//                     <div className="pt-16 pb-6 px-6">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-1">{influencer.name}</h3>
                      
//                       {/* Rating */}
//                       <div className="flex justify-center items-center mb-3">
//                         <span className="text-sm text-gray-600 mr-2">{influencer.rating}</span>
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar 
//                               key={i} 
//                               className="text-sm" 
//                               style={{ color: i < Math.floor(influencer.rating) ? "#EA0054" : "gray" }}
//                             />
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between mt-4">
//                         <div className="flex items-center">
//                           <FaTag className="mr-2" style={{ color: "#EA0054" }} />
//                           <span className="text-gray-700">{influencer.expertise}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <FaUsers className="mr-2" style={{ color: "#EA0054" }} />
//                           <span className="text-gray-700">{influencer.followers}</span>
//                         </div>
//                       </div>
                      
//                       <motion.button
//                         className="mt-5 w-full py-2 rounded-lg text-white text-sm font-medium"
//                         style={{ backgroundColor: "#EA0054" }}
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         View Profile
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 ))}
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Slide Indicators */}
//       <div className="flex justify-center mt-8 gap-2">
//         {Array.from({ length: totalSlides }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               currentIndex === index ? "w-6 bg-[#EA0054]" : "bg-gray-300"
//             }`}
//           ></button>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MostPopularInfluencers;
// import { motion } from "framer-motion";
// import { FaTag, FaUsers } from "react-icons/fa";

// const MostPopularInfluencers = () => {
//   const influencers = [
//     { id: 1, name: "Leen Doe", expertise: "Fashion", followers: "1M+", img: "/src/assets/img/pexels-photo-6635041.webp" },
//     { id: 2, name: "Deep Smith", expertise: "Beauty", followers: "500K+", img: "src/assets/img/pexels-photo-19172451.webp" },
//     { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "src/assets/img/pexels-photo-19172451.webp" },
//     { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "src/assets/img/pexels-photo-6635041.webp" }
//   ];

//   return (
//     <section className="py-16 px-6 bg-white text-center">
//       <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-[#EA0054] bg-clip-text text-transparent mb-10">
//         Most Popular Influencers
//       </h2>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {influencers.map((influencer) => (
//           <motion.div 
//             key={influencer.id}
//             className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             whileHover={{ y: -5 }}
//           >
//             <div className="h-64 overflow-hidden">
//               <img
//                 src={influencer.img}
//                 alt={influencer.name}
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//               />
//             </div>
            
//             <div className="p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{influencer.name}</h3>
//               <div className="flex justify-between mt-2">
//                 <div className="flex items-center">
//                   <FaTag className="mr-2 text-[#EA0054]" />
//                   <span className="text-gray-700 text-sm">{influencer.expertise}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaUsers className="mr-2 text-[#EA0054]" />
//                   <span className="text-gray-700 text-sm">{influencer.followers}</span>
//                 </div>
//               </div>
              
//               <motion.button
//                 className="mt-5 w-full py-2 rounded-lg text-white text-sm font-medium bg-[#EA0054] hover:bg-[#c20044] transition"
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 View Profile
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MostPopularInfluencers;
// import { motion } from "framer-motion";
// import { FaTag, FaUsers } from "react-icons/fa";

// const MostPopularInfluencers = () => {
//   const influencers = [
//     { id: 1, name: "Leen Doe", expertise: "Fashion", followers: "1M+", img: "src/component/img/pexels-photo-6953586.webp" },
//     { id: 2, name: "Deep Smith", expertise: "Beauty", followers: "500K+", img: "src/component/img/pexels-photo-19172451.webp" },
//     { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "src/component/img/pexels-photo-19172451.webp" },
//     { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "src/component/img/pexels-photo-6635041.webp" }
//   ];

//   return (
//     <section className="py-16 px-6 bg-white text-center">
//       <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-[#EA0054] bg-clip-text text-transparent mb-10">
//         Most Popular Influencers
//       </h2>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {influencers.map((influencer) => (
//           <motion.div 
//             key={influencer.id}
//             className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             whileHover={{ y: -5 }}
//           >
//             <div className="h-64 overflow-hidden">
//               <img
//                 src={influencer.img}
//                 alt={influencer.name}
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//               />
//             </div>
            
//             <div className="p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{influencer.name}</h3>
//               <div className="flex justify-between mt-2">
//                 <div className="flex items-center">
//                   <FaTag className="mr-2 text-[#EA0054]" />
//                   <span className="text-gray-700 text-sm">{influencer.expertise}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaUsers className="mr-2 text-[#EA0054]" />
//                   <span className="text-gray-700 text-sm">{influencer.followers}</span>
//                 </div>
//               </div>
              
//               <motion.button
//                 className="mt-5 w-full py-2 rounded-lg text-white text-sm font-medium bg-[#EA0054] hover:bg-[#c20044] transition"
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 View Profile
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MostPopularInfluencers;


// import { motion } from "framer-motion";
// import { useState } from "react";
// import { FaTag, FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const MostPopularInfluencers = () => {
//   const influencers = [
//     { id: 1, name: "Leen Doe", expertise: "Fashion", followers: "1M+", img: "src/assets/img/pexels-photo-6953586.webp" },
//     { id: 2, name: "Deep Smith", expertise: "Beauty", followers: "500K+", img: "src/assets/img/pexels-photo-19172451.webp" },
//     { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "src/assets/img/pexels-photo-19172451.webp" },
//     { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "src/assets/img/pexels-photo-6635041.webp" },
//     { id: 5, name: "Alex Wong", expertise: "Tech", followers: "1.2M+", img: "src/assets/img/pexels-photo-6953586.webp" },
//     { id: 6, name: "Emma Davis", expertise: "Lifestyle", followers: "950K+", img: "src/assets/img/pexels-photo-19172451.webp" }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const cardsPerView = 4;
//   const totalSlides = Math.ceil(influencers.length / cardsPerView);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1 >= totalSlides ? 0 : prevIndex + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? totalSlides - 1 : prevIndex - 1));
//   };

//   return (
//     <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center relative">
//       <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10">
//         Most Popular Influencers
//       </h2>
//       <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
//         Discover the tools that make influencer marketing simple and effective.
//       </p>
      
//       <div className="relative overflow-hidden px-4 py-2">
//         {/* Navigation Buttons */}
//         <button 
//           onClick={prevSlide}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-100"
//           style={{ color: "#D63384" }}
//         >
//           <FaChevronLeft />
//         </button>
        
//         <button 
//           onClick={nextSlide}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-100"
//           style={{ color: "#D63384" }}
//         >
//           <FaChevronRight />
//         </button>
        
//         {/* Carousel Container */}
//         <div 
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//             <div key={slideIndex} className="min-w-full flex flex-wrap justify-center gap-6">
//               {influencers.slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView).map((influencer) => (
//                 <motion.div 
//                   key={influencer.id}
//                   className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <div className="h-64 overflow-hidden">
//                     <img
//                       src={influencer.img}
//                       alt={influencer.name}
//                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                     />
//                   </div>
                  
//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{influencer.name}</h3>
//                     <div className="flex justify-between mt-2">
//                       <div className="flex items-center">
//                         <FaTag className="mr-2 text-[#D63384]" />
//                         <span className="text-gray-700 text-sm">{influencer.expertise}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <FaUsers className="mr-2 text-[#D63384]" />
//                         <span className="text-gray-700 text-sm">{influencer.followers}</span>
//                       </div>
//                     </div>
                    
//                     <motion.button
//                       className="mt-5 w-full py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110 transition"
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       View Profile
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MostPopularInfluencers;


import { motion } from "framer-motion";
import { FaTag, FaUsers } from "react-icons/fa";

const MostPopularInfluencers = () => {
  const influencers = [
    { id: 1, name: "Leen Doe", expertise: "Fashion", followers: "1M+", img: "src/assets/img/pexels-photo-6953586.webp" },
    { id: 2, name: "Deep Smith", expertise: "Beauty", followers: "500K+", img: "src/assets/img/pexels-photo-19172451.webp" },
    { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "src/assets/img/pexels-photo-19172451.webp" },
    { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "src/assets/img/pexels-photo-6635041.webp" }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10">
        Most Popular Influencers
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Discover the tools that make influencer marketing simple and effective.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {influencers.map((influencer) => (
          <motion.div 
            key={influencer.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-64 overflow-hidden">
              <img
                src={influencer.img}
                alt={influencer.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{influencer.name}</h3>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <FaTag className="mr-2 text-[#D63384]" />
                  <span className="text-gray-700 text-sm">{influencer.expertise}</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-2 text-[#D63384]" />
                  <span className="text-gray-700 text-sm">{influencer.followers}</span>
                </div>
              </div>
              
              <motion.button
                className="mt-5 w-full py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110 transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View Profile
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MostPopularInfluencers;