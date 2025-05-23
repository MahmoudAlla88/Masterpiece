import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Menu,
  X,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";               
import { logoutUser } from "../redux/slices/AuthSlices";   
import axios from 'axios';
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ---------------- handlers ---------------- */
  const handleLogout = async  () => {
    try {
      await axios.post(
        "http://localhost:4000/user/logout",
        {},
        { withCredentials: true }
      ); } catch (err) {
        console.error(err);   // في حال كان الخادم غير متاح
      }
    dispatch(logoutUser());
    setSettingsOpen(false);
    navigate("/");

  };
const closeAll = () => {
  setMobileOpen(false);
  setMoreOpen(false);
  setSettingsOpen(false);
};
// ثم onClick={() => { closeAll(); navigate('/path'); }}

  /* ---------------- JSX ---------------- */
  return (
    <nav className="relative bg-white border-b border-gray-100 shadow-md w-full">
      <div className="flex items-center justify-between px-4 py-4 lg:px-12">
        {/* Brand + search (desktop) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-6 shrink-0">
            <span className="text-purple-500 text-2xl font-bold mr-1">#</span>
            <span className="text-gray-800 text-2xl font-semibold">
              BrandBridge
            </span>
          </Link>

          <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 py-1.5 cursor-pointer">
            <Search size={16} className="mr-2" onClick={() => setSearchVisible(!searchVisible)} />
            {searchVisible && (
              <input
                type="text"
                placeholder="Search influencers"
                className="text-sm bg-transparent focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* ---------- desktop links ---------- */}
        <div className="hidden lg:flex items-center space-x-8">
          {[
            { label: "Home", path: "/" },
            { label: "Influencers", path: "/InfluencersPage" },
            { label: "Pricing", path: "/PricingPage" },
            { label: "About", path: "/AboutUs" },
            { label: "Contact", path: "/ContactUs" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-purple-600"
            >
              {link.label}
            </Link>
          ))}

     
        </div>

        {/* ---------- right zone (auth / hamburger) ---------- */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <HelpCircle
            size={20}
            className="text-gray-600 hidden lg:block hover:text-purple-600"
          />

          {/* Logged‑out */}
          {!currentUser && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden lg:block border border-gray-300 rounded-md px-4 py-1.5 text-gray-700 hover:bg-gray-100"
              >
                Log in
              </button>
              <Link
                to="/InfluencerForm"
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-md px-3 py-1.5 lg:px-4"
              >
                Join as Influencer
              </Link>
            </>
          )}

          {/* Logged‑in → Settings dropdown */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center text-gray-700 hover:text-purple-600"
              >
                <Settings size={20} />
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-2 text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/profile">Profile</Link>
                    </li>
                    {/* <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/userbookings">My Campaigns</Link>
                    </li> */}
                    <li className="border-t my-2" />
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Log out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 lg:hidden p-2 text-gray-600"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ---------- mobile menu ---------- */}
      {mobileOpen && (
        <div className=" absolute inset-x-0 top-full     
      lg:hidden
      bg-white border-t shadow-md z-40
      max-h-[calc(100vh-4rem)] overflow-y-auto   
      px-4 py-2
    "
  >
          {/* search (mobile) */}
          <div className="flex items-center bg-gray-50 rounded-md px-3 py-2 my-3">
            <Search size={16} className="mr-2" />
            <input
              type="text"
              placeholder="Search influencers"
              className="text-sm bg-transparent focus:outline-none w-full"
            />
          </div>

          {/* core links */}
          {[
            { label: "Home", path: "/" },
            { label: "Influencers", path: "/InfluencersPage" },
            { label: "Pricing", path: "/Pricing" },
            // { label: "Companies", path: "/Companies" },
          ].map((link) => (
            <li key={link.path} className="list-none w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-gray-700">
              <Link
                to={link.path}
                className="py-2 border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* More */}
          <li className="list-none border-b">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="w-full flex items-center py-2 text-gray-700"
            >
              More <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
            {moreOpen && (
              <ul className="pl-4 pb-2 space-y-2">
                <li>
                  <Link to="/AboutUs" onClick={() => setMobileOpen(false)}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/ContactUs" onClick={() => setMobileOpen(false)}>
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* auth zone */}
          {!currentUser ? (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-gray-700"
              >
                Log in
              </button>
              <Link
                to="/InfluencerForm"
                className="block w-full bg-purple-500 text-center text-white rounded-md px-4 py-2 mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Join as Influencer
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="block py-2 text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>
              {/* <Link
                to="/bookings"
                className="block py-2 text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                My Campaigns
              </Link> */}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full text-left py-2 text-gray-700 flex items-center"
              >
                <LogOut size={16} className="mr-2" /> Log out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
