const galleryCard = document.querySelector(".gallery");
const popupAddForm = document.querySelector(".popup__form_type_add");
const fieldName = document.querySelector("#place-name");
const fieldLink = document.querySelector("#image-link");
const cardTemplate = document
  .querySelector("#user-card")
  .content.querySelector(".gallery__card");
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

function openPopup(popup) {
  popup.closest(".popup").classList.add("popup_opened");
}

function handleSubmitButton(popup) {
  popup
    .querySelector(".popup__button-submit")
    .classList.add("popup__button-submit_disabled");
  popup.querySelector(".popup__button-submit").setAttribute("disabled", "");
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

function openEditForm() {
  fillFields();
  clearErrors(popupEditForm);
  openPopup(popupEditForm);
  handleSubmitButton(popupEditForm);
}

buttonOpenEditProfileForm.addEventListener("click", openEditForm);

function openAddForm() {
  popupAddForm.reset();
  clearErrors(popupAddForm);
  openPopup(popupAddForm);
  handleSubmitButton(popupAddForm);
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
  closePopup(popupEditForm);
}

popupEditForm.addEventListener("submit", handleSubmitEditForm);

//Очистка ошибок при открытии

function clearErrors(popup) {
  const errorFields = popup.querySelectorAll(".popup__error");
  const errorInputs = popup.querySelectorAll(".popup__input");
  errorFields.forEach((field) => {
    console.log(field);
    field.innerText = "";
  });
  errorInputs.forEach((input) => {
    console.log(input);
    input.classList.remove("popup__input_type_error");
  });
}

// Реализация закрытия поп-апов через Escape

const closePopupWithEscape = (evt) => {
  if (evt.key === "Escape") {
    document.querySelector(".popup_opened").classList.remove("popup_opened");
  }
};

document.addEventListener("keydown", closePopupWithEscape);

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
    closePopup(elem);
  });
});
