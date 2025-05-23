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
  // TODO: Use data here to update your dashboard
})
.catch(error => {
  console.error('Kobo API fetch error:', error);
});
