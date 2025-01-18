import React from "react";
import { Link } from "react-router-dom";

import Teacher from "../assets/Teacher.jpg";
import Student from "../assets/Student.jpg";

const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 space-y-6 sm:space-y-0 sm:space-x-6 px-6">
      
      {/* Student Section */}
      <div className="bg-gradient-to-b from-blue-600 to-purple-700 rounded-lg text-white p-8 shadow-2xl max-w-md w-full h-72 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center tracking-widest">
          Student
        </h2>
        <div className="flex justify-center">
          <Link to="/StudentLogin">
            <img
              src={Student}
              alt="Student"
              className="cursor-pointer w-28 h-28 object-cover border-4 border-white p-1 rounded-full transition-transform hover:rotate-6 hover:scale-110"
            />
          </Link>
        </div>
        <p className="text-center mt-4 text-gray-200 text-sm">
          Unlock your journey of learning. Click and start exploring!
        </p>
      </div>

      {/* Teacher Section */}
      <div className="bg-gradient-to-b from-green-500 to-teal-700 rounded-lg text-white p-8 shadow-2xl max-w-md w-full h-72 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center tracking-widest">
          Teacher
        </h2>
        <div className="flex justify-center">
          <Link to="/TeacherLogin">
            <img
              src={Teacher}
              alt="Teacher"
              className="cursor-pointer w-28 h-28 object-cover border-4 border-white p-1 rounded-full transition-transform hover:rotate-6 hover:scale-110"
            />
          </Link>
        </div>
        <p className="text-center mt-4 text-gray-200 text-sm">
          Empower and inspire students. Join now to make a difference!
        </p>
      </div>
    </div>
  );
};

export default Home;
