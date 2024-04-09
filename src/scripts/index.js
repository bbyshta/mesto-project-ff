import '../pages/index.css';
import {openPopup, closePopup} from './components/modal.js';
import {createCard, deleteCardFromDOM, toggleLikeState} from './components/cards.js';
import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, clearValidation, enableValidation} from './components/validation.js';
import {config, getUserInfo, getInitialCards, sendProfileChanges, postNewCard, deleteCard, likeCard, dislikeCard, changeAvatar} from './components/api.js';

const cardsContainer = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const cardAddBtn = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");
const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmForm = popupConfirm.querySelector(".popup__form");
const avatarEditBtn = document.querySelector(".profile__image-edit-button");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const newAvatarForm = popupNewAvatar.querySelector(".popup__form");
let userCache = {};
let cardCache = {};

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

function loading (form, isLoading, message) {
  if (isLoading) {
    form.querySelector(".popup__button").textContent = message;
  } else {
    form.querySelector(".popup__button").textContent = message;
  }
} 

//Открытие/закрытие попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  clearValidation(editProfileForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputErrorTypeClass: '.popup__input-error_type_',
    errorClass: 'popup__input-error_active'
  });
  editProfileForm.elements.name.value = profileName.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
})

//Попап редактирования аватарки
avatarEditBtn.addEventListener('click', () => {
  openPopup(popupNewAvatar);
  newAvatarForm.reset();
  clearValidation(newAvatarForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputErrorTypeClass: '.popup__input-error_type_',
    errorClass: 'popup__input-error_active'
  });
})

//Обработчик изменения аватарки
newAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  loading(newAvatarForm, true, 'Сохранение...');
  changeAvatar(newAvatarForm.elements.avatar.value)
  .then((res) => {
    profileAvatar.style = `background-image: url(${res.avatar})`;
    closePopup(popupNewAvatar);
  })
  .catch((err) => {
    alert(err);
    console.log(err);
  })
  .finally(() => {
    loading(newAvatarForm, false, 'Сохранить');
  })
})

//Обработчик подтверждения удаления
popupConfirmForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  loading(popupConfirmForm, true, 'Удаляется...');
  deleteCard(cardCache._id)
  .then(() => {
    deleteCardFromDOM(cardCache.cardCopy);
  })
  .then(() => {
    closePopup(popupConfirm);
  })
  .catch((err) => {
    alert(err);
    console.log(err);
  })
  .finally(() => {
    loading(popupConfirmForm, false, 'Да');
  })
})

//Рендер карточки
function renderCard (cardData, userId) {
  cardsContainer.prepend(
    createCard(
      cardData,
      userId,
      (cardCopy) => {
        cardCache._id = cardData._id;
        cardCache.cardCopy = cardCopy;
        openPopup(popupConfirm);
      },
      (likeBtn, likeCounter) => {
        if (!likeBtn.classList.contains("card__like-button_is-active")) {
          likeCard(cardData._id)
          .then((res) => {
            likeCounter.textContent = res.likes.length;
            toggleLikeState(likeBtn);
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
        } else {
          dislikeCard(cardData._id)
          .then ((res) => {
            likeCounter.textContent = res.likes.length;
            toggleLikeState(likeBtn);
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
        }
        },
        clickImageHandler
    )
  );
}

//Сабмит изменений в профиле
function handleEditSubmit(evt) {
  evt.preventDefault();
  loading(editProfileForm, true, 'Сохранение...');
  profileName.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  sendProfileChanges(profileName.textContent, profileDescription.textContent)
  .catch((err) => {
    alert(err);
    console.log(err);
  })
  .finally(() => {
    loading(editProfileForm, false, 'Сохранить');
  })
  closePopup(popupEditProfile);
}

editProfileForm.addEventListener('submit', handleEditSubmit);

//Открытие/закрытие попапа добавления карточки
cardAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  clearValidation(newPlaceForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputErrorTypeClass: '.popup__input-error_type_',
    errorClass: 'popup__input-error_active'
  });
  newPlaceForm.reset();
})

//Сабмит новой карточки
function submitNewCard (evt) {
  evt.preventDefault();
  loading(newPlaceForm, true, 'Сохранение...');
  let cardData = {};
  cardData.name = newPlaceForm.elements["place-name"].value;
  cardData.link = newPlaceForm.elements.link.value;
  postNewCard(cardData)
  .then((card) => {
    renderCard(card, userCache.id);
  })
  .catch((err) => {
    alert(err);
    console.log(err);
  })
  .finally(() => {
    loading(newPlaceForm, false, 'Сохранить');
  })
  closePopup(popupAddCard);
  clearValidation(newPlaceForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputErrorTypeClass: '.popup__input-error_type_',
    errorClass: 'popup__input-error_active'
  });
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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  inputErrorTypeClass: '.popup__input-error_type_',
  errorClass: 'popup__input-error_active'
});

function renderUserInfo (userName, userAbout, userAvatar, userData) {
  userName.textContent = userData.name;
  userAbout.textContent = userData.about;
  userAvatar.style = `background-image: url(${userData.avatar})`;
}

function renderInitialCards (cardsList, userId) {
  cardsList.reverse().forEach((card) => {
    renderCard(card, userId);
  })
}

Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cards]) => {
  userCache.id = userData._id;
  renderUserInfo(profileName, profileDescription, profileAvatar, userData);
  renderInitialCards(cards, userData._id);
})
.catch((err) => {
  alert(err);
  console.log(err);
});