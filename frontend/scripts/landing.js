import { DEPLOYED_FRONTEND_URL } from '../util.js';
import { currentBackEndUrl } from '../util.js'
import { currentFrontEndUrl } from '../util.js'
document.getElementById('CTA_button').addEventListener("click", () => {
    window.location.href = `${currentFrontEndUrl}/pages/login.html`
    console.log("CTA button clicked");
})