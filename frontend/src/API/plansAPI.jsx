import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/plans",
    headers: {"Content-Type": "application/json"},
});

API.interceptors.request.use((config)=>{
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;