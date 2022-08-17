import {body} from './globalVar.js';
import {getRandomArbitrary} from './globalFunc.js'
import {getTimeOfDay} from './greeting.js'

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

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

function getSlideNext() {
	setBg();
	return (randomNum === 20) ? randomNum = 1 : randomNum += 1;
}

function getSlidePrev() {
	setBg();
	return (randomNum === 1) ? randomNum = 20 : randomNum -= 1;
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

export {setBg, getSlideNext, getSlidePrev};