
export default class NewsApi {
  constructor(data) {
    const {
      url,
      apiKey,
      cardsLoadCount,
      daysCount,
    } = data;

    this.url = url;
    this.apiKey = apiKey;
    this.daysCount = daysCount;
    this.cardsLoadCount = cardsLoadCount;
    this.createDate(this.daysCount);
  }

  createDate(daysCount) {
    this.date = new Date();
    this.from = new Date(+this.date - 3600 * 24 * 1000 * daysCount).toISOString().slice(0, 19); // переделать
    this.to = this.date.toISOString().slice(0, 19); // переделать
  }

  getNews(req) { // getNews from News-Api
    return fetch(
      `${this.url}q=${req}&top-headlines?country=ru&from=${this.from}&to=${this.to}&cardsLoadCount=${this.cardsLoadCount}&sortBy=popularity&apiKey=${this.apiKey}`, {
        mode: 'cors',
      },
    )
      .then((res) => {
        if (!res.ok) {
          // console.log('getNews bad'); // test
          // console.log(res); // test
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        // console.log('getNews good'); // test
        // console.log(res); // test
        return res.json();
      })
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          throw new Error('Something wrong with getNews');
        }
        throw err;
      });
  }
}
