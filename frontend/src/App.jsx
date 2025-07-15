import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/00_Register";
import Login from "./Pages/01_Login";
import AdminDashboard from "./Pages/02_Admin_Dashboard";
import MemberManagement from "./Pages/03_Member_Management";
import AddMembers from "./Pages/04_Add_Members";
import PaymentTracker from "./Pages/05_Payment_Tracker";
import PaymentEntry from "./Pages/06_Payment_Entry";
import UpcomingRenewal from "./Pages/07_Upcoming_Renewal";
import Settings from "./Pages/08_Settings";
import Navbar from "./components/Navbar";

const ProtectedLayout = ({ children }) => {
  return <Navbar>{children}</Navbar>; // Page content inside sidebar + topbar
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (without layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />

        {/* Protected routes (with layout) */}
        <Route
          path="/admin"
          element={
            <ProtectedLayout>
              <AdminDashboard />
            </ProtectedLayout>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedLayout>
              <MemberManagement />
            </ProtectedLayout>
          }
        />
        <Route
          path="/add-member"
          element={
            <ProtectedLayout>
              <AddMembers />
            </ProtectedLayout>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedLayout>
              <PaymentTracker />
            </ProtectedLayout>
          }
        />
        <Route
          path="/payment-entry"
          element={
            <ProtectedLayout>
              <PaymentEntry />
            </ProtectedLayout>
          }
        />
        <Route
          path="/upcoming-renewal"
          element={
            <ProtectedLayout>
              <UpcomingRenewal />
            </ProtectedLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedLayout>
              <Settings />
            </ProtectedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
