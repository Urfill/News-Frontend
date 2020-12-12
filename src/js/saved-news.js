// importing CSS
import '../blocks/saved-news/saved-news.css';

// importing classes
import MainApi from './api/MainApi';

// importing consts
import {
  localBackendUrl,
  routs,
} from './constants/apiConsts';
import {
  savedNewsTitleSectionTitle,
  savedNewsTitleSectionKeyword,
  savedNewsHeaderLinkSignout,
  savedNewsCardContainer,
} from './constants/savedNewsConsts';


// call classes
const mainapi = new MainApi(localBackendUrl, routs);

// ----------------------------------functions----------------------------------------- \\

function addcardnews(cards) {
  while (savedNewsCardContainer.firstChild) {
    savedNewsCardContainer.removeChild(savedNewsCardContainer.firstChild);
  }
  cards.forEach((element) => {
    const card = document.createElement('div');
    card.classList.add('search-result__card');


    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('search-result__card-image-container');

    const alertContainer = document.createElement('div');
    alertContainer.classList.add('search-result__tag-container');

    const alertText = document.createElement('p');
    alertText.classList.add('search-result__tag');
    alertText.textContent = `${element.keyword}`;

    const cardMarkBtn = document.createElement('button');
    cardMarkBtn.classList.add('search-result__mark');

    const cardImage = document.createElement('img');
    cardImage.classList.add('search-result__card-image');
    cardImage.setAttribute('src', `${element.image}`);


    const cardInfoDiv = document.createElement('div'); // контейнер инфо
    cardInfoDiv.classList.add('search-result__card-info-container');

    const cardDate = document.createElement('p');
    cardDate.classList.add('search-result__date');
    cardDate.textContent = `${element.date}`;

    const cardTitle = document.createElement('p');
    cardTitle.classList.add('search-result__card-title');
    cardTitle.textContent = `${element.title}`;

    const cardText = document.createElement('p');
    cardText.classList.add('search-result__text');
    cardText.textContent = `${element.text}`;

    const cardSource = document.createElement('p');
    cardSource.classList.add('search-result__source');
    cardSource.textContent = `${element.source}`;


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
      window.open(element.link);
    });

    cardTitle.addEventListener('click', (event) => {
      window.open(element.link);
    });

    cardSource.addEventListener('click', (event) => {
      window.open(element.link);
    });

    cardMarkBtn.addEventListener('click', (event) => {
      mainapi.removeArticle(element._id, localStorage.getItem('token'))
        .then(() => {
          savedNewsCardContainer.removeChild(event.target.parentNode.parentNode);
        })
        .catch(() => {
          throw new Error('Something wrong with addcardnews');
        });
    });

    savedNewsCardContainer.appendChild(card);
  });
}

function keyword(massNews) {
  try {
    let t = 0;
    const mass = [];
    massNews.forEach((el) => {
      for (let i = 0; i < mass.length; i++) {
        if (mass[i] === el.keyword) {
          t = 1;
        }
      }
      if (t !== 1) {
        mass.push(el.keyword);
      }
      t = 0;
    });
    const max = [];

    if (mass.length > 1) {
      for (let i = 0; i < mass.length; i++) {
        max[i] = 0;
        for (let g = 0; g < massNews.length; g++) {
          if (mass[i] === massNews[g].keyword) {
            max[i] += 1;
          }
        }
      }
    } else if (mass.length === 1) {
      return { max1: mass[0], max2: undefined };
    } else {
      return { max1: undefined, max2: undefined };
    }
    let maxqwe = -1000;
    let maxindex1;
    let maxindex2;
    for (let i = 0; i < max.length; i++) {
      if (max[i] > maxqwe) {
        maxqwe = max[i];
        maxindex1 = i;
      }
    }
    max[maxindex1] = -999;
    maxqwe = -1000;
    for (let i = 0; i < max.length; i++) {
      if (max[i] > maxqwe) {
        maxqwe = max[i];
        maxindex2 = i;
      }
    }
    return { max1: mass[maxindex1], max2: mass[maxindex2], length: mass.length - 2 };
  } catch {
    throw new Error('Something wrong with keyword');
  }
}

document.querySelector('.header-section__mini-menu-open').addEventListener('click', (event) => {
  document.location.reload();
});

function titlesavearticles(element) {
  savedNewsTitleSectionTitle.textContent = `${savedNewsHeaderLinkSignout.textContent}, у вас ${element.length} сохраненных статей`;
  if (keyword(element).max1 !== undefined && keyword(element).max2 !== undefined) {
    if (keyword(element).length !== 0) savedNewsTitleSectionKeyword.textContent = `По ключевым словам: ${keyword(element).max1}, ${keyword(element).max2} и ещё ${keyword(element).length} другим`;
    else savedNewsTitleSectionKeyword.textContent = `По ключевым словам: ${keyword(element).max1}, ${keyword(element).max2}`;
  }
  if (keyword(element).length === undefined && keyword(element).max1 !== undefined && keyword(element).max2 === undefined) savedNewsTitleSectionKeyword.textContent = `По ключевому слову: ${keyword(element).max1}`;
  if (keyword(element).length === undefined && keyword(element).max1 === undefined && keyword(element).max2 === undefined) {
    savedNewsTitleSectionTitle.textContent = `${savedNewsHeaderLinkSignout.textContent}, у вас нет сохраненных статей`;
    savedNewsTitleSectionKeyword.textContent = 'Сохраненных статей нет!';
  }
}

function start() {
  savedNewsHeaderLinkSignout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = './';
  });

  mainapi.getUserData(localStorage.getItem('token'))
    .then((res) => { savedNewsHeaderLinkSignout.textContent = res.data.name; })
    .catch(() => {
      throw new Error('Something wrong with getUserData');
    });

  mainapi.getArticles(localStorage.getItem('token'))
    .then((res) => { titlesavearticles(res.data); addcardnews(res.data); })
    .catch(() => {
      throw new Error('Something wrong with getArticles');
    });
}


// ----------------------------------other----------------------------------------- \\
start();








