import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage(''); // Clear previous messages

    // Basic client-side validation
    if (!name || !email || !message) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    try {
      // For demonstration, we'll simulate an API call delay.
      // In a real application, this `fetch` call will send data to your backend.
      const response = await fetch(`${BASE_URL}/contacts`, { // Use template literal for BASE_URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, phone }),
      });
      const data = await response.json();

      if (response.ok && data.success) { // Check response.ok for HTTP success, and data.success from backend
        setStatus('success');
        setStatusMessage('Your message has been sent successfully! We\'ll get back to you soon.');
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
      } else {
        setStatus('error');
        // Use data.message from backend if available, otherwise a generic error
        setStatusMessage(data.message || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      setStatusMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-6 font-inter">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full flex flex-col md:flex-row gap-8">
        {/* Contact Form Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-700 mb-6">
            Have a question or feedback? Feel free to reach out to us using the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'sending'}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
              <input
                type="text"
                id="phoneno"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="+91"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={status === 'sending'}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === 'sending'}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-md transform hover:scale-105
                ${status === 'sending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
              `}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Message'}
            </button>

            {(status === 'success' || status === 'error') && statusMessage && (
              <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium
                ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {statusMessage}
              </div>
            )}
          </form>
        </div>

        {/* Address and Contact Info Section */}
        <div className="flex-1 mt-8 md:mt-0 md:border-l md:pl-8 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Details</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold text-gray-800">Address:</p>
              <p>11th ward, ThirumurthiNagar,</p>
              <p>Udumalpet - 642112,</p>
              <p>Tamil Nadu, India.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Phone:</p>
              <a href="tel:+919876543210" className="text-indigo-600 hover:underline">+91 6380215500</a>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Email:</p>
              <a href="mailto:support@cocofields.in" className="text-indigo-600 hover:underline">support@cocofields.in</a>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Business Hours:</p>
              <p>Monday - Friday: 9:00 AM - 5:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
