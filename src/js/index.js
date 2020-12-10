// importing CSS
import '../blocks/index/index.css';

// importing classes
import Popup from './popup/Popup';
import Form from './form/Form';
import NewsApi from './api/NewsApi';
import MainApi from './api/MainApi';
import Header from './header/Header';
import AutoAuth from './utils/AutoAuth';

// importing consts
import {
  headerLinkSignin, // main const
  headerLinkSignout,
  headerLinkSavedNews,
  popupSection,
  searchErrSection, // search-err const
  searchResultSection, // search const
  searchResultCardContainer,
  searchResultButtonContainer,
  searchResultButton,
  popupSigninBtnClose, // signin popup
  popupSigninBtnLogin,
  popupSigninErr,
  popupSigninLink,
  formSignin,
  formSigninEmail,
  formSigninPassword,
  popupSignupBtnClose, // signup popup
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
} from './constants/mainConsts';
import {
  searchBtn, // main API const
  searchInput,
  url, // news-api
  apiKey,
  localBackendUrl, // local-backend
  cardsLoadCount,
  daysCount,
  routs,
} from './constants/apiConsts';

// HOW TO USE?
// 1. first of all u need to download local backend - https://github.com/Se-ki-zo/News-Backend
// 2. then download frontend code - https://github.com/Se-ki-zo/News-Frontend/tree/level-3
// 3. then run both of them with - npm run dev

// call classes
const popup = new Popup();
const form = new Form();
const mainapi = new MainApi(localBackendUrl, routs);
const newsapi = new NewsApi({ // ???
  url,
  apiKey,
  daysCount,
  cardsLoadCount,
});

// other
let massnews;
let length = 0;


// ----------------------------------functions----------------------------------------- \\


// functions
function getUserInfo() {
  return mainapi.getUserData(localStorage.getItem('token'))
    .then((res) => res.data.name)
    .catch((err) => err);
}

function login() {
  popup.open();
}

function logout() {
  const header = new Header({
    auth: false,
    userName: 'Авторизоваться',
  });

  localStorage.removeItem('token');
  document.location.reload(); // test // reload page, if logout

  headerLinkSignout.removeEventListener('click', logout);
  headerLinkSignin.addEventListener('click', login);
}

function addcard(cards) {
  try {
    searchResultButtonContainer.classList.remove('search-result__show-more-container_hidden');
    for (let i = length; i < length + addingArticles; i++) {
      let formatter = new Intl.DateTimeFormat('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      formatter = formatter.format(new Date(cards[i].publishedAt.slice(0, 10)));

      const card = document.createElement('div');
      card.classList.add('search-result__card');


      const cardImageDiv = document.createElement('div');
      cardImageDiv.classList.add('search-result__card-image-container');

      const alertContainer = document.createElement('div');
      alertContainer.classList.add('search-result__mark-alert-container');
      alertContainer.classList.add('search-result__mark-alert-container_hidden');

      const alertText = document.createElement('p');
      alertText.classList.add('search-result__mark-alert');
      alertText.textContent = 'Войдите, чтобы сохранить статьи';

      const cardMarkBtn = document.createElement('button');
      cardMarkBtn.classList.add('search-result__mark');

      const cardImage = document.createElement('img');
      cardImage.classList.add('search-result__card-image');
      cardImage.setAttribute('src', `${cards[i].urlToImage}`);


      const cardInfoDiv = document.createElement('div');
      cardInfoDiv.classList.add('search-result__card-info-container');

      const cardDate = document.createElement('p');
      cardDate.classList.add('search-result__date');
      cardDate.textContent = `${formatter}`;

      const cardTitle = document.createElement('p');
      cardTitle.classList.add('search-result__card-title');
      cardTitle.textContent = `${cards[i].title}`;

      const cardText = document.createElement('p');
      cardText.classList.add('search-result__text');
      cardText.textContent = `${cards[i].description}`;

      const cardSource = document.createElement('p');
      cardSource.classList.add('search-result__source');
      cardSource.textContent = `${cards[i].source.name}`;


      cardImageDiv.appendChild(alertContainer);
      alertContainer.appendChild(alertText);
      cardImageDiv.appendChild(cardMarkBtn);
      cardImageDiv.appendChild(cardImage);

      cardInfoDiv.appendChild(cardDate);
      cardInfoDiv.appendChild(cardTitle);
      cardInfoDiv.appendChild(cardText);
      cardInfoDiv.appendChild(cardSource);

      card.appendChild(cardImageDiv);
      card.appendChild(cardInfoDiv);

      cardImage.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        window.open(cards[i].url);
      });

      cardTitle.addEventListener('click', (event) => {
        window.open(cards[i].url);
      });

      cardSource.addEventListener('click', (event) => {
        window.open(cards[i].url);
      });

      cardMarkBtn.addEventListener('mouseover', (event) => {
        if (!headerLinkSignin.classList.contains('header__link-auth_hidden')) {
          alertContainer.classList.remove('search-result__mark-alert-container_hidden');
        }
      });
      cardMarkBtn.addEventListener('mouseout', (event) => {
        if (!headerLinkSignin.classList.contains('header__link-auth_hidden')) {
          alertContainer.classList.add('search-result__mark-alert-container_hidden');
        }
      });

      searchResultCardContainer.appendChild(card);


      cardMarkBtn.addEventListener('click', (event) => { // save Card
        if (headerLinkSignin.classList.contains('header__link-auth_hidden')) {
          const keyword = document.querySelector('.search-section__search-input').value;
          const title = card.querySelector('.search-result__card-title').textContent;
          const text = card.querySelector('.search-result__text').textContent;
          const date = card.querySelector('.search-result__date').textContent;
          const source = card.querySelector('.search-result__source').textContent;
          const link = cards[i].url;
          const image = cards[i].urlToImage;

          mainapi.createArticle({
            keyword,
            title,
            text,
            date,
            source,
            link,
            image,
          }, localStorage.getItem('token'))
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              alert(err);
            });

          cardMarkBtn.classList.toggle('search-result__mark');
          cardMarkBtn.classList.toggle('search-result__mark-marked');
        }
      });
    }
    length += addingArticles;
  } catch {
    searchResultButtonContainer.classList.add('search-result__show-more-container_hidden'); // test
  }
}

