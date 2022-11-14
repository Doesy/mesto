const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const galleryCard = document.querySelector(".gallery");
const popupAddForm = document.querySelector(".popup__form_type_add");
const fieldName = document.querySelector(".popup__form-field_type_place-name");
const fieldLink = document.querySelector(".popup__form-field_type_image-link");
const cardTemplate = document
  .querySelector("#user-card")
  .content.querySelector(".gallery__card");

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

  cardImage.addEventListener("click", () => {
    document.querySelector(".popup__card-image").classList.add("popup_opened");
    document.querySelector(".popup__image").src = cardImage.src;
    document.querySelector(".popup__image").alt = cardTitle.textContent;
    document.querySelector(".popup__image-caption").textContent =
      cardTitle.textContent;
  });

  return newCard;
}

function renderCard(dataCard) {
  galleryCard.prepend(generateCard(dataCard));
}

popupAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderCard({
    name: fieldName.value,
    link: fieldLink.value,
  });
  popupAddForm.closest(".popup").classList.remove("popup_opened");
});

/*Открытие формы редактирования профиля и добавления карточек*/

const editElem = document.querySelector(".profile__edit-button");

const addElem = document.querySelector(".profile__add-button");

editElem.addEventListener("click", () => {
  document.querySelector(".popup__edit-form").classList.add("popup_opened");
  fillFields();
});

addElem.addEventListener("click", () => {
  document.querySelector(".popup__add-form").classList.add("popup_opened");
});

/*Реализация функционала формы редактирования профиля*/
const popupEditForm = document.querySelector(".popup__form_type_edit");
let owner = document.querySelector(".profile__owner");
let statys = document.querySelector(".profile__status");
let fieldOwner = document.querySelector(".popup__form-field_type_owner");
let fieldStatus = document.querySelector(".popup__form-field_type_status");

function fillFields() {
  fieldOwner.value = owner.textContent;
  fieldStatus.value = statys.textContent;
}

function saveInfo() {
  owner.textContent = fieldOwner.value;
  statys.textContent = fieldStatus.value;
}

popupEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  saveInfo();
  popupEditForm.closest(".popup").classList.remove("popup_opened");
});

/*Реализация закрытия поп-апов*/
const popupCloseElem = document.querySelectorAll(".popup__button-close");

popupCloseElem.forEach((elem) => {
  elem.addEventListener("click", () => {
    elem.closest(".popup").classList.remove("popup_opened");
  });
});

console.log("Конец файла");
