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
        event.waitUntil(
            clients
                .matchAll({
                    type: 'window',
                })
                .then(function (clientList) {
                    for (var i = 0; i < clientList.length; i++) {
                        var client = clientList[i];
                        if ('focus' in client) return client.focus();
                    }
                    if (clients.openWindow) return clients.openWindow('/');
                })
        );
    }

    showNotification(title, body) {
        title = 'Covid Alert for ' + title;
        self.registration.showNotification(title, { body });
    }

    async startPooling() {
        while (true) {
            try {
                await new Promise((res) => self.setTimeout(res, 10000));
                await this.checkLocationDiff();
                await this.checkIndiaDiff();

            } catch (e) { }
        }
    }

    async checkIndiaDiff() {
        const { previous, latest } = await covidDataService.getIndiaBrief();
        if (previous && latest) {
            const { cases: { total: oldTotal } } = previous;
            const { cases: { total: newTotal } } = latest;
            let msg = '';
            for (let key in oldTotal) {
                if (oldTotal[key] !== newTotal[key]) {
                    msg += `${key} ${newTotal[key]}`
                }
            }

            if (msg) {
                this.showNotification('India, new summary', msg);
            }
        }
    }
    async checkLocationDiff() {
        const { previous, latest } = await covidDataService.getMainData();
        const locationData = await localforage.getItem('locationData');
        if (previous && latest && locationData) {
            const stateMsg = this.stateDiffMessage(previous, latest, locationData);
            if (stateMsg) {
                const {
                    state: { longName: stateLongName },
                } = locationData;
                this.showNotification(
                    `state ${stateLongName}`,
                    stateMsg
                );
            }

            const cityMsg = this.cityDiffMessage(previous, latest, locationData);
            if (cityMsg) {
                const {
                    city: { longName: cityLongName },
                } = locationData;
                this.showNotification(`city ${cityLongName}`, cityMsg);
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
                    msg += `${key} ${newState[key]} `;
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
                    msg += `${key} ${newCity[key]} `;
                }
            }
        }
        return msg;
    }
}

self.addEventListener('activate', function (event) {
    new PoolDataAndProcess();
});
