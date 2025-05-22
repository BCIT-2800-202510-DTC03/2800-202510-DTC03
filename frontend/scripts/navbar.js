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


async function navbarLogout() {
    const logoutNav = document.getElementById("logout-nav");
    logoutNav.addEventListener("click", async () => {
        try {
            await axios.post(
                `${backendURL}/user/logout`,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log("Logged out.");
                window.location.replace("/frontend/pages/login.html");
            }
        } catch (error) {
            console.error("Error logging out: ", error);
            alert("Could not log out. Please try again.");
        }
    });
}

