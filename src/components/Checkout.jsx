import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../utils/cartSlice'; 
import { BASE_URL } from '../utils/constants';

const Checkout = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(currentUser?.address || ''); // Pre-fill if user has an address
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/register', { state: { from: '/checkout' } }); // Pass state to redirect back after login
    }
  }, [isAuthenticated, navigate]);

  // If cart is empty, redirect to products page or show a message
  useEffect(() => {
    if (isAuthenticated && items.length === 0 && !isLoading) {
      setMessage('Your cart is empty. Please add items before checking out.');
      setMessageType('info');
      // Optionally redirect after a delay
      const timer = setTimeout(() => {
        navigate('/products');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, items.length, navigate, isLoading]);


  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      setMessage('You must be logged in to place an order.');
      setMessageType('error');
      setTimeout(() => navigate('/login', { state: { from: '/checkout' } }), 1500);
      return;
    }

    if (items.length === 0) {
      setMessage('Your cart is empty. Add items to proceed.');
      setMessageType('error');
      return;
    }

    if (!address.trim()) {
      setMessage('Please enter a shipping address.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setMessageType('info');

    try {
      const orderItems = items.map(item => ({
        sku: item.product.sku,
        qty: item.quantity
      }));

      const response = await axios.post(BASE_URL + '/orders', {
        items: orderItems,
        address: address
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setMessage('Order placed successfully! Thank you for your purchase.');
        setMessageType('success');
        dispatch(clearCart()); // Clear cart after successful order
        setTimeout(() => {
          navigate('/thankyou'); //redirect to thank you page
        }, 1000);
      } else {
        setMessage(response.data.message || 'Failed to place order. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      setMessage(error.response?.data?.message || `Network error: ${error.message}. Is backend running?`);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Only render if authenticated, otherwise the useEffect will handle redirection
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Checkout</h1>

      {items.length === 0 && !isLoading ? (
         <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty. Redirecting to products...</p>
          <img src="https://placehold.co/100x100/E0E0E0/808080?text=Empty" alt="Empty Cart" className="mx-auto my-4" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li key={item.product.sku} className="flex justify-between items-center text-gray-700 border-b pb-2 last:border-b-0 last:pb-0">
                  <span className="font-medium">{item.product.productname} (x{item.quantity})</span>
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-2xl font-bold text-gray-900 border-t pt-4 mt-4">
              <span>Total:</span>
              <span className="text-indigo-600">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Information and Payment */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
            <div className="mb-6">
              <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Shipping Address</label>
              <textarea
                id="address"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Enter your full shipping address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
                required
              ></textarea>
            </div>

            {/* Placeholder for Payment Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
              <p>Payment integration is not yet implemented. Your order will be placed as 'pending'.</p>
              <p className="mt-2">For a real application, this section would include credit card forms or payment gateway buttons.</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading || items.length === 0}
              className={`mt-8 w-full py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-md transform hover:scale-105
                ${isLoading || items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Placing Order...
                </span>
              ) : 'Place Order'}
            </button>
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-center text-sm font-medium
                  ${messageType === 'success' ? 'bg-green-100 text-green-800' : ''}
                  ${messageType === 'error' ? 'bg-red-100 text-red-800' : ''}
                  ${messageType === 'info' ? 'bg-blue-100 text-blue-800' : ''}
                `}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;