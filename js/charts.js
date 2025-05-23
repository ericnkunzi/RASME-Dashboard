// charts.js

function renderPieChart(data) {
  const sectorCounts = {};

  data.forEach(entry => {
    const sector = entry.sector || "Unknown";
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  const ctx = document.getElementById('sectorPieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(sectorCounts),
      datasets: [{
        label: 'Sector Distribution',
        data: Object.values(sectorCounts),
        backgroundColor: ['#2563eb', '#16a34a', '#facc15', '#ef4444', '#6b7280'],
      }]
    }
  });
}

function renderStatusChart(data) {
  const statusCounts = {};

  data.forEach(entry => {
    const status = entry.status || "Unknown";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const ctx = document.getElementById('statusChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Implementation Status',
        data: Object.values(statusCounts),
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true }
      }
    }
  });
}
