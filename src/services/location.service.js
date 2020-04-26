import dataService from './data.service';
import storageService from './storage.service';

class LocationService {

  get PreviousLatLong() {
    return storageService.localStorageGetItem('previousPosition') || {}
  }

  set PreviousLatLong({ latitude, longitude }) {
    storageService.localStorageSetItem('previousPosition', {
      previousLat: latitude,
      previousLong: longitude
    })
  }

  async getLocationByIP() {
    const { ip } = await dataService.getCurrentIpAddress();
    const { ip: previousIp } = storageService.localStorageGetItem('previousIp') || {};
    if (previousIp === ip) {
      const { previousLat: latitude, previousLong: longitude } = this.PreviousLatLong;
      if (latitude && longitude) {
        return { latitude, longitude }
      } else {
        const { latitude, longitude } = await dataService.getIpLocationApi();
        const obj = { latitude, longitude };
        this.PreviousLatLong = obj;
        return obj;
      }
    }
    else {
      storageService.localStorageSetItem('previousIp', { ip });
      const { latitude, longitude } = await dataService.getIpLocationApi();
      const obj = { latitude, longitude };
      this.PreviousLatLong = obj;
      return obj;
    }
  }
  get GeoLocationAccess() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          res({ latitude, longitude });
          // same as above
        },
        async () => {
          const obj = await this.getLocationByIP();
          res(obj)
        }
      );
    });
  }

  async getlocationFromApi(latitude, longitude) {

    const { results } = await dataService.getLocationApi(latitude, longitude);
    const { city, state, state_district } = results[0].components;
    return {
      city: city || state_district,
      state: state
    }
  }

  async currentLocation() {
    const { latitude, longitude } = await this.GeoLocationAccess;
    const { previousLat, previousLong } = this.PreviousLatLong;
    let positionRes;
    if (latitude === previousLat && previousLong === longitude) {
      positionRes = storageService.localStorageGetItem('previousPositionResult');
      if (!positionRes) {
        const { results } = await dataService.getLocationApi(latitude, longitude);
        positionRes = results;
        storageService.localStorageSetItem('previousPositionResult', positionRes);
      }
    }
    else {
      const { results } = await dataService.getLocationApi(latitude, longitude);
      positionRes = results;
      storageService.localStorageSetItem('previousPositionResult', results);
      this.PreviousLatLong = {
        latitude,
        longitude
      }
    }

    const { city, state, state_district } = positionRes[0].components;
    return {
      city: {
        longName: city || state_district,
      },
      state: {
        longName: state,
      },
    };
  }
}

export default new LocationService();
