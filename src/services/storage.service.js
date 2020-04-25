class StorageService {
  localStorageGetItem(name) {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  }

  localStorageSetItem(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }
}

export default new StorageService();
