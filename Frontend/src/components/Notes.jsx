import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Note1 from "../assets/Note1.pdf";
import Note2 from "../assets/Note2.pdf";
import Note3 from "../assets/Note3.pdf";
import Note4 from "../assets/Note4.pdf";

const pdfFiles = [
  { id: 1, title: "React Basics", url: Note1, teacher: "Mr. Sharma", subject: "Web Development" },
  { id: 2, title: "Advanced JavaScript", url: Note2, teacher: "Ms. Verma", subject: "JavaScript" },
  { id: 3, title: "Tailwind CSS Guide", url: Note3, teacher: "Mr. Patel", subject: "CSS Frameworks" },
  { id: 4, title: "Node.js Overview", url: Note4, teacher: "Dr. Khan", subject: "Backend Development" },
];

const Notes = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notes</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pdfFiles.map((pdf) => (
          <div
            key={pdf.id}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition w-full"
          >
            <FaFilePdf className="text-red-600 text-6xl mb-3" />
            <p className="text-gray-700 font-semibold">{pdf.title}</p>
            <p className="text-gray-500 text-sm">Teacher: {pdf.teacher}</p>
            <p className="text-gray-500 text-sm">Subject: {pdf.subject}</p>
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2"
            >
              <FiDownload /> <span>Download</span>
            </a>
          </div>
        ))}
      </div>

      {/* Notification Section */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>📌 Class Test scheduled for March 25th.</li>
          <li>📌 Assignment due date is March 28th.</li>
        </ul>
      </div>
    </div>
  );
};

export default Notes;
