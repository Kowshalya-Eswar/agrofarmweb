import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    phone: '',
    age: '',
    gender: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setIsLoading(true);
    setMessage('');
    setMessageType('info');

    // Basic client-side validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.userName || !formData.password || !formData.age || !formData.phone || !formData.gender) {
      setMessage('All fields are required.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setMessage('Please enter a valid email address.');
        setMessageType('error');
        setIsLoading(false);
        return;
    }

    if (formData.password.length < 6) { // Basic password length check, your backend has strong password validation
        setMessage('Password must be at least 6 characters long.');
        setMessageType('error');
        setIsLoading(false);
        return;
    }

    if (isNaN(formData.age) || parseInt(formData.age) < 18) {
      setMessage('Age must be a number and at least 18.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:7777/api/user/register', formData, {
        withCredentials: true // If your backend sets cookies on registration as well
      });

      const res = response.data;

      if (res.success) {
        setMessage(res.message || 'Registration successful! You can now log in.');
        setMessageType('success');
        // Clear form
        setFormData({
          firstName: '', lastName: '', email: '', userName: '',
          password: '', phone: '', age: '', gender: ''
        });
        // Redirect to login page after successful registration
        setTimeout(() => {
          //navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(res.message || 'Registration failed. Please try again.');
        setMessageType('error');
      }

    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage(`Network error: ${error.message}. Is the backend server running?`);
      }
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full sm:p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Register to start shopping!
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input-field"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="input-field"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-field"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="userName" className="sr-only">Username</label>
            <input
              id="userName"
              name="userName"
              type="text"
              autoComplete="username"
              required
              className="input-field"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="input-field"
              placeholder="Password (min 6 chars, strong)"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="input-field"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="age" className="sr-only">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min="18"
                className="input-field"
                placeholder="Age (min 18)"
                value={formData.age}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              required
              className="input-field"
              value={formData.gender}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105
                ${isLoading ? 'opacity-60 cursor-not-allowed' : 'shadow-md'}
              `}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Register'}
            </button>
          </div>
        </form>

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
        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
      {/* Custom styles for input fields */}
      <style jsx>{`
        .input-field {
          appearance: none;
          position: relative;
          display: block;
          width: 100%;
          padding: 0.75rem 1rem; /* Adjusted padding */
          border: 1px solid #d1d5db; /* Gray-300 */
          background-color: #ffffff;
          color: #1f2937; /* Gray-900 */
          border-radius: 0.5rem; /* rounded-lg */
          font-size: 1rem; /* sm:text-lg, base text size */
          line-height: 1.5rem; /* leading-5, base text line height */
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .input-field::placeholder {
          color: #9ca3af; /* Gray-400 */
        }
        .input-field:focus {
          outline: none;
          border-color: #6366f1; /* Indigo-500 */
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); /* Ring-indigo-500 */
        }
        .input-field:disabled {
          background-color: #f3f4f6; /* Gray-100 */
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default Register