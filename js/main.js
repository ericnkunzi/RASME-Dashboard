// main.js

// Base URL of your Cloudflare Worker proxy
const proxyBaseURL = "https://curly-wildflower-b618.mugeric84.workers.dev/";

// Original Kobo Toolbox API URL
const koboAPI = "https://kf.kobotoolbox.org/api/v2/assets/aGr5kutzkG7nrHiEyH7vCt/data.json";

// Full proxied URL
const proxiedKoboURL = proxyBaseURL + koboAPI;

// Fetch Kobo Toolbox data using the proxy
async function fetchKoboData() {
  try {
    const response = await fetch(proxiedKoboURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Kobo Data loaded:", data);
    // Proceed to process and visualize data here
    processKoboData(data);
  } catch (error) {
    console.error("❌ Failed to fetch Kobo Data:", error);
    alert("Could not load data from KoboToolbox. Check console for details.");
  }
}

// Example function to process Kobo data (replace with your actual processing code)
function processKoboData(data) {
  // Your existing data handling and chart/map rendering here
  // For example:
  // renderCharts(data);
  // updateMap(data);
}

// Call the fetch function on page load or as needed
document.addEventListener("DOMContentLoaded", () => {
  fetchKoboData();
});

// Your other existing functions and event listeners below
// ...

