const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=82470661da234cf13af6ae862005dbc7';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value;
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);
			const iconId = status.id;

			cityName.textContent = res.data.name;
			weather.textContent = status.main;
			temperature.textContent = Math.floor(temp) + '°C';
			humidity.textContent = hum + '%';
			input.value = '';
			warning.textContent = '';

			if (iconId >= 200 && iconId < 300) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (iconId >= 300 && iconId < 400) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (iconId >= 500 && iconId < 600) {
				photo.setAttribute('src', './img/rain.png');
			} else if (iconId >= 600 && iconId < 700) {
				photo.setAttribute('src', './img/ice.png');
			} else if (iconId >= 700 && iconId < 800) {
				photo.setAttribute('src', './img/fog.png');
			} else if (iconId === 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (iconId > 800 && iconId < 900) {
				photo.setAttribute('src', './img/cloud.png');
			} else {
				photo.setAttribute('src', './img/unknown.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta'));
};
const enterCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};
input.addEventListener('keyup', enterCheck);
button.addEventListener('click', getWeather);
