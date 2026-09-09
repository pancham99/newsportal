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

    // If FCM top-level notification is present, browser displays it natively. Skip manual call to avoid duplicate notification!
    if (payload.notification) {
      console.log('[firebase-messaging-sw.js] FCM notification payload present. Skipping manual showNotification to avoid duplicate notifications.');
      return;
    }

    const notificationTitle = payload.notification?.title || payload.data?.title || 'Top Briefing News Update';
    const notificationBody = payload.notification?.body || payload.data?.body || 'Read the latest breaking story on Top Briefing.';
    const targetUrl = (payload.data?.url || payload.fcmOptions?.link || 'https://www.topbriefing.in').replace('://topbriefing.in', '://www.topbriefing.in');

    const defaultLogo = 'https://www.topbriefing.in/logo-square-badge.png';

    let iconUrl = payload.notification?.icon || payload.data?.icon || defaultLogo;
    if (iconUrl && iconUrl.startsWith('/')) {
      iconUrl = (self.location?.origin || 'https://www.topbriefing.in') + iconUrl;
    } else if (iconUrl && iconUrl.includes('://topbriefing.in')) {
      iconUrl = iconUrl.replace('://topbriefing.in', '://www.topbriefing.in');
    }

    let imageUrl = payload.notification?.image || payload.notification?.imageUrl || payload.data?.image || null;
    if (imageUrl && imageUrl.startsWith('http://')) {
      imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
    }
    if (imageUrl && imageUrl.includes('://topbriefing.in')) {
      imageUrl = imageUrl.replace('://topbriefing.in', '://www.topbriefing.in');
    }

    const notificationOptions = {
      body: notificationBody,
      icon: iconUrl || defaultLogo,
      image: imageUrl,
      badge: defaultLogo,
      vibrate: [200, 100, 200],
      tag: payload.data?.newsId ? `news-${payload.data.newsId}` : `topbriefing-news`,
      renotify: true,
      data: {
        url: targetUrl
      }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
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


