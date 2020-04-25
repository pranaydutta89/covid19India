import clone from 'lodash/cloneDeep';
class UtilityService {
  cloneDeep(data) {
    return clone(data);
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
}

export default new UtilityService();
