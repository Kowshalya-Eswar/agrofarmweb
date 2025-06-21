import { Link } from 'react-router-dom';

const Thankyou = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <svg
          className="mx-auto h-24 w-24 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-6 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-6">Your order has been placed successfully.</p>
        <p className="text-gray-600 mb-8">We appreciate your business! You will receive an email confirmation shortly.</p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md transform hover:scale-105"
          >
            Continue Shopping
          </Link>
          {
          <Link
            to="/orders-history"
            className="inline-block bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md transform hover:scale-105"
          >
            View Your Orders
          </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default Thankyou;