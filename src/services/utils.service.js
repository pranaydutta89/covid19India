import clone from 'lodash/cloneDeep';
class UtilityService {
  cloneDeep(data) {
    return clone(data);
  }
}

export default new UtilityService();
