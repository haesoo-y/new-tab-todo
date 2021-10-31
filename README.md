# New-Tab-To-do

### 목적

- 다양한 기능을 넣은 새 탭 페이지 개발 ( to-do리스트, 랜덤 배경사진,시간, 검색엔진, 날씨, 기온별 의상추천)

### 미리보기
- [바로가기](https://new-tab-todo.netlify.app/)

- Desktop size

![demo-desktop](https://user-images.githubusercontent.com/71266602/139566498-eef757aa-8737-4df4-b534-5ecf99e22f97.gif)

  
- Mobile size

![demo-mobile](https://user-images.githubusercontent.com/71266602/139566501-649c2d72-686a-4afc-aa87-28ef352f2443.gif)

  


### 상세내용

1. 검색엔진 3개를 구현하여 상단에 배치함. 각각 텍스트를 쿼리로 넘겨서 링크를 이동하도록 구현

    ```jsx
    // search.js
    if (submitEngine == "naver") {
      location.href = `https://search.naver.com/search.naver?query=${text}`
    } else if (submitEngine == "google") {
      location.href = `https://www.google.co.kr/search?q=${text}`
    } else if (submitEngine == "daum") {
      location.href = `https://search.daum.net/search?q=${text}`
    }
    ```

2. 현재 시간을 표시함

    ```jsx
    // script.js
    const getTime = () => {
      let date = new Date()
      let hour = date.getHours().toString().padStart(2, '0');
      let min = date.getMinutes().toString().padStart(2, '0');

      return (hour + " : " + min);
    };
    ```

    - `padStart`로 두자릿수로 표현
3. 현재 위치의 날씨를 표시함

    ```jsx
    // script.js
    const askForCoords = () => {
      navigator.geolocation.getCurrentPosition(succes, error);
    }

    // 위치 정보 권한 승낙 시 위도 경도 객체 생성
    const succes = (position) => {
      const latitude =  position.coords.latitude;
      const longitude = position.coords.longitude;
      const coordsObj = {
        latitude,
        longitude
      };
      getWeather(latitude, longitude);
    }

    // 위치 정보 권한 거부 시 위치를 서울로 지정
    const error = (position) => {
      console.log('Cant get your position.');
      getWeather(37.5683, 126.9778)
    }
    ```

    - `geolocation`으로 사용자의 위치 위도 경도를 받고, 거부 시 서울의 위경도 데이터를 받음

    ```jsx
    // script.js
    const getWeather = (lat, lon) => {
      const weatherIcon = document.querySelector('.weather-icon');
      const weatherTemp = document.querySelector('.weather-temp');
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
          let temp = data.main.temp;
          let weathers = data.weather[0];
          let location = data.name

          weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weathers.icon}@2x.png">`
          weatherTemp.innerHTML = `${Math.floor(temp)}&#176;`;

          showClothes(temp);
          showLocation(location);
      })
    }
    ```

    - 위경도 데이터를 토대로 날씨 아이콘과 기온을 출력하도록함
    - 위치명은 팝업창에서 사용하기 위해서 변수로 지정해둠
4. 기온에 따라 적합한 옷을 보여주도록함

    ```jsx
    // script.js
    const showClothes = (tmp) => {
      const clothesTop = document.querySelector(".clothes-top");
      const clothesMiddle = document.querySelector(".clothes-middle");
      const clothesBottom = document.querySelector(".clothes-bottom");

      if (tmp >= 29){
       //...
      } else { // 4도 이하
       //...
      }
    }
    ```

    - 삼각형 버튼 호버시, 온도별로 아래의 로직에 따라 추천의상이 보여짐
    
      |구분| ~ 4|5 ~ 10|11 ~ 16|17 ~ 22|23 ~ 28|29 ~ |
      |:----:|:----:|:----:|:----:|:----:|:----:|:----:|
      |상의|패딩 니트 내의|코트 니트|점퍼 긴팔|셔츠|반팔|민소매|
      |하의|바지 내의|바지|바지|바지|바지|5부|
      |기타|양말 장갑 목도리|양말|양말|양말|양말||
5. to-do 리스트를 추가할 수 있도록 구현함
    - `input`으로 데이터를 받고 로컬에 저장함

    ```jsx
    // todo.js
    let todos = [];

    // 제출 시 리스트 추가
    const onSubmit = (e) => {
      e.preventDefault();

      id = new Date();
      id = id.getTime();

      const todoObj = {
        text: todoInput.value,
        id,
        done: false,
      }

      showList(todoObj);
      saveLocal();

      todoInput.value = '';

    }
    ```

    - 저장 시 텍스트 내용과 타임스탬프를 넣은 id, 완료여부를 객체형태로 전달함
    - id 를 확인해서 x버튼 클릭 시 요소를 제거하거나 done여부를 구분하도록 함.
    - 첫 로드 시 로컬저장소에서 저장된 객체를 불러와서 화면에 표시할 수 있도록 함

    ```jsx
    // todo.js
    // 로컬저장소에서 불러오기
    const loadLocal = () => {
      if (localStorage.getItem(localTODO)) {
        const arr = JSON.parse(localStorage.getItem(localTODO));
        arr.forEach(item => showList(item))
      }
    }
    ```

6. todo리스트가 많아지면 스크롤이 생성됨

    ```css
    /* style.css */
    .todo-section ul::-webkit-scrollbar {
      width: 10px;
    }

    .todo-section ul::-webkit-scrollbar-track {
      background-color: rgba(150,150,150,0.1);
      border-radius: 5px;
    }

    .todo-section ul::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.5);
      border-radius: 5px;
      background-clip: padding-box;
      border: 1px solid transparent;
    }
    ```

    - `scrollbar`의 너비를 지정하고 스타일을 각각 부여함
    - `track`과 `thumb`에 `border-radius` 속성으로 스타일을 변경함
    - `thumb`에 `padding`을 주기위해서 `background-clip`과 `border`을 사용함
7. Netlify를 이용해서 배포함

### 참고

- 브라우저에서 새 탭 지정하는 법 [[링크]](https://haesoo9410.tistory.com/191)
- 도네리카노 [[링크]](https://donaricano.com/mypage/1673102942_uuPtwc)
- 사이트 바로가기 [[링크]](https://new-tab-todo.netlify.app/)

### 히스토리

- 검색 창에 돋보기 버튼 추가 (21.03.25)
  - 의견 : 모바일 환경에서 검색창이 로그인 창처럼 느껴진다.
- 팝업 창 내 링크 범위 수정 (21.03.26)
  - 의견 : 아이콘만 링크여서 링크 인식이 잘 안된다. 
- 모바일 폰트 사이즈 수정 (21.03.27)
