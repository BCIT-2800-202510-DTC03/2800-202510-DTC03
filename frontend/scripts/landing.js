import { currentFrontEndUrl } from '../util.js';

document.getElementById('CTA_button').addEventListener("click", () => {
    window.location.href = `${currentFrontEndUrl}/pages/login.html`
    console.log("CTA button clicked");
})