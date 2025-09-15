import React from 'react';
import { Bar } from 'react-chartjs-2';

const AttendanceBar = ({ attendanceData }) => {
  const data = {
    labels: attendanceData.map((item) => item.month),  // Months
    datasets: [
      {
        label: 'Attendance Percentage',
        data: attendanceData.map((item) => item.attendance),  // Attendance percentage
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Attendance Overview</h3>
      <Bar data={data} />
    </div>
  );
};

export default AttendanceBar;
