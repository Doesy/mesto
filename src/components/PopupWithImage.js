import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._element.querySelector(".popup__image-caption");
    this._imageLink = this._element.querySelector(".popup__image");
  }

  open(name, link) {
    super.open();
    this._imageTitle.textContent = name;
    this._imageLink.src = link;
    this._imageLink.alt = name;
  }
}
