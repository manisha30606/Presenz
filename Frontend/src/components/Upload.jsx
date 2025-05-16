// import React from "react";
// import { FaFilePdf, FaPlus } from "react-icons/fa";
// import { FiUpload } from "react-icons/fi";

// const teacherUploads = [
//   { id: 1, title: "React Hooks Guide" },
//   { id: 2, title: "JavaScript ES6 Features" },
// ];

// const Upload = () => {
//   return (
//     <div className="min-h-screen bg-white p-8">
//       {/* Title Section */}
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Notes</h1>

//       {/* Uploaded Notes Section */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
//         {teacherUploads.map((note) => (
//           <div
//             key={note.id}
//             className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition w-full"
//           >
//             <FaFilePdf className="text-red-600 text-6xl mb-3" />
//             <p className="text-gray-700 font-semibold">{note.title}</p>
//           </div>
//         ))}

//         {/* "Add New" Upload Button */}
//         <div className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition w-full cursor-pointer">
//           <FaPlus className="text-gray-600 text-6xl" />
//           <p className="text-gray-700 font-semibold mt-2">Add New</p>
//         </div>
//       </div>

//       {/* Upload Form Section */}
//       <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Upload a New Note</h2>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Enter note title"
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Choose File</label>
//             <input
//               type="file"
//               name="file"
//               accept="application/pdf"
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             <FiUpload className="inline-block mr-2" />
//             Upload Note
//           </button>
//         </form>
//       </div>

//       {/* Notifications Section */}
//       <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
//         <ul className="list-disc list-inside text-gray-700">
//           <li>📌 Class Test scheduled for March 25th.</li>
//           <li>📌 Assignment due date is March 28th.</li>
//         </ul>
//         <div className="flex justify-center mt-4">
//           <div className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition w-40 cursor-pointer">
//             <FaPlus className="text-gray-600 text-4xl" />
//             <p className="text-gray-700 font-semibold mt-2">Add Notification</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upload;

import { useState, useEffect } from "react";
import axios from "axios";
import { FaFilePdf, FaPlus } from "react-icons/fa";
import { FiDownload, FiEye } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";


export default function UploadNotes() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    teacher: "",
    subject: "",
    file: null,
  });

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("teacher", formData.teacher);
    data.append("subject", formData.subject);
    data.append("file", formData.file);

    try {
      await axios.post("http://localhost:9000/auth/upload-note", data);
      handleSuccess("Note uploaded successfully!");
      setFormData({ title: "", teacher: "", subject: "", file: null });
      setShowForm(false);
      fetchNotes(); // refresh notes
    } catch (err) {
      handleError("Failed to upload note");
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:9000/auth/notes/${id}`);
      handleSuccess("Note deleted successfully");
      fetchNotes(); // Refresh notes
    } catch (err) {
      handleError("Failed to delete note");
      console.error(err);
    }
  };




  const [notifications, setNotifications] = useState([]);
  const [showNotifForm, setShowNotifForm] = useState(false);
  const [notifForm, setNotifForm] = useState({
    title: "",
    description: "",
    type: "",
    subject: "",
    teacher: "",
    dueDate: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      handleError("Failed to load notifications");
    }
  };

  const handleNotifChange = (e) => {
    setNotifForm({ ...notifForm, [e.target.name]: e.target.value });
  };

  const handleNotifSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/auth/notifications", notifForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleSuccess("Notification uploaded!");
      setNotifForm({
        title: "",
        description: "",
        type: "",
        subject: "",
        teacher: "",
        dueDate: "",
      });
      setShowNotifForm(false);
      fetchNotifications();
    } catch (err) {
      console.error("Notification Error:", err.response?.data || err.message);
      handleError("Failed to upload notification");
    }
  };

  const handleNotifDelete = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await axios.delete(`http://localhost:9000/auth/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleSuccess("Notification deleted");
      fetchNotifications();
    } catch (err) {
      handleError("Failed to delete");
    }
  };
  console.log("Submitting Notification:", notifForm);


  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4 text-[#000]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notes</h1>


        {/* Notes Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <div key={note._id} className=" bg-white p-4 rounded shadow text-center relative">

              <FaFilePdf className="text-red-600 text-5xl mx-auto mb-3" />
              <h2 className="font-semibold text-gray-800">{note.title}</h2>
              <p className="text-sm text-gray-600">Teacher: {note.teacher}</p>
              <p className="text-sm text-gray-600 mb-4">Subject: {note.subject}</p>
              <div className="flex justify-center mt-4">
                <a
                  href={`http://localhost:9000/uploads/${note.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <FiEye className="mr-1" /> View
                </a>
              </div>


              <button
                onClick={() => handleDelete(note._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Delete Note"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}


          <div
            onClick={() => setShowForm(!showForm)}
            className="flex flex-col items-center justify-center cursor-pointer bg-gray-200 p-4 rounded shadow hover:shadow-lg transition"
          >
            <FaPlus className="text-gray-600 text-5xl mb-2" />
            <p className="font-semibold text-gray-700">Add New</p>
          </div>
        </div>

        {/* Notification Section */}
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
                  <button
                    onClick={() => handleNotifDelete(n._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-center mt-6">
            <div
              onClick={() => setShowNotifForm(true)}
              className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition w-44 cursor-pointer"
            >
              <FaPlus className="text-gray-600 text-3xl" />
              <p className="text-gray-700 font-semibold mt-2">Add Notification</p>
            </div>
          </div>
        </div>


        {/* Upload Note Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-500"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-4 text-center">Upload Note</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Note Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                />
                <input
                  type="text"
                  name="teacher"
                  placeholder="Teacher Name"
                  value={formData.teacher}
                  onChange={handleChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                />
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  className="w-full p-2 border mb-4 rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Upload Note
                </button>
              </form>
            </div>
          </div>
        )}

      </div>


      {/* Upload Notification Form Modal */}
      {showNotifForm && (
        <div className="fixed inset-0 text-[#000] bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-500"
              onClick={() => setShowNotifForm(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Add Notification</h2>

            <form onSubmit={handleNotifSubmit} className="space-y-4">
              {/* General Info */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">General Info</h3>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={notifForm.title}
                  onChange={handleNotifChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={notifForm.description}
                  onChange={handleNotifChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                />
              </div>

              {/* Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Details</h3>
                <select
                  name="type"
                  value={notifForm.type}
                  onChange={handleNotifChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="assignment">Assignment</option>
                  <option value="test">Test</option>
                  <option value="announcement">Announcement</option>
                </select>


                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={notifForm.subject}
                  onChange={handleNotifChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                />
                <input
                  type="text"
                  name="teacher"
                  placeholder="Teacher"
                  value={notifForm.teacher}
                  onChange={handleNotifChange}
                  className="w-full p-2 border mb-3 rounded"
                  required
                />
                <input
                  type="date"
                  name="dueDate"
                  value={notifForm.dueDate}
                  onChange={handleNotifChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit Notification
              </button>
            </form>
          </div>
        </div>
      )}



      <ToastContainer />

    </>
  );
}
