enableValidation(validationData);

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationData
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationData.errorClass);
}

function hideInputError(formElement, inputElement, validationData) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationData.inputErrorClass);
  errorElement.classList.remove(validationData.errorClass);
  errorElement.textContent = "";
}

function isValid(formElement, inputElement, validationData) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationData
    );
  } else {
    hideInputError(formElement, inputElement, validationData);
  }
}

function setEventListeners(formElement, validationData) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationData.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationData);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationData);
      toggleButtonState(inputList, buttonElement, validationData);
    });
  });
  formElement.addEventListener("submit", () => {
    toggleButtonState(inputList, buttonElement, validationData);
  });
}

function enableValidation(validationData) {
  const formList = Array.from(
    document.querySelectorAll(validationData.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationData);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationData) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationData.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(validationData.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
}

function disableSubmitButton(popup, validationData) {
  popup
    .querySelector(validationData.submitButtonSelector)
    .classList.add(validationData.inactiveButtonClass);
  popup
    .querySelector(validationData.submitButtonSelector)
    .setAttribute("disabled", "");
}
//Очистка ошибок при открытии

function clearErrors(popup, validationData) {
  const errorFields = popup.querySelectorAll(".popup__error");
  const errorInputs = popup.querySelectorAll(validationData.inputSelector);
  errorFields.forEach((field) => {
    field.innerText = "";
  });
  errorInputs.forEach((input) => {
    input.classList.remove(validationData.inputErrorClass);
  });
}
