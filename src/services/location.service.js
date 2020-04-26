import dataService from './data.service';
import storageService from './storage.service';

class LocationService {
  get GeoLocationAccess() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          res(position.coords);
          // same as above
        },
        (error) => {
          rej(error);
        }
      );
    });
  }

  async currentLocation() {
    const position = await this.GeoLocationAccess;
    const { latitude, longitude } = position;
    const { previousLat, previousLong } = storageService.localStorageGetItem('previousPosition') || {}
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
      storageService.localStorageSetItem('previousPosition', {
        previousLat: latitude,
        previousLong: longitude
      })
    }

    const { city, state, state_code, state_district } = positionRes[0].components;
    return {
      city: {
        longName: city || state_district,
      },
      state: {
        longName: state,
        short_name: state_code,
      },
    };
  }
}

export default new LocationService();
