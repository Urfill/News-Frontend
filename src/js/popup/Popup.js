import {
  popupSection,
  popupSignin,
  popupSignup,
  formSigninEmail,
  formSigninPassword,
  formSignupEmail,
  formSignupPassword,
  formSignupName,
  popupAlert,
  popupSignupBtnLogin,
  popupSigninBtnLogin,
  popupSignupErr,
  popupSigninErr,
} from '../constants/mainConsts';

export default class Popup {
  clearContent() {
    formSigninEmail.value = '';
    formSigninEmail.nextElementSibling.textContent = '';

    formSigninPassword.value = '';
    formSigninPassword.nextElementSibling.textContent = '';

    formSignupEmail.value = '';
    formSignupEmail.nextElementSibling.textContent = '';

    formSignupPassword.value = '';
    formSignupPassword.nextElementSibling.textContent = '';

    formSignupName.value = '';
    formSignupName.nextElementSibling.textContent = '';

    popupSigninBtnLogin.classList.remove('button_active');
    popupSigninBtnLogin.setAttribute('disabled', '');

    popupSignupBtnLogin.classList.remove('button_active');
    popupSignupBtnLogin.setAttribute('disabled', '');

    popupSignupErr.classList.add('popup-section__general-err_hidden');
    popupSigninErr.classList.add('popup-section__general-err_hidden');
  }

  open() {
    popupSection.classList.remove('popup_hidden');
    popupSignup.classList.remove('popup_hidden');
    formSignupEmail.focus();
  }


  close() {
    popupSection.classList.add('popup_hidden');
    popupSignup.classList.add('popup_hidden');
    popupSignin.classList.add('popup_hidden');
    popupAlert.classList.add('popup_hidden');

    this.clearContent();
  }

  changePopupSignup() {
    popupSignin.classList.remove('popup_hidden');
    popupSignup.classList.add('popup_hidden');

    this.clearContent();
  }

  changePopupSignin() {
    popupSignin.classList.add('popup_hidden');
    popupSignup.classList.remove('popup_hidden');

    this.clearContent();
  }

  changePopupAlert() {
    this.close();
    popupSection.classList.remove('popup_hidden');
    popupSignin.classList.remove('popup_hidden');

    this.clearContent();
  }
}
