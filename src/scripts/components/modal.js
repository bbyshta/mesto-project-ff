//Открытие попапа
function openPopup (popup) {
  popup.classList.add("popup_is-opened");
}

//Закрытие попапа
function closePopup (popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
      popup.classList.remove("popup_is-opened");
    }
  })

  popup.addEventListener('keydown', function escape (evt) {  //Закрытие попапа по клавише Escape
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");
      popup.removeEventListener('keydown', escape);
    }
    })
}

export {openPopup, closePopup};