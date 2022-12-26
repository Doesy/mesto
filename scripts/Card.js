import {
  popupImage,
  popupCardImage,
  popupImageCaption,
  openPopup,
} from "./index.js";

class Card {
  constructor(name, link) {
    this._element = this._getTemplate();
    this._name = name;
    this._link = link;
    this._deleteButton = this._element.querySelector(".gallery__card-delete");
    this._cardImage = this._element.querySelector(".gallery__card-image");
    this._likeButton = this._element.querySelector(".gallery__card-button");
    this._cardTitle = this._element.querySelector(".gallery__card-title");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#user-card")
      .content.querySelector(".gallery__card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListenters() {
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleOpenCardImage();
    });

    this._likeButton.addEventListener("click", () => {
      this._reactCard();
    });
  }

  _handleOpenCardImage() {
    popupImage.src = this._link;
    popupImageCaption.textContent = this._name;
    openPopup(popupCardImage);
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _reactCard() {
    this._likeButton.classList.toggle("gallery__card-button_active");
  }

  generateCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._setEventListenters();
    return this._element;
  }
}

export default Card;
