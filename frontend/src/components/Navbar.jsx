import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Members", icon: Users, path: "/members" },
  { name: "Payments", icon: CreditCard, path: "/payments" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Logout", icon: LogOut, path: "/" },
];

const Navbar = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on mobile
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-inter">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Gym<span className="text-indigo-600">Pro</span>
          </h1>
        </div>

        <nav className="hidden md:flex space-x-6 ml-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.path)}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 w-48 md:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Bell className="h-6 w-6" />
          </button>
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md cursor-pointer">
            JD
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-b border-gray-200 px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.path)}
              className="w-full flex items-center space-x-3 text-gray-700 hover:text-indigo-600"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  );
};

export default Navbar;
