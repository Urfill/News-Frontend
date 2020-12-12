// main API const
const searchBtn = document.querySelector('.search-section__search-button');
const searchInput = document.querySelector('.search-section__search-input');

// news-api
const url = 'https://nomoreparties.co/news/v2/everything?';
const apiKey = 'f7c168304e3d45e7a0d8a3cc13ceb1ba';

// local-backend
// const localBackendUrl = 'http://localhost:3000/';
// const localBackendUrl = 'https://sekizos-storage.students.nomoreparties.space/';
const localBackendUrl = 'https://sekizos-storage.students.nomoreparties.space/';
const cardsLoadCount = 100;
const daysCount = 7;
const cardsTitle = [];
const routs = {
  signIn: 'signin',
  signUp: 'signup',
  articles: 'articles',
  logOut: 'logout', // ??? not
  currentUser: 'users/me',
};

export {
  searchBtn, // main API const
  searchInput,
  url, // news-api
  apiKey,
  localBackendUrl, // local-backend
  cardsLoadCount,
  daysCount,
  routs,
  cardsTitle,
};
