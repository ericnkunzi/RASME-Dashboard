fetch('https://kf.kobotoolbox.org/api/v2/assets/aGr5kutzkG7nrHiEyH7vCt/data/', {
  method: 'GET',
  headers: {
    'Authorization': 'Token 7a188f9457864dd166c64b0d070ba96fa95b24fc'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log('Kobo API data:', data);

  // 1. Extract project entries - example path (adjust if different)
  const projects = data.results || [];

  // 2. Prepare project list & map markers data
  const projectListData = projects.map(proj => ({
    project_name: proj.project_name || 'Unnamed Project',
    activity_sector: proj.activity_sector || 'Unknown',
    location: proj.location || null
  }));

  updateProjectList(projectListData);
  addProjectMarkers(projectListData);

  // 3. Calculate Activity Sector distribution for Pie Chart
  const sectorCounts = {};
  projectListData.forEach(p => {
    const sector = p.activity_sector || 'Unknown';
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });
  updateSectorPieChart(sectorCounts);

  // 4. Calculate Implementation Status distribution for Bar Chart
  const statusCounts = { completed: 0, ongoing: 0, not_started: 0 };
  projects.forEach(proj => {
    const status = (proj.implementation_status || '').toLowerCase();
    if (status.includes('completed')) statusCounts.completed++;
    else if (status.includes('ongoing')) statusCounts.ongoing++;
    else statusCounts.not_started++;
  });
  updateStatusChart(statusCounts);

  // 5. Prepare enumerators data for table
  // Assuming your data has enumerator name and submissions count fields
  // Example placeholders:
  const enumeratorsRaw = {}; // key: enumerator name, value: submissions count

  projects.forEach(proj => {
    const enumerator = proj.enumerator_name || 'Unknown';
    enumeratorsRaw[enumerator] = (enumeratorsRaw[enumerator] || 0) + 1;
  });

  // Convert enumeratorsRaw to array for updateCollectorTable
  const enumerators = Object.entries(enumeratorsRaw).map(([name, submissions]) => ({
    name,
    submissions,
    activity_sector: 'N/A' // You can add if available
  }));
  updateCollectorTable(enumerators);

})
.catch(error => {
  console.error('Kobo API fetch error:', error);
});
