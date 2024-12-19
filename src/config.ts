export const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
export const SOCKET_URL = `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`;
export const API_BASE_URL = "https://finnhub.io/api/v1";
