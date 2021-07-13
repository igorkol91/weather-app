const temperature = document.querySelector('.temperature-degree');
const temepratureDesc = document.querySelector('.temperature-description');
const icon = document.querySelector('.icon-img');
const changeTemp = document.querySelector('.degree-section');
const tempSign = document.querySelector('span');
const timezone = document.querySelector('.location-timezone');
let celsius;

const dom = (() => {
  const fetchData = (defaultLocation) => {
    fetch(defaultLocation, { mode: 'cors' })
      .then((response) => response.json())
      .then((response) => {
        if (response.main) {
          icon.src = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
          celsius = Math.round(response.main.temp - 273.15);
          tempSign.innerText = 'C';
          timezone.innerText = response.name;
          temperature.innerText = celsius;
          temepratureDesc.innerText = response.weather[0].description;
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
      changeTemp.innerText = 'Change to Farenheit';
    } else {
      temperature.innerText = Math.round((celsius * (9 / 5)) + 32);
      tempSign.innerText = 'F';
      changeTemp.classList.add('farenheit');
      changeTemp.innerText = 'Change to Celsius';
    }
  };
  return {
    fetchData,
    changeTempValue,
  };
})();

export default dom;