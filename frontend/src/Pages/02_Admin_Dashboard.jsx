import React, { useState } from 'react';
import { Users, UserCheck, DollarSign, Calendar } from 'lucide-react';

const App = () => {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  const stats = [
    {
      id: 1,
      name: 'Total Members',
      value: '2,450',
      icon: Users,
      color: 'bg-indigo-600',
    },
    {
      id: 2,
      name: 'Active Members',
      value: '1,890',
      icon: UserCheck,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      name: 'Payments This Month',
      value: '₹12,340',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      id: 4,
      name: 'Upcoming Renewals',
      value: '8',
      icon: Calendar,
      color: 'bg-red-500',
    },
    {
      id: 5,
      name: 'Expired Membership',
      value: '10',
      icon: Calendar,
      color: 'bg-red-500',
    },
  ];

  const paymentTrends = [
    { month: 'Jan', amount: 10000 },
    { month: 'Feb', amount: 11000 },
    { month: 'Mar', amount: 9500 },
    { month: 'Apr', amount: 12000 },
    { month: 'May', amount: 13500 },
    { month: 'Jun', amount: 11500 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between rounded-bl-lg rounded-br-lg md:rounded-none">
        <div className="text-xl font-semibold text-gray-800">Dashboard Overview</div>
        <div className="flex items-center">
          <span className="mr-3 text-gray-600">Welcome, Admin!</span>
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-6">
        {/* Stat Cards Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition-transform hover:scale-105"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-full text-white mr-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Payment Trends Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Trends</h2>
          <div className="h-64 flex items-end justify-around p-4 bg-gray-50 rounded-lg">
            {paymentTrends.map((data, index) => (
              <div key={index} className="flex flex-col items-center mx-2">
                <div
                  className="w-8 rounded-t-lg bg-indigo-500 transition-all duration-300 ease-in-out hover:bg-indigo-600"
                  style={{ height: `${(data.amount / 15000) * 100}%` }}
                  title={`$${data.amount}`}
                ></div>
                <span className="mt-2 text-sm text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Sections (Placeholder) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 h-64">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
            <p className="text-gray-600">No recent activities to display.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 h-64">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Member Growth</h2>
            <p className="text-gray-600">Data for member growth will appear here.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
