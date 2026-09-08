const LIVE_API_URL = 'https://bakendtopbrefing.vercel.app'; // Production backend URL

export const getBaseApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    if (typeof window !== 'undefined' && window.location && window.location.hostname) {
        const hostname = window.location.hostname;
        // Live production domain or Vercel deployments
        if (hostname.includes('topbriefing') || hostname.endsWith('.vercel.app')) {
            return LIVE_API_URL;
        }
        // Local network LAN testing (e.g., 192.168.29.102 or 10.x.x.x)
        if (
            /^192\.168\.\d+\.\d+$/.test(hostname) ||
            /^10\.\d+\.\d+\.\d+$/.test(hostname) ||
            /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+$/.test(hostname)
        ) {
            const protocol = window.location.protocol;
            return `${protocol}//${hostname}:5001`;
        }
    }
    return 'http://localhost:5001';
};

export const base_api_url = getBaseApiUrl();