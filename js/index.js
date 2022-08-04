const time = document.querySelector('.time');

setInterval(function () {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	time.textContent = currentTime;
}, 1000)

