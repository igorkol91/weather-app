import dom from './dom';

const API = '7cc9ada87cfa0d90ab55617d4f99b3c5';
let lon;
let lat;
let defaultLocation;
const timezone = document.querySelector('.location-timezone');
const changeTemp = document.querySelector('.degree-section');
const inputForm = document.querySelector('form');

const loadPage = () => {
  window.addEventListener('load', () => {
    if (timezone.innerText === '') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lon = position.coords.longitude;
          lat = position.coords.latitude;
          defaultLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
          dom.fetchData(defaultLocation);
        });
      } else {
        defaultLocation = `http://api.openweathermap.org/data/2.5/weather?q=Struga&appid=${API}`;
        dom.fetchData(defaultLocation);
      }
    }
  });
  changeTemp.addEventListener('click', () => {
    dom.changeTempValue();
  });

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.querySelector('input').value;
    const location = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
    dom.fetchData(location);
  });
};

export default loadPage;
