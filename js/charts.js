// Initialize Charts with empty data - to be updated when Kobo data arrives

// Pie chart for Activity Sectors
const ctxSector = document.getElementById('sectorPieChart').getContext('2d');
const sectorPieChart = new Chart(ctxSector, {
  type: 'pie',
  data: {
    labels: [], // sectors
    datasets: [{
      label: 'Activity Sector Distribution',
      data: [],
      backgroundColor: [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'
      ],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// Bar chart for Implementation Status
const ctxStatus = document.getElementById('statusChart').getContext('2d');
const statusChart = new Chart(ctxStatus, {
  type: 'bar',
  data: {
    labels: ['Completed', 'Ongoing', 'Not Started'],
    datasets: [{
      label: 'Number of Projects',
      data: [0, 0, 0],
      backgroundColor: ['#22c55e', '#3b82f6', '#f87171']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Function to update sectorPieChart data
function updateSectorPieChart(sectorsData) {
  sectorPieChart.data.labels = Object.keys(sectorsData);
  sectorPieChart.data.datasets[0].data = Object.values(sectorsData);
  sectorPieChart.update();
}

// Function to update statusChart data
function updateStatusChart(statusData) {
  statusChart.data.datasets[0].data = [
    statusData.completed || 0,
    statusData.ongoing || 0,
    statusData.not_started || 0
  ];
  statusChart.update();
}
