import storageService from './storage.service';
import utilsService from './utils.service';

class UserService {
  async getUserId() {
    let userId = await storageService.localStorageGetItem('userId');
    if (!userId) {
      //create userId
      userId = utilsService.randomString();
      await storageService.localStorageSetItem('userId', userId);
    }
    return userId;
  }
}

export default new UserService();
