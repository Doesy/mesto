const editElem = document.querySelector(".profile__edit-button");
const popupElem = document.querySelector(".popup");
const popupCloseElem = popupElem.querySelector(".popup__button-close");
const reactElem = document.querySelector(".gallery__card-button");
const form = document.querySelector(".popup__form");
let owner = document.querySelector(".profile__owner");
let statys = document.querySelector(".profile__status");
let fieldOwner = document.querySelector(".popup__form-field_type_owner");
let fieldStatus = document.querySelector(".popup__form-field_type_status");

function fillFields() {
  popupElem.classList.toggle("popup_opened");
  fieldOwner.value = owner.textContent;
  fieldStatus.value = statys.textContent;
}

function changeInfo() {
  owner.textContent = fieldOwner.value;
  statys.textContent = fieldStatus.value;
  popupElem.classList.remove("popup_opened");
}

editElem.addEventListener("click", fillFields);

popupCloseElem.addEventListener("click", fillFields);

form.addEventListener("submit", changeInfo);
