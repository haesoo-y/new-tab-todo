export const loadImage = () => {
  const smallImgElem = document.querySelector('.small-img');
  const largeImgElem = document.querySelector('.large-img');
  const todayMonth = new Date().getMonth();

  // 작은 이미지 보여주기
  smallImgElem.src = `../image/small/${todayMonth}.jpg`;
  smallImgElem.onload = () => {
    smallImgElem.classList.add('loaded');
  };

  // 큰 이미지 보여주기
  largeImgElem.src = `../image/large/${todayMonth}.jpg`;
  largeImgElem.onload = () => {
    largeImgElem.classList.add('loaded');
  };
};
