import localforage from 'localforage';
import covidDataService from './services/covidData.service';

function showNotification({ title, body, tag }) {
    self.fetch();
}

class PoolDataAndProcess {
    constructor() {
        this.startPooling();
    }

    showNotification(title, body) {
        self.registration.showNotification(title, { body });
    }

    async startPooling() {
        while (true) {
            try {
                const oldData = await localforage.getItem('covidData');
                const newData = await covidDataService.getMainData();
                this.checkLocationDiff(oldData, newData);
                await new Promise((res) => self.setTimeout(res, 300000));
            } catch (e) { }
        }
    }

    async checkLocationDiff(oldData, newData) {
        const locationData = await localforage.getItem('locationData');
        if (locationData) {
            const stateMsg = this.stateDiffMessage(oldData, newData, locationData);
            if (stateMsg) {
                const {
                    state: { longName: stateLongName },
                } = locationData;
                this.showNotification(
                    `Covid Alert for state ${stateLongName}`,
                    stateMsg
                );
            }

            const cityMsg = this.cityDiffMessage(oldData, newData, locationData);
            if (cityMsg) {
                const {
                    city: { longName: cityLongName },
                } = locationData;
                this.showNotification(`Covid Alert for City ${cityLongName}`, cityMsg);
            }
        }
    }

    stateDiffMessage(oldData, newData, { state: { longName: stateLongName } }) {
        const oldState = covidDataService.getStateByName(oldData, stateLongName);
        const newState = covidDataService.getStateByName(newData, stateLongName);
        let msg = '';
        for (let key in oldState) {
            if (oldState[key] !== newState[key]) {
                msg += `${key} ${newState[key] - oldState[key]} `;
            }
        }
        return msg;
    }

    cityDiffMessage(oldData, newData, { city: { longName: cityLongName } }) {
        const oldCity = covidDataService.getDistrictByName(oldData, cityLongName);
        const newCity = covidDataService.getDistrictByName(newData, cityLongName);
        let msg = '';
        delete oldCity.delta;
        delete newCity.delta;
        for (let key in oldCity) {
            if (oldCity[key] !== newCity[key]) {
                msg += `${key} ${newCity[key] - oldCity[key]} `;
            }
        }
        return msg;
    }
}

self.addEventListener('activate', function (event) {
    new PoolDataAndProcess();
});
