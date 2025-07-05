import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");
    setMessageType("info");

    try {
      const res = await axios.post(
        BASE_URL + "/reset-password",
        { id, newPassword: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus(res.data.message || "Password reset successful!");
      setMessageType("success");
      navigate("/login");
    } catch (err) {
      setStatus(err.response?.data?.message || "Failed to reset password");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full sm:p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Please enter your new password below.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg transition duration-150 ease-in-out"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105
              ${isLoading ? 'opacity-60 cursor-not-allowed' : 'shadow-md'}
            `}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {status && (
          <div
            className={`mt-6 p-4 rounded-lg text-center text-sm font-medium
              ${messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : ''}
              ${messageType === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : ''}
              ${messageType === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-300' : ''}
            `}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
