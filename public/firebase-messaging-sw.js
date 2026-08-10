// Firebase Service Worker for background push notifications
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Default or environment configuration (compat mode)
const firebaseConfig = {
  apiKey: "AIzaSyBYKe1j7Z7i-YNcTTnffEOGWZJh-YtMEms",
  authDomain: "topbrefing.firebaseapp.com",
  projectId: "topbrefing",
  storageBucket: "topbrefing.firebasestorage.app",
  messagingSenderId: "524936329006",
  appId: "1:524936329006:web:8924a16a5f8a505789acbf"
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message: ', payload);

    const notificationTitle = payload.notification?.title || payload.data?.title || 'Top Briefing News';
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.body || 'New article published!',
      icon: payload.notification?.icon || payload.data?.icon || '/favicon.ico',
      image: payload.notification?.image || payload.data?.image || null,
      badge: '/favicon.ico',
      data: {
        url: payload.data?.url || payload.fcmOptions?.link || '/'
      }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.error('[firebase-messaging-sw.js] Initialization error:', e);
}

// Notification click event handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
