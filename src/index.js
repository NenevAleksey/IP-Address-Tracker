import {validateIp} from './helpers';

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

//получение данных
function getData() {
   //проверка данных
   if(validateIp(ipInput.value)) {
      
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