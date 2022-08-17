import {rus, en} from './settings.js'

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const weatherError = document.querySelector('.weather-error');
const weather = document.querySelector('.weather');

function setCityByDefault() {
   if (en.classList.contains('active')) {
      return city.setAttribute('value', "New York")
   }
   if (rus.classList.contains('active')) {
      return city.setAttribute('value', 'Нью-Йорк')
   }
}

async function getWeather() {
   setCityByDefault();
   let url;
   if (en.classList.contains('active')) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e40bb5f53a4497757c0fd52d1d0219d3&units=imperial`;
   }
   if (rus.classList.contains('active')) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=e40bb5f53a4497757c0fd52d1d0219d3&units=metric`;
   }
	const res = await fetch(url);
	const data = await res.json();

	try {
		removeWeatherError();
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      
      if (en.classList.contains('active')) {
         temperature.textContent = `${Math.floor(data.main.temp)}°F`;
         wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} mph`;
         humidity.textContent = `Humidity: ${data.main.humidity}%`;
      }

      if (rus.classList.contains('active')) {
         temperature.textContent = `${Math.floor(data.main.temp)}°C`;
         wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} m/s`;
         humidity.textContent = `Влажность: ${data.main.humidity}%`;
      }

		weatherDescription.textContent = data.weather[0].description;
		
	} catch (err) {
		showWeatherError();
	}
}

function setWeatherLocalStorage() {
	if (city.value === '') {
		removeWeatherError();
	};
	return localStorage.setItem('city', city.value);
}

function getWeatherLocalStorage() {
	if (localStorage.getItem('city')) {
		city.value = localStorage.getItem('city');
		getWeather();
	}
}

function showWeatherError() {
   if (en.classList.contains('active')) {
      weatherError.textContent = `Error! City not found`;
   }
   if (rus.classList.contains('active')) {
      weatherError.textContent = `Ошибка! Город не найден`;
   }
	temperature.classList.add('hidden');
	weatherDescription.classList.add('hidden');
	wind.classList.add('hidden');
	humidity.classList.add('hidden');
	weather.style.justifyContent = 'start';
}

function removeWeatherError() {
	weatherError.textContent = "";
	temperature.classList.remove('hidden');
	weatherDescription.classList.remove('hidden');
	wind.classList.remove('hidden');
	humidity.classList.remove('hidden');
	weather.style.justifyContent = 'start';
}

city.addEventListener('change', getWeather);
rus.addEventListener('click', getWeather);
en.addEventListener('click', getWeather);
window.addEventListener('beforeunload', setWeatherLocalStorage);
window.addEventListener('load', getWeatherLocalStorage);

export {getWeather, setWeatherLocalStorage, getWeatherLocalStorage}