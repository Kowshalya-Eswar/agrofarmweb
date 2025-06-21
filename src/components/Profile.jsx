import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
const Profile = () => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // Email is typically not editable
  const [userName, setUserName] = useState(''); // Username is typically not editable
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Populate form fields when currentUser data is available or changes
  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setEmail(currentUser.email || '');
      setUserName(currentUser.userName || '');
      setPhone(currentUser.phone || '');
      setAge(currentUser.age || '');
      setGender(currentUser.gender || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setIsLoading(true);

    const updatedData = {
      firstName,
      lastName,
      phone,
      age: parseInt(age) || undefined, // Convert to number, or undefined if not valid
      gender,
    };

    // Filter out empty strings or unchanged values if desired, to send only what's changed
    // For simplicity, sending all fields that are bound to state.
    // Backend will handle which fields are actually allowed to be updated.

    try {
      // Send PATCH request to a new backend endpoint for profile updates
      const response = await axios.patch(BASE_URL + 'user', updatedData, {
        withCredentials: true, // Send JWT cookie
      });

      if (response.data.success) {
        setMessage('Profile updated successfully!');
        setMessageType('success');
        // Update the user data in the Redux store with the new data from the backend
        dispatch(addUser(response.data.data))
      } else {
        setMessage(response.data.message || 'Failed to update profile.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage(error.response?.data?.message || `Network error: ${error.message}. Is backend running?`);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
        <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Your Profile</h1>

      {/* Adjusted maxHeight to provide more space for the form */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Read-only fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              value={email}
              readOnly
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              value={userName}
              readOnly
              disabled
            />
          </div>

          {/* Editable fields */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              id="phone"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
            <input
              type="number"
              id="age"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
              id="gender"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-md text-lg font-semibold transition-colors duration-200 shadow-md transform hover:scale-105
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : 'Update Profile'}
          </button>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-center text-sm font-medium
                ${messageType === 'success' ? 'bg-green-100 text-green-800' : ''}
                ${messageType === 'error' ? 'bg-red-100 text-red-800' : ''}
              `}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
