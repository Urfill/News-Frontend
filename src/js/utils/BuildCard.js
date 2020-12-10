// import {
//   headerLinkSignin, // main const
//   searchResultCardContainer, // search const
//   searchResultButtonContainer,
//   addingArticles, // other
// } from '../constants/mainConsts';

// export default class BuildCard {
//   constructor(cards, mainapi) {
//     this.cards = cards;
//     this.mainapi = mainapi;

//     this.createCard();
//   }

//   createCard() {
//     try {
//       searchResultButtonContainer.classList.remove('search-result__show-more-container_hidden'); // снимаем инвиз с кнопки "Показать еще"
//       for (let i = length; i < length + addingArticles; i++) {
//         let formatter = new Intl.DateTimeFormat('ru', {
//           day: 'numeric',
//           month: 'long',
//           year: 'numeric',
//         });
//         formatter = formatter.format(new Date(this.cards[i].publishedAt.slice(0, 10)));

//         const card = document.createElement('div'); // карточка
//         card.classList.add('search-result__card');


//         const cardImageDiv = document.createElement('div'); // контейнер фото
//         cardImageDiv.classList.add('search-result__card-image-container');

//         const alertContainer = document.createElement('div');
//         alertContainer.classList.add('search-result__mark-alert-container');
//         alertContainer.classList.add('search-result__mark-alert-container_hidden');

//         const alertText = document.createElement('p');
//         alertText.classList.add('search-result__mark-alert');
//         alertText.textContent = 'Войдите, чтобы сохранить статьи';

//         const cardMarkBtn = document.createElement('button');
//         cardMarkBtn.classList.add('search-result__mark');

//         const cardImage = document.createElement('img');
//         cardImage.classList.add('search-result__card-image');
//         cardImage.setAttribute('src', `${this.cards[i].urlToImage}`);


//         const cardInfoDiv = document.createElement('div'); // контейнер инфо
//         cardInfoDiv.classList.add('search-result__card-info-container');

//         const cardDate = document.createElement('p');
//         cardDate.classList.add('search-result__date');
//         cardDate.textContent = `${formatter}`;

//         const cardTitle = document.createElement('p');
//         cardTitle.classList.add('search-result__card-title');
//         cardTitle.textContent = `${this.cards[i].title}`;

//         const cardText = document.createElement('p');
//         cardText.classList.add('search-result__text');
//         cardText.textContent = `${this.cards[i].description}`;

//         const cardSource = document.createElement('p');
//         cardSource.classList.add('search-result__source');
//         cardSource.textContent = `${this.cards[i].source.name}`;


//         cardImageDiv.appendChild(alertContainer);
//         alertContainer.appendChild(alertText);
//         cardImageDiv.appendChild(cardMarkBtn);
//         cardImageDiv.appendChild(cardImage);

//         cardInfoDiv.appendChild(cardDate);
//         cardInfoDiv.appendChild(cardTitle);
//         cardInfoDiv.appendChild(cardText);
//         cardInfoDiv.appendChild(cardSource);

//         card.appendChild(cardImageDiv);
//         card.appendChild(cardInfoDiv);

//         cardImage.addEventListener('click', (event) => {
//           event.stopImmediatePropagation();
//           window.open(this.cards[i].url);
//         });

//         cardTitle.addEventListener('click', (event) => {
//           window.open(this.cards[i].url);
//         });

//         cardSource.addEventListener('click', (event) => {
//           window.open(this.cards[i].url);
//         });

//         cardMarkBtn.addEventListener('mouseover', (event) => {
//           if (!headerLinkSignin.classList.contains('header__link-auth_hidden')) {
//             alertContainer.classList.remove('search-result__mark-alert-container_hidden');
//           }
//         });
//         cardMarkBtn.addEventListener('mouseout', (event) => {
//           if (!headerLinkSignin.classList.contains('header__link-auth_hidden')) {
//             alertContainer.classList.add('search-result__mark-alert-container_hidden');
//           }
//         });

//         searchResultCardContainer.appendChild(card);


//         cardMarkBtn.addEventListener('click', (event) => { // save Card
//           // здесь должна быть проверка на авторизованность
//           if (headerLinkSignin.classList.contains('header__link-auth_hidden')) {
//             // const card = event.target.parentNode.parentNode; // disabled // dublicate // ???
//             const keyword = document.querySelector('.search-section__search-input').value;
//             const title = card.querySelector('.search-result__card-title').textContent;
//             const text = card.querySelector('.search-result__text').textContent;
//             const date = card.querySelector('.search-result__date').textContent;
//             const source = card.querySelector('.search-result__source').textContent;
//             const link = this.cards[i].url;
//             const image = this.cards[i].urlToImage;

//             this.mainapi.createArticle({
//               keyword,
//               title,
//               text,
//               date,
//               source,
//               link,
//               image,
//             }, localStorage.getItem('token'))
//               .then((res) => {
//                 console.log(res);
//               })
//               .catch((err) => {
//                 alert(err);
//               });

//             cardMarkBtn.classList.toggle('search-result__mark'); // смена марки на помеченную
//             cardMarkBtn.classList.toggle('search-result__mark-marked'); // смена марки на помеченную
//           }
//         });
//       }
//       length += addingArticles;
//     } catch {
//       searchResultButtonContainer.classList.add('search-result__show-more-container_hidden'); // test
//     }
//   }
// }
