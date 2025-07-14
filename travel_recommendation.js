document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.getElementById('btnSearch');
    const btnClear = document.getElementById('btnClear');
    const input = document.getElementById('destinationInput');
  
    btnSearch.addEventListener('click', () => {
      searchDestination(input.value.trim().toLowerCase());
    });
  
    btnClear.addEventListener('click', () => {
      document.getElementById('resultsContainer').innerHTML = '';
      input.value = '';
    });
  });
  
  function searchDestination(keyword) {
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let results = [];
  
        if (keyword.includes('beach')) {
          results = data.beaches;
        } else if (keyword.includes('temple')) {
          results = data.temples;
        } else {
          results = data.countries.flatMap(country => country.cities);
        }
  
        showResults(results);
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  function showResults(places) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';
  
    places.forEach(place => {
      const card = document.createElement('div');
      card.className = 'card';
  
      card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button>Visit</button>
      `;
  
      container.appendChild(card);
    });
  }
  