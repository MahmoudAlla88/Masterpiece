import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from './AdminDashbord'
import InfluencersManagement from './InfluncersManagement';
import Messages from './Messages';
import Analytics from './Analytics';
import SubscriptionCardForm from './SubscriptionCardForm';
import UsersManagement from './UserManegment';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import AdBookings from './AdBookings';


const AppLayout = () => {
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
          <Route path="/user" element={<UsersManagement/>} />
          <Route path="/AdBookings" element={<AdBookings/>} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;