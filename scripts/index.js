const editElem = document.querySelector(".profile__edit-button");
const popupElem = document.querySelector(".popup");
const popupCloseElem = popupElem.querySelector(".popup__button-close");
const reactElem = document.querySelector(".gallery__card-button");
const form = document.querySelector(".popup__form");
let owner = document.querySelector(".profile__owner");
let statys = document.querySelector(".profile__status");
let fieldOwner = document.querySelector(".popup__form-field_type_owner");
let fieldStatus = document.querySelector(".popup__form-field_type_status");

function openPopup() {
  popupElem.classList.add("popup_opened");
}

function closePopup() {
  popupElem.classList.remove("popup_opened");
}

function fillFields() {
  openPopup();
  fieldOwner.value = owner.textContent;
  fieldStatus.value = statys.textContent;
}

editElem.addEventListener("click", fillFields);

popupCloseElem.addEventListener("click", closePopup);

function saveInfo() {
  owner.textContent = fieldOwner.value;
  statys.textContent = fieldStatus.value;
  closePopup();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  saveInfo();
});
