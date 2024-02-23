//Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы

const cardsContainer = document.querySelector(".places__list");
const cardElement = cardTemplate.querySelector(".card");

//Функция создания карточки

function createCard(cardData, deleteCard) {
  const cardCopy = cardElement.cloneNode(true);
  const buttonDelete = cardCopy.querySelector(".card__delete-button");

  cardCopy.querySelector(".card__image").src = cardData.link;
  cardCopy.querySelector(".card__image").alt = cardData.name;
  cardCopy.querySelector(".card__title").textContent = cardData.name;

  buttonDelete.addEventListener("click", deleteCard);

  return cardCopy;
}

// Функция удаления карточки

function deleteCard(event) {
  event.target.closest(".places__item").remove();
}

//Вывести карточки на страницу

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  cardsContainer.append(card);
});