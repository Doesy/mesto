export function disableSubmitButton(popup, validationData) {
  popup
    .querySelector(validationData.submitButtonSelector)
    .classList.add(validationData.inactiveButtonClass);
  popup
    .querySelector(validationData.submitButtonSelector)
    .setAttribute("disabled", "");
}
//Очистка ошибок при открытии

export function clearErrors(popup, validationData) {
  const errorFields = popup.querySelectorAll(".popup__error");
  const errorInputs = popup.querySelectorAll(validationData.inputSelector);
  errorFields.forEach((field) => {
    field.innerText = "";
  });
  errorInputs.forEach((input) => {
    input.classList.remove(validationData.inputErrorClass);
  });
}
