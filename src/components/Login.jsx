import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
// Main App component to serve as the entry point for the React application.
export default function App() {
  // State variables for email and password input fields.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for displaying messages to the user (e.g., success, error).
  const [message, setMessage] = useState('');
  // State for the type of message ('success', 'error', 'info') to apply appropriate styling.
  const [messageType, setMessageType] = useState('info');
  // State to manage loading status, disabling the button during API calls.
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /**
   * handleLogin function
   * Handles the login process by sending user credentials to the backend.
   */
  const handleLogin = async () => {
    
    setIsLoading(true); // Set loading state to true
    setMessage('');      // Clear any previous messages
    setMessageType('info');

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        email: email,
        password: password
      };

      // Direct Backend Login Call using axios
      const response = await axios.post(BASE_URL + '/login', payload, {
        withCredentials: true // Important for sending/receiving HTTP-only cookies
      });

      // Axios wraps the response in a 'data' property
      const res = response.data;

      if (res.success) { // Check res.success from the backend response
        setMessage(res.message || 'Login successful!');
        setMessageType('success');
        // Clear form on successful login
        setEmail('');
        setPassword('');
        dispatch(addUser(res.data));
        // Redirect to dashboard or home page
        return navigate('/');

      } else {
        // This block might be less frequently hit with axios as it throws errors for non-2xx responses
        setMessage(res.message || 'Login failed. Please check your credentials.');
        setMessageType('error');
      }

    } catch (error) {
      console.error('Login error:', error);
      // Access the error message from the backend response via error.response.data
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage(`Network error: ${error.message}. Is the backend server running?`);
      }
      setMessageType('error');
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full sm:p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to your account
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition duration-150 ease-in-out"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition duration-150 ease-in-out"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            onClick={handleLogin}
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105
              ${isLoading ? 'opacity-60 cursor-not-allowed' : 'shadow-md'}
            `}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Log in'}
          </button>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center text-sm font-medium
              ${messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : ''}
              ${messageType === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : ''}
              ${messageType === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-300' : ''}
            `}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
