import utilsService from './utils.service';
import storageService from './storage.service';
import dataService from './data.service';
import locationService from './location.service';

class CovidDataService {
  processCovid(apiData) {
    apiData.forEach((j) => {
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

  async getMainData() {
    const apiData = await dataService.getStateApi();
    const latest = this.processCovid(apiData);
    const previous = await storageService.localStorageGetItem('covidData');
    await storageService.localStorageSetItem('covidData', latest);
    return { previous, latest };
  }

  async getIndiaBrief() {
    const {
      statewise,
      cases_time_series,
      tested,
    } = await dataService.getIndiaDetailsApi();

    const { dailyconfirmed, dailydeceased, dailyrecovered } = cases_time_series[
      cases_time_series.length - 1
    ];
    const {
      active,
      confirmed,
      deaths,
      lastupdatedtime: lastUpdatedTime,
      recovered,
    } = statewise.find(({ statecode }) => statecode === 'TT');
    const cases = {
      yesterday: {
        confirmed: dailyconfirmed,
        deceased: dailydeceased,
        recovered: dailyrecovered,
      },
      total: {
        active,
        confirmed,
        deaths,
        recovered,
        lastUpdatedTime,
      },
    };
    const {
      totalsamplestested: totalSamplesTested,
      updatetimestamp: updateTimestamp,
      source,
    } = tested[tested.length - 1];
    const latest = {
      cases,
      tested: {
        totalSamplesTested,
        updateTimestamp,
        source,
      },
    };
    const previous = await storageService.localStorageGetItem('covidIndiaData');
    await storageService.localStorageSetItem('covidIndiaData', latest);
    return { previous, latest };
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

  async getStateResources(stateName) {
    const { resources } = await dataService.getResourceApi();
    const stateResource = resources.filter(
      (r) => r.state.toLowerCase() === stateName.toLowerCase()
    );

    return stateResource.map(
      ({
        category,
        contact: source,
        descriptionandorserviceprovided: notes,
        nameoftheorganisation: name,
        city,
        phonenumber: number,
      }) => {
        source =
          source.indexOf('SOURCE ') !== -1
            ? source.split('SOURCE ')[1]
            : source;

        return {
          category,
          source,
          notes,
          name,
          number,
          city,
        };
      }
    );
  }
  async getDistrictResources(districtName) {
    const { resources } = await dataService.getResourceApi();
    const districtResource = resources.filter(
      (r) => r.city.toLowerCase() === districtName.toLowerCase()
    );

    return districtResource.map(
      ({
        category,
        contact: source,
        descriptionandorserviceprovided: notes,
        nameoftheorganisation: name,
        phonenumber: number,
      }) => {
        source =
          source.indexOf('SOURCE ') !== -1
            ? source.split('SOURCE ')[1]
            : source;
        return {
          category,
          source,
          notes,
          name,
          number,
        };
      }
    );
  }

  async getStates() {
    const { latest: stateData } = await this.getMainData();
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
    try {
      const {
        state: { longName },
      } = await locationService.currentLocation();
      const { latest: stateData } = await this.getMainData();
      const state = stateData.find(({ state }) => {
        return state.toLowerCase() === longName.toLowerCase();
      });
      return utilsService.cloneDeep(state);
    } catch (e) {
      locationService.clearPoistionData();
      console.log(e);
    }
  }

  async getCurrentLocationDistrict() {
    try {
      const location = await locationService.currentLocation();
      const { latest: stateData } = await this.getMainData();
      const stateThatHasLocationDistrict = stateData.find((r) =>
        r.districtData.some(
          (j) =>
            j.district.toLowerCase() === location.city.longName.toLowerCase()
        )
      );
      const districtData = stateThatHasLocationDistrict.districtData.find(
        (r) => r.district.toLowerCase() === location.city.longName.toLowerCase()
      );
      return utilsService.cloneDeep(districtData);
    } catch (e) {
      locationService.clearPoistionData();
      console.log(e);
    }
  }

  async setPinState(stateName, watchFlag) {
    const pinnedStateList =
      (await storageService.localStorageGetItem('pinnedState')) || [];
    if (watchFlag) {
      const alreadyExists = pinnedStateList.find((r) => r === stateName);
      if (!alreadyExists) {
        pinnedStateList.push(stateName);
      }
    } else {
      const idx = pinnedStateList.findIndex((r) => r === stateName);
      if (idx > -1) {
        pinnedStateList.splice(idx, 1);
      }
    }
    await storageService.localStorageSetItem('pinnedState', pinnedStateList);
    return await this.getPinState();
  }

  async getPinState() {
    return (await storageService.localStorageGetItem('pinnedState')) || [];
  }

  async setPinDistrict(districtName, watchFlag) {
    const pinnedDistrictList =
      (await storageService.localStorageGetItem('pinnedDistrict')) || [];
    if (watchFlag) {
      const alreadyExists = pinnedDistrictList.find((r) => r === districtName);
      if (!alreadyExists) {
        pinnedDistrictList.push(districtName);
      }
    } else {
      const idx = pinnedDistrictList.findIndex((r) => r === districtName);
      if (idx > -1) {
        pinnedDistrictList.splice(idx, 1);
      }
    }
    await storageService.localStorageSetItem(
      'pinnedDistrict',
      pinnedDistrictList
    );
    return await this.getPinDistrict();
  }

  async getPinDistrict() {
    return (await storageService.localStorageGetItem('pinnedDistrict')) || [];
  }

  async getDistricts() {
    const { latest: stateData } = await this.getMainData();
    const districtsMap = stateData.map((r) => r.districtData);
    const districts = [];
    districtsMap.forEach((r) => districts.push.apply(districts, r));
    return utilsService.cloneDeep(districts);
  }

  async getWatchedDistricts() {
    const { latest: stateData } = await this.getMainData();
    const watchedDistricts = [];
    const pinnedDistricts = await this.getPinDistrict();
    stateData.forEach((r) => {
      const stateWatchDistricts = r.districtData.filter((j) =>
        pinnedDistricts.some((k) => k === j.district)
      );
      watchedDistricts.push.apply(watchedDistricts, stateWatchDistricts);
    });
    return utilsService.cloneDeep(watchedDistricts);
  }

  async getWatchedStates() {
    const { latest: stateData } = utilsService.cloneDeep(await this.getMainData());
    const pinnedStates = await this.getPinState();

    return stateData.filter((r) => pinnedStates.some((j) => j === r.state)).map((r) => {
      delete r.districtData;
      return r;
    });
  }

  getStateByName(stateData, name) {
    const clonedStateData = utilsService.cloneDeep(stateData);
    return clonedStateData
      .map((r) => {
        delete r.districtData;
        return r;
      })
      .find((j) => {
        return j.state.toLowerCase() === name.toLowerCase();
      });
  }

  getDistrictByName(stateData, name) {
    const clonedState = utilsService.cloneDeep(stateData);
    let selectedDistrict;
    for (let { districtData } of clonedState) {
      selectedDistrict = districtData.find(
        ({ district }) => district.toLowerCase() === name.toLowerCase()
      );
      if (selectedDistrict) {
        break;
      }
    }
    return selectedDistrict;
  }
}

export default new CovidDataService();
