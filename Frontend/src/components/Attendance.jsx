import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState({ present: [], absent: [] });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/auth/studata", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });


        if (response.data.stuPresentDate) {
          const formattedData = response.data.stuPresentDate.reduce(
            (acc, record) => {
              const recordDate = new Date(record.date);
              const recordYear = recordDate.getFullYear();
              const recordMonth = recordDate.toLocaleString("default", {
                month: "long",
              });

              if (recordYear === selectedYear && recordMonth === selectedMonth) {
                acc.present.push(recordDate.getDate());
              }
              return acc;
            },
            { present: [], absent: [] }
          );

          const totalDays = new Date(selectedYear, new Date(selectedMonth + " 1").getMonth() + 1, 0).getDate();
          formattedData.absent = Array.from({ length: totalDays }, (_, i) => i + 1).filter(
            (day) => !formattedData.present.includes(day)
          );

          setAttendance(formattedData);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchStudentData();
  }, [selectedYear, selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">
        Attendance for {selectedMonth} {selectedYear}
      </h2>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-1">Select Year:</label>
          <select
            className="bg-gray-700 text-white p-2 rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {[2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Select Month:</label>
          <select
            className="bg-gray-700 text-white p-2 rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
              (month) => (
                <option key={month} value={month}>{month}</option>
              )
            )}
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Attendance Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: new Date(selectedYear, new Date(selectedMonth + " 1").getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(
            (day) => (
              <div
                key={day}
                className={`w-12 h-12 flex items-center justify-center rounded-lg text-lg font-bold ${
                  attendance.present.includes(day)
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
