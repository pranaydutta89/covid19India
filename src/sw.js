self.addEventListener('push', (e) => {
    const { title, body } = e.data.json();
    self.registration.showNotification(title, {
        body,
        vibrate: [200],
    });
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients
            .matchAll({
                type: 'window',
            })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if ('focus' in client) return client.focus();
                }
                if (clients.openWindow) return clients.openWindow('/');
            })
    );
});
