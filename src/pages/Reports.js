import React from 'react';
import './Reports.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// Register required components for charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const Reports = () => {
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Work Hours',
        data: [8, 7, 8, 6, 8, 5, 4],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Employee Hours',
        data: [160, 150, 170, 165],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reporting and Analytics</h2>
      <div className="chart">
        <h3 className="chart-title">Work Hours Per Day</h3>
        <Bar data={barData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="chart">
        <h3 className="chart-title">Employee Hours Per Week</h3>
        <Line data={lineData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="data-table">
        <h3 className="table-title">Employee Work Hours</h3>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Week 1</th>
              <th>Week 2</th>
              <th>Week 3</th>
              <th>Week 4</th>
              <th>Total Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>40</td>
              <td>38</td>
              <td>42</td>
              <td>41</td>
              <td>161</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>38</td>
              <td>37</td>
              <td>39</td>
              <td>40</td>
              <td>154</td>
            </tr>
            <tr>
              <td>Bob Johnson</td>
              <td>42</td>
              <td>40</td>
              <td>43</td>
              <td>42</td>
              <td>167</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
