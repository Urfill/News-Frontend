import { cardsTitle } from '../constants/apiConsts';

export default class MainApi {
  constructor(url, routs) {
    this.url = url;
    this.routs = routs;
  }

  signup(email, password, name) { // signup // POST
    return fetch(`${this.url + this.routs.signUp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // console.log('signup POST bad'); // test
          // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('signup POST good'); // test
        // console.log(res); // test
        return res.json();
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with signup');
        }
        throw err;
      });
  }

  signin(email, password) { // signin // POST
    return fetch(`${this.url + this.routs.signIn}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // console.log('signin POST bad'); // test
          // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('signin POST good'); // test
        // console.log(res); // test
        return res.json();
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with signin');
        }
        throw err;
      });
  }

  getUserData(token) { // users/me // GET
    this._token = token;

    return fetch(`${this.url + this.routs.currentUser}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          // console.log('users/me GET bad'); // test
          // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('users/me GET good'); // test
        // console.log(res); // test
        return res.json();
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with getUserData');
        }
        throw err;
      });
  }

  getArticles(token) { // articles // GET
    this.token = token;
    return fetch(`${this.url + this.routs.articles}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          // console.log('articles GET bad'); // test
          // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('articles GET good'); // test
        // console.log(res); // test
        return res.json();
      })
      // .then((data) => {
      //   for (let i = 0; i < data.data.length; i++) {
      //     console.log(data.data[i].title);
      //   }
      // })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with getArticles');
        }
        throw err;
      });
  }

  getArticlesByTitle() { // articles // GET
    const token = localStorage.getItem('token');

    return fetch(`${this.url + this.routs.articles}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          // console.log('articles GET bad'); // test
          // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('articles GET good'); // test
        // console.log(res); // test
        return res.json();
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with getArticles');
        }
        throw err;
      });
  }

  createArticle(article, token) { // articles // POST
    this.token = token;

    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = article;

    return fetch(`${this.url + this.routs.articles}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => {
        if (!res.ok) {
        // console.log('articles POST bad'); // test
        // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('articles POST good'); // test
        // console.log(res); // test
        return res.json();
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with createArticle');
        }
        throw err;
      });
  }

  removeArticle(id, token) { // article // DELETE
    this.token = token;

    return fetch(`${this.url + this.routs.articles}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
        // console.log('articles DELETE bad'); // test
        // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('articles DELETE good'); // test
        // console.log(res); // test
        return res.json();
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with removeArticle');
        }
        throw err;
      });
  }
}
