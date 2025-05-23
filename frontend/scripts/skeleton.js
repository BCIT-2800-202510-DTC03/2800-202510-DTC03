import { navbarLogout } from "./navbar.js";
import { loadProfilePicture } from "./navbar.js";
import { setupListeners } from "./navbar.js";

async function insertHTML(filePath, element) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            return;
        }
        const text = await response.text();

        element.innerHTML = text;
        console.log("Successfully inserted");
    } catch (err) {
        console.error(err.message);
    }
}

async function insertHeader() {
    const filePath = "../pages/text/navbar.html";
    const element = document.getElementById("placeholder-header");

    await insertHTML(filePath, element);

    requestAnimationFrame(() => {
        setupListeners();
        navbarLogout();
        loadProfilePicture();
    });
}

function setup() {
    insertHeader();
    console.log("Call profile pic");
    loadProfilePicture();
}

setup();
