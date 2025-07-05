import React, { useState } from 'react';

// Main App component that renders the GymMemberForm
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <GymMemberForm />
    </div>
  );
}

// GymMemberForm component for adding/editing gym members
function GymMemberForm() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    planType: 'basic', // Default value for dropdown
    startDate: '',
    endDate: '',
    notes: '',
  });

  // Handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Form Data Submitted:', formData);
    // In a real application, you would send this data to an API
    // e.g., saveMember(formData);
    alert('Member data saved! Check console for details.'); // Using alert for demo purposes
  };

  // Handle form cancellation
  const handleCancel = () => {
    // Reset form data to initial empty state
    setFormData({
      name: '',
      phone: '',
      email: '',
      planType: 'basic',
      startDate: '',
      endDate: '',
      notes: '',
    });
    console.log('Form Cancelled and Reset.');
    alert('Form cancelled and reset.'); // Using alert for demo purposes
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Add/Edit Gym Member
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two-column layout for form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="John Doe"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel" // Use type="tel" for phone numbers
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="(123) 456-7890"
            />
          </div>

          {/* Email Field (Optional) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="john.doe@example.com"
            />
          </div>

          {/* Plan Type Dropdown */}
          <div>
            <label htmlFor="planType" className="block text-sm font-medium text-gray-700 mb-1">
              Plan Type
            </label>
            <select
              id="planType"
              name="planType"
              value={formData.planType}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            >
              <option value="basic">Basic Membership</option>
              <option value="premium">Premium Membership</option>
              <option value="family">Family Plan</option>
              <option value="student">Student Discount</option>
            </select>
          </div>

          {/* Start Date Field */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>

          {/* End Date Field */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        {/* Notes Textarea (full width) */}
        <div className="col-span-full">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Any special notes about the member or their membership..."
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Save Member
          </button>
        </div>
      </form>
    </div>
  );
}
