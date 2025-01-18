import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TeacherLogin() {
  const [teaLoginInfo, setTeaLoginInfo] = useState({
    teaEmail: "",
    teaPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeaLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { teaEmail, teaPassword } = teaLoginInfo;

    // Validation checks
    if (!teaEmail || !teaPassword) {
      return toast.error("All fields are required.");
    }
    if (teaPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }

    try {
      const url = "http://localhost:9000/auth/login/teacher"; // Ensure this is correct
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teaEmail, teaPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Display error message from server
        console.error("Login failed:", result);
        return toast.error(result.error || result.message || "Login failed.");
      }

      const { message, token, teaName } = result;

      // Save the token to localStorage
      if (token) {
        localStorage.setItem("token", token); // Save JWT token
        toast.success(`Welcome, ${teaName || "Teacher"}!`);
        navigate("/TeacherDash"); // Navigate to teacher dashboard
      } else {
        toast.error("Failed to retrieve token.");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-[#FABC3F] flex items-center justify-center min-h-screen bg-gradient-to-b from-white-300 to-green-500">
      <ToastContainer />
      <div
        className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full 
                     transform transition duration-500 
                     hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)]"
      >
        <h2 className="text-2xl text-center font-bold text-black mb-6">
          Teacher Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="teaEmail"
              value={teaLoginInfo.teaEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="teaPassword"
              value={teaLoginInfo.teaPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
            >
              Login Now <span className="ml-2">→</span>
            </button>

            <Link
              to="/TeacherSignup"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
            >
              Sign Up Now <span className="ml-2">→</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
