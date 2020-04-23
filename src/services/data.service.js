import storageService from "./storage.service";
class DataService {

    async getResourceApi() {
        const res = await fetch(
            'https://api.covid19india.org/resources/resources.json'
        );
        const apiData = await res.json();
        return apiData;
    }

    async getPatientApi() {
        const res = await fetch(
            'https://api.covid19india.org/raw_data.json'
        );
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
    async getLocationApi(latitude, longitude) {
        const { googleGeocodingApiKey } = window.env
        const constructMapApiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}
        &key=${googleGeocodingApiKey}`;
        const fetchRes = await fetch(constructMapApiURL);
        return await fetchRes.json();
    }
}


export default new DataService();