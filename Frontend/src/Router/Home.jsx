import React from "react";
import { Link } from "react-router-dom";

import Teacher from "../assets/Teacher.jpg";
import Student from "../assets/Student.jpg";

const Home = () => {
  return (
    <div className=" bg-[#211951] py-4 flex items-center justify-center h-[100%]">
    <div className="icon absolute icon1 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
    <div className="icon absolute icon2 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
    <div className="icon absolute icon3 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
    <div className="icon absolute icon4 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
    <div className="icon absolute icon5 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
    <div className="icon absolute icon6 w-[100px] h-[100px] bg-[#EBF4F6]"></div>
    <div className="icon absolute icon7 w-[100px] h-[100px] bg-[#EBF4F6]"></div>

    <div className="flex flex-col sm:flex-row justify-center items-center h-screen space-y-6 sm:space-y-0 sm:space-x-6 px-6">
      
      {/* Student Section */}
      <div className="bg-[#8674fe] rounded-lg text-white p-8 shadow-2xl max-w-md w-full h-72 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center tracking-widest">
          Student
        </h2>
        <div className="flex justify-center">
          <Link to="/StudentLogin">
            <img
              src={Student}
              alt="Student"
              className="cursor-pointer w-28 h-28 object-cover border-4 border-white p-1 rounded-full "
            />
          </Link>
        </div>
        <p className="text-center mt-4 text-gray-200 text-sm">
          Unlock your journey of learning. Click and start exploring!
        </p>
      </div>

      {/* Teacher Section */}
      <div className="bg-[#20cb9e] rounded-lg text-white p-8 shadow-2xl max-w-md w-full h-72 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center tracking-widest">
          Teacher
        </h2>
        <div className="flex justify-center">
          <Link to="/TeacherLogin">
            <img
              src={Teacher}
              alt="Teacher"
              className="cursor-pointer w-28 h-28 object-cover border-4 border-white p-1 rounded-full "
            />
          </Link>
        </div>
        <p className="text-center mt-4 text-gray-200 text-sm">
          Empower and inspire students. Join now to make a difference!
        </p>
      </div>
    </div>
    </div>
  );
};

export default Home;
