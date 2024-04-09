function showInputError (formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`${validationConfig.inputErrorTypeClass}${inputElement.name}`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError (formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`${validationConfig.inputErrorTypeClass}${inputElement.name}`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
}

function checkInputValidity (formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function setEventListeners (formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function clearValidation (formElement, validationConfig) {
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

function enableValidation (validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  })
}

export {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, clearValidation, enableValidation};