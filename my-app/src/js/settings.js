import { body } from "./globalVar";
import { time, day } from "./DateAndTime.js";
import { greetingContainer } from "./greeting.js";

const settings = document.querySelector('.settings');
const settingsPopup = document.querySelector('.settings-popup');
const popupClose = document.querySelector('.popup-close');
const en = document.querySelector('.en');
const rus = document.querySelector('.rus');
const language = document.querySelector('.language');
const hideWidget = document.querySelector('.hide-widget');
const timeWidget = document.querySelector('.time-widget');
const dateWidget = document.querySelector('.date-widget');
const greetingWidget = document.querySelector('.greeting-widget');
const quoteWidget = document.querySelector('.quote-widget');
const weatherWidget = document.querySelector('.weather-widget');
const playerWidget = document.querySelector('.player-widget');
const footer = document.querySelector('.footer');
const weather = document.querySelector('.weather');
const player = document.querySelector('.player');


function showSettings() {
   settings.style.display = 'none';
   settingsPopup.classList.add('active')
}

function hideSettings() {
   settings.style.display = 'block';
   settingsPopup.classList.remove('active')
}

function translateSettings() {
   if (en.classList.contains('active')) {
      language.textContent = 'language:';
      en.textContent = 'en';
      rus.textContent = 'rus';
      hideWidget.textContent = 'hide widget:';
      timeWidget.textContent = 'time';
      dateWidget.textContent = 'day';
      greetingWidget.textContent = 'greeting';
      quoteWidget.textContent = 'quote';
      weatherWidget.textContent = 'weather';
      playerWidget.textContent = 'player';
   }
	if (rus.classList.contains('active')) {
      language.textContent = 'язык:';
      en.textContent = 'анг';
      rus.textContent = 'ру';
      hideWidget.textContent = 'скрыть виджет:';
      timeWidget.textContent = 'время';
      dateWidget.textContent = 'день';
      greetingWidget.textContent = 'приветствие';
      quoteWidget.textContent = 'цитата';
      weatherWidget.textContent = 'погода';
      playerWidget.textContent = 'плеер';
   }
}

const setLanguageRus = () => {
   en.classList.remove('active')
   rus.classList.add('active');
}

const setLanguageEn = () => {
   rus.classList.remove('active');
   en.classList.add('active')
}

function setHideWidget(elem) {
   elem.classList.toggle('active');
}

function removeHideWidget(e) {
   if (e.target === timeWidget) {
      setHideWidget(timeWidget);
      time.style.opacity = 0;
   }
   if (e.target === dateWidget) {
      setHideWidget(dateWidget);
      day.style.opacity = 0;
   }
   if (e.target === greetingWidget) {
      setHideWidget(greetingWidget);
      greetingContainer.style.opacity = 0;
   }
   if (e.target === quoteWidget) {
      setHideWidget(quoteWidget);
      footer.style.opacity = 0;
   }
   if (e.target === weatherWidget) {
      setHideWidget(weatherWidget);
      weather.style.opacity = 0;
   }
   if (e.target === playerWidget) {
      setHideWidget(playerWidget);
      player.style.opacity = 0;
   }
}

function showHideWidget(e) {
   if (e.target === timeWidget && timeWidget.classList.contains('active')) {
      time.style.opacity = 1;
   }
   if (e.target === dateWidget && dateWidget.classList.contains('active')) {
      day.style.opacity = 1;
   }
   if (e.target === greetingWidget && greetingWidget.classList.contains('active')) {
      greetingContainer.style.opacity = 1;
   }
   if (e.target === quoteWidget && quoteWidget.classList.contains('active')) {
      footer.style.opacity = 1;
   }
   if (e.target === weatherWidget && weatherWidget.classList.contains('active')) {
      weather.style.opacity = 1;
   }
   if (e.target === playerWidget && playerWidget.classList.contains('active')) {
      player.style.opacity = 1;
   }
}

// const playerWidget = document.querySelector('.player-widget');

settings.addEventListener('click', showSettings);
popupClose.addEventListener('click', hideSettings);
en.addEventListener('click', setLanguageEn);
en.addEventListener('click', translateSettings);
rus.addEventListener('click', setLanguageRus);
rus.addEventListener('click', translateSettings);
timeWidget.addEventListener('click', removeHideWidget);
timeWidget.addEventListener('click', showHideWidget);
dateWidget.addEventListener('click', removeHideWidget);
dateWidget.addEventListener('click', showHideWidget);
greetingWidget.addEventListener('click', removeHideWidget);
greetingWidget.addEventListener('click', showHideWidget);
quoteWidget.addEventListener('click', removeHideWidget);
quoteWidget.addEventListener('click', showHideWidget);
weatherWidget.addEventListener('click', removeHideWidget);
weatherWidget.addEventListener('click', showHideWidget);
playerWidget.addEventListener('click', removeHideWidget);
playerWidget.addEventListener('click', showHideWidget);


export {settings, showSettings, rus, en}