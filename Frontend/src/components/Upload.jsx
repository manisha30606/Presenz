import React from "react";
import { FaFilePdf, FaPlus } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const teacherUploads = [
  { id: 1, title: "React Hooks Guide" },
  { id: 2, title: "JavaScript ES6 Features" },
];

const Upload = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Notes</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teacherUploads.map((note) => (
          <div
            key={note.id}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition w-full"
          >
            <FaFilePdf className="text-red-600 text-6xl mb-3" />
            <p className="text-gray-700 font-semibold">{note.title}</p>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition w-full cursor-pointer">
          <FaPlus className="text-gray-600 text-6xl" />
          <p className="text-gray-700 font-semibold mt-2">Add New</p>
        </div>
      </div>

      {/* Notification Section */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>📌 Class Test scheduled for March 25th.</li>
          <li>📌 Assignment due date is March 28th.</li>
        </ul>
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition w-40 cursor-pointer">
            <FaPlus className="text-gray-600 text-4xl" />
            <p className="text-gray-700 font-semibold mt-2">Add Notification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
