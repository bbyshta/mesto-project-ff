import '../pages/index.css';
import {openPopup, closePopup} from './components/modal.js';
import {initialCards, createCard, deleteCard, likeBtnHandler} from './components/cards.js';

const cardsContainer = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const cardAddBtn = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

//Обработчик закрытия попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  })
})

//Открытие/закрытие попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  editProfileForm.elements.name.value = profileName.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
})

//Сабмит изменений в профиле
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  closePopup(popupEditProfile);
}

editProfileForm.addEventListener('submit', handleEditSubmit);

//Открытие/закрытие попапа добавления карточки
cardAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
})

//Сабмит новой карточки
function submitNewCard (evt) {
  evt.preventDefault();
  const cardObject = {};
  cardObject.name = newPlaceForm.elements["place-name"].value;
  cardObject.link = newPlaceForm.elements.link.value;
  const card = createCard(cardObject, {deleteCard, likeBtnHandler, clickImageHandler});
  cardsContainer.prepend(card);
  closePopup(popupAddCard);
  newPlaceForm.reset();
}

newPlaceForm.addEventListener('submit', submitNewCard);

//Обработчик клика по изображению
function clickImageHandler(evt) {
  openPopup(popupImage);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
}

//Вывести карточки из массива на страницу
initialCards.forEach((item) => {
  const card = createCard(item, {deleteCard, likeBtnHandler, clickImageHandler});
  cardsContainer.append(card);
});