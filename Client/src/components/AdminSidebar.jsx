// // // import React from "react";
// // // import { Home, User, Users, BarChart, LogOut } from "lucide-react";

// // // const AdminSidebar = () => {
// // //   return (
// // //     <aside className="h-screen w-64 bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg flex flex-col">
// // //       {/* Brand Name */}
// // //       <div className="p-6 bg-white shadow-md flex items-center justify-center">
// // //         <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent">
// // //           BrandBridge
// // //         </h1>
// // //       </div>

// // //       {/* Navigation */}
// // //       <nav className="flex-1 p-4">
// // //         <ul className="space-y-2">
// // //           <li>
// // //             <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
// // //               <Home className="mr-2 text-[#D63384]" size={20} />
// // //               <span className="font-medium">Dashboard</span>
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
// // //               <User className="mr-2 text-[#D63384]" size={20} />
// // //               <span className="font-medium">Users</span>
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
// // //               <Users className="mr-2 text-[#D63384]" size={20} />
// // //               <span className="font-medium">Influencers</span>
// // //             </a>
// // //           </li>
// // //           <li>
// // //             <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
// // //               <BarChart className="mr-2 text-[#D63384]" size={20} />
// // //               <span className="font-medium">Analytics</span>
// // //             </a>
// // //           </li>
// // //         </ul>
// // //       </nav>

// // //       {/* Logout or Footer */}
// // //       <div className="p-4">
// // //         <button className="w-full flex items-center justify-center p-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110 transition">
// // //           <LogOut className="mr-2" size={18} />
// // //           Logout
// // //         </button>
// // //       </div>
// // //     </aside>
// // //   );
// // // };

// // // export default AdminSidebar;
// // import React, { useState } from 'react';
// // import { 
// //   Users, 
// //   BarChart, 
// //   Calendar, 
// //   Settings, 
// //   LogOut, 
// //   Menu, 
// //   ChevronRight, 
// //   Home, 
// //   Briefcase, 
// //   MessageCircle, 
// //   Image,
// //   HelpCircle,
// //   Bell
// // } from 'lucide-react';

// // const AdminSidebar = () => {
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [activeItem, setActiveItem] = useState('dashboard');

// //   const menuItems = [
// //     { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
// //     { id: 'influencers', icon: <Users size={20} />, label: 'Influencers' },
// //     { id: 'campaigns', icon: <Briefcase size={20} />, label: 'Campaigns' },
// //     { id: 'calendar', icon: <Calendar size={20} />, label: 'Schedule' },
// //     { id: 'analytics', icon: <BarChart size={20} />, label: 'Analytics' },
// //     { id: 'messages', icon: <MessageCircle size={20} />, label: 'Messages' },
// //     { id: 'content', icon: <Image size={20} />, label: 'Content Library' },
// //     { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
// //     { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
// //     { id: 'help', icon: <HelpCircle size={20} />, label: 'Help Center' }
// //   ];

// //   const toggleSidebar = () => {
// //     setCollapsed(!collapsed);
// //   };

// //   return (
// //     <div 
// //       className={`flex flex-col h-screen bg-white border-r shadow-sm transition-all duration-300 ${
// //         collapsed ? 'w-20' : 'w-64'
// //       }`}
// //     >
// //       {/* Logo and Toggle */}
// //       <div className={`flex items-center p-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
// //         {!collapsed && (
// //           <div className="flex items-center">
// //             <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
// //               <span className="text-white font-bold text-sm">IF</span>
// //             </div>
// //             <span className="text-lg font-semibold ml-2 text-gray-800">InfluApp</span>
// //           </div>
// //         )}
// //         {collapsed && (
// //           <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
// //             <span className="text-white font-bold text-sm">IF</span>
// //           </div>
// //         )}
// //         <button 
// //           onClick={toggleSidebar}
// //           className={`p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 ${collapsed ? 'mt-4' : ''}`}
// //         >
// //           {collapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
// //         </button>
// //       </div>

// //       {/* Divider */}
// //       <div className="h-px bg-gray-200 my-2"></div>

