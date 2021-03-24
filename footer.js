const popUp = document.querySelector(".pop-up");

const showPopUp = () => {
  popUp.style.visibility = "visible";
}

const removePopUp = () => {
  popUp.style.visibility = "hidden";
}
popUp.addEventListener('click', removePopUp);
