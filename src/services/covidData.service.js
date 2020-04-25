import utilsService from './utils.service';
import storageService from './storage.service';
import dataService from './data.service';
import locationService from './location.service';
import merge from 'lodash/merge';

class CovidDataService {
  processCovid(apiData) {
    apiData.forEach((j) => {

      j.districtData.map((r) => {

      });
      j.confirmed = j.districtData
        .map((r) => r.confirmed)
        .reduceRight((total, num) => total + num);
      j.active = j.districtData
        .map((r) => r.active)
        .reduceRight((total, num) => total + num);
      j.deceased = j.districtData
        .map((r) => r.deceased)
        .reduceRight((total, num) => total + num);
      j.recovered = j.districtData
        .map((r) => r.recovered)
        .reduceRight((total, num) => total + num);
    });

    return apiData;
  }

  async checkSyncStatus() {
    const apiData = await dataService.getStateApi();
    return this.processCovid(apiData);
  }

  async getDistrictPatients(districtName) {
    const { raw_data: patientData } = await dataService.getPatientApi();
    const patients = patientData.filter(
      (r) => r.detecteddistrict.toLowerCase() === districtName.toLowerCase()
    );
    return patients.map((r) => {
      const {
        patientnumber,
        dateannounced,
        currentstatus,
        notes,
        source1: source,
      } = r;
      return {
        patientnumber,
        dateannounced,
        currentstatus,
        notes,
        source,
      };
    });
  }

  async getDistrictResources(districtName) {
    const { resources } = await dataService.getResourceApi();
    const districtResource = resources.filter(
      (r) => r.city.toLowerCase() === districtName.toLowerCase()
    );

    return districtResource.map((r) => {
      const {
        category,
        source,
        descriptionandorserviceprovided: notes,
        nameoftheorganisation: name,
        phonenumber: number,
      } = r;
      return {
        category,
        source,
        notes,
        name,
        number,
      };
    });
  }

  async getStates() {
    const stateData = await this.checkSyncStatus();
    const stateDataTrimmed = stateData.map((r) => {
      const { state, confirmed, active, deceased, recovered } = r;

      return {
        state,
        confirmed,
        active,
        deceased,
        recovered,

      };
    });

    return utilsService.cloneDeep(stateDataTrimmed);
  }

  async getCurrentLocationState() {
    const { state: { longName } } = await locationService.currentLocation();
    const stateData = await this.checkSyncStatus();
    const state = stateData.find(({ state }) => {
      return state.toLowerCase() === longName.toLowerCase()
    }
    );
    return utilsService.cloneDeep(state);
  }

  async getCurrentLocationDistrict() {
    const location = await locationService.currentLocation();
    const stateData = await this.checkSyncStatus();
    const stateThatHasLocationDistrict = stateData.find((r) =>
      r.districtData.some(
        (j) => j.district.toLowerCase() === location.city.longName.toLowerCase()
      )
    );
    const districtData = stateThatHasLocationDistrict.districtData.find(
      (r) => r.district.toLowerCase() === location.city.longName.toLowerCase()
    );
    return utilsService.cloneDeep(districtData);
  }

  setPinState(stateName, watchFlag) {
    const pinnedStateList = storageService.localStorageGetItem('pinnedState') || [];
    if (watchFlag) {
      const alreadyExists = pinnedStateList.find(r => r === stateName);
      if (!alreadyExists) {
        pinnedStateList.push(stateName)
      }
    } else {
      const idx = pinnedStateList.findIndex(r => r === stateName);
      if (idx > -1) {
        pinnedStateList.splice(idx, 1);
      }
    }
    storageService.localStorageSetItem('pinnedState', pinnedStateList);
    return this.getPinState();
  }

  getPinState() {
    return storageService.localStorageGetItem('pinnedState') || [];
  }

  setPinDistrict(districtName, watchFlag) {
    const pinnedDistrictList = storageService.localStorageGetItem('pinnedDistrict') || [];
    if (watchFlag) {
      const alreadyExists = pinnedDistrictList.find(r => r === districtName);
      if (!alreadyExists) {
        pinnedDistrictList.push(districtName)
      }
    } else {
      const idx = pinnedDistrictList.findIndex(r => r === districtName);
      if (idx > -1) {
        pinnedDistrictList.splice(idx, 1);
      }
    }
    storageService.localStorageSetItem('pinnedDistrict', pinnedDistrictList);
    return this.getPinDistrict();
  }

  getPinDistrict() {
    return storageService.localStorageGetItem('pinnedDistrict') || [];
  }

  async getDistricts() {
    const stateData = await this.checkSyncStatus();
    const districtsMap = stateData.map((r) => r.districtData);
    const districts = [];
    districtsMap.forEach((r) => districts.push.apply(districts, r));
    return utilsService.cloneDeep(districts);
  }

  async getWatchedDistricts() {
    const stateData = await this.checkSyncStatus();
    const watchedDistricts = [];
    const pinnedDistricts = this.getPinDistrict();
    stateData.forEach((r) => {
      const stateWatchDistricts = r.districtData.filter((j) => pinnedDistricts.some(k => k === j.district));
      watchedDistricts.push.apply(watchedDistricts, stateWatchDistricts);
    });
    return utilsService.cloneDeep(watchedDistricts);
  }

  async getWatchedStates() {
    const stateData = await this.checkSyncStatus();
    const pinnedStates = this.getPinState();

    return utilsService.cloneDeep(stateData.filter(r => pinnedStates.some(j => j === r.state)));
  }
}

export default new CovidDataService();