// //       {/* Admin Profile */}
// //       <div className={`flex items-center p-4 ${collapsed ? 'justify-center' : ''}`}>
// //         <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
// //           <img
// //             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2PmKtswxnRlPBc1kBmglpvWgIz3SnfWtBQ&s"
// //             alt="Admin"
// //             className="w-full h-full object-cover"
// //           />
// //         </div>
// //         {!collapsed && (
// //           <div className="ml-3">
// //             <p className="text-sm font-medium text-gray-800">Admin User</p>
// //             <p className="text-xs text-gray-500">admin@influapp.com</p>
// //           </div>
// //         )}
// //       </div>

// //       {/* Divider */}
// //       <div className="h-px bg-gray-200 my-2"></div>

// //       {/* Navigation Menu */}
// //       <div className="flex-1 overflow-y-auto">
// //         <nav className="px-2 py-4">
// //           <ul className="space-y-1">
// //             {menuItems.map((item) => (
// //               <li key={item.id}>
// //                 <button
// //                   onClick={() => setActiveItem(item.id)}
// //                   className={`flex items-center ${
// //                     collapsed ? 'justify-center' : ''
// //                   } w-full p-3 rounded-lg transition-colors ${
// //                     activeItem === item.id
// //                       ? 'bg-purple-100 text-purple-700'
// //                       : 'hover:bg-gray-100 text-gray-600 hover:text-purple-600'
// //                   }`}
// //                 >
// //                   <span className={activeItem === item.id ? 'text-purple-600' : ''}>{item.icon}</span>
// //                   {!collapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
// //                 </button>
// //               </li>
// //             ))}
// //           </ul>
// //         </nav>
// //       </div>

// //       {/* Logout Button */}
// //       <div className="p-4">
// //         <button className={`flex items-center ${
// //           collapsed ? 'justify-center' : ''
// //         } w-full p-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors`}>
// //           <LogOut size={20} />
// //           {!collapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminSidebar;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Users, 
//   BarChart, 
//   Calendar, 
//   Settings, 
//   LogOut, 
//   Menu, 
//   ChevronRight, 
//   Home, 
//   Briefcase, 
//   MessageCircle, 
//   Image,
//   HelpCircle,
//   Bell
// } from 'lucide-react';

// const AdminSidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const navigate = useNavigate(); // تهيئة useNavigate

//   const menuItems = [
//     { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
//     { id: 'influencers', icon: <Users size={20} />, label: 'Influencers' },
//     { id: 'campaigns', icon: <Briefcase size={20} />, label: 'Campaigns' },
//     { id: 'calendar', icon: <Calendar size={20} />, label: 'Schedule' },
//     { id: 'analytics', icon: <BarChart size={20} />, label: 'Analytics' },
//     { id: 'messages', icon: <MessageCircle size={20} />, label: 'Messages' },
//     { id: 'content', icon: <Image size={20} />, label: 'Content Library' },
//     { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
//     { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
//     { id: 'help', icon: <HelpCircle size={20} />, label: 'Help Center' }
//   ];

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div 
//       className={`flex flex-col h-screen bg-white transition-all duration-300 ${
//         collapsed ? 'w-20' : 'w-64'
//       } border-r border-purple-300 shadow-lg`}
//       style={{
//         boxShadow: '0 0 15px rgba(168, 85, 247, 0.2), 0 0 5px rgba(236, 72, 153, 0.1)',
//         borderImage: 'linear-gradient(to bottom, #a855f7, #ec4899) 1'
//       }}
//     >
//       {/* Logo and Toggle */}
//       <div className={`flex items-center p-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
//         {!collapsed && (
//           <div className="flex items-center">
//             <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
//               <span className="text-white font-bold text-sm">IF</span>
//             </div>
//             <span className="text-lg font-semibold ml-2 text-gray-800">InfluApp</span>
//           </div>
//         )}
//         {collapsed && (
//           <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
//             <span className="text-white font-bold text-sm">IF</span>
//           </div>
//         )}
//         <button 
//           onClick={toggleSidebar}
//           className={`p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 ${collapsed ? 'mt-4' : ''}`}
//         >
//           {collapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-gradient-to-r from-purple-300 to-pink-300 my-2"></div>

//       {/* Admin Profile */}
//       <div className={`flex items-center p-4 ${collapsed ? 'justify-center' : ''}`}>
//         <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-2 border-purple-300">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2PmKtswxnRlPBc1kBmglpvWgIz3SnfWtBQ&s"
//             alt="Admin"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         {!collapsed && (
//           <div className="ml-3">
//             <p className="text-sm font-medium text-gray-800">Admin User</p>
//             <p className="text-xs text-gray-500">admin@influapp.com</p>
//           </div>
//         )}
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-gradient-to-r from-purple-300 to-pink-300 my-2"></div>

