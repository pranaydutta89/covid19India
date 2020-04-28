import constantsService from './constants.service';

class DataService {
  constructor() {
    this.CovidDataUrl = constantsService.Configs.covidDataUrl;
    this.geocodingApiKey = constantsService.Configs.geocodingApiKey;
  }
  async getResourceApi() {
    const res = await fetch(`${this.CovidDataUrl}/resources/resources.json`);
    const apiData = await res.json();
    return apiData;
  }

  async getPatientApi() {
    const res = await fetch(`${this.CovidDataUrl}/raw_data.json`);
    const apiData = await res.json();
    return apiData;
  }
  async getStateApi() {
    const res = await fetch(`${this.CovidDataUrl}/v2/state_district_wise.json`);
    const apiData = await res.json();
    return apiData;
  }

  async getCurrentIpAddress() {
    const res = await fetch('https://api6.ipify.org/?format=json');
    const apiData = await res.json();
    return apiData;
  }
  async getIpLocationApi() {
    const res = await fetch('https://ipapi.co/json');
    const apiData = await res.json();
    return apiData;
  }
  async getLocationApi(latitude, longitude) {
    const constructMapApiURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${this.geocodingApiKey}`;
    const fetchRes = await fetch(constructMapApiURL);
    return await fetchRes.json();
  }

  async getIndiaDetailsApi() {
    const res = await fetch(`${this.CovidDataUrl}/data.json`);
    const apiData = await res.json();

    return apiData;
  }
}

export default new DataService();
