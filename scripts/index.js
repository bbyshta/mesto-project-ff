//Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы

const cardsSection = document.querySelector(".places");
const cardsList = cardsSection.querySelector(".places__list");
const cardElement = cardTemplate.querySelector(".card");

//Функция создания карточки

function createCard(name, link, deleteCard) {
  const cardCopy = cardElement.cloneNode(true);
  const cardDeleteButton = cardCopy.querySelector(".card__delete-button");

  cardCopy.querySelector(".card__image").src = link;
  cardCopy.querySelector(".card__title").textContent = name;
  cardDeleteButton.addEventListener("click", deleteCard);

  return cardCopy;
}

// Функция удаления карточки

function deleteCard(event) {
  event.target.closest(".places__item").remove();
}

//Вывести карточки на страницу

initialCards.forEach((item) => {
  let card = createCard(item.name, item.link, deleteCard);
  cardsList.append(card);
});