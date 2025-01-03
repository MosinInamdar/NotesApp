import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to Notes App</h1>
      <p className="text-lg mb-6">Your thoughts, organized in one place.</p>
      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
          onClick={() => handleNavigation("/signup")}
        >
          Sign Up
        </button>
        <button
          className="px-6 py-2 bg-white text-blue-500 font-semibold rounded-md border border-blue-500 shadow hover:bg-blue-50"
          onClick={() => handleNavigation("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
