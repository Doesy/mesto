const editElem = document.querySelector(".profile__edit-button");
const popupElem = document.querySelector(".popup");
const popupCloseElem = popupElem.querySelector(".popup__button_action_close");
const reactElem = document.querySelector(".gallery__card-button");
const saveElem = popupElem.querySelector(".popup__button_action_save");
const form = document.querySelector(".popup__form");
let owner = document.querySelector(".profile__owner");
let statys = document.querySelector(".profile__status");
let fieldOwner = document.querySelector(".popup__form-field_type_owner");
let fieldStatus = document.querySelector(".popup__form-field_type_status");

editElem.addEventListener("click", () => {
  popupElem.classList.add("popup_opened");
  fieldOwner.value = owner.textContent;
  fieldStatus.value = statys.textContent;
});

popupCloseElem.addEventListener("click", () => {
  popupElem.classList.remove("popup_opened");
});

reactElem.addEventListener("click", () => {
  reactElem.classList.toggle("gallery__card-button_type_marked");
});

saveElem.addEventListener("click", () => {
  owner.textContent = fieldOwner.value;
  statys.textContent = fieldStatus.value;
  popupElem.classList.remove("popup_opened");
});
