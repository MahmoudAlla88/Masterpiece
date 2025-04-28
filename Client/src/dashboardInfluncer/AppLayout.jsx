import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InfluencerSidebar from '../components/InfluencerSidebar';
import AdRequests from './AdRequests';
import SchedulePage from './SchedulePage';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import OverviewPage from './OverviewPage';




const AppLayoutInfluncer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/user/me", {
          withCredentials: true
        });
       
        dispatch(setCurrentUser(res.data));
      } catch (err) {
        console.log("User not logged in", err);
      }
    };

    fetchUser();
  }, []);
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
          <Route path="/" element={<OverviewPage />} />
          {/* <Route path="/influencers" element={<InfluencersManagement />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Subscription" element={<SubscriptionCardForm />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AppLayoutInfluncer ;