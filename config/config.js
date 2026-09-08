const LIVE_API_URL = 'https://bakendtopbrefing.vercel.app'; // Set your live production backend URL here

const getBaseApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    if (typeof window !== 'undefined' && window.location && window.location.hostname) {
        const hostname = window.location.hostname;
        // If live production domain or vercel deployment, return LIVE_API_URL
        if (hostname.includes('topbriefing') || hostname.endsWith('.vercel.app')) {
            return LIVE_API_URL;
        }
        // Local network LAN testing (e.g., 192.168.29.102)
        if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '[::1]') {
            const protocol = window.location.protocol;
            return `${protocol}//${hostname}:5001`;
        }
    }
    return 'http://localhost:5001';
};

export const base_api_url = getBaseApiUrl();