import { API_KEY } from './secured/api.js'

// 시 분 반환 함수
let getTime = () => {
  let date = new Date()
  let hour = date.getHours().toString().padStart(2, '0');
  let min = date.getMinutes().toString().padStart(2, '0');

  return (hour + " : " + min);
};
// 시 분 출력 함수
let showTime = () => {
  let time = document.querySelector('.time');
  time.innerHTML = getTime();

  setTimeout(showTime, 1000);
}

// 위치 정보 받기
function askForCoords(){
  navigator.geolocation.getCurrentPosition(succes, error);
}

function succes(position){
  const latitude =  position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  getWeather(latitude, longitude);
}

function error(position){
  console.log('Cant get your position.');
  getWeather(37.5683, 126.9778)
}


let getWeather = (lat, lon) => {
  let weatherIcon = document.querySelector('.weather-icon');
  let weatherTemp = document.querySelector('.weather-temp');
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(res => res.json())
  .then(data => {
      const temp = data.main.temp;
      const weathers = data.weather[0];

      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weathers.icon}@2x.png">`
      weatherTemp.innerHTML = `${Math.floor(temp)}&#176;`;
  })
}


showTime();
askForCoords();
