//memberApi.js
// Import axios for making HTTP requests
import axios from "axios";

// Base URL of your FastAPI backend
const BASE_URL = "http://127.0.0.1:8000";

// ============================
// Function: Add a new member
// Used by: AddMemberForm.jsx
// ============================
export const addMember = async (memberData) => {
  const response = await axios.post(`${BASE_URL}/members/`, memberData);
  return response.data;
};

// ============================
// Function: Get all members
// Used by: MemberList.jsx
// ============================
export const getAllMembers = async () => {
  const response = await axios.get(`${BASE_URL}/members/`);
  return response.data;
};

// ============================
// Function: Get one member by ID (optional)
// Could be used for detailed view or editing
// ============================
export const getMemberById = async (id) => {
  const response = await axios.get(`${BASE_URL}/members/${id}`);
  return response.data;
};
