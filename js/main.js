// main.js

// Global variable to store the fetched data
let projectsData = [];

// Call this function after fetching data from Kobo to update project list and enumerators table
function updateProjectList(data) {
  projectsData = data; // store globally for other scripts

  const tbody = document.getElementById('project-list-body');
  tbody.innerHTML = ''; // clear existing rows

  data.forEach((item) => {
    // Assuming Kobo data fields:
    // item.project_name, item.activity_sector, item.location (text), item.latitude, item.longitude
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="border border-gray-300 px-2 py-1">${item.project_name || 'N/A'}</td>
      <td class="border border-gray-300 px-2 py-1">${item.activity_sector || 'N/A'}</td>
      <td class="border border-gray-300 px-2 py-1">${item.location || 'N/A'}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Update enumerators table (counts how many submissions per enumerator)
function updateCollectorTable(data) {
  const tbody = document.getElementById('enumerators-table-body');
  tbody.innerHTML = '';

  // Count submissions per enumerator name
  const counts = {};
  data.forEach((item) => {
    const name = item.enumerator_name || 'Unknown';
    counts[name] = (counts[name] || 0) + 1;
  });

  for (const [name, count] of Object.entries(counts)) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="border border-gray-300 px-2 py-1">${name}</td>
      <td class="border border-gray-300 px-2 py-1">${count}</td>
    `;
    tbody.appendChild(tr);
  }
}
