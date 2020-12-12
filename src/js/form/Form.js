import {
  popupSignupBtnLogin,
  popupSigninBtnLogin,
} from '../constants/mainConsts';

export default class Form {
  constructor(elem) {
    this.elem = elem; // err
  }

  checkFormSignup(form, email, password, name) { // popup signup
    if (email.checkValidity() && password.checkValidity() && name.checkValidity() && password.value !== '' && name.value !== '') {
      popupSignupBtnLogin.removeAttribute('disabled', '');
      popupSignupBtnLogin.classList.add('button_active');
      return true;
    }
    popupSignupBtnLogin.setAttribute('disabled', '');
    popupSignupBtnLogin.classList.remove('button_active');
    return false;
  }

  checkFormSignin(form, email, password) { // popup signin
    if (email.checkValidity() && password.checkValidity() && password.value !== '') {
      popupSigninBtnLogin.removeAttribute('disabled', '');
      popupSigninBtnLogin.classList.add('button_active');
      return true;
    }
    popupSigninBtnLogin.setAttribute('disabled', '');
    popupSigninBtnLogin.classList.remove('button_active');
    return false;
  }

  checkPopupInput(el) { // [any]inputs validation
    const element = el;

    if (!element.checkValidity() && element.value) {
      if (element.type === 'text') {
        element.nextElementSibling.textContent = 'Имя должно содержать не менее 3 символов.';
      } else if (element.type === 'email') {
        element.nextElementSibling.textContent = 'Невалидный email.';
      } else if (element.type === 'password') {
        element.nextElementSibling.textContent = 'Пароль должен содержать не менее 6 символов.';
      } else {
        console.log('validation err'); // test
      }
    } else {
      this.resetErrors(element);
    }
  }

  resetErrors(el) { // reseting [any]errors
    const element = el;
    if (element.type === 'text') {
      element.nextElementSibling.textContent = '';
    } else if (element.type === 'email') {
      element.nextElementSibling.textContent = '';
    } else if (element.type === 'password') {
      element.nextElementSibling.textContent = '';
    } else {
      console.log('validation err'); // test
    }
    return true;
  }
}
