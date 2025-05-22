import { backendURL } from "../util.js";

document.getElementById("CTA_button").addEventListener("click", () => {
    window.location.href = `${backendURL}/pages/login.html`;
    console.log("CTA button clicked");
});
