import {rus, en} from './settings.js'

const date = new Date();
const greeting = document.querySelector('.greeting');
const hours = date.getHours();
const name = document.querySelector('.name');
const greetingContainer = document.querySelector('.greeting-container');

function getTimeOfDay() {
	if (hours >= 0 && hours <= 5) return 'night';
	if (hours >= 6 && hours <= 11) return 'morning';
	if (hours >= 12 && hours <= 17) return 'afternoon';
	if (hours >= 18 && hours <= 23) return 'evening';
}

const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`

function getTimeOfDayRus() {
	if (hours >= 0 && hours <= 5) return 'Доброй ночи,';
	if (hours >= 6 && hours <= 11) return 'Доброго утра,';
	if (hours >= 12 && hours <= 17) return 'Добрый день,';
	if (hours >= 18 && hours <= 23) return 'Добрый вечер,';
}

const timeOfDayRus = getTimeOfDayRus();

function showGreeting(lang) {
   if (en.classList.contains('active') || lang === en) {
      greeting.textContent = greetingText;
      name.setAttribute('placeholder', '[Enter name]')
   }
   if (rus.classList.contains('active') || lang === rus) {
      greeting.textContent = timeOfDayRus;
      name.setAttribute('placeholder', '[Имя]')
   }
}


rus.addEventListener('click', showGreeting);
en.addEventListener('click', showGreeting);

function setLocalStorage() {
	localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function  getLocalStorage() {
	if (localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}
}
window.addEventListener('load', getLocalStorage);

export {getTimeOfDay, showGreeting, setLocalStorage, getLocalStorage, greetingContainer}