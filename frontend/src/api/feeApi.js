//feeApi.js
import axios from "axios";

// Base URL of the FastAPI backend
const BASE_URL = "http://127.0.0.1:8000";

// ============================
// Function: Get fee status
// Endpoint: GET /fees/status
// ============================
export const getFeeStatus = async () => {
  const response = await axios.get(`${BASE_URL}/fees/status`);
  return response.data;
};
