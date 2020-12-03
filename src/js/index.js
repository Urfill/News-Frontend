import '../blocks/index/index.css';

import Popup from './components/Popup';

const authButtonHeader = document.querySelector('div.popup-section__login');
const popup = new Popup(authButtonHeader);

document.querySelector('button.header__link-auth').addEventListener('click', () => {
  popup.open();
});
