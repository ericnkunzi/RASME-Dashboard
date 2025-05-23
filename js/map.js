// map.js

let map;

function initializeMap() {
  map = L.map('map').setView([-1.95, 30.06], 7); // Rwanda

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);
}

function plotMapMarkers(data) {
  if (!map) initializeMap();

  data.forEach(entry => {
    const lat = parseFloat(entry.latitude);
    const lon = parseFloat(entry.longitude);
    const name = entry.project_name || "Unnamed Project";

    if (!isNaN(lat) && !isNaN(lon)) {
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<strong>${name}</strong><br>${entry.sector || ''}`);
    }
  });
}
