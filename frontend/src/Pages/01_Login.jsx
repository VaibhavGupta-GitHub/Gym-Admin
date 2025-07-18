import React, { useState } from 'react';

// Main App component
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real application, you would send these credentials to a backend for authentication.
    // For this example, we'll just show a success or error message.
    if (email === 'admin@gym.com' && password === 'password123') {
      setMessage('Login successful! Redirecting...');
      // Simulate redirection
      setTimeout(() => {
        setMessage('');
        // window.location.href = '/dashboard'; // Example redirection
      }, 2000);
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    // Main container: full screen, dark background, flexbox for centering
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      {/* Login card container: dark background, rounded corners, soft shadow, responsive width */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] border border-gray-700">
        {/* Gym Logo Placeholder */}
        <div className="text-center mb-8">
          {/* Using a simple text placeholder for the logo */}
          <div className="text-blue-500 text-5xl font-extrabold mb-2">
            GYM
          </div>
          <h1 className="text-gray-200 text-2xl font-semibold">Admin Login</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p className={`mt-6 text-center text-sm ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        {/* Optional: Forgot Password / Sign Up links */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">
            Forgot Password?
          </a>
          {/* <span className="mx-2">|</span>
          <a href="#" className="hover:text-blue-400 transition duration-200 ease-in-out">
            Sign Up
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default App;
