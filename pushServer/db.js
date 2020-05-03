const https = require('https');
const fs = require('fs');
const path = require('path');
const api = require('./api');
const constants = require('./constants');
const utils = require('./utils');
class DB {

    constructor() {
        this.dbFileName = process.env.NODE_ENV === 'production' ? 'db_prod.json' : 'db_dev.json'
    }

    async stateData() {
        const { statewise } = await api.dataApi();
        const state_stats = [];
        for (let i = 1; i < statewise.length; i++) {
            state_stats.push(utils.getSelectedAttirbutes(constants.stateKeys, statewise[i]));
        }
        return state_stats;

    }
    async districtData() {

        const stateWithDistrict = await api.stateDistrictApi();
        const district_stats = [];
        stateWithDistrict.forEach(({ state, districtData }) => {
            districtData.forEach(({ active, confirmed, deceased: deaths, recovered, district }) => {
                district_stats.push({ active, confirmed, deaths, recovered, district, state })

            })

        });
        return district_stats;
    }

    async IndiaData() {
        const { statewise } = await api.dataApi();
        return utils.getSelectedAttirbutes(constants.indiaKeys, statewise[0])
    }
    async  initialize() {
        const india_stats = await this.IndiaData();
        const district_stats = await this.districtData();
        const state_stats = await this.stateData();
        this.updateDbFile('india_stats', india_stats);
        this.updateDbFile('district_stats', district_stats);
        this.updateDbFile('state_stats', state_stats);
    }

    async updateUserLocation(data) {
        const { userId } = data;
        delete data.userId;
        const { subscriptions } = this.DbFile;
        if (subscriptions[userId]) {
            Object.assign(subscriptions[userId], { location: data });
            this.updateDbFile('subscriptions', subscriptions)
        }
    }

    get DBFilePath() {
        return path.join(__dirname, this.dbFileName)
    }

    get DbFile() {
        if (!fs.existsSync(this.DBFilePath)) {
            fs.writeFileSync(this.DBFilePath, JSON.stringify({
                subscriptions: {},
                state_stats: [],
                district_stats: [],
                india_stats: {}
            }), 'utf8');
        }
        return JSON.parse(fs.readFileSync(this.DBFilePath, 'utf8'))
    }

    updateDbFile(key, val) {
        const data = this.DbFile;
        data[key] = val;
        fs.writeFileSync(this.DBFilePath, JSON.stringify(data), 'utf8');
    }
    addUpdateSubscription(data) {
        if (data) {
            const { pushData, location, userId } = data;
            if (userId && pushData && location) {
                delete data.userId
                const { subscriptions } = this.DbFile;
                const userData = subscriptions[userId];
                if (userData) {
                    Object.assign(userData, data)
                } else {
                    subscriptions[userId] = data
                }
                this.updateDbFile('subscriptions', subscriptions);

            }
        }
    }
}

module.exports = new DB();