import React, { useState, useEffect } from 'react';

// Tailwind CSS configuration (for context, normally in tailwind.config.js)
// This is included here for completeness of the self-contained app.
// In a real project, these colors would be defined in tailwind.config.js
// and automatically available.
const tailwindConfigColors = {
  'fitness-primary': '#4CAF50', // A nice green for accent
  'fitness-secondary': '#FFC107', // An amber for secondary accents
  'fitness-background-light': '#F8F9FA', // Light background
  'fitness-text-dark': '#212529', // Dark text
  'fitness-card-light': '#FFFFFF', // Card background
};

// Main App Component
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payments, setPayments] = useState(() => {
    // Initialize with some dummy data or load from storage
    const storedPayments = localStorage.getItem('gymPayments');
    return storedPayments ? JSON.parse(storedPayments) : [
      { id: '1', memberName: 'John Doe', paymentDate: '2025-07-01', amount: 1500, paymentMethod: 'Card', notes: 'Monthly fee - July' },
      { id: '2', memberName: 'Jane Smith', paymentDate: '2025-06-28', amount: 1200, paymentMethod: 'Cash', notes: 'Quarterly membership - Q3' },
      { id: '3', memberName: 'Peter Jones', paymentDate: '2025-07-03', amount: 500, paymentMethod: 'UPI', notes: 'Locker rental' },
      { id: '4', memberName: 'Alice Brown', paymentDate: '2025-07-02', amount: 1800, paymentMethod: 'Bank Transfer', notes: 'Annual membership' },
      { id: '5', memberName: 'Bob White', paymentDate: '2025-06-25', amount: 750, paymentMethod: 'Card', notes: 'Personal training session' },
    ];
  });

  // Effect to save payments to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('gymPayments', JSON.stringify(payments));
  }, [payments]);

  /**
   * Handles adding a new payment to the payments list.
   * @param {object} newPayment - The new payment object to add.
   */
  const handleAddPayment = (newPayment) => {
    const newId = (payments.length > 0 ? Math.max(...payments.map(p => parseInt(p.id))) + 1 : 1).toString();
    setPayments([...payments, { id: newId, ...newPayment }]);
    setIsModalOpen(false); // Close the modal after adding payment
  };

  return (
    <div className="min-h-screen bg-fitness-background-light p-4 sm:p-6 font-inter">
      {/* Header Section */}
      <h1 className="text-3xl sm:text-4xl font-bold text-fitness-text-dark mb-6 text-center">
        Payments Tracking
      </h1>

      {/* Add Payment Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-fitness-primary text-white font-bold py-2 px-4 rounded-md shadow-md
                     hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75
                     transition duration-200 ease-in-out"
        >
          Add Payment
        </button>
      </div>

      {/* Payments Table Component */}
      <PaymentsTable payments={payments} />

      {/* Add Payment Modal Component (conditionally rendered) */}
      {isModalOpen && (
        <AddPaymentModal
          onClose={() => setIsModalOpen(false)}
          onAddPayment={handleAddPayment}
        />
      )}
    </div>
  );
}

