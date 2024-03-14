const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard(cardData, {deleteCard, likeBtnHandler, clickImageHandler}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card");
  const cardCopy = cardElement.cloneNode(true);
  const buttonDelete = cardCopy.querySelector(".card__delete-button");
  const cardCopyImage = cardCopy.querySelector(".card__image");
  const likeBtn = cardCopy.querySelector(".card__like-button");

  cardCopyImage.src = cardData.link;
  cardCopyImage.alt = cardData.name;
  cardCopy.querySelector(".card__title").textContent = cardData.name;
  
  buttonDelete.addEventListener("click", deleteCard);
  likeBtn.addEventListener("click", likeBtnHandler);
  cardCopyImage.addEventListener('click', clickImageHandler);

  return cardCopy;
}

// Функция удаления карточки
function deleteCard(event) {
  event.target.closest(".places__item").remove();
}

//Обработчик лайка
function likeBtnHandler (evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export {initialCards, createCard, deleteCard, likeBtnHandler};