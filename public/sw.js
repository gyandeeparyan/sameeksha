// sw.js (Service Worker)
self.addEventListener("push", function (event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: data.tag,
    });
  });
  
  self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow("/") // Navigate to your app on notification click
    );
  });
  