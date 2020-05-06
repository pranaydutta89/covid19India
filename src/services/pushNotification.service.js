import constantsService from './constants.service';
import serviceWorkerService from './serviceWorker.service';
import storageService from './storage.service';
import dataService from './data.service';
class PushNotificationService {
  constructor() {
    this.publicVapidKey = constantsService.Configs.pushPublicKey;
  }
  get IsNotificationAvailable() {
    return 'Notification' in window;
  }
  async Permissions() {
    if (this.IsNotificationAvailable) {
      if (!(await this.IsNotificationEnabled())) {
        try {
          await Notification.requestPermission();
          this.swInstance = await serviceWorkerService.register();
          return await this.subscribe();
        } catch (e) {
          console.warn('subscription failed', e);
          return Promise.reject(e);
        }
      } else {
        return Promise.resolve();
      }
    }
    return Promise.reject('Notification unavailable');
  }

  IsNotificationEnabled() {
    return storageService.localStorageGetItem('notificationEnabled');
  }

  async subscribe() {
    const subscription = await this.swInstance.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey),
    });
    const obj = {
      pushData: subscription,
      location: await storageService.localStorageGetItem('locationData'),
    };
    await dataService.subsribeNotification(obj);
    await storageService.localStorageSetItem('notificationEnabled', true);
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export default new PushNotificationService();
