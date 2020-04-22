import utilsService from "./utils.service";
import storageService from "./storage.service";
import dataService from "./data.service";
import locationService from "./location.service";
import merge from 'lodash/merge';

class CovidDataService {

    processCovid(apiData) {
        apiData.forEach(j => {
            j.confirmed = j.districtData.map(r => r.confirmed).reduceRight((total, num) => total + num)
            j.active = j.districtData.map(r => r.active).reduceRight((total, num) => total + num)
            j.deceased = j.districtData.map(r => r.deceased).reduceRight((total, num) => total + num)
            j.recovered = j.districtData.map(r => r.recovered).reduceRight((total, num) => total + num)
        })

        const oldData = storageService.localStorageGetItem('covidData');
        merge(apiData, oldData.stateData);

        storageService.localStorageSetItem('covidData', {
            lastUpdatedTimeStamp: Date.now(),
            stateData: apiData
        });
        return apiData;
    }

    async checkSyncStatus() {
        const data = storageService.localStorageGetItem('covidData');
        if (data) {
            const { lastUpdatedTimeStamp, stateData } = data;
            if ((Date.now() - lastUpdatedTimeStamp) / 1000 >= 60) {
                //old data fetch new and return
                const apiData = await dataService.getStateApi();
                return this.processCovid(apiData);
            } else {
                //if less time before last request then fetch old data
                return stateData;
            }
        }
        else {
            const apiData = await dataService.getStateApi();
            return this.processCovid(apiData);
        }
    }

    async getStates() {
        const stateData = await this.checkSyncStatus();
        const stateDataTrimmed = stateData.map(r => {
            const { state, confirmed, active, deceased, recovered } = r;
            return {
                state, confirmed, active, deceased, recovered
            }
        });

        return utilsService.cloneDeep(stateDataTrimmed);
    }

    async getCurrentLocationDistrict() {
        const location = await locationService.currentLocation();
        const stateData = await this.checkSyncStatus();
        const stateThatHasLocationDistrict = stateData.
            find(r => r.districtData.some(j => j.district.toLowerCase() === location.city.longName.toLowerCase()));
        const districtData = stateThatHasLocationDistrict.districtData.
            find(r => r.district.toLowerCase() === location.city.longName.toLowerCase());
        return utilsService.cloneDeep(districtData);
    }

    async setPinDistrict(districtName, watchFlag) {
        const stateData = await this.checkSyncStatus();
        const stateThatHasLocationDistrict = stateData.
            find(r => r.districtData.some(j => j.district.toLowerCase() === districtName.toLowerCase()));
        const districtData = stateThatHasLocationDistrict.districtData.
            find(r => r.district.toLowerCase() === districtName.toLowerCase());
        districtData.watch = watchFlag;
        const covidData = storageService.localStorageGetItem('covidData');
        merge(covidData.stateData, stateData);
        storageService.localStorageSetItem('covidData', covidData);

    }

    async getDistricts() {
        const stateData = await this.checkSyncStatus();
        const districtsMap = stateData.map(r => r.districtData);
        const districts = [];
        districtsMap.forEach(r => districts.push.apply(districts, r));
        return utilsService.cloneDeep(districts);

    }

    async getWatchedDistricts() {
        const stateData = await this.checkSyncStatus();
        const watchedDistricts = [];
        stateData.forEach(r => {
            const stateWatchDistricts = r.districtData.filter(j => j.watch);
            watchedDistricts.push.apply(watchedDistricts, stateWatchDistricts)
        })
        return utilsService.cloneDeep(watchedDistricts);
    }


}

export default new CovidDataService();