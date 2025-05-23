document.addEventListener("DOMContentLoaded", function () {
  const workerProxyUrl = "https://curly-wildflower-b618.mugeric84.workers.dev";
  const koboUrl = "https://kf.kobotoolbox.org/api/v2/assets/aGr5kutzkG7nrHiEyH7vCt/data.json";
  const targetUrl = encodeURIComponent(koboUrl);

  fetch(`${workerProxyUrl}/?url=${targetUrl}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("✅ Kobo data loaded via Worker:", data);
      // Replace this with your own logic to display data on the dashboard
      displayData(data);
    })
    .catch(error => {
      console.error("❌ Failed to fetch Kobo Data:", error);
      alert("Could not load data from KoboToolbox. Check console for details.");
    });

  function displayData(data) {
    const tableBody = document.getElementById("data-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    data.results.forEach(item => {
      const row = document.createElement("tr");

      // Customize this based on your Kobo data fields
      row.innerHTML = `
        <td class="border px-4 py-2">${item._id || ""}</td>
        <td class="border px-4 py-2">${item._submission_time || ""}</td>
        <td class="border px-4 py-2">${item.some_field || "N/A"}</td>
      `;

      tableBody.appendChild(row);
    });
  }
});
