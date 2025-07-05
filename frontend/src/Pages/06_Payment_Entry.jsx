import React, { useState } from 'react';
import { User, DollarSign, CalendarDays, CreditCard, NotebookPen } from 'lucide-react'; // Icons for visual appeal

// Main App component
const App = () => {
  // State to manage form field values
  const [member, setMember] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation message

  // Dummy member data for the dropdown
  const members = [
    { id: '1', name: 'Alice Smith' },
    { id: '2', name: 'Bob Johnson' },
    { id: '3', name: 'Charlie Brown' },
    { id: '4', name: 'Diana Prince' },
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'member':
        setMember(value);
        break;
      case 'amount':
        // Allow only numbers and a single decimal point
        if (/^\d*\.?\d*$/.test(value) || value === '') {
          setAmount(value);
        }
        break;
      case 'date':
        setDate(value);
        break;
      case 'paymentMethod':
        setPaymentMethod(value);
        break;
      case 'notes':
        setNotes(value);
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a payment object from the form data
    const paymentData = {
      member,
      amount: parseFloat(amount), // Convert amount to a number
      date,
      paymentMethod,
      notes,
    };

    console.log('Payment Data Submitted:', paymentData); // Log data to console

    // Show a confirmation message
    setShowConfirmation(true);

    // Optionally, clear the form after a short delay
    setTimeout(() => {
      handleClearForm();
      setShowConfirmation(false);
    }, 3000); // Clear after 3 seconds
  };

  // Handle cancel button click or form clear
  const handleClearForm = () => {
    setMember('');
    setAmount('');
    setDate('');
    setPaymentMethod('');
    setNotes('');
    console.log('Form cleared.');
  };

  return (
    // Main container for centering the form
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4 font-inter">
      {/* Card-style form container */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-[1.01] opacity-95">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gym Payment Entry</h2>

        {/* Confirmation message */}
        {showConfirmation && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 transition-opacity duration-500 opacity-100">
            Payment saved successfully!
          </div>
        )}

        {/* Payment form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Member Dropdown */}
          <div>
            <label htmlFor="member" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" /> Member
            </label>
            <select
              id="member"
              name="member"
              value={member}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-all duration-300 ease-in-out hover:border-blue-400"
            >
              <option value="">Select a Member</option>
              {members.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-gray-500" /> Amount
            </label>
            <input
              type="text" // Use text type to handle custom validation for numbers
              id="amount"
              name="amount"
              value={amount}
              onChange={handleChange}
              required
              placeholder="e.g., 50.00"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-all duration-300 ease-in-out hover:border-blue-400"
            />
          </div>

          {/* Date Input */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-gray-500" /> Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-all duration-300 ease-in-out hover:border-blue-400"
            />
          </div>

          {/* Payment Method Dropdown */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-gray-500" /> Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-all duration-300 ease-in-out hover:border-blue-400"
            >
              <option value="">Select Method</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>

          {/* Notes Textarea */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <NotebookPen className="mr-2 h-4 w-4 text-gray-500" /> Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any additional notes..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition-all duration-300 ease-in-out hover:border-blue-400 resize-y"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClearForm}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
