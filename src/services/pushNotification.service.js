class PushNotificationService {
  get Permissions() {
    return Notification.requestPermission();
  }
}

export default new PushNotificationService();
