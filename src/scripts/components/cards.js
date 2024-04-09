function createCard(cardData, userId, onDeleteCard, likeBtnHandler, clickImageHandler) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card");
  const cardCopy = cardElement.cloneNode(true);
  const buttonDelete = cardCopy.querySelector(".card__delete-button");
  const cardCopyImage = cardCopy.querySelector(".card__image");
  const likeBtn = cardCopy.querySelector(".card__like-button");
  const likeCounter = cardCopy.querySelector(".card__like-counter");

  cardCopyImage.src = cardData.link;
  cardCopyImage.alt = cardData.name;
  cardCopy.querySelector(".card__title").textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (userId === cardData.owner._id) {
    buttonDelete.addEventListener("click", () => {
      onDeleteCard(cardCopy);
    });
  } else {
    buttonDelete.remove()
  }

  if (cardData.likes.some((like) => like._id === userId)){
    toggleLikeState(likeBtn);
  }
  likeBtn.addEventListener("click", () => {
    likeBtnHandler(likeBtn, likeCounter);
  });

  cardCopyImage.addEventListener('click', clickImageHandler);

  return cardCopy;
}

// Функция удаления карточки из разметки
function  deleteCardFromDOM (card) {
  card.remove();
}

//Обработчик лайка
function toggleLikeState (likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteCardFromDOM, toggleLikeState};