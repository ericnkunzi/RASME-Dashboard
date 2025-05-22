// === map.js ===
let map;

function renderMap(data) {
  if (!map) {
    map = L.map("map").setView([-1.9403, 29.8739], 8); // Rwanda center

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
  }

  data.forEach(item => {
    const lat = parseFloat(item["latitude"]);
    const lng = parseFloat(item["longitude"]);
    const name = item["Name of project"];
    const sector = item["Activity Sector"];

    if (!isNaN(lat) && !isNaN(lng)) {
      const marker = L.circleMarker([lat, lng], {
        radius: 6,
        color: randomColor(),
        fillOpacity: 0.7
      }).addTo(map);

      marker.bindPopup(`<strong>${name}</strong><br>${sector}`);
    }
  });
}
