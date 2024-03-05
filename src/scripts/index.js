import '../pages/index.css';
import {openPopup, closePopup} from './components/modal.js';
import {initialCards, createCard, deleteCard, likeBtnHandler} from './components/cards.js';

const cardsContainer = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfile = document.forms["edit-profile"];
const newPlace = document.forms["new-place"];
const cardAddBtn = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");

//Открытие/закрытие попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  editProfile.elements.name.value = profileName.textContent;
  editProfile.elements.description.value = profileDescription.textContent;
  closePopup(popupEditProfile);
})

//Сабмит изменений в профиле
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfile.elements.name.value;
  profileDescription.textContent = editProfile.elements.description.value;
}

editProfile.addEventListener('submit', handleEditSubmit);

//Открытие/закрытие попапа добавления карточки
cardAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  closePopup(popupAddCard);
})

//Сабмит новой карточки
function submitNewCard (evt) {
  evt.preventDefault();
  const card = createCard(newPlace, deleteCard, likeBtnHandler, clickImageHandler);
  cardsContainer.prepend(card);
  popupAddCard.classList.remove("popup_is-opened");
  newPlace.reset();
}

newPlace.addEventListener('submit', submitNewCard);

//Обработчик клика по изображению
function clickImageHandler(evt) {
  const popupImage = document.querySelector(".popup_type_image");
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  openPopup(popupImage);
  closePopup(popupImage);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
}

//Вывести карточки из массива на страницу
initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likeBtnHandler, clickImageHandler);
  cardsContainer.append(card);
});