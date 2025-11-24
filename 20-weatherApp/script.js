// Containers
const mainContainer = document.querySelector('.container');
const weatherInfoBox = document.querySelector('.box');
const weatherInfoText = document.querySelector('#weatherInfo');

// Input
const locationInput = document.getElementById('location');

// Buttons
const getWeatherBtn = document.getElementById('getWeatherBtn');
const closeBtn = document.getElementById('closeBtn');

let apiKey = 'ADD_API_KEY_HERE';

// Event Listeners
getWeatherBtn.addEventListener('click', () => {
  const location = locationInput.value;
  if (!location) alert('No City Input');

  console.log('Fetching weather for:', location);

  mainContainer.classList.add('not-active');
  weatherInfoBox.classList.remove('hidden');

  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          weatherInfoText.textContent = `No Weather found for ${location}`;
          throw new Error(data.error.message);
        } else {
          const locationName = data.location.name;
          const country = data.location.country;
          const tempC = data.current.temp_c;
          const conditionText = data.current.condition.text;
          const conditionIcon = data.current.condition.icon;

          document.querySelector('.informations').innerHTML = `
            <h3>${locationName}, ${country}</h3>
            <span>${tempC}°C</span>
            <img style="display=inline-block" src="${conditionIcon}" alt="${conditionText}">
            <span>${conditionText}</span>
          `;
        }
      });
  } catch (error) {
    weatherInfoText.textContent = `No Weather found for ${location}`;
    console.error(error);
  }
});

closeBtn.addEventListener('click', () => {
  locationInput.value = '';
  mainContainer.classList.remove('not-active');
  weatherInfoBox.classList.add('hidden');
});
