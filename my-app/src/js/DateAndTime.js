import {showGreeting} from './greeting.js';
import { rus, en } from './settings.js';

const time = document.querySelector('.time');
const day = document.querySelector('.date');

function showTime() {

	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	time.textContent = currentTime;

	const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' };

   if (en.classList.contains('active')) {
      showGreeting(en);
      const currentDate = date.toLocaleDateString('en-US', options);
      day.textContent = currentDate;
   }

   if (rus.classList.contains('active')) {
      showGreeting(rus);
      const currentDate = date.toLocaleDateString('ru', options);
      day.textContent = currentDate;
   }
}

//ru

export {showTime, time, day};