import { API_KEY } from './src/api.js';
import { loadImage } from './src/background.js';

// 시 분 반환 함수
const getTime = () => {
  let date = new Date();
  let hour = date.getHours().toString().padStart(2, '0');
  let min = date.getMinutes().toString().padStart(2, '0');

  return hour + ' : ' + min;
};

// 시 분 출력 함수
const showTime = () => {
  let time = document.querySelector('.time');
  time.innerHTML = getTime();

  setTimeout(showTime, 1000);
};

// 위치 정보 받기
const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(succes, error);
};

// 위치 정보 권한 승낙 시 위도 경도 객체 생성
const succes = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(latitude, longitude);
};

// 위치 정보 권한 거부 시 위치를 서울로 지정
const error = (position) => {
  console.log('Cant get your position.');
  getWeather(37.5683, 126.9778);
};

// 위도 경도 정보로 날씨 정보를 불러옴
const getWeather = (lat, lon) => {
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherTemp = document.querySelector('.weather-temp');
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      let temp = data.main.temp;
      let weathers = data.weather[0];
      let location = data.name;

      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weathers.icon}@2x.png">`;
      weatherTemp.innerHTML = `${Math.floor(temp)}&#176;`;

      showClothes(temp);
      showLocation(location);
    });
};

// 날씨 정보를 받은 위치명을 팝업창에 삽입
const showLocation = (name) => {
  const locationInfo = document.querySelector('.location-info');
  locationInfo.innerHTML = `Location : ${name}`;
};

// 날씨 정보에서 받은 기온으로 적합한 옷 출력
const showClothes = (tmp) => {
  const clothesTop = document.querySelector('.clothes-top');
  const clothesMiddle = document.querySelector('.clothes-middle');
  const clothesBottom = document.querySelector('.clothes-bottom');

  if (tmp >= 29) {
    clothesTop.innerHTML = '<img src="./icon/sleeveless.png" alt="sleeveless-image"/>';
    clothesMiddle.innerHTML = '<img src="./icon/short-pants.png" alt="short-pants-image"/>';
  } else if (tmp >= 23) {
    clothesTop.innerHTML = '<img src="./icon/short-t-shirt.png" alt="short-t-shirt-image"/>';
    clothesMiddle.innerHTML = '<img src="./icon/pants.png" alt="pants-image"/>';
    clothesBottom.innerHTML = '<img src="./icon/socks.png" alt="socks-image"/>';
  } else if (tmp >= 17) {
    clothesTop.innerHTML = '<img src="./icon/shirt.png" alt="shirt-image"/>';
    clothesMiddle.innerHTML = '<img src="./icon/pants.png" alt="pants-image"/>';
    clothesBottom.innerHTML = '<img src="./icon/socks.png" alt="socks-image"/>';
  } else if (tmp >= 11) {
    clothesTop.innerHTML =
      '<img src="./icon/t-shirt.png" alt="t-shirt-image"/>' + '<img src="./icon/jacket.png" alt="jacket-image"/>';
    clothesMiddle.innerHTML = '<img src="./icon/pants.png" alt="pants-image"/>';
    clothesBottom.innerHTML = '<img src="./icon/socks.png" alt="socks-image"/>';
  } else if (tmp >= 5) {
    clothesTop.innerHTML =
      '<img src="./icon/knit.png" alt="knit-image"/>' + '<img src="./icon/coat.png" alt="coat-image"/>';
    clothesMiddle.innerHTML = '<img src="./icon/pants.png" alt="pants-image"/>';
    clothesBottom.innerHTML = '<img src="./icon/socks.png" alt="socks-image"/>';
  } else {
    // 4도 이하
    clothesTop.innerHTML =
      '<img src="./icon/t-shirt.png" alt="t-shirt-image"/>' +
      '<img src="./icon/knit.png" alt="knit-image"/>' +
      '<img src="./icon/winter-jacket.png" alt="winter-jacket-image"/>';
    clothesMiddle.innerHTML =
      '<img src="./icon/inner-pants.png" alt="inner-pants-image"/>' + '<img src="./icon/pants.png" alt="pants-image"/>';
    clothesBottom.innerHTML =
      '<img src="./icon/socks.png" alt="socks-image"/>' + '<img src="./icon/winter.png" alt="winter-acc-image"/>';
  }
};

loadImage();
showTime();
askForCoords();
