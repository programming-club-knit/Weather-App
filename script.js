const apiKey = "640639d0e42b989e8206c8887d92af83"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    }
});

async function fetchWeather(city) {
    try {
        if(apiKey == "")
        {
            weatherInfo.innerHTML = `<p>API Key is missing. Please configure a valid API Key.</p>`;
            return;
        }
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if(data.cod === 401)
        {
            weatherInfo.innerHTML = `<p>Invalid API Key. Please provide a valid API Key.</p>`;
        }
        else
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
    weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Weather: ${weather[0].description}</p>
  `;
}