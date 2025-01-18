import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";

function StudentLogin() {
  const [stuLoginInfo, setStuLoginInfo] = useState({
    stuName: "",
    stuId: "",
    stuPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStuLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const { stuName, stuId, stuPassword } =  stuLoginInfo;
  
    // Basic Form Validation
    if (!stuName || !stuId || !stuPassword) {
      return handleError("All fields are required");
    }
  
    if (stuPassword.length < 6) {
      return handleError("Password must be at least 6 characters long");
    }
  
    try {
      const url = `http://localhost:9000/auth/login/student`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stuName, stuId, stuPassword }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const { success, message, jwtToken } = result;
  
        if (success) {
          handleSuccess(message || "Login successful");
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("stuName", stuName); 
          setTimeout(() => {
            navigate("/StudentDash");
          }, 1000);
        } else {
          handleError(message || "Login failed");
        }
      } else {
        const errorMessage =
          result.error?.details?.[0]?.message || result.message || "Invalid credentials";
        handleError(errorMessage);
      }
    } catch (err) {
      handleError(err.message || "An unexpected error occurred");
    }
  };
  
  return (
    <div className="bg-[#071952] flex items-center justify-center min-h-screen bg-gradient-to-b from-white-300 to-green-500">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full transform transition duration-500 hover:scale-105 hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)] hover:bg-white">
        <h2 className="text-2xl text-center font-bold text-[#37B7C3] mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="stuName"
              value={stuLoginInfo.stuName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empId">
              Registration Number
            </label>
            <input
              type="text"
              id="stuId"
              name="stuId"
              value={stuLoginInfo.stuId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="stuPassword"
              value={stuLoginInfo.stuPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
            >
              Login Now <span className="ml-2">→</span>
            </button>

            <Link to="/StudentSignup">
              <button
                type="button"
                className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
              >
                Sign Up Now <span className="ml-2">→</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
