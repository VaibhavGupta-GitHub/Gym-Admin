import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const admin = {
    username: username,
    email: email,
    password: password,
    confirm_password: confirmPassword,
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/register", admin)
      .then((response) => {
        alert(response.data.message);
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data.detail);
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] border border-gray-700">
        <div className="text-center mb-8">
          <div className="text-red-500 text-5xl font-extrabold mb-2">GYM</div>
          <h1 className="text-gray-200 text-2xl font-semibold">
            Admin Register
          </h1>
        </div>

        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="JohnDoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-400 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a
            href="/"
            className="text-red-400 hover:text-red-500 transition duration-200 ease-in-out"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
