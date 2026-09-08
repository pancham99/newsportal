const LIVE_API_URL = 'https://bakendtopbrefing.vercel.app';

export const getBaseApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    if (typeof window !== 'undefined' && window.location && window.location.hostname) {
        const hostname = window.location.hostname;

        // 1. Localhost PC testing
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
            return 'http://localhost:5001';
        }

        // 2. Local network LAN IP testing (e.g. 192.168.29.102 or 10.x.x.x)
        if (
            /^192\.168\.\d+\.\d+$/.test(hostname) ||
            /^10\.\d+\.\d+\.\d+$/.test(hostname) ||
            /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+$/.test(hostname)
        ) {
            const protocol = window.location.protocol;
            return `${protocol}//${hostname}:5001`;
        }

        // 3. Deployed production / Mobile web browsing on topbriefing.in
        return LIVE_API_URL;
    }

    // SSR / Default fallback: ALWAYS default to Live Production API on Vercel
    return LIVE_API_URL;
};

export const base_api_url = getBaseApiUrl();