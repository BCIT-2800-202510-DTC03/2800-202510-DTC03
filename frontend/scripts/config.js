// This checks if it is local host by whats in the URL
const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.01";

// This decides what the URL will be depending if its deployed on render or is localhost.
window.backendURL = isLocalHost
    ? "http://localhost:3000"
    : "https://two800bloomgreener.onrender.com";
