const fetch = require('node-fetch');

class Api {
  constructor() {
    this.url =
      process.env.NODE_ENV === 'production'
        ? 'https://api.covid19india.org'
        : 'http://localhost:3000';
  }
  dataApi() {
    return fetch(`${this.url}/data.json`).then((res) => res.json());
  }

  stateDistrictApi() {
    return fetch(`${this.url}/v2/state_district_wise.json`).then((res) =>
      res.json()
    );
  }
}

module.exports = new Api();
