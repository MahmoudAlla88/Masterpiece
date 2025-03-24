// // import React, { useState, useEffect } from 'react';
// // import { Menu, X, ChevronDown, Check, MapPin, Phone, Mail } from 'lucide-react';

// // const AboutUs = () => {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
// //   useEffect(() => {
// //     // AOS initialization similar to the original
// //     const script = document.createElement('script');
// //     script.src = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js";
// //     script.async = true;
// //     document.body.appendChild(script);
    
// //     script.onload = () => {
// //       window.AOS.init({
// //         duration: 1000,
// //         once: true,
// //         offset: 100
// //       });
// //     };
    
// //     return () => {
// //       document.body.removeChild(script);
// //     };
// //   }, []);
  
// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       {/* Navigation */}
// //       <nav className="bg-white shadow w-full">
// //         <div className="mx-auto px-4">
// //           <div className="flex justify-between items-center h-16">
// //             {/* Logo */}
// //             <a href="#" className="flex-shrink-0">
// //               <svg className="w-48 h-12" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
// //                 {/* Gradient definitions */}
// //                 <defs>
// //                   <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
// //                     <stop offset="0%" style={{ stopColor: '#007bff', stopOpacity: 1 }} />
// //                     <stop offset="100%" style={{ stopColor: '#00a6ff', stopOpacity: 1 }} />
// //                   </linearGradient>
// //                   <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //                     <stop offset="0%" style={{ stopColor: '#2c3e50', stopOpacity: 1 }} />
// //                     <stop offset="100%" style={{ stopColor: '#3498db', stopOpacity: 1 }} />
// //                   </linearGradient>
// //                 </defs>
                
// //                 {/* Bridge icon */}
// //                 <path d="M30 35 C30 20, 50 20, 50 35" stroke="url(#logoGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
// //                 <path d="M30 35 L30 25" stroke="url(#logoGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
// //                 <path d="M50 35 L50 25" stroke="url(#logoGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                
// //                 {/* Connecting dots */}
// //                 <circle cx="30" cy="25" r="3" fill="url(#logoGradient)"/>
// //                 <circle cx="50" cy="25" r="3" fill="url(#logoGradient)"/>
                
// //                 {/* Text */}
// //                 <text x="55" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="url(#textGradient)">
// //                   BrandBridge
// //                 </text>
                
// //                 {/* Decorative lines */}
// //                 <path d="M20 35 L60 35" stroke="#e0e0e0" strokeWidth="2"/>
// //                 <circle cx="40" cy="35" r="1.5" fill="#007bff"/>
// //               </svg>
// //             </a>

// //             {/* Mobile menu button */}
// //             <button 
// //               className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //             >
// //               <span className="sr-only">Open main menu</span>
// //               {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
// //             </button>

// //             {/* Desktop menu */}
// //             <div className="hidden md:flex md:items-center md:space-x-4 flex-1 justify-end">
// //               <ul className="flex md:space-x-4 md:items-center">
// //                 <li>
// //                   <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Companies</a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Influencer</a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
// //                 </li>
// //                 {/* Dropdown */}
// //                 <li className="relative group">
// //                   <button className="text-gray-700 group hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
// //                     Dropdown
// //                     <ChevronDown className="ml-2 h-4 w-4" />
// //                   </button>
// //                   <ul className="hidden group-hover:block absolute z-50 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
// //                     <li>
// //                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</a>
// //                     </li>
// //                     <li>
// //                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</a>
// //                     </li>
// //                   </ul>
// //                 </li>
// //               </ul>

