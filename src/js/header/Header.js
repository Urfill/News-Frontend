import {
  headerLinkSignin,
  headerLinkSavedNews,
  headerLinkSignout,
} from '../constants/mainConsts';

export default class Header {
  constructor(data) {
    this.auth = data.auth;
    this.userName = data.userName;
    this.render();
  }

  render() { // change header state
    if (this.auth === true) {
      headerLinkSignin.classList.add('header__link-auth_hidden');
      headerLinkSavedNews.classList.remove('link_hidden');
      headerLinkSignout.classList.remove('link_hidden');

      headerLinkSignout.textContent = this.userName;

      // adding fa-fa icon
      const icon = document.createElement('i');
      icon.classList.add('fa');
      icon.classList.add('fa-sign-out');
      headerLinkSignout.appendChild(icon);
    }
  }
}
