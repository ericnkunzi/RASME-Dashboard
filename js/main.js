// Utility: Clear list contents
function clearList(listElement) {
  while(listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
}

// Update the submitted projects list
function updateProjectList(projects) {
  const projectList = document.getElementById('projectList');
  clearList(projectList);
  projects.forEach(proj => {
    const li = document.createElement('li');
    li.textContent = proj.project_name || 'Unnamed Project';
    projectList.appendChild(li);
  });
}

// Update implementing agencies list
function updateAgencyList(agencies) {
  const agencyList = document.getElementById('agencyList');
  clearList(agencyList);
  agencies.forEach(agency => {
    const li = document.createElement('li');
    li.textContent = agency;
    agencyList.appendChild(li);
  });
}

// Update enumerators table
function updateCollectorTable(collectors) {
  const tbody = document.getElementById('collectorTableBody');
  clearList(tbody);
  let totalSubmissions = 0;

  collectors.forEach(collector => {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = collector.name;
    nameTd.className = 'px-2 py-1';

    const submissionsTd = document.createElement('td');
    submissionsTd.textContent = collector.submissions;
    submissionsTd.className = 'px-2 py-1';

    const sectorTd = document.createElement('td');
    sectorTd.textContent = collector.activity_sector;
    sectorTd.className = 'px-2 py-1';

    tr.appendChild(nameTd);
    tr.appendChild(submissionsTd);
    tr.appendChild(sectorTd);

    tbody.appendChild(tr);

    totalSubmissions += collector.submissions;
  });

  document.getElementById('totalSubmissions').textContent = totalSubmissions;
}
