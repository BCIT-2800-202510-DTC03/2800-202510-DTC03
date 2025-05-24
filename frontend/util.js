// This checks if it is local host by whats in the URL
const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

// This decides what the URL will be depending if its deployed on render or is localhost
export const backendURL = isLocalHost
    ? "http://localhost:3000"
    : "https://bloomgreener.onrender.com";

export const frontendURL = isLocalHost
    ? "http://localhost:5500/frontend"
    : "https://two800bloomgreener.onrender.com";
