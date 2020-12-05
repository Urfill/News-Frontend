import '../blocks/index/index.css';

import Popup from './components/Popup';
import PopupChange from './utils/ChangePopup';
import FormValidator from './utils/FormValidator';

const popupSectionHTML = document.querySelector('section.popup-section');
const popupAuthHTML = popupSectionHTML.querySelector('div.popup-section__auth');
const popupLoginHTML = popupSectionHTML.querySelector('div.popup-section__login');
const popupAlertHTML = popupSectionHTML.querySelector('div.popup-section__alert');
// const popupButtonLinkAuth = document.querySelector('button.popup-section__link-auth');
// const inputLoginHTML = popupLoginHTML.querySelector('button.popup-section__button');

const inputAuthValidator = new FormValidator(popupAuthHTML);
const inputLoginValidator = new FormValidator(popupLoginHTML);

const popupLogin = new Popup(popupLoginHTML);
const popupChangeLogin = new PopupChange(popupLoginHTML);

const popupAuth = new Popup(popupAuthHTML);
const popupChangeAuth = new PopupChange(popupAuthHTML);

const popupAlert = new Popup(popupAlertHTML);
const popupChangeAlert = new PopupChange(popupAlertHTML);



document.querySelector('button.header__link-auth').addEventListener('click', () => {
  inputAuthValidator.resetErrorrs();
  popupAuth.open();
});
