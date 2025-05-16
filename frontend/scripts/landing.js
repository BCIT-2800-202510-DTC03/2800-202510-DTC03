import { DEPLOYED_FRONTEND_URL } from '../util.js';

document.getElementById('CTA_button').addEventListener("click", () => {
    window.location.href = `${DEPLOYED_FRONTEND_URL}/pages/login.html`
    console.log("CTA button clicked");
})