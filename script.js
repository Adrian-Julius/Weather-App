const weatherContainer = document.querySelector(".weatherContainer");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const description = document.querySelector(".description");
const weatherEmoji = document.querySelector(".weatherEmoji");

async function weatherShow() {
  const cityInput = document.getElementById("inputCity").value;

  //if there is value in cityInput
  if (cityInput !== "") {
    const weatherData = await getWeather(cityInput);

    //pass the value of weatherData to displayWeather(weatherData)
    displayWeather(weatherData);
  } else {
    alert("PLEASE ENTER A VALID CITY NAME FIRST!");
  }
}

async function getWeather(city) {
  const webAPIkey = "e5432e7637816a340a2b650b672b186d";
  const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${webAPIkey}`;

  const dataFetch = await fetch(urlAPI);
  const data = await dataFetch.json();

  //pass the value of data to displayWeather(data);
  displayWeather(data);
}

function displayWeather(data) {
  if (data.cod == 200) {
    city.textContent = data.name;
    document.getElementById("inputCity").value = "";

    temp.textContent = `${data.main.temp}°F`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    description.textContent = data.weather[0].description;

    let weatherEmojiId = data.weather[0].id;
    //conditional statement of weather ID from 200 to 800+
    if (weatherEmojiId >= 200 && weatherEmojiId < 300) {
      weatherEmoji.textContent = "⛈️";
    } else if (weatherEmojiId >= 300 && weatherEmojiId < 400) {
      weatherEmoji.textContent = "🌦️";
    } else if (weatherEmojiId >= 400 && weatherEmojiId < 600) {
      weatherEmoji.textContent = "🌧️";
    } else if (weatherEmojiId >= 600 && weatherEmojiId < 700) {
      weatherEmoji.textContent = "🌨️";
    } else if (weatherEmojiId >= 700 && weatherEmojiId < 800) {
      weatherEmoji.textContent = "⛅";
    } else if (weatherEmojiId == 800) {
      weatherEmoji.textContent = "☀️";
    } else {
      weatherEmoji.textContent = "🌤️";
    }
  } else {
    document.getElementById("inputCity").value = "";
    city.textContent = "";
    temp.textContent = "";
    humidity.textContent = "";
    description.textContent = "";
    weatherEmoji.textContent = "";

    alert("MAKE SURE TO ENTER A VALID CITY NAME!");
  }
}
