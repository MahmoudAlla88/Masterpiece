
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Overview from "./overview";


function AdminDashbord() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Overview/>} />
      
      </Routes>
    </>
  );
}

export default AdminDashbord;
