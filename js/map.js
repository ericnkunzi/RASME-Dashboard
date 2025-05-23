// map.js

let map;
let markers = [];

// Initialize the Leaflet map
function initMap() {
  map = L.map('map').setView([-1.9403, 29.8739], 7); // Centered on Rwanda approx

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);
}

// Add project markers to the map
// Expects data array with latitude and longitude properties
function addProjectMarkers(data) {
  // Remove existing markers
  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  data.forEach((item) => {
    if (item.latitude && item.longitude) {
      const marker = L.marker([item.latitude, item.longitude]).addTo(map);
      const popupText = `
        <b>${item.project_name || 'No Name'}</b><br/>
        Sector: ${item.activity_sector || 'N/A'}<br/>
        Location: ${item.location || 'N/A'}
      `;
      marker.bindPopup(popupText);
      markers.push(marker);
    }
  });

  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.5));
  }
}

// Initialize map on page load
document.addEventListener('DOMContentLoaded', initMap);
