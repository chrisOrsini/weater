// API key to access OpenWeatherMap API
const apiKey = '01f403746bd33292d56f67049ef9f8ed';
// Selecting DOM elements
const form = document.querySelector('form');
const locationInput = document.querySelector('[data-location]');
const temperature = document.querySelector('[data-temperature] span');
const temperatureText = document.querySelector('[data-temperature-text]');
const date = document.querySelector('[data-date]');
const img = document.querySelector('[data-image]');

// Adding event listener to the form element to listen to form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    getTheweather(); // Calling the getTheweather function
    displayForecast(); // Calling the displayForecast function
});

// Function to get the current weather data for the location input by the user
const getTheweather = async () => {
    const location = locationInput.value; // Getting the value of the location input
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=fr`; // API endpoint URL for getting weather data

    // Using fetch to make a GET request to the API endpoint URL
    await fetch(api_url)
        .then(response => response.json())
        .then(data => {
            console.log(`Météo actuelle à ${location}:`); // Logging the location
            console.log(`Température: ${data.main.temp} C`); // Logging the temperature in Celsius
            console.log(`Humidité: ${data.main.humidity}%`); // Logging the humidity percentage
            console.log(`Description: ${data.weather[0].description}`); // Logging the weather description

            const temperatureValue = Math.round(data.main.temp); // Rounding off the temperature value to a whole number
            const description = data.weather[0].description; // Getting the weather description
            const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`; // URL for the weather icon image

            // Updating the DOM elements with the weather data
            temperature.innerHTML = temperatureValue;
            temperatureText.innerHTML = description;
            date.innerHTML = new Date().toLocaleString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            img.setAttribute('src', iconUrl);
        });
};

// Calling the getTheweather function to display the weather data when the page loads
getTheweather();

// Function to display the weather forecast for the next two days
const displayForecast = async () => {
  // Getting the value of the location input
    const inputCity = document.querySelector('input[data-location]'); 
  // Getting the value of the location input  
    const city = inputCity.value; 
  // API endpoint URL for getting forecast data
    const api_url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=fr&units=metric&appid=${apiKey}`; 
  
    const response_forecast = await fetch(api_url_forecast); // Using fetch to make a GET request to the API endpoint URL
    
    // Converting the response data to JSON format
    const data_forecast = await response_forecast.json();
     // Getting the current date and time
   const now = new Date();
   const otherDays = data_forecast.list.filter(item => item.dt_txt.includes('12:00:00'));

// Selects an HTML element with the 'app-main-bottom' class
const otherDaysSection = document.querySelector('.app-main-bottom');

// Delete the HTML content of this element
otherDaysSection.innerHTML = '';

// Browse the array 'otherDays' and execute a function for each element
otherDays.map(item => {

    // Builds the weather icon URL using the icon ID from the current element's weather object
    const iconUrl = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;

    // Building the HTML code to display the weather information of the current element
    const otherDayHtml =
        `<div class='day-item'>
        <div>${item.dt_txt.slice(0, 10)}</div> 
        <img src='${iconUrl}' alt='${item.weather[0].description}' /> 
        <div>${item.weather[0].description}</div> 
        <div><strong>${Math.round(item.main.temp)} °C</strong></div> 
        </div>`;
  /*
   1 - Displays the current date 
   2 - Displays the weather icon and its description 
   3 - Displays the weather description 
   4 - Displays the temperature rounded in degrees Celsius
   */

  // Insert the HTML code generated for this element at the end of the 'otherDaysSection' section
    otherDaysSection.insertAdjacentHTML('beforeend', otherDayHtml);
});  
}
displayForecast();

/*END*/