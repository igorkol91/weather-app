const API = '7cc9ada87cfa0d90ab55617d4f99b3c5';

// http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7cc9ada87cfa0d90ab55617d4f99b3c5` For only city entered
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} for entering long lat

let lon;
let lat;
let defaultLocation;
let celsius;
const timezone = document.querySelector('.location-timezone');
const temperature = document.querySelector('.temperature-degree');
const temepratureDesc = document.querySelector('.temperature-description');
const icon = document.querySelector('.icon-img');
const changeTemp = document.querySelector('#degree-section');
const tempSign = document.querySelector('span');
const inputForm = document.querySelector('form');

const fetchData = (defaultLocation) => {
  fetch(defaultLocation, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      if (response.main) {
        celsius = Math.round(response.main.temp - 273.15);
        tempSign.innerText = 'C';
        timezone.innerText = response.name;
        temperature.innerText = celsius;
        temepratureDesc.innerText = response.weather[0].description;
        icon.src = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
      } else {
        tempSign.innerText = '';
        temperature.innerText = '';
        temepratureDesc.innerText = '';
        icon.src = '#';
        timezone.innerText = 'City not found!';
      }
    });
};

const changeTempValue = () => {
  if (changeTemp.classList.contains('farenheit')) {
    temperature.innerText = celsius;
    tempSign.innerText = 'C';
    changeTemp.classList.remove('farenheit');
  } else {
    temperature.innerText = Math.round((celsius * (9 / 5)) + 32);
    tempSign.innerText = 'F';
    changeTemp.classList.add('farenheit');
  }
};

window.addEventListener('load', () => {
  if (timezone.innerText === '') {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        defaultLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
        fetchData(defaultLocation);
      });
    } else {
      defaultLocation = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API}`;
      fetchData(defaultLocation);
    }
  }
});

changeTemp.addEventListener('click', () => {
  changeTempValue();
});

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = document.querySelector('input').value;
  const location = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
  fetchData(location);
});
