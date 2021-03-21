(() => {
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
  
  
  showTime();

})();