import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from './Pages/01_Login';
import AdminDashboard from './Pages/02_Admin_Dashboard';
import MemberManagement from './Pages/03_Member_Management';
import AddMembers from './Pages/04_Add_Members';
import PaymentTracker from './Pages/05_Payment_Tracker';
import PaymentEntry from './Pages/06_Payment_Entry';
import UpcomingRenewal from './Pages/07_Upcoming_Renewal';
import Settings from './Pages/09_Settings';
import Navbar from './components/Navbar';

// This is a wrapper to access location and control layout
const AppLayout = () => {
  const location = useLocation();

  // Only hide Navbar on /login
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/members" element={<MemberManagement />} />
        <Route path="/add-member" element={<AddMembers />} />
        <Route path="/payments" element={<PaymentTracker />} />
        <Route path="/payment-entry" element={<PaymentEntry />} />
        <Route path="/upcoming-renewal" element={<UpcomingRenewal />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
