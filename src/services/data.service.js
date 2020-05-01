import constantsService from './constants.service';
import userService from './user.service';

class DataService {
  constructor() {
    this.CovidDataUrl = constantsService.Configs.covidDataUrl;
    this.geocodingApiKey = constantsService.Configs.geocodingApiKey;
    this.apiUrl = constantsService.Configs.apiUrl;
  }
  async getResourceApi() {
    const res = await fetch(`${this.CovidDataUrl}/resources/resources.json`);
    const apiData = await res.json();
    return apiData;
  }

  async subsribeNotification(obj) {
    try {
      Object.assign(obj, { userId: await userService.getUserId() })
      await fetch(`${this.apiUrl}/subscribe`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "content-type": "application/json"
        }
      });
    }
    catch (e) { }
  }

  async updateLocation(obj) {
    try {
      Object.assign(obj, { userId: await userService.getUserId() })
      return await fetch(`${this.apiUrl}/location`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "content-type": "application/json"
        }
      });
    }
    catch (e) { }
  }
  async getPatientApi() {
    const res = await fetch(`${this.CovidDataUrl}/raw_data3.json`);
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
