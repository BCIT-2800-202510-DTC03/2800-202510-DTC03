import { frontendURL } from "../util.js";
import { backendURL } from "../util.js";

console.log("Start");

export function setupListeners() {
    const homeNav = document.getElementById("home-nav");
    if (homeNav) {
        homeNav.href = `${frontendURL}/pages/home.html`;
    }

    const shopNav = document.getElementById("shop-nav");
    if (shopNav) {
        shopNav.href = `${frontendURL}/pages/shop.html`;
    }

    const friendsNav = document.getElementById("friends-nav");
    if (friendsNav) {
        friendsNav.href = `${frontendURL}/pages/friends.html`;
    }

    const profileNav = document.getElementById("profile-nav");
    if (profileNav) {
        profileNav.href = `${frontendURL}/pages/profile.html`;
    }
    const customNav = document.getElementById("custom-nav");
    if (customNav) {
        customNav.href = `${frontendURL}/pages/custom.html`;
    }
    const settingsNav = document.getElementById("settings-nav");
    if (settingsNav) {
        settingsNav.href = `${frontendURL}/pages/settings.html`;
    }

    const logoutNav = document.getElementById("logout-nav");
    if (logoutNav) {
        logoutNav.href = `${frontendURL}/pages/login.html`;
    }

    const headerProfile = document.getElementById("header-profile");
    if (headerProfile) {
        headerProfile.onclick = () => {
            window.location.href = `${frontendURL}/pages/profile.html`;
        };
    }
}

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
window.openSidebar = openSidebar;

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
window.closeSidebar = closeSidebar;

export async function loadProfilePicture() {
    try {
        const response = await axios.get(`${backendURL}/user/UserInfo`, {
            withCredentials: true,
        });
        console.log("UserInfo response:", response.data);
        const data = response.data;
        const pfpUrl = data.profilePicture;
        // ||
        // "/frontend/assets/profile/material_design_account_circle.svg";
        const headerPfp = document.getElementById("header-profile");
        console.log("Header-pfp:", headerPfp);
        console.log("pfp url:", pfpUrl);
        if (!headerPfp) {
            return;
        }
        if (pfpUrl && pfpUrl.trim() !== "") {
            headerPfp.style.backgroundImage = `url('${pfpUrl}')`;
        } else {
            console.log(
                "No profile picture found. Using default fallback image."
            );
        }
    } catch (error) {
        console.error("Couldn't load profile picture: ", error);
    }
}

export async function navbarLogout() {
    const logoutNav = document.getElementById("logout-nav");
    if (!logoutNav) {
        console.error("Logout nav has not been found in DOM");
    }
    logoutNav.addEventListener("click", async () => {
        try {
            const response = await axios.post(
                `${backendURL}/user/logout`,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log("Logged out.");
                window.location.replace(`${frontendURL}/pages/login.html`);
            }
        } catch (error) {
            console.error("Error logging out: ", error);
            alert("Could not log out. Please try again.");
        }
    });
}
