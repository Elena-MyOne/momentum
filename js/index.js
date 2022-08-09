//Date and time
const date = new Date();
const time = document.querySelector('.time');
const day = document.querySelector('.date');

setInterval(function showTime() {

	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	time.textContent = currentTime;

	const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
	const currentDate = date.toLocaleDateString('en-US', options);
	day.textContent = currentDate;

	showGreeting();

}, 1000)

//greeting===============================================
const greeting = document.querySelector('.greeting');
const hours = date.getHours();
const name = document.querySelector('.name');

function getTimeOfDay() {
	if (hours >= 0 && hours <= 5) return 'night';
	if (hours >= 6 && hours <= 11) return 'morning';
	if (hours >= 12 && hours <= 17) return 'afternoon';
	if (hours >= 18 && hours <= 23) return 'evening';
}

const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`

const showGreeting = () => greeting.textContent = greetingText;

function setLocalStorage() {
	localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}
}
window.addEventListener('load', getLocalStorage)

//Slider==============================================
const body = document.body;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

//поместить в основной файл
function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const getRandomNum = () => getRandomArbitrary(1, 20);

let randomNum = getRandomNum();

function setBg() {
	const timeOfDay = getTimeOfDay();
	let bgNum = randomNum;

	if (bgNum < 10) {
		bgNum = `0${bgNum}`;
	}

	const img = new Image();
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
	img.onload = () => {
		body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
	};
}

setBg();

function getSlideNext() {
	setBg();
	return (randomNum === 20) ? randomNum = 1 : randomNum += 1;
}

slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
	setBg();
	return (randomNum === 1) ? randomNum = 20 : randomNum -= 1;
}

slidePrev.addEventListener('click', getSlidePrev);

//weather widget========================================================
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

city.addEventListener('change', getWeather);

const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const langEn = 'en';
const langRu = 'ru';
const tempC = 'metric';
const tempF = 'imperial';

async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langEn}&appid=e40bb5f53a4497757c0fd52d1d0219d3&units=${tempC}`;
	const res = await fetch(url);
	const data = await res.json();

	try {
		removeWeaterError();
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		temperature.textContent = `${Math.floor(data.main.temp)}°C`;
		weatherDescription.textContent = data.weather[0].description;
		wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
		humidity.textContent = `Humidity: ${data.main.humidity}%`;
	} catch (err) {
		showWeatherError();
	}

}
getWeather();

function setWeatherLocalStorage() {
	if (city.value === '') {
		removeWeaterError();
		city.value = 'Minsk'
	};
	return localStorage.setItem('city', city.value);
}

window.addEventListener('beforeunload', setWeatherLocalStorage);

function getWeatherLocalStorage() {
	if (localStorage.getItem('city')) {
		city.value = localStorage.getItem('city');
		getWeather();
	}
}

window.addEventListener('load', getWeatherLocalStorage);

const weatherError = document.querySelector('.weather-error');
const weather = document.querySelector('.weather');

function showWeatherError() {
	weatherError.textContent = `Error! city not found`;
	temperature.classList.add('hidden');
	weatherDescription.classList.add('hidden');
	wind.classList.add('hidden');
	humidity.classList.add('hidden');
	weather.style.justifyContent = 'start';
}

function removeWeaterError() {
	weatherError.textContent = "";
	temperature.classList.remove('hidden');
	weatherDescription.classList.remove('hidden');
	wind.classList.remove('hidden');
	humidity.classList.remove('hidden');
	weather.style.justifyContent = 'start';
}
//quote==================================================================
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {
	try {
		const quotes = 'https://type.fit/api/quotes';
		const res = await fetch(quotes);
		const data = await res.json();

		let quoteNum = getRandomArbitrary(0, 1642);
		quote.textContent = `"${data[quoteNum].text}"`;
		(data[quoteNum].author === null) ? author.textContent = 'Ananimus' : author.textContent = data[quoteNum].author;
	} catch (err) {
		showQuoteError();
	}

}
getQuotes();

changeQuote.addEventListener('click', getQuotes);

function showQuoteError() {
	quote.textContent = 'Error! quote not found';
	author.textContent = '';
}

//playList.js=========================================
const playList = [
	{
		title: 'Aqua Caelestis',
		src: '../assets/sounds/Aqua Caelestis.mp3',
		duration: '00:39'
	},
	{
		title: 'Ennio Morricone',
		src: '../assets/sounds/Ennio Morricone.mp3',
		duration: '01:37'
	},
	{
		title: 'River Flows In You',
		src: '../assets/sounds/River Flows In You.mp3',
		duration: '01:37'
	},
	{
		title: 'Summer Wind',
		src: '../assets/sounds/Summer Wind.mp3',
		duration: '01:50'
	}
]

//player.js========================================================================
const playerControls = document.querySelector('.player-controls');
const playPrevBtn = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const song = document.querySelector('.song');
const progress = document.querySelector('.progress');
const progressCotainer = document.querySelector('.progress-cotainer');

let isPlay = false;

let playNum = 0;

const audio = new Audio();

function startTrack() {
	audio.src = playList[playNum].src;
	audio.currentTime = 0;
	audio.play();
	isPlay = true;
}

function playAudio() {
	if (isPlay === false) {
		startTrack();
	} else {
		audio.pause();
		isPlay = false
	}
}

function toggleBtn() {
	play.classList.toggle('pause');
}

function playNext() {
	(playNum === playList.length - 1) ? playNum = 0 : playNum = playNum + 1;
	styleActivePlayItem(playNum)
	if (isPlay === true) {
		startTrack();
	}
	showAudioName()
}

function playPrev() {
	(playNum === 0) ? playNum = playList.length - 1 : playNum = playNum - 1;
	styleActivePlayItem(playNum)
	if (isPlay === true) {
		startTrack();
	}
	showAudioName()
}

function showAudioName() {
	return song.textContent = playList[playNum].title;
}

play.addEventListener('click', playAudio);
play.addEventListener('click', toggleBtn);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);

function createLi(track) {
	const li = document.createElement('li');
	li.classList.add('play-item');
	li.textContent = `${playList[track].title}`;
	playListContainer.append(li);
}

playList.forEach((item, index) => {
	createLi(index)
});

const playItems = document.querySelectorAll('.play-item');
playItems[0].classList.add('active');

function styleActivePlayItem(elem) {
	const arrPlayItems = Array.from(playItems);
	arrPlayItems.forEach(item => {
		item.classList.remove('active')
	})
	arrPlayItems[elem].classList.add('active')
}

function updateProgressBar(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPrercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPrercent}%`
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('timeupdate', updateProgressBar);
progressCotainer.addEventListener('click', setProgressBar);


/* 
TODO
+ и перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека
+ отображается текущее и общее время воспроизведения трека
+ есть кнопка звука при клике по которой можно включить/отключить звук
+ добавлен регулятор громкости, при перемещении ползунка регулятора громкости 
	меняется громкость проигрывания звука
+ можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте

*/