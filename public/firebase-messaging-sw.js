// Firebase Service Worker for background push notifications
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Firebase Configuration (Compat Mode)
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
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    const notificationTitle = payload.notification?.title || payload.data?.title || 'Top Briefing News Update';
    const targetUrl = payload.data?.url || payload.fcmOptions?.link || payload.notification?.click_action || 'https://topbriefing.in';

    let iconUrl = payload.notification?.icon || payload.data?.icon || 'https://topbriefing.in/logo.png';
    if (iconUrl.startsWith('/')) {
      iconUrl = 'https://topbriefing.in' + iconUrl;
    }

    let imageUrl = payload.notification?.image || payload.data?.image || payload.notification?.imageUrl || null;
    if (imageUrl && imageUrl.startsWith('http://')) {
      imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
    }

    const notificationOptions = {
      body: payload.notification?.body || payload.data?.body || 'Read the latest breaking story on Top Briefing.',
      icon: iconUrl,
      image: imageUrl,
      badge: 'https://topbriefing.in/logo.png',
      vibrate: [200, 100, 200],
      tag: payload.data?.newsId ? `news-${payload.data.newsId}` : 'topbriefing-news',
      renotify: true,
      data: {
        url: targetUrl
      }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.error('[firebase-messaging-sw.js] Firebase initialization error:', e);
}

// Service Worker Install & Activate lifecycle
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
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

