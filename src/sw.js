self.addEventListener('push', (e) => {
  const { title, body, tag } = e.data.json();
  self.registration.showNotification(title, {
    tag,
    body,
    vibrate: [200],
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const { tag } = event.notification;
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (tag) {
            if ('navigate' in client) {
              if (client.url.indexOf(tag) == -1) {
                client.navigate(`/${tag}?ref=notification`);
              }
            }
          }
          if ('focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          if (tag) {
            return clients.openWindow(`/${tag}?ref=notification`);
          }
          return clients.openWindow(`/?ref=notification`);
        }
      })
  );
});
