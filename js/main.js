// main.js

const formId = "aGr5kutzkG7nrHiEyH7vCt"; // your form unique ID
const apiUrl = `https://kf.kobotoolbox.org/api/v2/assets/${formId}/data.json`;

const headers = {
  "Authorization": "Token 7a188f9457864dd166c64b0d070ba96fa95b24fc"
};

async function fetchKoboData() {
  try {
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    console.log("✅ Fetched Kobo Data:", data);

    // Next: send to update each module
    updateMap(data.results);
    updatePieChart(data.results);
    updateBarChart(data.results);
    updateTopCollectorsTable(data.results);
    updateProjectsList(data.results);
    updateAgencyList(data.results);
  } catch (error) {
    console.error("❌ Failed to fetch Kobo Data:", error);
    alert("Could not load data from KoboToolbox. Check console for details.");
  }
}

// Example processing functions (to be implemented in map.js and chart.js)
function updateMap(data) {
  console.log("🗺️ Update map with:", data.length, "records");
  // Map logic will go in map.js
}

function updatePieChart(data) {
  console.log("📊 Update pie chart with:", data.length, "records");
  // Pie chart logic goes in chart.js
}

function updateBarChart(data) {
  console.log("📊 Update bar chart with:", data.length, "records");
  // Bar chart logic goes in chart.js
}

function updateTopCollectorsTable(data) {
  console.log("📋 Update top collectors table");
  // Logic for table update
}

function updateProjectsList(data) {
  console.log("📋 Update project name list");
  // Logic for project name list
}

function updateAgencyList(data) {
  console.log("📋 Update implementing agencies list");
  // Logic for agency list
}

// Load everything after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  fetchKoboData();
});