// //               {/* Search and Login */}
// //               <div className="flex items-center space-x-4">
// //                 <form className="flex items-center">
// //                   <input type="search" placeholder="Search" className="px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
// //                   <button type="submit" className="ml-2 inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
// //                     Search
// //                   </button>
// //                 </form>
// //                 <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
// //                   <span className="text-blue-500 mr-2">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// //                       <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
// //                     </svg>
// //                   </span>
// //                   Login
// //                 </a>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Mobile menu */}
// //           {mobileMenuOpen && (
// //             <div className="md:hidden" id="mobile-menu">
// //               <div className="px-2 pt-2 pb-3 space-y-1">
// //                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
// //                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Companies</a>
// //                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Influencer</a>
// //                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Pricing</a>
// //                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About Us</a>
// //                 <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>
// //               </div>
// //               <div className="pt-4 pb-3 border-t border-gray-200">
// //                 <form className="px-4 flex flex-col space-y-4">
// //                   <input type="search" placeholder="Search" className="px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
// //                   <button type="submit" className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white">
// //                     Search
// //                   </button>
// //                 </form>
// //                 <div className="mt-3 px-4">
// //                   <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
// //                     <span className="text-blue-500 mr-2">
// //                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// //                         <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
// //                       </svg>
// //                     </span>
// //                     Login
// //                   </a>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </nav>

// //       <div className="bg-gradient-to-br from-gray-50 to-purple-50 flex-grow">
// //         {/* Hero Section */}
// //         <section className="container mx-auto px-4 pt-20 pb-12">
// //           <div className="text-center" data-aos="fade-up">
// //             <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ background: 'linear-gradient(45deg, #007bff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
// //               Connecting Brands with Influence
// //             </h1>
// //             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
// //               We bridge the gap between innovative brands and influential voices, creating authentic connections that drive real impact.
// //             </p>
// //           </div>
// //         </section>

// //         {/* Stats Section */}
// //         <section className="container mx-auto px-4 py-12">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="100">
// //               <div className="text-4xl text-blue-600 mb-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
// //                   <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm8 1v1H7V4h6zm-6 6a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
// //               <p className="text-gray-600">Successful Campaigns</p>
// //             </div>
// //             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
// //               <div className="text-4xl text-blue-600 mb-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
// //                   <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-3xl font-bold text-gray-900 mb-2">50M+</h3>
// //               <p className="text-gray-600">Social Reach</p>
// //             </div>
// //             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
// //               <div className="text-4xl text-blue-600 mb-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
// //                   <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-3xl font-bold text-gray-900 mb-2">90%</h3>
// //               <p className="text-gray-600">Client Satisfaction</p>
// //             </div>
// //             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="400">
// //               <div className="text-4xl text-blue-600 mb-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
// //                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
// //                   <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
// //               <p className="text-gray-600">Active Influencers</p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Mission Section */}
// //         <section className="container mx-auto px-4 py-16">
// //           <div className="grid md:grid-cols-2 gap-12 items-center">
// //             <div data-aos="fade-right">
// //               <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ background: 'linear-gradient(45deg, #007bff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
// //                 Our Mission
// //               </h2>
// //               <p className="text-gray-600 mb-6">
// //                 We're dedicated to revolutionizing the way brands connect with their audiences. Through strategic partnerships and data-driven insights, we create meaningful campaigns that drive real results.
// //               </p>
// //               <ul className="space-y-4">
// //                 <li className="flex items-center text-gray-600">
// //                   <Check className="text-blue-600 mr-3" />
// //                   Authentic brand storytelling
// //                 </li>
// //                 <li className="flex items-center text-gray-600">
// //                   <Check className="text-blue-600 mr-3" />
// //                   Data-driven campaign strategies
// //                 </li>
// //                 <li className="flex items-center text-gray-600">
// //                   <Check className="text-blue-600 mr-3" />
// //                   Long-term partnership building
// //                 </li>
// //                 <li className="flex items-center text-gray-600">
// //                   <Check className="text-blue-600 mr-3" />
// //                   Innovative content creation
// //                 </li>
// //               </ul>
// //             </div>
// //             <div className="relative" data-aos="fade-left">
// //               <img src="/api/placeholder/400/320" alt="Mission" className="rounded-lg shadow-xl" />
// //               <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
// //                 <p className="text-lg font-bold">10+ Years</p>
// //                 <p>Industry Experience</p>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       </div>

// //     </div>
// //   );
// // };

// // export default AboutUs;
// import React, { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown, Check, MapPin, Phone, Mail } from 'lucide-react';

// const AboutUs = () => {
//   // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   // useEffect(() => {
//   //   // AOS initialization similar to the original
//   //   const script = document.createElement('script');
//   //   script.src = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js";
//   //   script.async = true;
//   //   document.body.appendChild(script);
    
