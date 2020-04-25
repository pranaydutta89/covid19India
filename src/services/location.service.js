import dataService from './data.service';

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
    const { results } = await dataService.getLocationApi(latitude, longitude);
    const { city, state, state_code, state_district } = results[0].components;
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
