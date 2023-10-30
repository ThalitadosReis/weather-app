const apiKey = "e617d9b7a5f0e8c3a8db84127eee9082";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Fetch data from the API
async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.main && data.main.temp !== undefined) {
      // Display data
      document.querySelector(".weather").style.display = "flex";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp - 273.15) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // change weather icon
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./public/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./public/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./public/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./public/mist.png";
      }
    } else {
      // Handle the case where the temperature data is not available in the response
      console.error("Temperature data not found in the API response");
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
