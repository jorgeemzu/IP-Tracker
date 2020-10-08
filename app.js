const tilesOPM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const api_uri = 'https://geo.ipify.org/api/';
const secret_api = 'at_Hy0HMg184YTcpygq5yVaAvKhcHszs';
const current_verion = 'v1';
const btn = document.getElementById('submit');
const inputField = document.querySelector('.input__field');
const IP_field = document.querySelector('.ip_adress');
const locationInfo = document.querySelector('.location__info');
const timezone = document.querySelector('.timezone__info');
const isp = document.querySelector('.isp__info');

const map = L.map('mapid', {
	center: [0, 0],
	zoom: 0,
	layers: [
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		}),
	],
});

updateMap = (update_map = [-33.665, 18.993]) => {
	map.setView(update_map, 15);
	L.marker(update_map).addTo(map);
};

//get de User's IP adress
function userIP() {
	fetch('https://api.ipify.org/?format=json')
		.then(response => response.json())
		.then(data => {
			let ipUrl = `${api_uri}${current_verion}?apiKey=${secret_api}&ipAddress=${data.ip}`;

			fetch(ipUrl)
				.then(response2 => response2.json())
				.then(data2 => {
					IP_field.textContent = data2.ip;
					locationInfo.textContent = `${data2.location.city}, ${data2.location.country}`;
					timezone.textContent = `UTC ${data2.location.timezone}`;
					isp.textContent = data2.isp;

					updateMap([data2.location.lat, data2.location.lng]);
				});
		});
}

// get
function getIP() {
	let enteredIP = document.getElementById('input').value;
	let ipUrl = `${api_uri}${current_verion}?apiKey=${secret_api}&ipAddress=${enteredIP}`;
	fetch(ipUrl)
		.then(response => response.json())
		.then(data => {
			IP_field.textContent = data.ip;
			locationInfo.textContent = `${data.location.city}, ${data.location.country}`;
			timezone.textContent = `UTC ${data.location.timezone}`;
			isp.textContent = data.isp;

			updateMap([data.location.lat, data.location.lng]);
		});
	console.log(enteredIP);
}

btn.addEventListener('click', getIP);

document.addEventListener('load', updateMap());
document.addEventListener('load', userIP());
