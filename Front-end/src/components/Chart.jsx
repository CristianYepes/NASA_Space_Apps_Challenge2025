import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ type, modelStats }) => {
  const stats = modelStats || {
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1_score: 0,
  };

  if (type === 'bar') {
    const data = {
      labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
      datasets: [
        {
          label: 'Model Performance Metrics',
          data: [
            stats.accuracy * 100,
            stats.precision * 100,
            stats.recall * 100,
            stats.f1_score * 100,
          ],
          backgroundColor: [
            'rgba(11, 61, 145, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(251, 191, 36, 0.8)',
          ],
          borderColor: [
            'rgba(11, 61, 145, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(251, 191, 36, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: '#9CA3AF',
            callback: function(value) {
              return value + '%';
            },
          },
          grid: {
            color: 'rgba(75, 85, 99, 0.3)',
          },
        },
        x: {
          ticks: {
            color: '#9CA3AF',
          },
          grid: {
            display: false,
          },
        },
      },
    };

    return (
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    );
  }

  if (type === 'doughnut') {
    const data = {
      labels: ['Confirmed', 'Candidate', 'False Positive'],
      datasets: [
        {
          label: 'Classifications',
          data: [
            stats.confirmed_count || 120,
            stats.candidate_count || 80,
            stats.false_positive_count || 50,
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(251, 191, 36, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#9CA3AF',
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
      },
    };

    return (
      <div style={{ height: '300px' }}>
        <Doughnut data={data} options={options} />
      </div>
    );
  }

  return null;
};

export default Chart;
