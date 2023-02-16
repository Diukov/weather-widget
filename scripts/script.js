'use strict';

const container = document.querySelector('.container');
const search = document.querySelector('.search-box-button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const attributionLink = document.querySelector('.attribution');

search.addEventListener('click', () => {
  const APIKey = 'fc9603edd57f9365b1f3ea9ddff798bf';
  const city = document.querySelector('.search-box input').value;

  if (!city) {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(result => {

      if (result.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (result.weather[0].main) {
        case 'Clear':
          image.src = './images/clear.png';
          attributionLink.href = 'https://www.flaticon.com/free-icons/summertime';
          attributionLink.innerHTML = `Summertime icons created by Freepik - Flaticon`;
          break;

        case 'Rain':
          image.src = './images/rain.png';
          attributionLink.href = 'https://www.flaticon.com/free-icons/rain';
          attributionLink.innerHTML = `Rain icons created by Freepik - Flaticon`;
          break;

        case 'Snow':
          image.src = './images/snow.png';
          attributionLink.href = 'https://www.flaticon.com/free-icons/snow';
          attributionLink.innerHTML = `Snow icons created by Freepik - Flaticon`;
          break;

        case 'Clouds':
          image.src = './images/clouds.png';
          attributionLink.href = 'https://www.flaticon.com/free-icons/cloudy-day';
          attributionLink.innerHTML = `Cloudy day icons created by Freepik - Flaticon`;
          break;

        case 'Haze':
          image.src = './images/haze.png';
          attributionLink.href = 'https://www.flaticon.com/free-icons/fog';
          attributionLink.innerHTML = `Fog icons created by Freepik - Flaticon`;
          break;

        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(result.main.temp)}<span>°C</span>`;
      description.innerHTML = `${result.weather[0].description}`;
      humidity.innerHTML = `${result.main.humidity}%`;
      wind.innerHTML = `${parseInt(result.wind.speed)}km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '540px';
    });
});