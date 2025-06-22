import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'idle', 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Basic client-side validation
    if (!name || !email || !message) {
      setStatus('error');
      alert('Please fill in all fields.'); // Using alert for simplicity, replace with custom modal in production
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      alert('Please enter a valid email address.'); // Using alert for simplicity, replace with custom modal in production
      return;
    }

    try {
      const response = await fetch(BASE_URL + '/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, phone }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
      } else {
        setStatus('error');
        // In a real app, use data.message from backend
        alert('Failed to send message. Please try again later.'); // Using alert for simplicity
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      alert('An unexpected error occurred. Please try again.'); // Using alert for simplicity
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Contact Us</h1>
        <p className="text-gray-700 text-center mb-6">
          Have a question or feedback? Feel free to reach out to us using the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {status === 'success' && (
            <div className="mt-4 p-3 rounded-lg text-center text-sm font-medium bg-green-100 text-green-800">
              Your message has been sent successfully! We'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 p-3 rounded-lg text-center text-sm font-medium bg-red-100 text-red-800">
              There was an error sending your message. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;