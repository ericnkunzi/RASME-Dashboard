const KOBO_TOKEN = "7a188f9457864dd166c64b0d070ba96fa95b24fc";
const FORM_UID = "aGr5kutzkG7nrHiEyH7vCt";
const KOBO_URL = `https://kf.kobotoolbox.org/api/v2/assets/${FORM_UID}/data/`;

async function fetchData() {
  const response = await fetch(KOBO_URL, {
    headers: { "Authorization": `Token ${KOBO_TOKEN}` }
  });
  const data = await response.json();
  return data.results;
}

function updateMap(data) {
  const map = L.map('map').setView([-1.95, 30.06], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const colors = {};

  data.forEach(item => {
    const lat = parseFloat(item.latitude);
    const lng = parseFloat(item.longitude);
    const sector = item['sector'] || 'Unknown';
    const color = colors[sector] || (colors[sector] = '#' + Math.floor(Math.random()*16777215).toString(16));

    if (!isNaN(lat) && !isNaN(lng)) {
      L.circleMarker([lat, lng], {
        radius: 6,
        fillColor: color,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map).bindPopup(`<b>${item['project_name'] || 'Unnamed'}</b><br>${sector}`);
    }
  });
}

function updatePieChart(data) {
  const counts = {};
  data.forEach(item => {
    const sector = item['sector'] || 'Unknown';
    counts[sector] = (counts[sector] || 0) + 1;
  });

  const ctx = document.getElementById('sectorPieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: Object.keys(counts).map(() => '#' + Math.floor(Math.random()*16777215).toString(16))
      }]
    }
  });
}

function updateStatusChart(data) {
  const counts = {};
  data.forEach(item => {
    const status = item['activity_status'] || 'Unknown';
    counts[status] = (counts[status] || 0) + 1;
  });

  const ctx = document.getElementById('statusBarChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Activity Status',
        data: Object.values(counts),
        backgroundColor: Object.keys(counts).map(() => '#' + Math.floor(Math.random()*16777215).toString(16))
      }]
    }
  });
}

function updateCollectorTable(data) {
  const collectors = {};
  data.forEach(item => {
    const name = item['collector_name'] || 'Unknown';
    const sector = item['sector'] || 'Unknown';
    if (!collectors[name]) collectors[name] = { count: 0, sectors: new Set() };
    collectors[name].count += 1;
    collectors[name].sectors.add(sector);
  });

  let html = '<h2>Top Collectors</h2><table><tr><th>Name</th><th>Submissions</th><th>Sectors</th></tr>';
  let total = 0;
  for (let [name, info] of Object.entries(collectors)) {
    total += info.count;
    html += `<tr><td>${name}</td><td>${info.count}</td><td>${Array.from(info.sectors).join(', ')}</td></tr>`;
  }
  html += `<tr><th>Total</th><th colspan=\"2\">${total}</th></tr></table>`;
  document.getElementById('collectorTable').innerHTML = html;
}

function updateProjectList(data) {
  const list = [...new Set(data.map(item => item['project_name'] || 'Unnamed'))];
  document.getElementById('projectList').innerHTML =
    '<h3>Projects Submitted</h3><ul>' + list.map(p => `<li>${p}</li>`).join('') + '</ul>';
}

function updateAgencyList(data) {
  const agencies = [...new Set(data.map(item => item['agency_name'] || 'Unknown'))];
  document.getElementById('agencyList').innerHTML =
    '<h3>Implementing Agencies</h3><ul>' + agencies.map(a => `<li>${a}</li>`).join('') + '</ul>';
}

(async () => {
  try {
    const data = await fetchData();
    updateMap(data);
    updatePieChart(data);
    updateStatusChart(data);
    updateCollectorTable(data);
    updateProjectList(data);
    updateAgencyList(data);
  } catch (error) {
    alert('Failed to fetch data. CORS might be blocking this request.');
    console.error(error);
  }
})();
