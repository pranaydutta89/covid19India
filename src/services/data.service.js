class DataService {
  async getResourceApi() {
    const res = await fetch(
      'https://api.covid19india.org/resources/resources.json'
    );
    const apiData = await res.json();
    return apiData;
  }

  async getPatientApi() {
    const res = await fetch('https://api.covid19india.org/raw_data.json');
    const apiData = await res.json();
    return apiData;
  }
  async getStateApi() {
    const res = await fetch(
      'https://api.covid19india.org/v2/state_district_wise.json'
    );
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
    const { geocodingApiKey } = window.env;
    const constructMapApiURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${geocodingApiKey}`;
    const fetchRes = await fetch(constructMapApiURL);
    return await fetchRes.json();
  }

  async getIndiaDetailsApi() {
    const res = await fetch('https://api.covid19india.org/data.json');
    const apiData = await res.json();

    return apiData;
  }
}

export default new DataService();
