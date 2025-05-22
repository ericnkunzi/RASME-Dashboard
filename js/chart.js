// === charts.js ===
function renderCharts(data) {
  // Pie chart: Activity Sectors
  const sectorCount = {};
  data.forEach(item => {
    const sector = item["Activity Sector"];
    if (sector) {
      sectorCount[sector] = (sectorCount[sector] || 0) + 1;
    }
  });

  const pieCtx = document.getElementById("sectorPieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: Object.keys(sectorCount),
      datasets: [{
        data: Object.values(sectorCount),
        backgroundColor: Object.keys(sectorCount).map(() => randomColor())
      }]
    },
    options: {
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });

  // Bar chart: Activity Implementation Status
  const statusCount = {};
  data.forEach(item => {
    const status = item["Activity Implementation Status"];
    if (status) {
      statusCount[status] = (statusCount[status] || 0) + 1;
    }
  });

  const statusCtx = document.getElementById("statusChart").getContext("2d");
  new Chart(statusCtx, {
    type: "bar",
    data: {
      labels: Object.keys(statusCount),
      datasets: [{
        data: Object.values(statusCount),
        backgroundColor: Object.keys(statusCount).map(() => randomColor())
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

// Utility
function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
}

function renderProjectList(data) {
  const listEl = document.getElementById("projectList");
  listEl.innerHTML = "";
  const projects = new Set();

  data.forEach(item => {
    const project = item["Name of project"];
    if (project && !projects.has(project)) {
      projects.add(project);
      const li = document.createElement("li");
      li.textContent = project;
      listEl.appendChild(li);
    }
  });
}

function renderAgencies(data) {
  const agencyEl = document.getElementById("agencyList");
  agencyEl.innerHTML = "";
  const agencies = new Set();

  data.forEach(item => {
    const agency = item["Name of the activity Implementing Agency"];
    if (agency && !agencies.has(agency)) {
      agencies.add(agency);
      const li = document.createElement("li");
      li.textContent = agency;
      agencyEl.appendChild(li);
    }
  });
}
