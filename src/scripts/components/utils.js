function renderLoading (form, isLoading, message) {
  if (isLoading) {
    form.querySelector(".popup__button").textContent = message;
  } else {
    form.querySelector(".popup__button").textContent = message;
  }
} 

export {renderLoading};