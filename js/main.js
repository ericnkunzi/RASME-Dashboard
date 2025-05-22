// === main.js ===
const PROXY_URL = "https://YOUR_PROXY_URL_HERE"; // You’ll replace this later

async function fetchData() {
  try {
    const response = await fetch(PROXY_URL);
    const data = await response.json();
    console.log("Fetched data:", data);

    // Send to charts and map
    renderCharts(data);
    renderMap(data);
    renderCollectorsTable(data);
    renderProjectList(data);
    renderAgencies(data);

  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Call fetchData when the page loads
window.addEventListener("DOMContentLoaded", fetchData);
