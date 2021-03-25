const popUp = document.querySelector(".pop-up");

// 팝업창 띄우기
const showPopUp = () => {
  popUp.style.visibility = "visible";
}

// 팝업창 닫기
const removePopUp = () => {
  popUp.style.visibility = "hidden";
}
popUp.addEventListener('click', removePopUp);
