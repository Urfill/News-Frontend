export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.parent = this.popup.parentNode;
    this.errors = this.popup.querySelectorAll('p.popup-section__err');
    this.submit = this.popup.querySelector('button.popup-section__button');
    this.inputs = this.popup.querySelectorAll('input.popup-section__input');

    this.setEventListeners();
  }

  setEventListeners() {
    this.popup.querySelector('.popup-section__close').addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    this.parent.classList.remove('popup_hidden');
    this.popup.classList.remove('popup_hidden');
  }

  close() {
    this.parent.classList.add('popup_hidden');
    this.popup.classList.add('popup_hidden');

    for (let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].value = '';
    }
  }
}
