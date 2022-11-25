const galleryCard = document.querySelector(".gallery");
const popupAddForm = document.querySelector(".popup__form_type_add");
const fieldName = document.querySelector("#place-name");
const fieldLink = document.querySelector("#image-link");
const cardTemplate = document
  .querySelector("#user-card")
  .content.querySelector(".gallery__card");

function openPopup(popup) {
  popup.closest(".popup").classList.add("popup_opened");
}

function closePopup(popup) {
  popup.closest(".popup").classList.remove("popup_opened");
}

function deleteCard(evt) {
  evt.target.closest(".gallery__card").remove();
}

function reactCard(evt) {
  evt.target
    .closest(".gallery__card-button")
    .classList.toggle("gallery__card-button_active");
}

/* Заполнение карточками из заданного массива */

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

function generateCard(dataCard) {
  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector(".gallery__card-title");
  const cardImage = newCard.querySelector(".gallery__card-image");

  cardTitle.textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;

  const deleteButton = newCard.querySelector(".gallery__card-delete");
  deleteButton.addEventListener("click", deleteCard);

  const likeButton = newCard.querySelector(".gallery__card-button");
  likeButton.addEventListener("click", reactCard);

  const popupCardImage = document.querySelector(".popup_type_image");
  const popupImage = document.querySelector(".popup__image");
  const popupImageCaption = document.querySelector(".popup__image-caption");

  function openPopupImage() {
    popupImage.src = cardImage.src;
    popupImage.alt = cardTitle.textContent;
    popupImageCaption.textContent = cardTitle.textContent;
    openPopup(popupCardImage);
  }

  cardImage.addEventListener("click", openPopupImage);

  return newCard;
}

function renderCard(dataCard) {
  galleryCard.prepend(generateCard(dataCard));
}

/* реализация отправки данных для создания пользователской карточки */

function handleSubmitAddForm(evt) {
  evt.preventDefault();
  renderCard({
    name: fieldName.value,
    link: fieldLink.value,
  });
  closePopup(popupAddForm);
}

popupAddForm.addEventListener("submit", handleSubmitAddForm);

/*Открытие формы редактирования профиля и добавления карточек*/

const editElem = document.querySelector(".profile__edit-button");

const addElem = document.querySelector(".profile__add-button");

function openEditForm() {
  fillFields();
  openPopup(popupEditForm);
}

editElem.addEventListener("click", openEditForm);

function openAddForm() {
  popupAddForm.reset();
  openPopup(popupAddForm);
}

addElem.addEventListener("click", openAddForm);

/*Реализация функционала формы редактирования профиля*/
const popupEditForm = document.querySelector(".popup__form_type_edit");
const owner = document.querySelector(".profile__owner");
const statys = document.querySelector(".profile__status");
const fieldOwner = popupEditForm.querySelector("#owner");
const fieldStatus = popupEditForm.querySelector("#status");

function fillFields() {
  fieldOwner.value = owner.textContent;
  fieldStatus.value = statys.textContent;
}

function saveInfo() {
  owner.textContent = fieldOwner.value;
  statys.textContent = fieldStatus.value;
}

function handleSubmitEditForm(evt) {
  evt.preventDefault();
  saveInfo();
  closePopup(popupEditForm);
}

popupEditForm.addEventListener("submit", handleSubmitEditForm);

// Реализация закрытия поп-апов через Escape

const popupsElem = document.querySelectorAll(".popup");
popupsElem.forEach((elem) => {
  elem.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(elem);
    }
  });
});

// Реализация закрытия поп-апов кликом по оверлею

popupsElem.forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(elem);
    }
  });
});

/*Реализация закрытия поп-апов кнопкой "Х"*/
const popupCloseElem = document.querySelectorAll(".popup__button-close");

popupCloseElem.forEach((elem) => {
  elem.addEventListener("click", () => {
    closePopup(elem);
  });
});

// Функционал валидации

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button-submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button-submit_disabled");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__button-submit_disabled");
    buttonElement.removeAttribute("disabled", "");
  }
}
