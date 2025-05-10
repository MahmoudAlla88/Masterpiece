import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login/login';
import Footer from './components/Footer';
import Home from './pages/home/home';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/AboutUs/ContactUs';
import Navbar from './components/Navbar'
import PricingPage from './pages/payment/Pricing';
import InfluencersList from './pages/influncerPage/Influncercard';
import InfluencerRegistrationForm from './pages/login/InfluencerForm';
import InfluencerProfile from './pages/influncerPage/InfluencerProfile';
import CompanyPage from './pages/AboutUs/CompanyPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { setCurrentUser } from './redux/slices/AuthSlices';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import AppLayout from './dashboardAdmin/AppLayout';
import AdRequestPage from './pages/influncerPage/AdRequestPage';
import AppLayoutInfluncer from './dashboardInfluncer/AppLayout';
import ProfilePage from './pages/profile/profile';

import AdRequestBooking from './pages/influncerPage/AdRequestBooking';
import UserBookings from './pages/profile/UserBookings';
import PaymentPage from './pages/payment/Payment';
function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/user/me", {
          withCredentials: true
        });
        console.log("mm=",res.data);
        dispatch(setCurrentUser(res.data));
      } catch (err) {
        console.log("User not logged in", err);
      }
    }
    ;

    fetchUser();
  }, []);

  return (
    <>
          {location.pathname !== "/login" && !location.pathname.startsWith("/dashboard") && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/Pricing" element={<PricingPage/>} />
        <Route path="/InfluencersPage" element={<InfluencersList/>} />
        <Route path="/InfluencerForm" element={<InfluencerRegistrationForm />} />
        <Route path="/InfluencerProfile/:id" element={<InfluencerProfile/>} />
        <Route path="/userbookings" element={<UserBookings/>} />
        <Route path="/Companies" element={<CompanyPage/>} />
        <Route path="/dashboard/*" element={< AppLayout/>} />
        <Route path="/ad-request/:id" element={<AdRequestPage />} />
        <Route path="/adbooking-request/:id" element={<AdRequestBooking />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboardInfluncer/*" element={<AppLayoutInfluncer  />} />
      </Routes>
      {location.pathname !== "/login" && !location.pathname.startsWith("/dashboard") && <Footer />}
      <ToastContainer/>
    </>
  );
}

export default App;
