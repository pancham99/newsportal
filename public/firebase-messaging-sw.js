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
      body: payload.notification?.body || payload.data?.body || 'New article published on Top Briefing!',
      icon: payload.notification?.icon || payload.data?.icon || 'https://topbriefing.in/logo.png',
      image: payload.notification?.image || payload.data?.image || null,
      badge: 'https://topbriefing.in/logo.png',
      vibrate: [200, 100, 200],
      tag: payload.data?.newsId || 'news-notification',
      renotify: true,
      data: {
        url: payload.data?.url || payload.fcmOptions?.link || 'https://topbriefing.in'
      }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.error('[firebase-messaging-sw.js] Initialization error:', e);
}

// Fallback native push listener for mobile browser compatibility
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const payload = event.data.json();
    console.log('[firebase-messaging-sw.js] Native push event received:', payload);

    // If FCM SDK already handled notification object natively, skip duplicate
    if (payload.notification && payload.notification.title && !payload.data) {
      return;
    }

    const title = payload.notification?.title || payload.data?.title || 'Top Briefing News Update';
    const options = {
      body: payload.notification?.body || payload.data?.body || 'Read the latest story on Top Briefing.',
      icon: payload.notification?.icon || payload.data?.icon || 'https://topbriefing.in/logo.png',
      image: payload.notification?.image || payload.data?.image || null,
      badge: 'https://topbriefing.in/logo.png',
      vibrate: [200, 100, 200],
      tag: payload.data?.newsId || 'news-update',
      renotify: true,
      data: {
        url: payload.data?.url || payload.fcmOptions?.link || 'https://topbriefing.in'
      }
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (err) {
    console.warn('[firebase-messaging-sw.js] Failed to parse push payload:', err);
  }
});

// Notification click event handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || 'https://topbriefing.in';

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
