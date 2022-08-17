import playList from './playList';

const playerControls = document.querySelector('.player-controls');
const playPrevBtn = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const song = document.querySelector('.song');
const progress = document.querySelector('.progress');
const progressCotainer = document.querySelector('.progress-cotainer');
const volume = document.querySelector('.volume');
const volumeOff = document.querySelector('.volume-off');
const volumeCotainer = document.querySelector('.volume-cotainer');
const volumeProgress = document.querySelector('.volume-progress');
const timeCurrent = document.querySelector('.time-current');
const timeDuration = document.querySelector('.time-duration');

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
		pauseAudio()
	}
	setTimeTrackDuration()
}

function pauseAudio() {
   audio.pause();
	isPlay = false;
}

function toggleBtn() {
	play.classList.toggle('pause');
}

function playNext() {
	(playNum === playList.length - 1) ? playNum = 0 : playNum = playNum + 1;
	styleActivePlayItem(playNum);
	if (isPlay === true) {
		startTrack();
	}
	showAudioName();
	setTimeTrackDuration()
}

function playPrev() {
	(playNum === 0) ? playNum = playList.length - 1 : playNum = playNum - 1;
	styleActivePlayItem(playNum);
	if (isPlay === true) {
		startTrack();
	}
	showAudioName();
	setTimeTrackDuration()
}

function showAudioName() {
	return song.textContent = playList[playNum].title;
}

function setTimeTrackDuration() {
	const timeTrackDuration = playList[playNum].duration;
	return timeDuration.textContent = timeTrackDuration;
}

function setTimeTrackCurrent(e) {
	if (isPlay === true) {
		const currentTime = audio.currentTime;
		const timePast = getTimeCodeFromNum(currentTime)
		return timeCurrent.textContent = `${timePast}`
	}
}

setInterval(setTimeTrackCurrent, 1000);

//turn 128 seconds into 2:08 - put to global
function getTimeCodeFromNum(num) {
	let seconds = parseInt(num);
	let minutes = parseInt(seconds / 60);
	seconds -= minutes * 60;
	const hours = parseInt(minutes / 60);
	minutes -= hours * 60;

	if (hours === 0) return `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
	return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
}

function createLi(track) {
	const li = document.createElement('li');
	li.classList.add('play-item', 'play-single-item');
	li.textContent = `${playList[track].title}`;
	playListContainer.append(li);
}

playList.forEach((item, index) => {
	createLi(index)
});

const playItems = document.querySelectorAll('.play-item');
const arrPlayItems = Array.from(playItems);

playItems[0].classList.add('active');

function styleActivePlayItem(elem) {
	arrPlayItems.forEach(item => {
		item.classList.remove('active')
	})
	arrPlayItems[elem].classList.add('active')
}

function updateProgressBar(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	if (isPlay === true) {
		audio.currentTime = (clickX / width) * duration;
	}
}

function mutedAudio() {
	(audio.muted === false) ? audio.muted = true : audio.muted = false
	volume.classList.toggle('volume-off');
}

function setVolumeBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const progressPercent = (clickX / width) * 100;
	audio.volume = clickX / width;
	volumeProgress.style.width = `${progressPercent}%`
}

play.addEventListener('click', playAudio);
play.addEventListener('click', toggleBtn);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);

audio.addEventListener('timeupdate', updateProgressBar);
progressCotainer.addEventListener('click', setProgressBar);

volume.addEventListener('click', mutedAudio);
volumeCotainer.addEventListener('click', setVolumeBar);

const playSingleItem = document.querySelectorAll('.play-single-item')

function styleActiveSingleItem(elem) {
   playSingleItem.forEach(item => {
		item.classList.remove('active')
	})
	elem.classList.add('active');
}

playListContainer.addEventListener('click', (e) => {
   let target = e.target.closest('.play-item');
   if (target) {
      if (target.textContent === playList[0].title) playNum = 0;
      if (target.textContent === playList[1].title) playNum = 1;
      if (target.textContent === playList[2].title) playNum = 2;
      if (target.textContent === playList[3].title) playNum = 3;
      startTrack()
      showAudioName();
      play.classList.add('pause');
      styleActiveSingleItem(target)
   }
})

export {setTimeTrackCurrent, playAudio, toggleBtn, playNext, playPrev, updateProgressBar, setProgressBar, mutedAudio, setVolumeBar}