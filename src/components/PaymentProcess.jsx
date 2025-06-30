import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../utils/cartSlice'; 
import { BASE_URL } from '../utils/constants';
import { useRazorpay } from 'react-razorpay';
const Checkout = () => {
  const { Razorpay } = useRazorpay();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const [shippingAddress, setShippingAddress] = useState({
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India', // Default to India
      landmark: '' // Add this if you decided to include it in schema
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [isLoading, setIsLoading] = useState(false);
  const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
    };
  const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
        "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Lakshadweep", "Delhi", "Puducherry"
    ].sort();
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


  const handlePlaceOrder = async (e) => {
      e.preventDefault();
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
        shippingAddress : shippingAddress,
      }, {
        withCredentials: true
      });
      
      if (response.data.success) {
        const order = response.data.data;
        const { amountPaid, key, orderId:order_id, notes } = order;

        const options = {
          key,
          amount:amountPaid,
          currency: "INR",
          name: "cocoFields",
          description: "order placement",
          order_id,
          prefill: {
            name: notes.firstName + " " + notes.lastName,
          },
          theme: {
            color: "#99ff99"
          }

        }
        const rzp = new Razorpay(options);
        rzp.open();
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

                    {/* Shipping Information and Payment Column */}
                    {/* IMPORTANT: Wrap the entire right column in a <form> tag */}
                    <div className="bg-white rounded-xl shadow-lg p-6"> 
                        <form method="post"  onSubmit={(e) => handlePlaceOrder(e)}>

                            {/* Shipping Information Section */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>

                            {/* Street Address */}
                            <div className="form-control mb-4">
                                <label htmlFor="street" className="label">
                                    <span className="label-text text-lg font-medium text-gray-700">Street Address</span>
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    placeholder="House No., Building Name, Area"
                                    className="input input-bordered w-full text-base"
                                    value={shippingAddress.street}
                                    onChange={handleAddressChange}
                                    disabled={isLoading}
                                    required // This will now work!
                                />
                            </div>

                            {/* Landmark (Optional) */}
                            <div className="form-control mb-4">
                                <label htmlFor="landmark" className="label">
                                    <span className="label-text text-lg font-medium text-gray-700">Landmark (Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="landmark"
                                    name="landmark"
                                    placeholder="e.g., Near Bus Stand, Opposite Temple"
                                    className="input input-bordered w-full text-base"
                                    value={shippingAddress.landmark}
                                    onChange={handleAddressChange}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* City */}
                            <div className="form-control mb-4">
                                <label htmlFor="city" className="label">
                                    <span className="label-text text-lg font-medium text-gray-700">City</span>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Your City"
                                    className="input input-bordered w-full text-base"
                                    value={shippingAddress.city}
                                    onChange={handleAddressChange}
                                    disabled={isLoading}
                                    required // This will now work!
                                />
                            </div>

                            {/* State & Pincode - Use a grid for better layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* State */}
                                <div className="form-control">
                                    <label htmlFor="state" className="label">
                                        <span className="label-text text-lg font-medium text-gray-700">State</span>
                                    </label>
                                    <select
                                        id="state"
                                        name="state"
                                        className="select select-bordered w-full text-base"
                                        value={shippingAddress.state}
                                        onChange={handleAddressChange}
                                        disabled={isLoading}
                                        required // This will now work!
                                    >
                                        <option value="" disabled>Select your State</option>
                                        {indianStates.map((stateName) => (
                                            <option key={stateName} value={stateName}>{stateName}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Pincode */}
                                <div className="form-control">
                                    <label htmlFor="pincode" className="label">
                                        <span className="label-text text-lg font-medium text-gray-700">Pincode</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        placeholder="6 digits Pincode"
                                        className="input input-bordered w-full text-base"
                                        value={shippingAddress.pincode}
                                        onChange={handleAddressChange}
                                        disabled={isLoading}
                                        required // This will now work!
                                        maxLength="6"
                                        pattern="[0-9]{6}"
                                        title="Please enter a 6-digit pincode"
                                    />
                                </div>
                            </div>

                            {/* Country - Fixed to India */}
                            <div className="form-control mb-6">
                                <label htmlFor="country" className="label">
                                    <span className="label-text text-lg font-medium text-gray-700">Country</span>
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="input input-bordered w-full text-base bg-gray-100 cursor-not-allowed"
                                    value="India"
                                    readOnly
                                    disabled={isLoading}
                                />
                                <input type="hidden" name="country" value="India" />
                            </div>

                            {/* Payment Method Section - Updated for Razorpay */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Payment Method</h2>
                            <div className="p-4 bg-blue-50 rounded-lg text-blue-800 mb-6 border border-blue-200">
                                <p className="font-semibold text-lg mb-2">Secure Payment powered by Razorpay</p>
                                <p className="text-sm">
                                    By clicking 'Proceed to Payment with Razorpay', you will be redirected to a secure Razorpay page to complete your payment.
                                    We accept all major credit/debit cards, UPI, net banking, and wallets.
                                </p>
                                <div className="flex items-center justify-center mt-4">
                                    <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay Logo" className="h-8" />
                                </div>
                            </div>

                            {/* Place Order Button - Changed type to submit */}
                            <button
                                type="submit" // Crucial: This makes it a submit button
                                disabled={isLoading || items.length === 0}
                                className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-md transform hover:scale-105
                                    ${isLoading || items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}
                                `}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Redirecting for Payment...
                                    </span>
                                ) : 'Proceed to Payment with Razorpay'}
                            </button>

                            {/* Message Display */}
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
                        </form> {/* Close the form tag here */}
                    </div>
                </div>
            )}
        </div>
    );
    
}

export default Checkout;