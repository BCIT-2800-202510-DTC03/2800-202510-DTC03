import { frontendURL } from "../util.js";

document.getElementById("CTA_button").addEventListener("click", () => {
    window.location.href = `${frontendURL}/pages/login.html`;
    console.log("CTA button clicked");
});
