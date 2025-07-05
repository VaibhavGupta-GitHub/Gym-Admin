import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // Mock data for memberships. In a real application, this would come from an API.
  const [memberships, setMemberships] = useState([
    { id: 'm1', name: 'Alice Smith', endDate: '2025-07-07' }, // Due in 3 days
    { id: 'm2', name: 'Bob Johnson', endDate: '2025-07-10' }, // Due in 6 days
    { id: 'm3', name: 'Charlie Brown', endDate: '2025-07-11' }, // Due in 7 days
    { id: 'm4', name: 'Diana Prince', endDate: '2025-07-15' }, // Due in 11 days (not shown in 7-day filter)
    { id: 'm5', name: 'Eve Adams', endDate: '2025-07-04' }, // Due today
    { id: 'm6', name: 'Frank White', endDate: '2025-08-01' }, // Not due soon
    { id: 'm7', name: 'Grace Lee', endDate: '2025-07-05' }, // Due in 1 day
  ]);

  // State to hold memberships filtered for the next 7 days
  const [upcomingRenewals, setUpcomingRenewals] = useState([]);

  // Function to check if a date is within the next 'days' from today
  const isWithinNextDays = (dateString, days) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    const endDate = new Date(dateString);
    endDate.setHours(0, 0, 0, 0); // Normalize end date to start of day

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Check if the end date is today or in the future, and within the specified number of days
    return diffDays >= 0 && diffDays <= days;
  };

  // Effect to filter memberships whenever the original list changes
  useEffect(() => {
    const filtered = memberships.filter(member =>
      isWithinNextDays(member.endDate, 7)
    );
    setUpcomingRenewals(filtered);
  }, [memberships]); // Re-run when memberships data changes

  // Function to format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handler for the "Send Reminder" button
  const handleSendReminder = (memberName) => {
    console.log(`Reminder sent to ${memberName}!`);
    // In a real app, you would integrate with an email service or notification system here.
    // For this example, we're just logging to the console.
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Upcoming Membership Renewals
        </h1>

        {upcomingRenewals.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-8">
            No membership renewals in the next 7 days. 🎉
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRenewals.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </h2>
                    {/* Alert-style color tag */}
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 shadow-sm">
                      Due Soon
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    End Date: <span className="font-medium text-gray-800">{formatDate(member.endDate)}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleSendReminder(member.name)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                  Send Reminder
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
