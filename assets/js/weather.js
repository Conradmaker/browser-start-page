const API_KEY = "e65e237485ef3a75f1c76b5a18e46e46";
const COORDS = "coords";
const weahterImg = document.querySelector(".js-wheather-img");
const weahterDesc = document.querySelector(".js-wheather-desc");
const weahterTemp = document.querySelector(".js-wheather-temp");
const weahterLoc = document.querySelector(".js-wheather-loc");
const weahterMM = document.querySelector(".js-wheather-min-max");
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = Math.floor(json.main.temp);
      const place = json.name;
      console.log(json);
      const desc = json.weather[0].main;
      const icon = json.weather[0].icon;
      weahterImg.src = `http://openweathermap.org/img/w/${icon}.png`;
      weahterTemp.innerText = `${temperature}℃`;
      weahterLoc.innerText = `${place}`;
      weahterDesc.innerText = `${desc}`;
      weahterMM.innerText = `${json.main.temp_min}℃ / ${json.main.temp_max}℃`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {
  console.log("erroreoor");
}

function handleGeoSuccess(position) {
  console.log(position);
  const { latitude } = position.coords;
  const { longitude } = position.coords;

  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
