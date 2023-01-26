import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, validationData } from "../components/data.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupAddForm = document.querySelector(".popup__form_type_add");
const popupEditForm = document.querySelector(".popup__form_type_edit");
const fieldOwner = popupEditForm.querySelector("#owner");
const fieldStatus = popupEditForm.querySelector("#status");
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const templateSelector = "#user-card";
const cardSelector = ".gallery__card";

// Создание экземпляров модальных окон

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_type_add", (newCardData) => {
  cardList.addItem(createCard(newCardData));
});
popupAddCard.setEventListeners();

const user = new UserInfo({
  nameSelector: ".profile__owner",
  statusSelector: ".profile__status",
});

const popupEditProfile = new PopupWithForm(".popup_type_edit", () => {
  user.setUserInfo({ owner: fieldOwner, status: fieldStatus });
});
popupEditProfile.setEventListeners();

/* Заполнение карточками из заданного массива */

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      handleCLick: () => {
        popupWithImage.open(cardData.name, cardData.link);
      },
    },
    templateSelector,
    cardSelector
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".gallery"
);

cardList.renderItems();
/* слушатель отправки данных для создания пользователской карточки */

buttonOpenAddCardForm.addEventListener("click", () => {
  popupAddCard.open();
  validateAddForm.resetValidation();
});

buttonOpenEditProfileForm.addEventListener("click", () => {
  const userData = user.getUserInfo();
  fieldOwner.value = userData.name;
  fieldStatus.value = userData.status;
  popupEditProfile.open();
  validateEditForm.resetValidation();
});

const validateEditForm = new FormValidator(popupEditForm, validationData);
validateEditForm.enableValidation();

const validateAddForm = new FormValidator(popupAddForm, validationData);
validateAddForm.enableValidation();