//       {/* Navigation Menu */}
//       <div className="flex-1 overflow-y-auto">
//         <nav className="px-2 py-4">
//           <ul className="space-y-1">
//             {menuItems.map((item) => (
//               <li key={item.id}>
//                 <button
//                   onClick={() => setActiveItem(item.id)}
//                   className={`flex items-center ${
//                     collapsed ? 'justify-center' : ''
//                   } w-full p-3 rounded-lg transition-colors ${
//                     activeItem === item.id
//                       ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200'
//                       : 'hover:bg-gray-100 text-gray-600 hover:text-purple-600'
//                   }`}
//                   style={{
//                     boxShadow: activeItem === item.id ? '0 2px 4px rgba(168, 85, 247, 0.1)' : 'none'
//                   }}
//                 >
//                   <span className={activeItem === item.id ? 'text-purple-600' : ''}>{item.icon}</span>
//                   {!collapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* Logout Button */}
//       <div className="p-4">
//         <button className={`flex items-center ${
//           collapsed ? 'justify-center' : ''
//         } w-full p-3 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-colors hover:border hover:border-purple-200`}>
//           <LogOut size={20} />
//           {!collapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate من react-router-dom
import { 
  Users, 
  BarChart, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronRight, 
  Home, 
  Briefcase, 
  MessageCircle, 
  Image,
  HelpCircle,
  Bell
} from 'lucide-react';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate(); // تهيئة useNavigate

  const menuItems = [
    { id: '', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'influencers', icon: <Users size={20} />, label: 'Influencers' },
    { id: 'user', icon: <Briefcase size={20} />, label: 'user' },
    { id: 'AdBookings', icon: <Calendar size={20} />, label: 'AdBookings' },
    { id: 'analytics', icon: <BarChart size={20} />, label: 'Analytics' },
    { id: 'messages', icon: <MessageCircle size={20} />, label: 'Messages' },
    { id: 'Subscription', icon: <Image size={20} />, label: 'Subscription' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    { id: 'help', icon: <HelpCircle size={20} />, label: 'Help Center' }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (id) => {
    setActiveItem(id);
    navigate(`/dashboard/${id}`); // التوجيه إلى الرابط المناسب
  };
  const  handleLagout = () => {
    setActiveItem();
    navigate(`/`); // التوجيه إلى الرابط المناسب
  };
  return (
    <div 
      className={`flex flex-col h-screen bg-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} border-r border-purple-300 shadow-lg`}
      style={{
        boxShadow: '0 0 15px rgba(168, 85, 247, 0.2), 0 0 5px rgba(236, 72, 153, 0.1)',
        borderImage: 'linear-gradient(to bottom, #a855f7, #ec4899) 1'
      }}
    >
      {/* Logo and Toggle */}
      <div className={`flex items-center p-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">IF</span>
            </div>
            <span className="text-lg font-semibold ml-2 text-gray-800">InfluApp</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">IF</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 ${collapsed ? 'mt-4' : ''}`}
        >
          {collapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-purple-300 to-pink-300 my-2"></div>

      {/* Admin Profile */}
      <div className={`flex items-center p-4 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-2 border-purple-300">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD2PmKtswxnRlPBc1kBmglpvWgIz3SnfWtBQ&s"
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@influapp.com</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-purple-300 to-pink-300 my-2"></div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)} // إضافة التوجيه عند النقر
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} w-full p-3 rounded-lg transition-colors ${
                    activeItem === item.id
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-purple-600'
                  }`}
                  style={{
                    boxShadow: activeItem === item.id ? '0 2px 4px rgba(168, 85, 247, 0.1)' : 'none'
                  }}
                >
                  <span className={activeItem === item.id ? 'text-purple-600' : ''}>{item.icon}</span>
                  {!collapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button  onClick={() => handleLagout()} className={`flex items-center ${collapsed ? 'justify-center' : ''} w-full p-3 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-colors hover:border hover:border-purple-200`}>
          <LogOut size={20} />
          {!collapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
