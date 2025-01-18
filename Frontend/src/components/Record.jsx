import React, { useState } from "react";

const Record = () => {
  // State for selected year and month
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Generate an array of years (e.g., from 2000 to the current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

  // Array of months
  const months = [
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
  ];

  // Function to calculate the number of days in a month
  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month); // Get month index (0-based)
    return new Date(year, monthIndex + 1, 0).getDate(); // Get the last day of the month
  };

  // Generate employee data for 40 employees
  const employees = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
  }));

  // State to store attendance data for employees
  const [attendance, setAttendance] = useState(
    employees.reduce((acc, emp) => {
      acc[emp.id] = Array(31).fill("A"); // Default attendance as "A" for absent
      return acc;
    }, {})
  );

  // Handlers for year and month selection
  const handleYearSelection = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMonth(""); // Reset month selection when year changes
  };

  const handleMonthSelection = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Update attendance for a specific employee and day
  const handleAttendanceChange = (empId, day, value) => {
    setAttendance((prev) => ({
      ...prev,
      [empId]: prev[empId].map((val, idx) =>
        idx === day - 1 ? value.toUpperCase() : val
      ),
    }));
  };

  // Calculate total present days for an employee
  const getTotalPresent = (empId) => {
    return attendance[empId].filter((status) => status === "P").length;
  };

  // Render the attendance table only when both year and month are selected
  const renderAttendanceTable = () => {
    if (!selectedYear || !selectedMonth) return null;

    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">
          Attendance Sheet for {selectedMonth}, {selectedYear}
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-6 py-6">
                  Employee Name
                </th>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                  (day) => (
                    <th
                      key={day}
                      className="border border-gray-300 px-2 py-1 text-center"
                    >
                      {day}
                    </th>
                  )
                )}
                <th className="border border-gray-300 px-2 py-1 text-center">
                  Total Present
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.name}
                  </td>
                  {Array.from({ length: daysInMonth }, (_, day) => (
                    <td
                      key={day + 1}
                      className="border border-gray-300 px-2 py-1 text-center"
                    >
                      <input
                        type="text"
                        maxLength={1} // Allow single characters (P, A, or L)
                        value={attendance[employee.id][day]}
                        onChange={(e) =>
                          handleAttendanceChange(
                            employee.id,
                            day + 1,
                            e.target.value
                          )
                        }
                        className="w-full text-center border-none focus:ring focus:ring-cyan-500 focus:outline-none"
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {getTotalPresent(employee.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full text-[#821131] shadow-md rounded-lg p-6 mt-6">
      {/* Year and Month Selection */}
      <h2 className="text-xl font-bold mb-4">Year and Month Selection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
        {selectedYear && (
          <div>
            <label className="block font-bold mb-2">Select Month:</label>
            <select
              value={selectedMonth}
              onChange={handleMonthSelection}
              className="w-full px-3 py-2 border rounded bg-white text-black"
            >
              <option value="">-- Select Month --</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {renderAttendanceTable()}
    </div>
  );
};

export default Record;