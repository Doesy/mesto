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
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupWithEscape);
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
    document.addEventListener("keydown", closePopupWithEscape);
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
  clearErrors(popupEditForm, validationData);
  openPopup(popupEdit);
  disableSubmitButton(popupEditForm, validationData);
  document.addEventListener("keydown", closePopupWithEscape);
}

buttonOpenEditProfileForm.addEventListener("click", openEditForm);

function openAddForm() {
  popupAddForm.reset();
  clearErrors(popupAddForm, validationData);
  openPopup(popupAdd);
  disableSubmitButton(popupAddForm, validationData);
  document.addEventListener("keydown", closePopupWithEscape);
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

// Реализация закрытия поп-апов через Escape

const closePopupWithEscape = (evt) => {
  if (evt.key === "Escape") {
    //document.querySelector(".popup_opened").classList.remove("popup_opened");
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
