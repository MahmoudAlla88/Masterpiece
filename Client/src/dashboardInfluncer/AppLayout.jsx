import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InfluencerSidebar from '../components/InfluencerSidebar';
import AdRequests from './AdRequests';
import SchedulePage from './SchedulePage';





const AppLayoutInfluncer = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar on the left */}
      <div className="flex-shrink-0">
        <InfluencerSidebar/>
      </div>
      
      {/* Main content area on the right */}
      <div className="flex-grow overflow-auto">
        <Routes>
          <Route path="/ad-requests" element={<AdRequests/>} />
          <Route path="/calendar" element={<SchedulePage/>} />
          {/* <Route path="/influencers" element={<InfluencersManagement />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Subscription" element={<SubscriptionCardForm />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AppLayoutInfluncer ;