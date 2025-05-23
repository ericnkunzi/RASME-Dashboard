// main.js

const WORKER_URL = 'https://curly-wildflower-b618.mugeric84.workers.dev?url=';
const KOBO_API_URL = 'https://kf.kobotoolbox.org/api/v2/assets/aVtxPM7pF46d7NwZL9F8ut/data/';

async function loadKoboData() {
  try {
    const response = await fetch(WORKER_URL + encodeURIComponent(KOBO_API_URL));
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.error("No data found.");
      return;
    }

    console.log("✅ Kobo data loaded via Worker:", data);

    renderPieChart(data.results);
    renderStatusChart(data.results);
    updateProjectList(data.results);
    updateAgencyList(data.results);
    updateCollectorTable(data.results);
    plotMapMarkers(data.results);
  } catch (error) {
    console.error("❌ Error loading Kobo data:", error);
  }
}

function updateProjectList(data) {
  const list = document.getElementById("projectList");
  list.innerHTML = "";
  data.slice(0, 10).forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry.project_name || "Unnamed";
    list.appendChild(li);
  });
}

function updateAgencyList(data) {
  const agencies = [...new Set(data.map(e => e.agency || "Unknown"))];
  const list = document.getElementById("agencyList");
  list.innerHTML = "";
  agencies.forEach(agency => {
    const li = document.createElement("li");
    li.textContent = agency;
    list.appendChild(li);
  });
}

function updateCollectorTable(data) {
  const counts = {};
  data.forEach(e => {
    const name = e.enumerator_name || "Unknown";
    const sector = e.sector || "Unknown";
    if (!counts[name]) counts[name] = { count: 0, sector };
    counts[name].count += 1;
  });

  const tbody = document.getElementById("collectorTableBody");
  tbody.innerHTML = "";
  let total = 0;

  Object.entries(counts).forEach(([name, info]) => {
    total += info.count;
    const row = `<tr>
      <td class="px-2 py-1">${name}</td>
      <td class="px-2 py-1">${info.count}</td>
      <td class="px-2 py-1">${info.sector}</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  document.getElementById("totalSubmissions").textContent = total;
}

window.addEventListener("DOMContentLoaded", loadKoboData);
