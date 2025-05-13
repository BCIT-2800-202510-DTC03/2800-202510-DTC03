console.log("Start");

function openSidebar() {
    console.log("Open");

    const sidebar = document.getElementById("sidebar-overlay");
    sidebar.style.animation = "applyOverlay 1s normal";
    sidebar.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    sidebar.style.display = "flex";

    setTimeout(() => {
        sidebar.style.display = "flex";
    }, 300)

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
    }, 600)

    const navbar = document.getElementById("sidebar");
    navbar.style.animation = "closeSidebar 1s normal";
    navbar.style.translate = "-250px";

}