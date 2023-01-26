export default class UserInfo {
  constructor({ nameSelector, statusSelector }) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      status: this._status.textContent,
    };

    return this._userData;
  }

  setUserInfo({ owner, status }) {
    this._name.textContent = owner.value;
    this._status.textContent = status.value;
  }
}
