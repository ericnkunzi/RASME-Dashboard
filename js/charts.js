// charts.js

let sectorPieChart;
let statusBarChart;

// Update or create the Pie Chart for Activity Sector distribution
function updateSectorPieChart(data) {
  // Count projects by sector
  const sectorCounts = {};
  data.forEach((item) => {
    const sector = item.activity_sector || 'Unknown';
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  const labels = Object.keys(sectorCounts);
  const counts = Object.values(sectorCounts);

  const ctx = document.getElementById('sectorPieChart').getContext('2d');

  if (sectorPieChart) {
    sectorPieChart.data.labels = labels;
    sectorPieChart.data.datasets[0].data = counts;
    sectorPieChart.update();
  } else {
    sectorPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Projects by Sector',
            data: counts,
            backgroundColor: [
              '#4ade80', // green
              '#60a5fa', // blue
              '#fbbf24', // yellow
              '#f87171', // red
              '#a78bfa', // purple
              '#f472b6', // pink
              '#34d399', // teal
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
}

// Update or create the Bar Chart for Implementation Status
function updateStatusChart(data) {
  // Count projects by implementation status
  const statusCounts = {};
  data.forEach((item) => {
    const status = item.implementation_status || 'Unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const labels = Object.keys(statusCounts);
  const counts = Object.values(statusCounts);

  const ctx = document.getElementById('statusBarChart').getContext('2d');

  if (statusBarChart) {
    statusBarChart.data.labels = labels;
    statusBarChart.data.datasets[0].data = counts;
    statusBarChart.update();
  } else {
    statusBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Implementation Status',
            data: counts,
            backgroundColor: '#60a5fa', // blue
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
