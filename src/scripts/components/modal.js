function handleEscape (evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closePopup(popupIsOpened);
  }
}

//Открытие попапа
function openPopup (popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

//Закрытие попапа
function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

export {openPopup, closePopup};