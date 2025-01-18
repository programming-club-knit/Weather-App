const apiKey = "640639d0e42b989e8206c8887d92af83"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const unitToggleBtn = document.getElementById("unit-toggle");

let isCelsius = true;

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    }
});

unitToggleBtn.addEventListener("click", () => {
    isCelsius = !isCelsius; 
    unitToggleBtn.textContent = isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"; // Update button text
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city); 
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` 
        );
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    let temperature = main.temp;

    if (!isCelsius) {
        // Convert from Celsius to Fahrenheit using formula
        temperature = (temperature * 9/5) + 32;
    }

    // toggling between Celsius or Fahrenheit
    const unit = isCelsius ? "°C" : "°F";
    
    weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature.toFixed(2)}${unit}</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Weather: ${weather[0].description}</p>
  `;
}
