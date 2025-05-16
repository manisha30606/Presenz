import React, { useState, useEffect } from "react";
import axios from "axios";

const Active = () => {
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(null); 

  const token = localStorage.getItem("token"); 
  console.log(token);

  // FETCH TEACHER DETAILS
  const fetchTeacher = async () => {
    try {
      const response = await axios.get("http://localhost:9000/auth/getTeacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeacher(response.data); // Set teacher data
      setIsActive(response.data.status === "ON"); 
    } catch (error) {
      setErrorMessage("Error fetching teacher details.");
      console.error("Error fetching teacher details:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTeacher(); // Fetch teacher details on component mount
    } else {
      setErrorMessage("No token provided. Please log in first.");
    }
  }, [token]);

  // const toggleState = async () => {
  //   if (!token) {
  //     setErrorMessage("No token provided. Please log in first.");
  //     return;
  //   }

  //   const newState = !isActive; // Toggle state
  //   setIsActive(newState);
  //   setErrorMessage(null);
  //   setLoading(true);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:9000/auth/updateStatus",
  //       {
  //         status: newState ? "ON" : "OFF",
  //         teaId: teacher.teacherId, // <-- Change this to teaId instead of teacherId
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
      
  //     console.log("Status updated:", response.data.message);
  //   } catch (error) {
  //     setIsActive(!newState); // Revert state on failure
  //     setErrorMessage(error.response?.data?.message || "Error updating status.");
  //     console.error("Error updating status:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
  
  const toggleState = async () => {
    if (!token) {
      setErrorMessage("No token provided. Please log in first.");
      return;
    }

    const newState = !isActive;
    setIsActive(newState);
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9000/auth/updateStatus",
        {
          status: newState ? "ON" : "OFF",
          teaId: teacher.teaId, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Status updated:", response.data.message);
    } catch (error) {
      setIsActive(!newState);
      setErrorMessage(error.response?.data?.message || "Error updating status.");
      console.error("Error updating status:", error.message);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
      {teacher ? (
        <div className="mt-8 text-center mb-6">
          <h2 className="text-xl text-black font-bold">Welcome, {teacher.name}</h2>
    
          <p className="text-black">Current Status: {isActive ? "ON" : "OFF"}</p>
        </div>
      ) : (
        <p className="mt-8">Loading teacher data...</p>
      )}
      
        <h1 className="mb-4 text-2xl text-black font-semibold">{isActive ? "On" : "Off"}</h1>
       
        <button
          onClick={toggleState}
          disabled={loading || !token || !teacher}
          className={`px-10 py-5 rounded-full text-white font-bold transition-all duration-300 ${
            isActive ? "bg-green-500" : "bg-[#106850]"
          } ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Processing..." : isActive ? "Turn Off" : "Turn On"}
        </button>
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>

   
    </div>
  );
};

export default Active;
