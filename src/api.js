// Central API base URL — reads from .env (VITE_API_URL) so it works for any environment
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
