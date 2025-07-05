import React, { useState, useEffect, useMemo } from 'react';

// Main App component
const App = () => {
  // State for managing member data
  const [members, setMembers] = useState(() => {
    // Initialize with some dummy data for demonstration
    const storedMembers = localStorage.getItem('gymMembers');
    return storedMembers ? JSON.parse(storedMembers) : [
      { id: '1', name: 'Alice Smith', phone: '123-456-7890', plan: 'Premium', startDate: '2023-01-15', endDate: '2024-01-15' },
      { id: '2', name: 'Bob Johnson', phone: '098-765-4321', plan: 'Basic', startDate: '2023-03-01', endDate: '2023-09-01' },
      { id: '3', name: 'Charlie Brown', phone: '555-123-4567', plan: 'Standard', startDate: '2023-02-10', endDate: '2024-02-10' },
      { id: '4', name: 'Diana Prince', phone: '111-222-3333', plan: 'Premium', startDate: '2023-04-20', endDate: '2024-04-20' },
      { id: '5', name: 'Eve Adams', phone: '444-555-6666', plan: 'Basic', startDate: '2023-05-01', endDate: '2023-11-01' },
      { id: '6', name: 'Frank White', phone: '777-888-9999', plan: 'Standard', startDate: '2023-06-12', endDate: '2024-06-12' },
      { id: '7', name: 'Grace Lee', phone: '222-333-4444', plan: 'Premium', startDate: '2023-07-01', endDate: '2024-07-01' },
      { id: '8', name: 'Henry King', phone: '666-777-8888', plan: 'Basic', startDate: '2023-08-15', endDate: '2024-02-15' },
      { id: '9', name: 'Ivy Queen', phone: '999-000-1111', plan: 'Standard', startDate: '2023-09-01', endDate: '2024-09-01' },
      { id: '10', name: 'Jack Knight', phone: '333-444-5555', plan: 'Premium', startDate: '2023-10-10', endDate: '2024-10-10' },
      { id: '11', name: 'Karen Miller', phone: '888-999-0000', plan: 'Basic', startDate: '2023-11-01', endDate: '2024-05-01' },
      { id: '12', name: 'Liam Davis', phone: '000-111-2222', plan: 'Standard', startDate: '2023-12-05', endDate: '2024-12-05' },
    ];
  });

  // Effect to save members to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gymMembers', JSON.stringify(members));
  }, [members]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5); // Number of members to display per page

  // State for modal visibility and current member being edited
  const [showModal, setShowModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null); // Null for add, object for edit

  // Filtered members based on search term
  const filteredMembers = useMemo(() => {
    return members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.plan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle adding a new member
  const handleAddMember = (newMember) => {
    setMembers(prevMembers => [...prevMembers, { ...newMember, id: Date.now().toString() }]);
    setShowModal(false);
  };

  // Handle editing an existing member
  const handleEditMember = (updatedMember) => {
    setMembers(prevMembers =>
      prevMembers.map(member => (member.id === updatedMember.id ? updatedMember : member))
    );
    setShowModal(false);
    setCurrentMember(null); // Clear current member after editing
  };

  // Handle deleting a member
  const handleDeleteMember = (id) => {
    // Use a custom confirmation dialog instead of alert/confirm
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (confirmDelete) {
      setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
    }
  };

  // Open modal for adding a new member
  const openAddModal = () => {
    setCurrentMember(null);
    setShowModal(true);
  };

  // Open modal for editing an existing member
  const openEditModal = (member) => {
    setCurrentMember(member);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 p-4 font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
            Gym Member Management
          </h1>
          <button
            onClick={openAddModal}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
          >
            Add New Member
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, phone, or plan..."
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm transition duration-200"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMembers.length > 0 ? (
                currentMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-teal-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{member.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.plan === 'Premium' ? 'bg-green-100 text-green-800' :
                        member.plan === 'Standard' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{member.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{member.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => openEditModal(member)}
                        className="text-blue-600 hover:text-blue-900 mr-3 transition duration-150 ease-in-out transform hover:scale-110"
                        title="Edit"
                      >
                        {/* Edit Icon (SVG) */}
                        <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out transform hover:scale-110"
                        title="Delete"
                      >
                        {/* Delete Icon (SVG) */}
                        <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Previous Icon */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === number + 1 ? 'z-10 bg-teal-50 border-teal-500 text-teal-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Next Icon */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}

        {/* Add/Edit Member Modal */}
        {showModal && (
          <MemberModal
            member={currentMember}
            onClose={() => setShowModal(false)}
            onSave={currentMember ? handleEditMember : handleAddMember}
          />
        )}
      </div>
    </div>
  );
};

// Member Modal Component
const MemberModal = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    member || { name: '', phone: '', plan: 'Basic', startDate: '', endDate: '' }
  );

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 md:scale-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {member ? 'Edit Member' : 'Add New Member'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="plan" className="block text-gray-700 text-sm font-semibold mb-2">Plan</label>
            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              required
            >
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-semibold mb-2">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 text-sm font-semibold mb-2">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
            >
              {member ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
