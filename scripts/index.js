const galleryCard = document.querySelector(".gallery");
const popupAddForm = document.querySelector(".popup__form_type_add");
const fieldName = document.querySelector(".popup__form-field_type_place-name");
const fieldLink = document.querySelector(".popup__form-field_type_image-link");
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
const fieldOwner = document.querySelector(".popup__form-field_type_owner");
const fieldStatus = document.querySelector(".popup__form-field_type_status");

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

// Реализация закрытия поп-апов кликом по оверлею
const popupsElem = document.querySelectorAll(".popup");

popupsElem.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
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

// ссылка на место

const formElement = document.querySelector(".popup__form_type_add");
const formInput = formElement.querySelector(
  ".popup__form-field_type_image-link"
);
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (element) => {
  element.classList.add("popup__form-field_type_error");
};

const hideInputError = (element) => {
  element.classList.remove("popup__form-field_type_error");
};

const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput);
  } else {
    // Если проходит, скроем
    hideInputError(formInput);
  }
};
console.log(formInput.id);
formInput.addEventListener("input", isValid);
