export default class FormValidator {
  constructor(popup) {
    this.popup = popup;
    this.inputs = this.popup.querySelectorAll('input.popup-section__input');
    this.errors = this.popup.querySelectorAll('p.popup-section__err');
    this.submitButton = this.popup.querySelector('button.popup-section__button');


    this.setEventListeners();
  }

  checkInputValidity() {
    for (let i = 0; i < this.inputs.length; i++) {
      const inputs = this.inputs[i];
      const errors = this.errors[i];
      const regExp = /([a-z0-9]{1,}((-|\.)?[a-z0-9]{1,}))@[a-z0-9]{1,}(-[a-z0-9]{1,})?(\.[a-z]{2,})?(\.[a-z]{2,3})/;

      if (inputs.validity.valid) {
        errors.classList.add('popup-section__err_hidden');
      } else {
        if (inputs.validity.valueMissing) {
          errors.textContent = 'Это обязательное поле';
        } else if (inputs.validity.tooShort || inputs.validity.tooLong) {
          const errorsMaxSymbolCount = inputs.getAttribute('maxlength');
          const errorsMinSymbolCount = inputs.getAttribute('minlength');

          errors.textContent = `Должно быть от ${errorsMinSymbolCount} до ${errorsMaxSymbolCount} символов`;
        } else if (inputs.validity.patternMismatch) {
          errors.textContent = 'Невалидный Email';
        }

        errors.classList.remove('popup-section__err_hidden');
        return this.setSubmitButtonState(false);
      }
    }
    return this.setSubmitButtonState(true);
  }

  setSubmitButtonState(validationSuccess) {
    const btn = this.submitButton;

    if (validationSuccess) {
      //   btn.classList.add('button_active');
      btn.removeAttribute('disabled');
    } else {
      //   btn.classList.remove('button_active');
      btn.setAttribute('disabled', '');
    }
  }

  setEventListeners() {
    const fields = this.inputs;

    for (let i = 0; i < fields.length; i++) {
      fields[i].addEventListener('input', (e) => {
        this.checkInputValidity();
      });
    }
  }

  resetErrorrs() {
    this.checkInputValidity();

    for (let i = 0; i < this.errors.length; i++) {
      this.errors[i].classList.add('popup-section__err_hidden');
    }
  }
}

// else if (inputs.getAttribute('type') === 'email' && !inputs.value.match(regExp)) {
//   errors.textContent = 'Невалидный Email';
// }
