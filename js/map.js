// Initialize Leaflet Map
const map = L.map('map').setView([-1.9403, 29.8739], 7); // Center on Rwanda

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Placeholder for adding markers
// You will add project markers here based on Kobo data when available
function addProjectMarkers(projects) {
  projects.forEach(proj => {
    if(proj.location && proj.location.latitude && proj.location.longitude){
      L.marker([proj.location.latitude, proj.location.longitude])
        .addTo(map)
        .bindPopup(`<b>${proj.project_name}</b><br>${proj.activity_sector}`);
    }
  });
}
