document.addEventListener("DOMContentLoaded", () => {
  const btnSearch = document.getElementById("btnSearch");
  const btnClear = document.getElementById("btnClear");
  const input = document.getElementById("destinationInput");

  btnSearch.addEventListener("click", () => {
    searchDestination(input.value.trim().toLowerCase());
  });

  btnClear.addEventListener("click", () => {
    document.getElementById("resultsContainer").innerHTML = "";
    input.value = "";
  });
});

function searchDestination(keyword) {
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const keywordLower = keyword.toLowerCase();
      let results = [];

      // Normalize keyword variations
      let category = "";
      if (["beach", "beaches"].includes(keywordLower)) {
        category = "beaches";
      } else if (["temple", "temples"].includes(keywordLower)) {
        category = "temples";
      } else {
        category = "countries";
      }

      if (category === "beaches" || category === "temples") {
        results = data[category];
      } else {
        // Match country name
        const matchedCountry = data.countries.find((country) =>
          country.name.toLowerCase().includes(keywordLower)
        );

        if (matchedCountry) {
          results = matchedCountry.cities;
        } else {
          // Fallback: match city name
          results = data.countries
            .flatMap((country) => country.cities)
            .filter((city) =>
              city.name.toLowerCase().includes(keywordLower)
            );
        }
      }

      showResults(results);
    })
    .catch((error) => console.error("Error fetching data:", error));
}


function showResults(places) {
  //console.log("Parameter places:", places);
  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";

  places.forEach((place) => {
    //console.log("Container: ", container);
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button>Visit</button>
      `;

    container.appendChild(card);
  });
}
