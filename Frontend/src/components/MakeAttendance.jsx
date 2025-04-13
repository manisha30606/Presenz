// import React, { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";
// import { toast } from "react-toastify"; // Import Toastify
// import "react-toastify/dist/ReactToastify.css"; // Import the styles

// const MakeAttendance = () => {
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [attendanceMessage, setAttendanceMessage] = useState("");
//   const [stuData, setStuData] = useState({ name: "", id: "" });
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); // State for disabling button

//   const webcamRef = useRef(null);

//   const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user",
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log(token);
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const fetchStuData = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/auth/studata", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = response.data;
//         setStuData({
//           name: data.stuName,
//           id: data.stuId || "",
//         });
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           console.error("Unauthorized: Invalid token");
//         } else {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchStuData();
//   }, []);

//   const handleStart = () => {
//     setShowWebcam(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           alert("Unable to fetch location. Please enable location services.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   };

//   const handleCaptureImage = () => {
//     try {
//       if (webcamRef.current) {
//         const imageSrc = webcamRef.current.getScreenshot();
//         if (!imageSrc) {
//           throw new Error("Failed to capture image from webcam.");
//         }
//         setCapturedImage(imageSrc);
//         console.log(imageSrc);
//       }
//     } catch (error) {
//       console.error("Error capturing image:", error.message);
//       toast.error("Error capturing the image. Please try again.");
//     }
//   };

//   const handleSubmitAttendance = async () => {
//     if (!capturedImage || !location) {
//       toast.error("Please capture your image and get your location first.");
//       return;
//     }
  
//     setIsSubmitting(true); // Disable button during submission
  
//     try {
//       const token = localStorage.getItem("token")?.trim(); // Ensure token is clean
//       if (!token) {
//         toast.error("Token is missing or invalid. Please log in again.");
//         setIsSubmitting(false);
//         return;
//       }
  
//       console.log("Captured Image:", capturedImage);
//       console.log("Token:", token);
  
//       const response = await axios.post(
//         "http://localhost:9000/auth/attendance",
//         {
//           frontendImage: capturedImage.split(",")[1], // Extract base64 from src
//           latitude: location.latitude,
//           longitude: location.longitude,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       setAttendanceMessage(
//         response.data.message || "Attendance marked successfully!"
//       );
//       toast.success(response.data.message || "Attendance marked successfully!");
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//       setAttendanceMessage("Failed to mark attendance. Please try again.");
//       toast.error("Failed to mark attendance. Please try again.");
//     } finally {
//       setIsSubmitting(false); // Re-enable button after submission
//     }
//   };
  

//   const handleExit = () => {
//     setShowWebcam(false);
//     setCapturedImage(null);
//     setAttendanceMessage("Attendance is not marked.");
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 sm:px-6 lg:px-8">
//         <h1 className="font-bold text-[#15156a] text-2xl sm:text-4xl mt-8 sm:mt-10 text-center">
//           Make Attendance
//         </h1>
//         <div className="text-[#15156a] my-6 text-sm sm:text-xl mx-auto w-full sm:w-[80%] flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0">
//           <h3>Name - {stuData.name}</h3>
//           <h3>StuId - {stuData.id}</h3>
//         </div>

//         {attendanceMessage ? (
//           <div className="mt-6 text-[#15156a] text-sm sm:text-base text-center">
//             <p>{attendanceMessage}</p>
//           </div>
//         ) : (
//           <>
//             {showWebcam && (
//               <div className="mt-6 sm:mt-10 w-full flex justify-center">
//                 <div className="relative border border-gray-300 rounded-lg overflow-hidden w-full max-w-xs sm:max-w-md">
//                   <Webcam
//                     audio={false}
//                     videoConstraints={videoConstraints}
//                     className="w-full h-auto"
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="mt-8 sm:mt-10 flex flex-col items-center space-y-4">
//               {!showWebcam ? (
//                 <button
//                   onClick={handleStart}
//                   className="bg-[#15156a] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-[#30cba2] shadow-md w-full max-w-xs sm:max-w-sm"
//                 >
//                   Start Webcam
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleCaptureImage}
//                     className="bg-[#15156a] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-[#30cba2] shadow-md w-full max-w-xs sm:max-w-sm"
//                   >
//                     Capture Image
//                   </button>
//                   <button
//                     onClick={handleExit}
//                     className="bg-red-500 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-red-600 shadow-md w-full max-w-xs sm:max-w-sm"
//                   >
//                     Exit
//                   </button>
//                 </>
//               )}

