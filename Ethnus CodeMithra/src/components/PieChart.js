import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ data }) {
  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Category Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default PieChart;