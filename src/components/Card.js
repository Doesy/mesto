class Card {
  constructor({ name, link, handleCLick }, templateSelect, cardSelect) {
    this._templateSelector = templateSelect;
    this._cardSelector = cardSelect;
    this._name = name;
    this._link = link;
    this._handleClick = handleCLick;
    this._element = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
    return cardElement;
  }

  _setEventListenters() {
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._reactCard();
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _reactCard() {
    this._likeButton.classList.toggle("gallery__card-button_active");
  }

  generateCard() {
    this._deleteButton = this._element.querySelector(".gallery__card-delete");
    this._cardImage = this._element.querySelector(".gallery__card-image");
    this._likeButton = this._element.querySelector(".gallery__card-button");
    this._cardTitle = this._element.querySelector(".gallery__card-title");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListenters();
    return this._element;
  }
}

export default Card;
