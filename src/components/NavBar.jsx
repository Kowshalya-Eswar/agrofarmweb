import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { logoutUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Navbar = () =>{
    
  const { currentUser, isAuthenticated, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {items} = useSelector((state) => state.cart);
  const totalCartItems = items.reduce((total, item) => total + item.quantity, 0);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  /**
   * handleLogout function
   * Clears the user's session by calling the backend logout API and updates Redux state.
   */
  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + 'logout', { withCredentials: true });
      dispatch(logoutUser()); // Dispatch Redux logout action
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      dispatch(logoutUser());
      alert('Logout failed on server, but you have been logged out on client side. Please try again.');
    }
  };
  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };
  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
          <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          AgriFarm
        </Link>

        {/* Navigation Links */} 
        <div className="flex items-center space-x-6">
          <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-200">
            Products
          </Link>

          <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-200 relative">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"></path>
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative flex items-center gap-2 text-white">
              {/* Settings Icon */}
                <span className="text-sm font-medium">
                  {currentUser?.userName || currentUser?.email || "User"}
                </span>

              <button
                onClick={toggleSettingsDropdown}
                className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isSettingsDropdownOpen ? "true" : "false"}
              >
                {/* Cog/Settings SVG Icon (Lucide React equivalent) */}
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.827 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.827 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.827-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.827-3.31 2.37-2.37.527.272 1.053.429 1.573.429.539 0 1.077-.16 1.573-.429z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isSettingsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/orders-history"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsSettingsDropdownOpen(false)}
                  >
                    View Orders
                  </Link>
                  <Link
                    to="/profile" // Placeholder for user profile page
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsSettingsDropdownOpen(false)}
                  >
                    Edit/View Profile
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-200">
                Register
              </Link> 
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;