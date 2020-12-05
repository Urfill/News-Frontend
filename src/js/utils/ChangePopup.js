export default class ChangePopup {
  constructor(popup) {
    this.popup = popup;
    this.link = this.popup.querySelector('button.popup-section__link-auth');

    if (this.popup.classList.contains('popup-section__auth')) {
      this.auth = this.popup.nextElementSibling;
    } else {
      this.auth = this.popup.previousElementSibling;
    }

    this.setEventListeners();
  }

  setEventListeners() {
    this.link.addEventListener('click', () => {
      this.change();
    });
  }

  change() {
    this.popup.classList.add('popup_hidden');
    this.auth.classList.remove('popup_hidden');

    // console.log(this.popup.classList); // test
    console.log(this.popup); // test
  }
}
