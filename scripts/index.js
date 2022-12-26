import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, validationData } from "./data.js";
import { clearErrors, disableSubmitButton } from "./validation utility.js";

const galleryCard = document.querySelector(".gallery");
const popupAddForm = document.querySelector(".popup__form_type_add");
const fieldName = document.querySelector("#place-name");
const fieldLink = document.querySelector("#image-link");
const popupEditForm = document.querySelector(".popup__form_type_edit");
const owner = document.querySelector(".profile__owner");
const statys = document.querySelector(".profile__status");
const fieldOwner = popupEditForm.querySelector("#owner");
const fieldStatus = popupEditForm.querySelector("#status");
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const popupCardImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__image-caption");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupWithEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupWithEscape);
}

/* Заполнение карточками из заданного массива */

initialCards.forEach((dataCard) => {
  const card = new Card(dataCard.name, dataCard.link);
  const cardElement = card.generateCard();
  galleryCard.prepend(cardElement);
});

/* реализация отправки данных для создания пользователской карточки */

function handleSubmitAddForm(evt) {
  evt.preventDefault();
  const card = new Card(fieldName.value, fieldLink.value);
  const cardElement = card.generateCard();
  galleryCard.prepend(cardElement);
  closePopup(popupAdd);
}

popupAddForm.addEventListener("submit", handleSubmitAddForm);

/*Открытие формы редактирования профиля и добавления карточек*/

function openEditForm() {
  fillFields();
  clearErrors(popupEditForm, validationData);
  openPopup(popupEdit);
  disableSubmitButton(popupEditForm, validationData);
}

buttonOpenEditProfileForm.addEventListener("click", openEditForm);

function openAddForm() {
  popupAddForm.reset();
  clearErrors(popupAddForm, validationData);
  openPopup(popupAdd);
  disableSubmitButton(popupAddForm, validationData);
}

buttonOpenAddCardForm.addEventListener("click", openAddForm);

/*Реализация функционала формы редактирования профиля*/

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
  closePopup(popupEdit);
}

popupEditForm.addEventListener("submit", handleSubmitEditForm);

// Реализация закрытия поп-апов через Escape

const closePopupWithEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

// Реализация закрытия поп-апов кликом по оверлею
const popupsElem = document.querySelectorAll(".popup");

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
    closePopup(elem.closest(".popup_opened"));
  });
});

const validateEditForm = new FormValidator(
  ".popup__form_type_edit",
  validationData
);
validateEditForm.enableValidation();

const validateAddForm = new FormValidator(
  ".popup__form_type_add",
  validationData
);
validateAddForm.enableValidation();

export { popupImage, popupCardImage, popupImageCaption, openPopup };
