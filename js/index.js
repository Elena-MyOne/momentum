const time = document.querySelector('.time');
const day = document.querySelector('.date');

setInterval(function () {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	time.textContent = currentTime;
	const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
	const currentDate = date.toLocaleDateString('en-US', options);
	day.textContent = currentDate;
}, 1000)

