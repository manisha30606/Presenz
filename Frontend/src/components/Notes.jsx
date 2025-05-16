import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { FiDownload, FiEye } from "react-icons/fi";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    fetchNotes();
    fetchNotification();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };
const fetchNotification = async () => {
  try {
    const res = await axios.get("http://localhost:9000/auth/notifications");
    setNotifications(res.data);
  } catch (err) {
    console.error("Error fetching notifications:", err);
  }
};


  return (
    <div className="min-h-screen bg-white p-8">

       {/* NOTES  */}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notes</h1>

      <div className="grid md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition w-full text-center"
          >
            <FaFilePdf className="text-red-600 text-6xl mb-3" />
            <p className="text-gray-700 font-semibold">{note.title}</p>
            <p className="text-gray-500 text-sm">Teacher: {note.teacher}</p>
            <p className="text-gray-500 text-sm mb-3">Subject: {note.subject}</p>

            <div className="flex gap-3">
              <a
                href={`http://localhost:9000/uploads/${note.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700"
              >
                <FiEye /> View
              </a>

              <a
                href={`http://localhost:9000/uploads/${note.filename}`}
                download
                className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700"
              >
                <FiDownload /> Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* NOTIFICATION */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-md text-[#000]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-600">No notifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n._id}
                className="flex justify-between items-start bg-white p-4 rounded shadow"
              >
                <div>
                  <p className="font-semibold text-gray-800">{n.title}</p>
                  <p className="text-sm text-gray-600">{n.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    📅 {n.dueDate ? new Date(n.dueDate).toDateString() : "No due date"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notes;