//               {capturedImage && (
//                 <div className="mt-6 flex flex-col items-center">
//                   <p className="text-sm sm:text-base text-[#15156a]">
//                     Captured Image Preview:
//                   </p>
//                   <img
//                     src={capturedImage}
//                     alt="Captured Preview"
//                     className="border border-gray-300 rounded-lg mt-4 w-64 h-auto"
//                   />
//                 </div>
//               )}

//               {capturedImage && location && (
//                 <div className="mt-6 text-[#15156a] text-sm sm:text-base text-center">
//                   <p>
//                     Location: {location.latitude}, {location.longitude}
//                   </p>
//                 </div>
//               )}

//               <button
//                 onClick={handleSubmitAttendance}
//                 className={`${
//                   isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#15156a] hover:bg-[#30cba2]"
//                 } text-white px-6 sm:px-8 py-3 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Attendance"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default MakeAttendance;


import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MakeAttendance = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [location, setLocation] = useState(null);
  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [stuData, setStuData] = useState({ name: "", id: "" });
  const [capturedImage, setCapturedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      toast.error("Session expired. Please log in again.");
      return;
    }
  
    const fetchStuData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/auth/studata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStuData({
          name: response.data.stuName,
          id: response.data.stuId || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Unauthorized access! Please log in again.");
      }
    };
  
    fetchStuData();
  }, []);
  

  const handleStart = () => {
    setShowWebcam(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          toast.error("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const handleCaptureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        toast.error("Failed to capture image. Try again.");
        return;
      }
      setCapturedImage(imageSrc);
    }
  };

  const handleSubmitAttendance = async () => {
    if (!capturedImage || !location) {
      toast.error("Please capture your image and get your location first.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem("token")?.trim();
      if (!token) {
        toast.error("Session expired. Please log in again.");
        setIsSubmitting(false);
        return;
      }
  
      const requestData = {
        frontendImage: capturedImage.split(",")[1], 
        latitude: location.latitude,
        longitude: location.longitude,
        date: new Date().toISOString().split("T")[0], 
        time: new Date().toLocaleTimeString(),
      };
  
      console.log("Submitting attendance with:", requestData);
  
      const response = await axios.post(
        "http://localhost:9000/auth/attendance",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success(response.data.message || "Attendance marked successfully!");
      setAttendanceMessage("✅ Attendance marked successfully!"); // ✅ Update message here
    } catch (error) {
      console.error("Error marking attendance:", error);
  
      if (error.response) {
        console.error("Server Response:", error.response.data);
        toast.error(error.response.data.message || "Failed to mark attendance.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  

  const handleExit = () => {
    setShowWebcam(false);
    setCapturedImage(null);
    setAttendanceMessage("Attendance is not marked.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4">
      <h1 className="font-bold text-[#15156a] text-2xl mt-8 text-center">Make Attendance</h1>
      <div className="text-[#15156a] my-6 text-sm text-center">
        <h3>Name - {stuData.name}</h3>
        <h3>StuId - {stuData.id}</h3>
      </div>
      {attendanceMessage ? (
         <div className="mt-6 text-[#15156a] text-sm sm:text-base text-center">
                   <p>{attendanceMessage}</p>
                   </div>
      ) : (
        <>
          {showWebcam && (
            <div className="mt-6 w-[50%] h-[50%] flex justify-center">
              <Webcam ref={webcamRef} audio={false} videoConstraints={videoConstraints} screenshotFormat="image/jpeg" className="border rounded-lg" />
            </div>
          )}
          <div className="mt-8 flex flex-col items-center space-y-4">
            {!showWebcam ? (
              <button onClick={handleStart} className="bg-[#15156a] text-white px-6 py-3 rounded-lg hover:bg-[#30cba2] shadow-md">
                Start Webcam
              </button>
            ) : (
              <>
                <button onClick={handleCaptureImage} className="bg-[#15156a] text-white px-6 py-3 rounded-lg hover:bg-[#30cba2] shadow-md">
                  Capture Image
                </button>
                <button onClick={handleExit} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 shadow-md">
                  Exit
                </button>
              </>
            )}
            {capturedImage && (
              <img src={capturedImage} alt="Captured Preview" className="border rounded-lg mt-4 w-64" />
            )}
            {capturedImage && location && (
              <p className="mt-6 text-[#15156a] text-sm text-center">Location: {location.latitude}, {location.longitude}</p>
            )}
            <button onClick={handleSubmitAttendance} disabled={isSubmitting} className={`text-white px-6 py-3 rounded-lg shadow-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#15156a] hover:bg-[#30cba2]"}`}>
              {isSubmitting ? "Submitting..." : "Submit Attendance"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MakeAttendance;
