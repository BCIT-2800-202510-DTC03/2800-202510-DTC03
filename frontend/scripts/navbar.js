// This swaps URLs depending on if we are deploying backend on render or localhost. This way we do not need to manually change all the URLs
import { backendURL } from "./config.js";

console.log("Start");

function openSidebar() {
    console.log("Open");

    const sidebar = document.getElementById("sidebar-overlay");
    sidebar.style.animation = "applyOverlay 1s normal";
    sidebar.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    sidebar.style.display = "flex";

    setTimeout(() => {
        sidebar.style.display = "flex";
    }, 300);

    const navbar = document.getElementById("sidebar");
    navbar.style.animation = "openSidebar 1s normal";
    navbar.style.translate = "0px";
}

function closeSidebar() {
    console.log("Close");

    const sidebar = document.getElementById("sidebar-overlay");
    sidebar.style.animation = "removeOverlay 1s normal";
    sidebar.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

    setTimeout(() => {
        sidebar.style.display = "none";
    }, 600);

    const navbar = document.getElementById("sidebar");
    navbar.style.animation = "closeSidebar 1s normal";
    navbar.style.translate = "-250px";
}

async function loadProfilePicture() {
    try {
        const response = await axios.get(`${backendURL}/user/UserInfo`, {
            withCredentials: true,
        });
        const data = response.data;
        const pfpUrl =
            data.profilePicture ||
            "/frontend/assets/profile/material_design_account_circle.svg";
        const headerPfp = document.getElementById("header-profile");
        if (headerPfp) {
            headerPfp.style.backgroundImage = `url('${pfpUrl}')`;
        }
    } catch (error) {
        console.error("Couldn't load profile picture: ", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProfilePicture();
});
