class PushNotificationService {
  get Permissions() {
    return Notification.requestPermission().then((res) => {
      new Notification('Test covid notication', {
        body: 'Now you will get realtime notifcation for your location',
      });
      return res;
    });
  }
}

export default new PushNotificationService();
