import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import { validateIp } from './helpers';
import icon from '../images/icon-location.svg'

//переменные
const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.getElementById('ip');
const locationInfo = document.getElementById('location');
const timezoneInfo = document.getElementById('timezone');
const ispInfo = document.getElementById('isp');

//привязка событий
btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

//карта
const mapArea = document.querySelector('.map');
const markerIcon = L.icon({
   iconUrl: icon,
   iconSize: [30, 40],
});
const map = L.map(mapArea, {
   center: [51.505, -0.09],
   zoom: 13,
   zoomControl: false,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="#">Aleksey Nenev</a>.'
}).addTo(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map)

//получение данных
function getData() {
   //проверка данных
   if (validateIp(ipInput.value)) {

      fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_pDzZQgOH7MfWwtJaGqBDa3vVKtoAl&ipAddress=${ipInput.value}`)
         .then(response => response.json())
         .then(data => setInfo(data))
   }
}
function handleKey(e) {
   if (e.key === 'Enter') {
      getData();
   }
}

//отрисовка ip адреса в блок вывода информации
function setInfo(mapData) {
   ipInfo.innerText = mapData.ip;
   locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
   timezoneInfo.innerText = mapData.location.timezone;
   ispInfo.innerText = mapData.isp;
}