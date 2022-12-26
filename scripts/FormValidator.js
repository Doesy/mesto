export class FormValidator {
  constructor(form, validationData) {
    this._form = form;
    this._config = validationData;
  }

  _showInputError(formElement, inputElement, errorMessage, validationData) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationData.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationData.errorClass);
  }

  _hideInputError(formElement, inputElement, validationData) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationData.inputErrorClass);
    errorElement.classList.remove(validationData.errorClass);
    errorElement.textContent = "";
  }

  _isValid(formElement, inputElement, validationData) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationData
      );
    } else {
      this._hideInputError(formElement, inputElement, validationData);
    }
  }

  _setEventListeners(formElement, validationData) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationData.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationData.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement, validationData);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement, validationData);
        this._toggleButtonState(inputList, buttonElement, validationData);
      });
    });
    formElement.addEventListener("submit", () => {
      this._toggleButtonState(inputList, buttonElement, validationData);
    });
  }

  enableValidation() {
    const formElement = document.querySelector(this._form);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement, this._config);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, validationData) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationData.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(validationData.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "");
    }
  }
}

export default FormValidator;
