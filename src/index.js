let weatherDate = new Date();
let h3 = document.querySelector("#weather-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[weatherDate.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Dicember",
];
let month = months[weatherDate.getMonth()];
let date = weatherDate.getDate();
let year = weatherDate.getFullYear();
let hours = weatherDate.getHours();
let minutes = weatherDate.getMinutes();
h3.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function showCurrentTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let positionTemperature = Math.round(response.data.main.temp);
  let currentPositionTemperature = document.querySelector("#temperature");
  currentPositionTemperature.innerHTML = `${positionTemperature}`;

  let positionWind = Math.round(response.data.wind.speed);
  let currentPositionWind = document.querySelector("#wind");
  currentPositionWind.innerHTML = ` ${positionWind}`;

  let positionHumidity = Math.round(response.data.main.humidity);
  let currentPositionHumidity = document.querySelector("#humidity");
  currentPositionHumidity.innerHTML = ` ${positionHumidity}`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "46108c2f44aed2b9456dfc37c161b607";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = ` ${wind}`;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = ` ${humidity}`;
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city-input");

  let apiKey = "46108c2f44aed2b9456dfc37c161b607";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${inputCity.value}`;

  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
