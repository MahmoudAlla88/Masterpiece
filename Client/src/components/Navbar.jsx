
import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, Menu, X, LogIn } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMoreMenu = () => {
    setMoreMenuOpen(!moreMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <nav className="relative bg-white border-b border-gray-100 shadow-md w-full">
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center mr-6">
            <span className="text-purple-500 text-2xl font-bold mr-1">#</span>
            <span className="text-gray-800 text-2xl font-semibold">BrandBridge</span>
          </div>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 py-1.5 ml-2 cursor-pointer hover:bg-gray-100">
            <Search size={16} className="mr-2" onClick={toggleSearch} />
            {searchVisible && <input type="text" placeholder="Search influencers" className="text-sm border-none focus:outline-none bg-transparent" />}
          </div>
        </div>
        
        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8">
        <span className="text-gray-700 cursor-pointer hover:text-purple-600">  <Link to={"/"}>Home</Link></span>
      <span className="text-gray-700 cursor-pointer hover:text-purple-600"> <Link to={"/InfluencersPage"}> Influencers</Link></span>
     <span className="text-gray-700 cursor-pointer hover:text-purple-600"><Link to={"/Pricing"}> Pricing</Link></span>
     <span className="text-gray-700 cursor-pointer hover:text-purple-600"> <Link to={"/Companies"}> Companies</Link></span>
          
          <div className="relative cursor-pointer">
            <button onClick={toggleMoreMenu} className="text-gray-700 flex items-center hover:text-purple-600">
              More <ChevronDown size={16} className="ml-1 text-gray-500" />
            </button>
            {moreMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <ul className="py-2 text-gray-700">
                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={"/AboutUs"}>About</Link></li>
               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={"/ContactUs"}>Contact</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section - Partial on mobile */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <HelpCircle size={20} className="text-gray-600 hidden md:block cursor-pointer hover:text-purple-600" />
          <button onClick={() => { navigate('/login') }} className="hidden md:block border border-gray-300 rounded-md px-4 py-1.5 text-gray-700 hover:bg-gray-100">Log in</button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-md px-3 py-1.5 md:px-4"><Link to={"/InfluencerForm"}>Join as Influencer</Link></button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="ml-2 md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 border-t border-gray-100">
          {/* Mobile Search */}
          <div className="flex items-center bg-gray-50 rounded-md px-3 py-2 my-3 cursor-pointer hover:bg-gray-100">
            <Search size={16} className="mr-2" onClick={toggleSearch} />
            {searchVisible && <input type="text" placeholder="Search influencers" className="text-sm border-none focus:outline-none bg-transparent w-full" />}
          </div>
          
          {/* Mobile Navigation Links */}
          <ul className="space-y-4 py-2">
            <li className="py-2 border-b border-gray-100">
              <span className="text-gray-700 cursor-pointer"><Link to={"/"}>Home</Link></span>
            </li>
            <li className="py-2 border-b border-gray-100">
              <span className="text-gray-700 cursor-pointer"> <Link to={"/InfluencersPage"}> Influencers</Link></span>
            </li>
            <li className="py-2 border-b border-gray-100">
              <span className="text-gray-700 cursor-pointer"><Link to={"/Pricing"}> Pricing</Link></span>
            </li>
            <li className="py-2 border-b border-gray-100">
              <span className="text-gray-700 cursor-pointer"><Link to={"/Companies"}> Companies</Link></span>
            </li>
            <li className="py-2 border-b border-gray-100">
              <button onClick={toggleMoreMenu} className="flex items-center w-full text-left text-gray-700 cursor-pointer">
                More <ChevronDown size={16} className="ml-2 text-gray-500" />
              </button>
              {moreMenuOpen && (
                <ul className="mt-2 pl-4 space-y-2">
                  <li className="text-gray-700 cursor-pointer hover:text-purple-600">About</li>
                  <li className="text-gray-700 cursor-pointer hover:text-purple-600">Contact</li>
                </ul>
              )}
            </li>
            <li className="py-2 border-t border-gray-100">
              <button className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700">Log in</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;