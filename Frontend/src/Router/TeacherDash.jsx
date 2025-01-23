import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Active from "../components/Active";
import Record from "../components/Record";
import { LuUsers, LuMessageSquare } from "react-icons/lu";
import { FaSuitcase } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { handleError, handleSuccess } from "../utils";
import { RiLogoutCircleRLine } from "react-icons/ri";

const TeacherDash = () => {
  const [activeComponent, setActiveComponent] = useState("attendance");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

 

  const handleLogout = () => {

    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };


  const renderComponent = () => {
    switch (activeComponent) {
      case "attendanceRecord":
        return <Record />;
      case "attendanceTab":
        return <Active />;
      default:
        return <Record />;
    }
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row mb:2.5rem text-gray-50">
        {/* Toggle Button for Mobile View */}
        <button
          className="md:hidden fixed top-3 left-3 z-50 bg-[#0c4e3c] text-white p-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-screen border-r pt-10 px-4 bg-[#0c4e3c] transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
        >
          {/* Logo Section */}
          <div className="mb-4">
            <h1 className="text-[#15F5BA] cursor-pointer font-bold text-center text-lg md:text-xl lg:text-2xl">
              ATTENDIFY
            </h1>
          </div>

        

          {/* Navigation Links */}
          <ul className="space-y-7 text-white ml-6">
            <li
              onClick={() => setActiveComponent("attendanceRecord")}
              className="cursor-pointer flex items-center space-x-2"
            >
              <LuMessageSquare /> <span>Attendance Record</span>
            </li>
            <li
              onClick={() => setActiveComponent("attendanceTab")}
              className="cursor-pointer flex items-center space-x-2"
            >
              <LuUsers /> <span>Attendance</span>
            </li>
          </ul>

          {/* Logout Section */}
          <div
            className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center"
            onClick={handleLogout}
          >
            <p className="flex items-center space-x-2 text-xs text-[#000] py-2 px-5 bg-[#15F5BA] rounded-full">
              <RiLogoutCircleRLine className="w-4 h-4" />
              <span className="md:flex">Log Out</span>
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:ml-56 p-4 bg-[#F0F3FF] min-h-screen flex flex-col">
          {renderComponent()}
        </main>
      </div>
    </section>
  );
};

export default TeacherDash;
