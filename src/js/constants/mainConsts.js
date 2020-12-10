// main const
const headerLinkSignin = document.querySelector('.header__link-auth'); // Header authorization button
const headerLinkSignout = document.querySelector('.header__link-logout'); // Header logout button
const headerLinkSavedNews = document.querySelector('.header__link-saved'); // Header saved-news button
const popupSection = document.querySelector('.popup-section'); // Popups section


// search-err const
const searchErrSection = document.querySelector('.search-error'); // Search-error section
// const preloader = document.querySelector('.preloader'); // ??? not


// search const
const searchResultSection = document.querySelector('.search-result'); // Search-result section
const searchResultCardContainer = searchResultSection.querySelector('.search-result__card-container');
const searchResultButtonContainer = searchResultSection.querySelector('.search-result__show-more-container');
const searchResultButton = searchResultSection.querySelector('.search-result__show-more-button');


// signin popup
const popupSignin = popupSection.querySelector('.popup-section__login'); // Signin popup
const popupSigninBtnClose = popupSignin.querySelector('.popup-section__close');
const popupSigninBtnLogin = popupSignin.querySelector('.popup-section__button');
const popupSigninErr = popupSignin.querySelector('.popup-section__general-err');
const popupSigninLink = popupSignin.querySelector('.popup-section__link-auth');

const formSignin = document.forms.signin;
const formSigninEmail = formSignin.elements.email;
const formSigninPassword = formSignin.elements.password;


// signup popup
const popupSignup = popupSection.querySelector('.popup-section__auth'); // Signup popup
const popupSignupBtnClose = popupSignup.querySelector('.popup-section__close');
const popupSignupBtnLogin = popupSignup.querySelector('.popup-section__button');
const popupSignupErr = popupSignup.querySelector('.popup-section__general-err');
const popupSignupLink = popupSignup.querySelector('.popup-section__link-auth');

const formSignup = document.forms.signup;
const formSignupEmail = formSignup.elements.email;
const formSignupPassword = formSignup.elements.password;
const formSignupName = formSignup.elements.name;


// alert popup
const popupAlert = popupSection.querySelector('.popup-section__alert'); // alert popup
const popupAlertBtnClose = popupAlert.querySelector('.popup-section__close');
const popupAlertLink = popupAlert.querySelector('.popup-section__link-auth');

// other
const addingArticles = 3;


export {
  headerLinkSignin, // main const
  headerLinkSignout,
  headerLinkSavedNews,
  popupSection,
  searchErrSection, // search-err const
  searchResultSection, // search const
  searchResultCardContainer,
  searchResultButtonContainer,
  searchResultButton,
  popupSignin, // signin popup
  popupSigninBtnClose,
  popupSigninBtnLogin,
  popupSigninErr,
  popupSigninLink,
  formSignin,
  formSigninEmail,
  formSigninPassword,
  popupSignup, // signup popup
  popupSignupBtnClose,
  popupSignupBtnLogin,
  popupSignupErr,
  popupSignupLink,
  formSignup,
  formSignupEmail,
  formSignupPassword,
  formSignupName,
  popupAlert, // alert popup
  popupAlertBtnClose,
  popupAlertLink,
  addingArticles, // other
};
