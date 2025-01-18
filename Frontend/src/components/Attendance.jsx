import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const [attendance, setAttendance] = useState({
    present: [1, 2, 3, 6, 7, 8, 11, 12, 15],
    absent: [4, 5, 9, 10],
  });
  const [leaves, setLeaves] = useState({
    EL: 5,
    CL: 2,
    ML: 3,
  });

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Get current year and month
  useEffect(() => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][today.getMonth()]
    );
  }, []);

  // Generate years dynamically
  const years = Array.from({ length: 2024 - 2020 + 1 }, (_, i) => 2020 + i);

  // Determine days in a month
  const getDaysInMonth = (year, month) => {
    const monthIndex = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ].indexOf(month);
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // Handlers for year and month selection
  const handleYearSelection = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth(""); // Reset month selection
  };

  const handleMonthSelection = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="w-full text-cyan-600 shadow-md rounded-lg p-6 mt-6 bg-gray-100">
      <h2 className="text-xl font-bold">Attendance</h2>
      <div className="flex flex-col space-y-4 mt-4">
        <h3 className="text-lg font-semibold">Search Attendance by Month</h3>

        {/* Year Selection */}
        <div>
          <label className="block font-bold mb-2">Select Year:</label>
          <select
            value={selectedYear}
            onChange={handleYearSelection}
            className="w-full px-3 py-2 border rounded bg-white text-black"
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Month Selection */}
        {selectedYear && (
          <div>
            <label className="block font-bold mb-2">Select Month:</label>
            <select
              value={selectedMonth}
              onChange={handleMonthSelection}
              className="w-full px-3 py-2 border rounded bg-white text-black"
            >
              <option value="">-- Select Month --</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Render attendance calendar and leave details */}
      {selectedYear && selectedMonth && (
        <div className="flex my-4 lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Attendance Calendar */}
          <div className="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              Attendance for {selectedMonth} {selectedYear}
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(getDaysInMonth(selectedYear, selectedMonth))].map((_, day) => {
                const date = day + 1;
                const isPresent = attendance.present.includes(date);
                const isAbsent = attendance.absent.includes(date);
                return (
                  <div
                    key={date}
                    className={`w-10 h-10 flex items-center justify-center rounded ${
                      isPresent
                        ? "bg-green-500 text-white"
                        : isAbsent
                        ? "bg-red-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leave Details */}
          <div className="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Leave Details</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(leaves).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center bg-cyan-100 shadow-lg rounded-lg p-4"
                >
                  <h4 className="text-lg font-bold text-cyan-800">{key}</h4>
                  <p className="text-xl font-semibold text-cyan-600">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;