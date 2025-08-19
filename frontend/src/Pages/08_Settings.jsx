import React, { useEffect, useState } from "react";
import PlanAPI from "../API/plansAPI";
import GymAPI from "../API/gym_infoAPI";
import axios from "axios";

// Main App component for the Gym Admin Settings Page
function App() {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("gymInfo");

  // State for Gym Information
  const [gymName, setGymName] = useState("Fitness Hub Gym");
  const [gymLogoUrl, setGymLogoUrl] = useState(
    "https://placehold.co/150x150/000000/FFFFFF?text=Gym+Logo"
  );

  // State for Change Password
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // State for Membership Plans
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });
  const [editingPlanId, setEditingPlanId] = useState(null);

  // --- Handlers for Gym Information ---
  const handleSaveGymInfo = () => {
    // In a real application, you would send this data to a backend API
    console.log("Saving Gym Info:", { gymName, gymLogoUrl });
    // Display a success message or handle errors
    alert("Gym information updated successfully!");
  };

  // --- Handlers for Change Password ---
  const handleChangePassword = async () => {
    if (!email || !currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordMessage("All password fields are required.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters long.");
      return;
    }

    // In a real application, you would send this data to a backend API for validation and update
    const data = {
      email: email,
      old_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reset-password",
        data
      );
      console.log(response.data);
      if (response.status === 200) {
        setPasswordMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      console.error("Error reseting password:", error);
      alert("Unauthorized or faild to reset password.");
    }
  };

  // --- Handlers for Membership Plans ---
  const fetchPlans = async () => {
    try {
      const response = await PlanAPI.get("/");
      console.log(response.data);
      setMembershipPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      alert("Unauthorized or faild to fetch plans.");
    }
  };

  useEffect(() => {
    fetchPlans(); // Existing function for plans
  }, []);

  const handleAddPlan = async () => {
    try {
      if (
        !newPlan.name ||
        !newPlan.price ||
        !newPlan.duration ||
        !newPlan.description
      ) {
        alert("Please fill in all fields for the new membership plan.");
        return;
      }
      const plan = {
        ...newPlan,
      };
      const response = await PlanAPI.post("/", plan);
      setMembershipPlans((prev) => [...prev, response.data.details]);
      setNewPlan({ name: "", price: "", duration: "", description: "" });
      alert("Plan added successfully.");
    } catch (error) {
      console.error("Add failed", error);
      alert("Could not add plan.");
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlanId(plan.id);
    setNewPlan({ ...plan }); // Populate the form with the plan being edited
  };

  const handleUpdatePlan = async () => {
    try {
      if (
        !newPlan.name ||
        !newPlan.price ||
        !newPlan.duration ||
        !newPlan.description
      ) {
        alert("Please fill in all fields for the membership plan.");
        return;
      }
      const updatedPlan = {
        name: newPlan.name,
        price: newPlan.price,
        duration: newPlan.duration,
        description: newPlan.description,
      };
      const response = await PlanAPI.put(`${editingPlanId}`, updatedPlan);
      setMembershipPlans((prev) =>
        prev.map((plan) =>
          plan.id === editingPlanId ? response.data.details : plan
        )
      );
      setEditingPlanId(null);
      setNewPlan({ name: "", price: "", duration: "", description: "" }); // Clear form
      alert("Plan updated successfully.");
    } catch (error) {
      console.error("Edit failed:", error);
      alert("Failed to update plan.");
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await PlanAPI.delete(`/${id}`);
        setMembershipPlans((prev) => prev.filter((plan) => plan.id !== id));
        alert("Successfully deleted plan.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete plan.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingPlanId(null);
    setNewPlan({ name: "", price: "", duration: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Gym Settings
        </h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 text-lg font-medium rounded-t-lg transition-all duration-200
              ${
                activeTab === "gymInfo"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            onClick={() => setActiveTab("gymInfo")}
          >
            Gym Information
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium rounded-t-lg transition-all duration-200
              ${
                activeTab === "security"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium rounded-t-lg transition-all duration-200
              ${
                activeTab === "membershipPlans"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            onClick={() => setActiveTab("membershipPlans")}
          >
            Membership Plans
          </button>
        </div>

        {/* Tab Content - Gym Information */}
        {activeTab === "gymInfo" && (
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
              Update Gym Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <label
                  htmlFor="gymName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Gym Name
                </label>
                <input
                  type="text"
                  id="gymName"
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  placeholder="Enter gym name"
                />
              </div>

              <div className="flex flex-col items-center">
                <label
                  htmlFor="gymLogo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Gym Logo
                </label>
                <img
                  src={gymLogoUrl}
                  alt="Gym Logo"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/150x150/CCCCCC/000000?text=No+Logo";
                  }}
                />
                <input
                  type="text"
                  id="gymLogo"
                  className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  value={gymLogoUrl}
                  onChange={(e) => setGymLogoUrl(e.target.value)}
                  placeholder="Enter logo image URL"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter a URL for the gym logo. (e.g.,
                  https://example.com/logo.png)
                </p>
              </div>
            </div>

            <div className="mt-8 text-right">
              <button
                onClick={handleSaveGymInfo}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                Save Gym Information
              </button>
            </div>
          </div>
        )}

        {/* Tab Content - Security (Change Password) */}
        {activeTab === "security" && (
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
              Change Password
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmNewPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            {passwordMessage && (
              <p
                className={`text-sm mb-4 ${
                  passwordMessage.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {passwordMessage}
              </p>
            )}
            <div className="text-right">
              <button
                onClick={handleChangePassword}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Tab Content - Membership Plans */}
        {activeTab === "membershipPlans" && (
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
              Manage Membership Plans
            </h2>

            {/* Add/Edit Plan Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {editingPlanId
                  ? "Edit Membership Plan"
                  : "Add New Membership Plan"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="planName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Plan Name
                  </label>
                  <input
                    type="text"
                    id="planName"
                    className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    value={newPlan.name}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, name: e.target.value })
                    }
                    placeholder="e.g., Basic, Premium"
                  />
                </div>
                <div>
                  <label
                    htmlFor="planPrice"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="planPrice"
                    className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    value={newPlan.price}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, price: e.target.value })
                    }
                    placeholder="e.g., 30, 500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="planDuration"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="planDuration"
                    className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    value={newPlan.duration}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, duration: e.target.value })
                    }
                    placeholder="e.g., 1 Month, 12 Months"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="planDescription"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="planDescription"
                    rows="3"
                    className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
                    value={newPlan.description}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, description: e.target.value })
                    }
                    placeholder="Brief description of the plan benefits"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                {editingPlanId ? (
                  <>
                    <button
                      onClick={handleUpdatePlan}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                    >
                      Update Plan
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddPlan}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Add Plan
                  </button>
                )}
              </div>
            </div>

            {/* Existing Plans List */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Current Membership Plans
            </h3>
            <div className="space-y-4">
              {membershipPlans.length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  No membership plans added yet.
                </p>
              ) : (
                membershipPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
                  >
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-xl font-bold text-gray-800">
                        {plan.name}
                      </h4>
                      <p className="text-gray-600">
                        <span className="font-semibold">₹{plan.price}</span> /{" "}
                        {"Duration - "}
                        {plan.duration}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {plan.description}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditPlan(plan)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