//   //   script.onload = () => {
//   //     window.AOS.init({
//   //       duration: 1000,
//   //       once: true,
//   //       offset: 100
//   //     });
//   //   };
    
//   //   return () => {
//   //     document.body.removeChild(script);
//   //   };
//   // }, []);
  
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navigation */}
   

//       <div className="bg-gradient-to-br from-gray-50 to-rose-50 flex-grow">
//         {/* Hero Section */}
//         <section className="container mx-auto px-4 pt-20 pb-12">
//           <div className="text-center" data-aos="fade-up">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ background: 'linear-gradient(45deg, #EA0054, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               Connecting Brands with Influence
//             </h1>
//             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
//               We bridge the gap between innovative brands and influential voices, creating authentic connections that drive real impact.
//             </p>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="container mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="100">
//               <div className="text-4xl text-rose-600 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm8 1v1H7V4h6zm-6 6a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
//               <p className="text-gray-600">Successful Campaigns</p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
//               <div className="text-4xl text-rose-600 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                 </svg>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-900 mb-2">50M+</h3>
//               <p className="text-gray-600">Social Reach</p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
//               <div className="text-4xl text-rose-600 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-900 mb-2">90%</h3>
//               <p className="text-gray-600">Client Satisfaction</p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="400">
//               <div className="text-4xl text-rose-600 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                   <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
//               <p className="text-gray-600">Active Influencers</p>
//             </div>
//           </div>
//         </section>

//         {/* Mission Section */}
//         <section className="container mx-auto px-4 py-16">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div data-aos="fade-right">
//               <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ background: 'linear-gradient(45deg, #EA0054, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                 Our Mission
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 We're dedicated to revolutionizing the way brands connect with their audiences. Through strategic partnerships and data-driven insights, we create meaningful campaigns that drive real results.
//               </p>
//               <ul className="space-y-4">
//                 <li className="flex items-center text-gray-600">
//                   <Check className="text-rose-600 mr-3" />
//                   Authentic brand storytelling
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="text-rose-600 mr-3" />
//                   Data-driven campaign strategies
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="text-rose-600 mr-3" />
//                   Long-term partnership building
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="text-rose-600 mr-3" />
//                   Innovative content creation
//                 </li>
//               </ul>
//             </div>
//             <div className="relative" data-aos="fade-left">
//               <img src="/src/assets/img/pexels-photo-2284169.webp" alt="Mission" className="rounded-lg shadow-xl" />
//               <div className="absolute -bottom-6 -right-6 bg-rose-600 text-white p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#EA0054' }}>
//                 <p className="text-lg font-bold">10+ Years</p>
//                 <p>Industry Experience</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//     </div>
//   );
// };

// export default AboutUs;


import React from 'react';
import { Check } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-br from-blue-50 to-purple-100 flex-grow">
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" 
              style={{ 
                background: 'linear-gradient(45deg, #D63384, #6F42C1)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
              Connecting Brands with Influence
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              We bridge the gap between innovative brands and influential voices, creating authentic connections that drive real impact.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "500+", subtitle: "Successful Campaigns" },
              { title: "50M+", subtitle: "Social Reach" },
              { title: "90%", subtitle: "Client Satisfaction" },
              { title: "1000+", subtitle: "Active Influencers" }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#D63384]">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                <p className="text-gray-600">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6"
                style={{ 
                  background: 'linear-gradient(45deg, #D63384, #6F42C1)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                Our Mission
              </h2>
              <p className="text-gray-700 mb-6">
                We're dedicated to revolutionizing the way brands connect with their audiences. Through strategic partnerships and data-driven insights, we create meaningful campaigns that drive real results.
              </p>
              <ul className="space-y-4">
                {[
                  "Authentic brand storytelling",
                  "Data-driven campaign strategies",
                  "Long-term partnership building",
                  "Innovative content creation"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="text-[#D63384] mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img src="/src/assets/img/pexels-photo-2284169.webp" alt="Mission" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-6 -right-6 bg-[#D63384] text-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-bold">10+ Years</p>
                <p>Industry Experience</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