// PaymentsTable Component
const PaymentsTable = ({ payments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('');

  // Filter payments based on search term and payment method
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === '' || payment.paymentMethod === filterMethod;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="bg-fitness-card-light rounded-lg shadow-md overflow-hidden mt-4 p-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by member name or notes..."
          className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:border-fitness-primary
                     focus:ring-1 focus:ring-fitness-primary transition duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-fitness-primary
                     focus:ring-1 focus:ring-fitness-primary transition duration-200"
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
        >
          <option value="">All Payment Methods</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
          {/* Add more payment methods as needed */}
        </select>
        {(searchTerm || filterMethod) && (
          <button
            onClick={() => { setSearchTerm(''); setFilterMethod(''); }}
            className="text-gray-600 hover:text-gray-800 text-sm px-2 py-1 rounded-md
                       transition duration-200 ease-in-out"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Member Name</th>
              <th className="py-3 px-6 text-left">Payment Date</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Payment Method</th>
              <th className="py-3 px-6 text-left">Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`border-b border-gray-200 hover:bg-gray-50
                              ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="py-3 px-6 whitespace-nowrap">{payment.memberName}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{payment.paymentDate}</td>
                  <td className="py-3 px-6 whitespace-nowrap">₹ {payment.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{payment.paymentMethod}</td>
                  <td className="py-3 px-6 max-w-xs truncate" title={payment.notes}>
                    {payment.notes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// AddPaymentModal Component
const AddPaymentModal = ({ onClose, onAddPayment }) => {
  const [memberName, setMemberName] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  /**
   * Validates the form fields.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    let newErrors = {};
    if (!memberName.trim()) newErrors.memberName = 'Member Name is required.';
    if (!paymentDate) newErrors.paymentDate = 'Payment Date is required.';
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) newErrors.amount = 'Valid Amount is required.';
    if (!paymentMethod) newErrors.paymentMethod = 'Payment Method is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the form submission.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddPayment({
        memberName,
        paymentDate,
        amount: parseFloat(amount),
        paymentMethod,
        notes,
      });
      // Reset form fields
      setMemberName('');
      setAmount('');
      setNotes('');
      setPaymentDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod('Card');
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative transform transition-all duration-300 scale-100 opacity-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-fitness-text-dark mb-4">Add New Payment</h2>

        <form onSubmit={handleSubmit}>
          {/* Member Name */}
          <div className="mb-4">
            <label htmlFor="memberName" className="block text-sm font-medium text-gray-700 mb-1">
              Member Name
            </label>
            <input
              type="text"
              id="memberName"
              className={`block w-full border ${errors.memberName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2
                         focus:outline-none focus:border-fitness-primary focus:ring-1 focus:ring-fitness-primary`}
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              required
            />
            {errors.memberName && <p className="text-red-500 text-xs mt-1">{errors.memberName}</p>}
          </div>

          {/* Payment Date */}
          <div className="mb-4">
            <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              id="paymentDate"
              className={`block w-full border ${errors.paymentDate ? 'border-red-500' : 'border-gray-300'} rounded-md p-2
                         focus:outline-none focus:border-fitness-primary focus:ring-1 focus:ring-fitness-primary`}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
            {errors.paymentDate && <p className="text-red-500 text-xs mt-1">{errors.paymentDate}</p>}
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              className={`block w-full border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md p-2
                         focus:outline-none focus:border-fitness-primary focus:ring-1 focus:ring-fitness-primary`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              className={`block w-full border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded-md p-2
                         focus:outline-none focus:border-fitness-primary focus:ring-1 focus:ring-fitness-primary`}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              rows="3"
              className="block w-full border border-gray-300 rounded-md p-2
                         focus:outline-none focus:border-fitness-primary focus:ring-1 focus:ring-fitness-primary"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md
                         hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75
                         transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-fitness-primary text-white font-bold py-2 px-4 rounded-md
                         hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75
                         transition duration-200 ease-in-out"
            >
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// This is a placeholder for the actual Tailwind CSS setup.
// In a real Vite/React project, you would have an index.css
// with @tailwind directives and a tailwind.config.js file.
// For this self-contained example, we'll simulate the global styles.
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Simulate Tailwind base styles */
  *, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb; /* gray-200 */
  }

  /* Simulate Tailwind utilities and custom colors */
  .bg-fitness-background-light { background-color: ${tailwindConfigColors['fitness-background-light']}; }
  .bg-fitness-card-light { background-color: ${tailwindConfigColors['fitness-card-light']}; }
  .text-fitness-text-dark { color: ${tailwindConfigColors['fitness-text-dark']}; }
  .bg-fitness-primary { background-color: ${tailwindConfigColors['fitness-primary']}; }
  .hover\\:bg-green-600:hover { background-color: #22c55e; } /* Tailwind default green-600 */
  .focus\\:ring-green-500:focus { --tw-ring-color: #22c55e; } /* Tailwind default green-500 */
  .focus\\:border-fitness-primary:focus { border-color: ${tailwindConfigColors['fitness-primary']}; }
  .focus\\:ring-fitness-primary:focus { --tw-ring-color: ${tailwindConfigColors['fitness-primary']}; }
`;
document.head.appendChild(style);


export default App;
