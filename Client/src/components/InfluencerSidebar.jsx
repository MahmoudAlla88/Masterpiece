import React from "react";
import { User, Briefcase, Bell, Settings, LogOut } from "lucide-react";

const InfluencerSidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg flex flex-col">
      {/* Brand Name */}
      <div className="p-6 bg-white shadow-md flex items-center justify-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent">
          BrandBridge
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
              <User className="mr-2 text-[#D63384]" size={20} />
              <span className="font-medium">My Profile</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
              <Briefcase className="mr-2 text-[#D63384]" size={20} />
              <span className="font-medium">My Campaigns</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
              <Bell className="mr-2 text-[#D63384]" size={20} />
              <span className="font-medium">Invitations</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition">
              <Settings className="mr-2 text-[#D63384]" size={20} />
              <span className="font-medium">Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout or Footer */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center p-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110 transition">
          <LogOut className="mr-2" size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default InfluencerSidebar;