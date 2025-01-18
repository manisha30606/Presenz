import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import imageCompression from 'browser-image-compression';

function StuSignUp() {
  const [stuSignupInfo, setStuSignUpInfo] = useState({
    stuName: '',
    stuEmail: '',
    stuPhone: '',
    stuId: '',
    stuPassword: '',
    stuGender:'',
  });

  const [stuPhoto, setStuPhoto] = useState('');


  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStuSignUpInfo((prev) => ({ ...prev, [name]: value }));
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => console.error('Camera error: ', err));
  };


  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    

    canvas.toBlob(async (blob) => {
      const options = {
        maxSizeMB: 0.1, // Max size in MB
        maxWidthOrHeight: 200, // Max width/height in pixels
      };
      try {
        const compressedBlob = await imageCompression(blob, options);
        const compressedDataUrl = await imageCompression.getDataUrlFromFile(compressedBlob);
        setStuPhoto(compressedDataUrl);
        // console.log('Full Captured Photo URL:', compressedDataUrl);


      } catch (error) {
        console.error('Compression Error:', error);
      }
    }, 'image/png');
 

  };
  

  const handleSignup = async (e) => {
    e.preventDefault();

    const { stuName, stuEmail, stuPhone, stuId, stuPassword ,stuGender} = stuSignupInfo;

    if (!stuName || !stuEmail || !stuPhone || !stuId || !stuPassword || !stuPhoto || !stuGender) {
        return handleError('All fields, including a photo, are required.');
    }

    try {
        const response = await fetch('http://localhost:9000/auth/signup/student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...stuSignupInfo, stuPhoto }),
        });

        const result = await response.json();
        if (response.ok) {
            handleSuccess(result.message);
            navigate('/StudentLogin');
        } else {
            handleError(result.message || 'Signup failed, please try again.');
        }
    } catch (err) {
        console.error(err);
        handleError('Network error, please try again.');
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-[#071952]">
      <ToastContainer />
      <div
        className="bg-white p-8 rounded-lg shadow-[0_4px_30px_rgba(236,72,153,0.8)] max-w-md w-full 
                      transform transition duration-500 
                      hover:shadow-[0_4px_30px_rgba(236,72,153,0.8)]"
      >
        <h2 className="text-2xl font-bold text-[#37B7C3] text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name of Student:</label>
            <input
              type="text"
              name="stuName"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
              value={stuSignupInfo.stuName}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email of Student:</label>
            <input
              type="email"
              name="stuEmail"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
              value={stuSignupInfo.stuEmail}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
            <input
              type="gender"
              name="stuGender"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
              value={stuSignupInfo.stuGender}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
            <input
              type="tel"
              name="stuPhone"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
              value={stuSignupInfo.stuPhone}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Registration Number:</label>
            <input
              type="text"
              name="stuId"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
              value={stuSignupInfo.stuId}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              name="stuPassword"
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
              value={stuSignupInfo.stuPassword}
            />
          </div>

          {/* Camera and Photo Capture Section */}
          <div className="mb-4">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-200"
              onClick={startCamera}
            >
              Start Camera
            </button>
            <video ref={videoRef} style={{ width: '100%', marginTop: '10px' }}></video>
            <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }}></canvas>
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-200 mt-2"
              onClick={capturePhoto}
            >
              Capture Photo
            </button>
            {stuPhoto && (
              <img
                src={stuPhoto}
                alt="Captured"
                className="mt-4 border rounded-lg"
                style={{ width: '100%' }}
              />
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
            >
              Sign Up Now <span className="ml-2">→</span>
            </button>
            <Link to="/StudentLogin">
              <button
                type="button"
                className="bg-white text-black py-2 px-6 rounded-lg shadow-lg hover:bg-[#37B7C3] hover:text-white hover:shadow-xl transition duration-200 flex items-center"
              >
                Login Now <span className="ml-2">→</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StuSignUp;
