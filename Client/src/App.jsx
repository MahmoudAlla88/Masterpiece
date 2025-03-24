import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login/login';
import Footer from './components/Footer';
import Home from './pages/home/home';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/AboutUs/ContactUs';
import Navbar from './components/Navbar'
import PricingPage from './pages/payment/Pricing';
import InfluencersPage from './pages/influncerPage/Influncercard';
import InfluencerForm from './pages/login/InfluencerForm';
import InfluencerProfile from './pages/influncerPage/InfluencerProfile';
import CompanyPage from './pages/AboutUs/CompanyPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AdminDashbord from './dashboardAdmin/AdminDashbord';
function App() {
  const location = useLocation();

  return (
    <>
          {location.pathname !== "/login" && location.pathname !== "/dashboard" && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/Pricing" element={<PricingPage/>} />
        <Route path="/InfluencersPage" element={<InfluencersPage/>} />
        <Route path="/InfluencerForm" element={<InfluencerForm/>} />
        <Route path="/InfluencerProfile" element={<InfluencerProfile/>} />
        <Route path="/Companies" element={<CompanyPage/>} />
        <Route path="/dashboard" element={< AdminDashbord/>} />
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/dashboard" && <Footer />}
      <ToastContainer/>
    </>
  );
}

export default App;
