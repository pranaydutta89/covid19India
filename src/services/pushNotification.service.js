class PushNotificationService {
  get IsNotificationAvailable() {
    return 'Notification' in window;
  }
  get Permissions() {
    if (this.IsNotificationAvailable) {
      return Notification.requestPermission().then((res) => {
        new Notification('Test covid notication', {
          body: 'Now you will get realtime notifcation for your location',
        });
        return res;
      });
    }
    return Promise.reject();
  }
}

export default new PushNotificationService();
