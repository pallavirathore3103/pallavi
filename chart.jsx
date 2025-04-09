import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'Aug', 'Sep', 'Nov', 'Dec'
        ],
        datasets: [{
          label: '16 Mar 2018',
          borderColor: '#4A5568',
          data: [600, 400, 620, 300, 200, 600, 230, 300, 200, 200, 100, 1200],
          fill: false,
          pointBackgroundColor: '#4A5568',
          borderWidth: 3,
          pointBorderWidth: 4,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 8,
          pointHoverBorderColor: 'rgba(74,85,104,0.2)'
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false
            },
            display: false
          }]
        }
      }
    });
  }, []);

  return (
    <div>
      <canvas ref={chartRef} id="myChart" />
    </div>
  );
}

export default ChartComponent;
