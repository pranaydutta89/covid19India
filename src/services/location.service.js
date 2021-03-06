import dataService from './data.service';
import storageService from './storage.service';

class LocationService {
  async getPreviousLatLong() {
    return (await storageService.localStorageGetItem('previousPosition')) || {};
  }

  setPreviousLatLong({ latitude, longitude }) {
    return storageService.localStorageSetItem('previousPosition', {
      previousLat: latitude,
      previousLong: longitude,
    });
  }

  async getLocationByIP() {
    const { ip } = await dataService.getCurrentIpAddress();
    const { ip: previousIp } =
      (await storageService.localStorageGetItem('previousIp')) || {};
    if (previousIp === ip) {
      const {
        previousLat: latitude,
        previousLong: longitude,
      } = await this.getPreviousLatLong();
      if (latitude && longitude) {
        return { latitude, longitude };
      } else {
        const { latitude, longitude } = await dataService.getIpLocationApi();
        const obj = { latitude, longitude };
        await this.setPreviousLatLong(obj);
        return obj;
      }
    } else {
      await storageService.localStorageSetItem('previousIp', { ip });
      const { latitude, longitude } = await dataService.getIpLocationApi();
      const obj = { latitude, longitude };
      await this.setPreviousLatLong(obj);
      return obj;
    }
  }

  async clearPoistionData() {
    await storageService.clear('previousPosition');
    await storageService.clear('previousPositionResult');
    await storageService.clear('locationData');
  }
  get GeoLocationAccess() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (
            (await storageService.localStorageGetItem('locationFrom')) !== 'geo'
          ) {
            await this.clearPoistionData();
          }
          await storageService.localStorageSetItem('locationFrom', 'geo');
          const { latitude, longitude } = position.coords;
          res({ latitude, longitude });
          // same as above
        },
        async (e) => {
          console.warn('Geolocation error', e);
          try {
            if (
              (await storageService.localStorageGetItem('locationFrom')) !==
              'ip'
            ) {
              await this.clearPoistionData();
            }
            await storageService.localStorageSetItem('locationFrom', 'ip');
            const obj = await this.getLocationByIP();
            res(obj);
          } catch (e) {
            rej(e);
          }
        }
      );
    });
  }

  async getlocationFromApi(latitude, longitude) {
    const { results } = await dataService.getLocationApi(latitude, longitude);
    const { city, state, state_district } = results[0].components;
    return {
      city: city || state_district,
      state: state,
    };
  }

  async currentLocation() {
    const { latitude, longitude } = await this.GeoLocationAccess;
    const { previousLat, previousLong } = await this.getPreviousLatLong();
    let positionRes;
    if (latitude === previousLat && previousLong === longitude) {
      positionRes = await storageService.localStorageGetItem(
        'previousPositionResult'
      );
      if (!positionRes) {
        const { results } = await dataService.getLocationApi(
          latitude,
          longitude
        );
        positionRes = results;
        await storageService.localStorageSetItem(
          'previousPositionResult',
          positionRes
        );
      }
    } else {
      //when lat long is changed
      const { results } = await dataService.getLocationApi(latitude, longitude);
      positionRes = results;
      await storageService.localStorageSetItem(
        'previousPositionResult',
        results
      );
      await this.setPreviousLatLong({
        latitude,
        longitude,
      });
    }

    const { city, state, state_district } = positionRes[0].components;
    const locationData = {
      city: {
        longName: city || state_district,
      },
      state: {
        longName: state,
      },
    };
    if (!(latitude === previousLat && previousLong === longitude)) {
      dataService.updateLocation(locationData);
    }
    await storageService.localStorageSetItem('locationData', locationData);
    return locationData;
  }
}

export default new LocationService();
