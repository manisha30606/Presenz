// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Attendance = () => {
//   const [attendance, setAttendance] = useState({ present: [], absent: [] });
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().toLocaleString("default", { month: "long" })
//   );

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/auth/studata", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });


//         if (response.data.stuPresentDate) {
//           const formattedData = response.data.stuPresentDate.reduce(
//             (acc, record) => {
//               const recordDate = new Date(record.date);
//               const recordYear = recordDate.getFullYear();
//               const recordMonth = recordDate.toLocaleString("default", {
//                 month: "long",
//               });

//               if (recordYear === selectedYear && recordMonth === selectedMonth) {
//                 acc.present.push(recordDate.getDate());
//               }
//               return acc;
//             },
//             { present: [], absent: [] }
//           );

//           const totalDays = new Date(selectedYear, new Date(selectedMonth + " 1").getMonth() + 1, 0).getDate();
//           formattedData.absent = Array.from({ length: totalDays }, (_, i) => i + 1).filter(
//             (day) => !formattedData.present.includes(day)
//           );

//           setAttendance(formattedData);
//         }
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//       }
//     };

//     fetchStudentData();
//   }, [selectedYear, selectedMonth]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h2 className="text-2xl font-bold mb-4">
//         Attendance for {selectedMonth} {selectedYear}
//       </h2>

//       <div className="flex gap-4 mb-6">
//         <div>
//           <label className="block mb-1">Select Year:</label>
//           <select
//             className="bg-gray-700 text-white p-2 rounded"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//           >
//             {[2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1">Select Month:</label>
//           <select
//             className="bg-gray-700 text-white p-2 rounded"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
//               (month) => (
//                 <option key={month} value={month}>{month}</option>
//               )
//             )}
//           </select>
//         </div>
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold mb-3">Attendance Calendar</h3>
//         <div className="grid grid-cols-7 gap-2">
//           {Array.from({ length: new Date(selectedYear, new Date(selectedMonth + " 1").getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(
//             (day) => (
//               <div
//                 key={day}
//                 className={`w-12 h-12 flex items-center justify-center rounded-lg text-lg font-bold ${
//                   attendance.present.includes(day)
//                     ? "bg-green-500 text-white"
//                     : "bg-red-500 text-white"
//                 }`}
//               >
//                 {day}
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Attendance;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [presentDays, setPresentDays] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/auth/studata", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const filteredPresent = res.data.stuPresentDate?.map((record) => {
          const d = new Date(record.date);
          if (
            d.getFullYear() === selectedYear &&
            d.toLocaleString("default", { month: "long" }) === selectedMonth
          ) {
            return d.getDate();
          }
          return null;
        }).filter(Boolean);

        setPresentDays(filteredPresent || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchStudentData();
  }, [selectedYear, selectedMonth]);

  const renderCalendar = () => {
    const monthIndex = new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth();
    const totalDays = new Date(selectedYear, monthIndex + 1, 0).getDate();
    const firstDay = new Date(selectedYear, monthIndex, 1).getDay();
    const today = new Date();

    const weeks = [];
    let currentDay = 1;
    let weekCount = 1;

    while (currentDay <= totalDays) {
      const days = [];

      for (let i = 0; i < 7; i++) {
        if (weeks.length === 0 && i < firstDay) {
          days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
        } else if (currentDay <= totalDays) {
          const date = new Date(selectedYear, monthIndex, currentDay);
          let bgColor = "bg-white text-black border border-gray-300";

          if (date.getDay() === 0) {
            bgColor = "bg-blue-500 text-white"; // Sunday
          } else if (presentDays.includes(currentDay)) {
            bgColor = "bg-green-500 text-white"; // Present
          } else if (
            date < today &&
            !(date.getDay() === 0) &&
            !presentDays.includes(currentDay)
          ) {
            bgColor = "bg-red-500 text-white"; // Absent
          }

          days.push(
            <div
              key={currentDay}
              className={`w-12 h-12 rounded-md flex items-center justify-center font-medium ${bgColor}`}
            >
              {String(currentDay).padStart(2, "0")}
            </div>
          );

          currentDay++;
        } else {
          days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
        }
      }

      weeks.push(
        <div key={`week-${weekCount}`} className="flex items-center gap-2 mb-2">
          <div className="w-12 text-sm text-gray-400">WK {weekCount}</div>
          {days}
        </div>
      );
      weekCount++;
    }

    return weeks;
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Student Attendance Calendar</h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="mr-2">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          >
            {[2024, 2025, 2026].map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded"
          >
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 pl-14 mb-2 text-sm text-gray-200 font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="w-12 text-center">
            {day}
          </div>
        ))}
      </div>

      {renderCalendar()}

      <div className="flex gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div> Present
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div> Sunday
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div> Absent
        </div>
      </div>
    </div>
  );
};

export default Attendance;
