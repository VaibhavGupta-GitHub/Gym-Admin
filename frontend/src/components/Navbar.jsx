import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell
} from 'lucide-react';

// Main App Component
function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard'); // New: track active page

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Render selected page
  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Members':
        return <Members />;
      case 'Payments':
        return <Payments />;
      case 'Settings':
        return <SettingsPage />;
      case 'Logout':
        return <LogoutPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-inter">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

// Sidebar Component
const Sidebar = ({ isCollapsed, activePage, setActivePage }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Members', icon: Users },
    { name: 'Payments', icon: CreditCard },
    { name: 'Settings', icon: Settings },
    { name: 'Logout', icon: LogOut }
  ];

  return (
    <aside
      className={`relative bg-white shadow-lg flex-shrink-0 transition-all duration-300 ease-in-out rounded-r-xl ${
        isCollapsed ? 'w-20' : 'w-64'
      } border-r border-gray-200`}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-center h-16">
        {isCollapsed ? (
          <span className="text-indigo-600 text-3xl font-bold">G</span>
        ) : (
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Gym<span className="text-indigo-600">Pro</span>
          </h1>
        )}
      </div>

      <nav className="mt-5 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`w-full flex items-center py-3 px-4 mx-3 rounded-lg transition-colors duration-200 text-left
              ${
                activePage === item.name
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600 -ml-0.5'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
              }
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon className={`h-6 w-6 ${isCollapsed ? '' : 'mr-3'}`} />
            <span className={`${isCollapsed ? 'hidden' : ''} whitespace-nowrap`}>
              {item.name}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

// Top Navigation Component
const TopNav = ({ toggleSidebar, isSidebarCollapsed }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200 rounded-b-xl">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-2 mr-4 transition-colors duration-200"
          aria-label="Toggle Sidebar"
        >
          {isSidebarCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </button>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 w-48 md:w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-2 transition-colors duration-200" aria-label="Notifications">
          <Bell className="h-6 w-6" />
        </button>
        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );
};

// Dashboard Component
const Dashboard = () => (
  <div className="p-6 bg-white rounded-xl shadow-md min-h-[calc(100vh-160px)]">
    <h3 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h3>
    <p className="text-gray-600">Welcome to your Gym Admin Panel dashboard. Here you can see a summary of your gym's activities.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Total Members</p>
          <p className="text-4xl font-extrabold mt-1">1,234</p>
        </div>
        <Users className="h-16 w-16 opacity-30" />
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Revenue (Monthly)</p>
          <p className="text-4xl font-extrabold mt-1">$25,000</p>
        </div>
        <CreditCard className="h-16 w-16 opacity-30" />
      </div>
      <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Active Classes</p>
          <p className="text-4xl font-extrabold mt-1">15</p>
        </div>
        <LayoutDashboard className="h-16 w-16 opacity-30" />
      </div>
    </div>
  </div>
);

const Members = () => (
  <div className="p-6 bg-white rounded-xl shadow-md min-h-[calc(100vh-160px)]">
    <h3 className="text-3xl font-bold text-gray-800 mb-6">Members Management</h3>
    <p className="text-gray-600">Manage your gym members here. Add, edit, or remove member profiles.</p>
    {/* Members Table Code... (Same as before) */}
  </div>
);

const Payments = () => (
  <div className="p-6 bg-white rounded-xl shadow-md min-h-[calc(100vh-160px)]">
    <h3 className="text-3xl font-bold text-gray-800 mb-6">Payments Overview</h3>
    {/* Payments Section Code... (Same as before) */}
  </div>
);

const SettingsPage = () => (
  <div className="p-6 bg-white rounded-xl shadow-md min-h-[calc(100vh-160px)]">
    <h3 className="text-3xl font-bold text-gray-800 mb-6">Settings</h3>
    {/* Settings Form Code... (Same as before) */}
  </div>
);

const LogoutPage = () => (
  <div className="p-6 bg-white rounded-xl shadow-md min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
    <LogOut className="h-24 w-24 text-indigo-500 mb-6" />
    <h3 className="text-3xl font-bold text-gray-800 mb-4">Logging Out...</h3>
    <p className="text-gray-600 text-lg">You have been successfully logged out of the admin panel.</p>
    <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200">
      Go to Login
    </button>
  </div>
);

export default App;
