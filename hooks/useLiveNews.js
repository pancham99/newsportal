'use client';

import { useEffect, useRef } from 'react';
import { base_api_url } from '../config/config';

/**
 * useLiveNews — SSE se real-time news receive karta hai
 *
 * @param {Function} onNewNews - Callback: jab bhi naya news aaye, yeh function call hoga
 *                               Argument: newsItem (object)
 *
 * Usage:
 *   useLiveNews((newsItem) => {
 *     setLatestNews(prev => [newsItem, ...prev]);
 *   });
 */
const useLiveNews = (onNewNews) => {
  // useRef se EventSource ko store karte hain taaki re-render pe naya connection na bane
  const eventSourceRef = useRef(null);
  const onNewNewsRef = useRef(onNewNews);

  // Callback ref update karte rahte hain (stale closure se bachne ke liye)
  useEffect(() => {
    onNewNewsRef.current = onNewNews;
  }, [onNewNews]);

  useEffect(() => {
    // ─── SSE Connection banao ─────────────────────────────
    const sseUrl = `${base_api_url}/api/news/stream`;
    console.log('[SSE] Connecting to:', sseUrl);

    const eventSource = new EventSource(sseUrl);
    eventSourceRef.current = eventSource;

    // ─── Connection confirm hone par ─────────────────────
    eventSource.addEventListener('connected', (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log('[SSE] Connected! Client ID:', data.clientId);
      } catch {
        console.log('[SSE] Connected');
      }
    });

    // ─── Naya news aane par ──────────────────────────────
    // NOTE: 'news:active' custom event hai — onmessage se kaam nahi karta
    eventSource.addEventListener('news:active', (e) => {
      try {
        const newsItem = JSON.parse(e.data);
        console.log('[SSE] New news received:', newsItem?.title);
        onNewNewsRef.current?.(newsItem);
      } catch (err) {
        console.error('[SSE] Failed to parse news data:', err);
      }
    });

    // ─── Error handling ───────────────────────────────────
    // EventSource AUTOMATICALLY reconnect karta hai — hum sirf log karte hain
    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) {
        console.warn('[SSE] Connection closed permanently');
      } else {
        console.warn('[SSE] Connection error — browser will auto-reconnect...');
      }
    };

    // ─── Cleanup: component unmount hone par close karo ──
    return () => {
      console.log('[SSE] Closing connection...');
      eventSource.close();
    };
  }, []); // sirf ek baar — mount par connect, unmount par close
};

export default useLiveNews;
