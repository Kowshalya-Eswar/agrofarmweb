import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Navbar = () =>{
    
  const { currentUser, isAuthenticated, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Site Title */}
        <a href="/" className="text-3xl font-bold tracking-tight transform hover:scale-105 transition-transform duration-200 ease-in-out">
          AgriFarm Store
        </a>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="/" className="text-lg font-medium hover:text-blue-200 transition-colors duration-200">Home</a>
          <a href="/products" className="text-lg font-medium hover:text-blue-200 transition-colors duration-200">Products</a>
          {/* Add more common navigation links as needed */}
        </div>

        {/* User Actions / Auth Status */}
        <div className="flex items-center space-x-6">
          {isAuthenticated && currentUser ? (
            <>
              {/* User's First and Last Name */}
              <span className="text-lg font-semibold px-3 py-1 rounded-full bg-blue-600">
                {currentUser.firstName} {currentUser.lastName}
              </span>

              {/* Cart Icon/Link */}
              <a href="/cart" className="text-lg font-medium hover:text-blue-200 transition-colors duration-200 flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
              </a>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={loading} // Disable if logout is in progress
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 shadow-md text-lg font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login Link */}
              <a href="/login" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md text-lg font-medium">
                Login
              </a>
              {/* Register Link */}
              <a href="/register" className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md text-lg font-medium">
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;