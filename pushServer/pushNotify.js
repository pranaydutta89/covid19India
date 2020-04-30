const db = require('./db');
const webpush = require("web-push");
class PushNotify {

    constructor() {
        const publicVapidKey =
            "BGu1xK1u0zFGibK-V-BhmRNIrzGniwPOmC9AOnR5c4AMFKgXdGgT8jbI_yMz9S6PX3jQ9pmu5TqCs5DPjwrui3I";
        const privateVapidKey = "dbPL7QdsqkpVt5zCESl5WPqaVwIZ67ue7ICqzpCr5qg";

        webpush.setVapidDetails(
            "mailto:pranaydutta89@gmail.com",
            publicVapidKey,
            privateVapidKey
        );

    }

    pushNotification(pushData, title, body) {

        return webpush
            .sendNotification(pushData, JSON.stringify({
                title,
                body
            }))
            .catch(err => console.error(err));
    }
    async start() {
        while (true) {
            try {
                await this.checkIndiaDiff();
                // await this.checkStateDiff();
                //await this.checkDistrictDiff();
                await new Promise((res) => setTimeout(res, 10000))
            }
            catch (e) { }
        }
    }

    async checkIndiaDiff() {
        const { india_stats, subscriptions } = await db.DbFile;
        const newIndiaStats = await db.IndiaData();

        if (JSON.stringify(india_stats) !== JSON.stringify(newIndiaStats)) {
            let msg = ''
            for (let key in newIndiaStats) {
                if (newIndiaStats[key] !== india_stats[key]) {
                    msg = `${key} ${newIndiaStats[key]} `
                }
            }
            if (msg) {
                for (let userId in subscriptions) {
                    this.pushNotification(subscriptions[userId].pushData, 'Covid Alert for India', msg)
                }
            }
            db.updateDbFile({ india_stats: newIndiaStats });
        }


    }

    async checkStateDiff() {

    }

    async checkDistrictDiff() {

    }
}


module.exports = new PushNotify();