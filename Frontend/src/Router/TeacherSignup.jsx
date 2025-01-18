import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TeacherSignup() {
  const [teaSignupInfo, setteaSignUpInfo] = useState({
    teaName: "",
    teaEmail: "",
    teaGender: "",
    teaId: "",
    teaPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setteaSignUpInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { teaName, teaEmail, teaGender, teaId, teaPassword } = teaSignupInfo;

    // Frontend validation
    if (!teaName || !teaEmail || !teaPassword || !teaGender || !teaId) {
      toast.error("All fields are required");
      return;
    }

    try {
      const url = "http://localhost:9000/auth/signup/teacher";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teaSignupInfo),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle backend error messages
        throw new Error(result.message || "Signup failed, please try again.");
      }

      // Successful response
      toast.success(result.message || "Signup successful!");
      navigate("/TeacherLogin"); // Redirect to login page
    } catch (err) {
      console.error("Signup error:", err); // Log for debugging
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FABC3F]">
      <ToastContainer />
      <div
        className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full 
                     transform transition duration-500 
                     hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)]"
      >
        <h2 className="text-2xl font-bold text-[#000] text-center mb-6">
          Admin Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          {/* Form Inputs */}
          {[
            { label: "Name of Admin", name: "teaName", type: "text" },
            { label: "admEmail of Admin", name: "teaEmail", type: "teaEmail" },
            { label: "Gender", name: "teaGender", type: "text" },
            { label: "Admin ID", name: "teaId", type: "text" },
            { label: "Password", name: "teaPassword", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}:
              </label>
              <input
                type={type}
                name={name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handleChange}
                value={teaSignupInfo[name]}
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200"
            >
              Sign Up Now
            </button>

            <Link
              to="/TeacherLogin"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#821131] hover:text-white hover:shadow-xl transition duration-200"
            >
              Login Instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignup;