// ----------------------------------listeners----------------------------------------- \\

// listeners
function setAllListeners() {
  headerLinkSignout.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('token');

    headerLinkSignin.classList.remove('header__link-auth_hidden');
    headerLinkSavedNews.classList.add('link_hidden');
    headerLinkSignout.classList.add('link_hidden');

    headerLinkSignout.textContent = '';
  });
  headerLinkSignin.addEventListener('click', login);
  popupSignupLink.addEventListener('click', () => {
    popup.changePopupSignup();
  });
  popupSigninLink.addEventListener('click', () => {
    popup.changePopupSignin();
  });
  popupAlertLink.addEventListener('click', () => {
    popup.changePopupAlert();
  });
  popupSigninBtnClose.addEventListener('click', () => {
    popup.close();
  });
  popupSignupBtnClose.addEventListener('click', () => {
    popup.close();
  });
  popupAlertBtnClose.addEventListener('click', () => {
    popup.close();
  });

  // popup signin VALIDATION
  formSigninEmail.addEventListener('input', (event) => {
    form.checkPopupInput(event.target);
    form.checkFormSignin(formSignin, formSigninEmail, formSigninPassword);
  });
  formSigninPassword.addEventListener('input', (event) => {
    form.checkPopupInput(event.target);
    form.checkFormSignin(formSignin, formSigninEmail, formSigninPassword);
  });

  // popup signup VALIDATION
  formSignupEmail.addEventListener('input', (event) => {
    form.checkPopupInput(event.target);
    form.checkFormSignup(formSignup, formSignupEmail, formSignupPassword, formSignupName);
  });
  formSignupPassword.addEventListener('input', (event) => {
    form.checkPopupInput(event.target);
    form.checkFormSignup(formSignup, formSignupEmail, formSignupPassword, formSignupName);
  });
  formSignupName.addEventListener('input', (event) => {
    form.checkPopupInput(event.target);
    form.checkFormSignup(formSignup, formSignupEmail, formSignupPassword, formSignupName);
  });

  searchBtn.addEventListener('click', (event) => {
    if (searchInput.checkValidity() && searchInput.value !== '') {
      event.preventDefault();
      length = 0;
      while (searchResultCardContainer.firstChild) {
        searchResultCardContainer.removeChild(searchResultCardContainer.firstChild);
      }
      newsapi
        .getNews(searchInput.value)
        .then((res) => {
          if (res.status === 'ok') {
            if (res.articles.length > 0) {
              searchResultSection.classList.remove('search-result_hidden');
              searchErrSection.classList.add('search-error_hidden');

              addcard(res.articles);
              massnews = res.articles;
            } else {
              searchResultSection.classList.add('search-result_hidden');
              searchErrSection.classList.remove('search-error_hidden');
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });



  searchResultButton.addEventListener('click', () => {
    addcard(massnews);
  });

  popupSigninBtnLogin.addEventListener('click', (event) => { // Signin Popup
    event.preventDefault();
    if (form.checkFormSignin(formSignin, formSigninEmail, formSigninPassword) === true) {
      const email = formSigninEmail.value;
      const password = formSigninPassword.value;
      mainapi.signin(email, password)
        .then((res) => {
          if (res.token) {
            headerLinkSignin.removeEventListener('click', login);
            headerLinkSignout.addEventListener('click', logout);
            localStorage.setItem('token', res.token);
            const usname = getUserInfo()
              .then(() => {
                const header = new Header({
                  auth: true,
                  userName: res,
                });
              });
            popup.close();
          } else {
            throw res.message;
          }
        })
        .catch((err) => {
          popupSigninErr.classList.remove('popup-section__general-err_hidden');
          console.log(err);
        });
    }
  });

  popupSignupBtnLogin.addEventListener('click', (event) => { // Signup Popup
    event.preventDefault();
    if (form.checkFormSignin(formSignup, formSignupEmail, formSignupPassword, formSignupName) === true) {
      const email = formSignupEmail.value;
      const password = formSignupPassword.value;
      const name = formSignupName.value;
      mainapi.signup(email, password, name)
        .then((res) => {
          if (res.message) {
            throw res.message;
          } else {
            popup.close();
            popupSection.classList.remove('popup_hidden');
            popupAlert.classList.remove('popup_hidden');
          }
        })
        .catch((err) => {
          popupSignupErr.textContent = err;
        });
    }
  });
}

function start() {
  if (localStorage.getItem('token') !== null) {
    const autoAuth = new AutoAuth(mainapi);
  }
  setAllListeners();
}

// ----------------------------------other----------------------------------------- \\
start();

