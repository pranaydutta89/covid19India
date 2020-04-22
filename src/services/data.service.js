import storageService from "./storage.service";
class DataService {

    async getStateApi() {
        const res = await fetch(
            'https://api.covid19india.org/v2/state_district_wise.json'
        );
        const apiData = await res.json();
        return apiData;
    }
    async getLocationApi(latitude, longitude) {
        const constructMapApiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyArsR0pTwkxruxnG-ymhXWWLk65jyWkBfk`;
        const fetchRes = await fetch(constructMapApiURL);
        return await fetchRes.json();
    }
}


export default new DataService();