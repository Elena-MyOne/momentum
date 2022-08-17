//import image from './images/lazy.png';
import {showTime} from './js/DateAndTime.js';
import {setLocalStorage,  getLocalStorage} from './js/greeting.js';
import {setBg} from './js/slider.js';
import {getWeather} from './js/weatherWidget.js';
import {getQuotes} from './js/quote.js';
import {setTimeTrackCurrent, playAudio, toggleBtn, playNext, playPrev, updateProgressBar, setProgressBar, mutedAudio, setVolumeBar} from './js/player.js';
import {settings, showSettings} from './js/settings.js'

//time and date
setInterval(showTime, 1000);

//greeting
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

//slider
setBg();

//weather
getWeather();

//quote
getQuotes();

