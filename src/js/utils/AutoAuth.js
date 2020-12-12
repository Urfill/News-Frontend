import Header from '../header/Header';

export default class AutoAuth {
  constructor(data) {
    this.data = data;

    this.autoAuth();
  }


  autoAuth() {
    this.data.getUserData(localStorage.getItem('token'))
      .then((res) => {
        // console.log(res.data.name); // test
        const header = new Header({ auth: true, userName: res.data.name });
      })
      .catch((err) => {
        // console.log(err); // test
        throw new Error('Something wrong with autoAuth');
      });
  }
}
