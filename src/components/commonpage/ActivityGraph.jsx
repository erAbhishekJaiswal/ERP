import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  } from 'chart.js';
  
  // Manually register the components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  );

const ActivityGraph = ({ activityData }) => {
  const data = {
    labels: activityData.map((item) => item.date),  // Dates
    datasets: [
      {
        label: 'Hours Spent on Activities',
        data: activityData.map((item) => item.hours),  // Hours spent on activities
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h3>Activity Tracker</h3>
      <Line data={data} />
    </div>
  );
};

export default ActivityGraph;
