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
import ProtectedRoute from "./components/ProtectedRoute";

const ProtectedLayout = ({ children }) => {
  return <Navbar>{children}</Navbar>; // Page content inside sidebar + topbar
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (without layout) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes (with layout) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <AdminDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <MemberManagement />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-member"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <AddMembers />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <PaymentTracker />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-entry"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <PaymentEntry />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/upcoming-renewal"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <UpcomingRenewal />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Settings />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
