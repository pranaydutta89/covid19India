import localforage from 'localforage';

class StorageService {
  localStorageGetItem(name) {
    return localforage.getItem(name);
  }

  localStorageSetItem(name, data) {
    return localforage.setItem(name, data);
  }

  clear(name) {
    return localforage.removeItem(name);
  }
}

export default new StorageService();
