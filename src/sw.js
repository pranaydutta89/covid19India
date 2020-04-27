import localforage from 'localforage';
import covidDataService from './services/covidData.service';


class PoolDataAndProcess {
    constructor() {
        self.onnotificationclick = this.attachNotificationEvent.bind(this);
        this.startPooling();
    }

    attachNotificationEvent(event) {
        console.log('On notification click: ', event.notification.tag);
        event.notification.close();

        // This looks to see if the current is already open and
        // focuses if it is
        event.waitUntil(clients.matchAll({
            type: "window"
        }).then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if ('focus' in client)
                    return client.focus();
            }
            if (clients.openWindow)
                return clients.openWindow('/');
        }));
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
                await new Promise((res) => self.setTimeout(res, 30000));
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
        if (newState && oldState) {
            for (let key in oldState) {
                if (oldState[key] !== newState[key]) {
                    msg += `${key} ${newState[key] - oldState[key]} `;
                }
            }
        }
        return msg;
    }

    cityDiffMessage(oldData, newData, { city: { longName: cityLongName } }) {
        const oldCity = covidDataService.getDistrictByName(oldData, cityLongName);
        const newCity = covidDataService.getDistrictByName(newData, cityLongName);
        let msg = '';
        if (oldCity && newCity) {
            delete oldCity.delta;
            delete newCity.delta;
            for (let key in oldCity) {
                if (oldCity[key] !== newCity[key]) {
                    msg += `${key} ${newCity[key] - oldCity[key]} `;
                }
            }
        }
        return msg;
    }
}

self.addEventListener('activate', function (event) {
    new PoolDataAndProcess();
});
