export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.parent = this.popup.parentNode; // patch
    this.errors = this.popup.querySelectorAll('p.popup-section__err');
    this.submit = this.popup.querySelector('button.popup-section__button');

    this.setEventListeners();
  }

  setEventListeners() {
    this.popup.querySelector('.popup-section__close').addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    console.log();
    this.parent.classList.remove('popup_hidden');
    this.popup.classList.remove('popup_hidden');
  }

  close() {
    this.parent.classList.add('popup_hidden');
    this.popup.classList.add('popup_hidden');
  }
}
