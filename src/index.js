import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import { validateIp, getAddress, addOffset } from './helpers';
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
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map)

//получение данных
function getData() {
   //проверка данных
   if (validateIp(ipInput.value)) {
      getAddress(ipInput.value)
         .then(setInfo)
   }
}
function handleKey(e) {
   if (e.key === 'Enter') {
      getData();
   }
}

//отрисовка ip адреса в блок вывода информации + карта
function setInfo(mapData) {
   const { lat, lng, country, region, timezone } = mapData.location;

   //блок вывода ip
   ipInfo.innerText = mapData.ip;
   locationInfo.innerText = country + ' ' + region;
   timezoneInfo.innerText = timezone;
   ispInfo.innerText = mapData.isp;

   //карта
   map.setView([lat, lng]);
   L.marker([lat, lng], { icon: markerIcon }).addTo(map);

   if (window.matchMedia('(max-width: 1023px)').matches) {
      addOffset(map)
   }
}

//ip по умолчанию при загрузке
document.addEventListener('DOMContentLoaded', () => {
   getAddress('20.29.11.11').then(setInfo)
})