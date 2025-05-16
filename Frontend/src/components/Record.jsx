import React, { useState, useEffect } from "react";

const Record = () => {
  const currentDate = new Date();

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 26 }, (_, i) => 2000 + i); // 2000 to 2025

  const getDaysInMonth = (monthIndex, year) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const studentNames = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh",
    "Krishna", "Ishaan", "Shaurya", "Anaya", "Aadhya", "Diya", "Myra",
    "Kiara", "Saanvi", "Meera", "Ira", "Pari", "Navya"
  ];

  const students = studentNames.map((name, index) => ({
    id: index + 1,
    name,
  }));

  const generateAttendance = (days) => {
    const statuses = ["P", "A", "P", "P"];
    const data = {};
    students.forEach((stu) => {
      data[stu.id] = Array.from({ length: days }, () =>
        statuses[Math.floor(Math.random() * statuses.length)]
      );
    });
    return data;
  };

  const [attendance, setAttendance] = useState(() =>
    generateAttendance(getDaysInMonth(selectedMonth, selectedYear))
  );

  useEffect(() => {
    const days = getDaysInMonth(selectedMonth, selectedYear);
    setAttendance(generateAttendance(days));
  }, [selectedMonth, selectedYear]);

  const getTotalPresent = (stuId) =>
    attendance[stuId]?.filter((s) => s === "P").length || 0;

  return (
    <div className="w-full text-[#13614d] shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Year and Month Selection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-bold mb-2">Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
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
        <div>
          <label className="block font-bold mb-2">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded bg-white text-black"
          >
            <option value="">-- Select Month --</option>
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      {selectedYear !== "" && selectedMonth !== "" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">
            Attendance – {months[selectedMonth]}, {selectedYear}
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Student Name</th>
                  {Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => (
                    <th key={i} className="border border-gray-300 px-2 py-1 text-center">
                      {i + 1}
                    </th>
                  ))}
                  <th className="border border-gray-300 px-2 py-1 text-center">Total P</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                    {attendance[student.id]?.map((status, i) => (
                      <td
                        key={i}
                        className={`border border-gray-300 px-2 py-1 text-center ${
                          status === "P" ? "text-green-600 font-semibold" : "text-red-500 font-semibold"
                        }`}
                      >
                        {status}
                      </td>
                    ))}
                    <td className="border border-gray-300 px-2 py-1 text-center font-bold">
                      {getTotalPresent(student.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Record;
