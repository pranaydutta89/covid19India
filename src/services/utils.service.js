class UtilityService {
  cloneDeep(data) {
    return JSON.parse(JSON.stringify(data));
  }
  randomString(length = 10) {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLen = chars.length;
    for (let i = 0; i < length; i += 1) {
      const rnd = Math.random();
      const nxtChar = chars.charAt(Math.floor(rnd * charLen));
      result += nxtChar;
    }
    return result;
  }

  stateSync(state, data) {
    return new Promise((res) => {
      state(data, res);
    });
  }
}

export default new UtilityService();
