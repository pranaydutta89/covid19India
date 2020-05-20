const db = require('./db');
const webpush = require('web-push');
class PushNotify {
  constructor() {
    const publicVapidKey =
      'BGu1xK1u0zFGibK-V-BhmRNIrzGniwPOmC9AOnR5c4AMFKgXdGgT8jbI_yMz9S6PX3jQ9pmu5TqCs5DPjwrui3I';
    const privateVapidKey = 'dbPL7QdsqkpVt5zCESl5WPqaVwIZ67ue7ICqzpCr5qg';

    webpush.setVapidDetails(
      'mailto:pranaydutta89@gmail.com',
      publicVapidKey,
      privateVapidKey
    );
  }

  pushNotification(pushData, title, body, tag) {
    return webpush
      .sendNotification(
        pushData,
        JSON.stringify({
          title,
          body,
          tag,
        })
      )
      .catch((err) => console.error(err));
  }
  async start() {
    while (true) {
      try {
        await this.checkIndiaDiff();
        await this.checkStateDiff();
        await this.checkDistrictDiff();
      } catch (e) { }
      await new Promise((res) => setTimeout(res, 10000));
    }
  }

  async checkIndiaDiff() {
    const { india_stats, subscriptions } = db.DbFile;
    const newIndiaStats = await db.IndiaData();

    if (JSON.stringify(india_stats) !== JSON.stringify(newIndiaStats)) {
      let msg = '';
      for (let key in newIndiaStats) {
        if (newIndiaStats[key] !== india_stats[key]) {
          const delta = newIndiaStats[key] - india_stats[key];
          msg += `${key} - ${newIndiaStats[key]} (${
            delta >= 0 ? '+' : ''
            }${delta}) ,`;
        }
      }
      if (msg) {
        for (let userId in subscriptions) {
          this.pushNotification(
            subscriptions[userId].pushData,
            'Covid Alert for India',
            msg,
            'india'
          );
        }
      }
      db.updateDbFile('india_stats', newIndiaStats);
    }
  }

  async checkStateDiff() {
    const { state_stats: oldData, subscriptions } = db.DbFile;
    const newData = await db.stateData();
    const stateDiffs = [];
    newData.forEach((newState) => {
      const oldState = oldData.find((j) => j.state === newState.state);
      if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
        stateDiffs.push({ newState, oldState });
      }
    });
    if (stateDiffs.length > 0) {
      const msgArr = [];

      stateDiffs.forEach(({ newState, oldState }) => {
        let msg = '';
        for (let key in newState) {
          if (newState[key] !== oldState[key]) {
            const delta = newState[key] - oldState[key];
            msg += `${key} -${newState[key]} (${
              delta >= 0 ? '+' : ''
              }${delta}) `;
          }
        }
        msgArr.push({
          state: newState.state,
          message: msg,
        });
      });

      for (let userId in subscriptions) {
        const { location, pushData } = subscriptions[userId];
        if (location && location.state && location.state.longName) {
          const msgData = msgArr.find(
            (r) =>
              r.state.toLowerCase() === location.state.longName.toLowerCase()
          );
          if (msgData) {
            this.pushNotification(
              pushData,
              `Covid Alert for state ${location.state.longName}`,
              msgData.message,
              'states'
            );
          }
        }
      }
      db.updateDbFile('state_stats', newData);
    }
  }

  async checkDistrictDiff() {
    const { district_stats: oldData, subscriptions } = db.DbFile;
    const newData = await db.districtData();
    const districtDiffs = [];
    newData.forEach((newDistrict) => {
      const oldDistrict = oldData.find(
        (j) =>
          j.district === newDistrict.district && j.state === newDistrict.state
      );
      if (JSON.stringify(newDistrict) !== JSON.stringify(oldDistrict)) {
        districtDiffs.push({ newDistrict, oldDistrict });
      }
    });
    if (districtDiffs.length > 0) {
      const msgArr = [];

      districtDiffs.forEach(({ newDistrict, oldDistrict }) => {
        let msg = '';
        for (let key in newDistrict) {
          if (newDistrict[key] !== oldDistrict[key]) {
            const delta = newDistrict[key] - oldDistrict[key];
            msg += `${key} - ${newDistrict[key]} (${
              delta >= 0 ? '+' : ''
              }${delta}), `;
          }
        }
        msgArr.push({
          district: newDistrict.district,
          state: newDistrict.state,
          message: msg,
        });
      });

      for (let userId in subscriptions) {
        const { location, pushData } = subscriptions[userId];
        if (location && location.state && location.state.longName) {
          const msgData = msgArr.find(
            (r) =>
              r.state.toLowerCase() === location.state.longName.toLowerCase()
          );
          if (msgData) {
            this.pushNotification(
              pushData,
              `Covid Alert for city ${msgData.district}`,
              msgData.message,
              'districts'
            );
          }
        }
      }
      db.updateDbFile('district_stats', newData);
    }
  }
}

module.exports = new PushNotify();
