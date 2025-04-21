import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from './AdminDashbord'
import InfluencersManagement from './InfluncersManagement';
import Messages from './Messages';
import Analytics from './Analytics';
import SubscriptionCardForm from './SubscriptionCardForm';



const AppLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar on the left */}
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>
      
      {/* Main content area on the right */}
      <div className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/influencers" element={<InfluencersManagement />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Subscription" element={<SubscriptionCardForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;