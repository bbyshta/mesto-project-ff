function handleEscape (evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closePopup(popupIsOpened);
  }
}

//Открытие попапа
function openPopup (popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("keydown", handleEscape);
}

//Закрытие попапа
function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("keydown", handleEscape);
}

export {openPopup, closePopup};