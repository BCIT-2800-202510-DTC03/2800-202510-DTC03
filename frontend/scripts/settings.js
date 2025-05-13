async function loadUserSettings() {
    try {
        // const load = await fetch("/pages/settings", { credentials: "include" });
        const load = await fetch("http://localhost:3000/settings", {
            credentials: "include",
        }); // Just for testing purposes locally
        const userData = await load.json();

        if (userData.error) {
            alert(userData.error);
            return;
        }
        const userIdInput = document.getElementById("userId");
        userIdInput.value = userData._id;
        userIdInput.value.readOnly = true;
        document.getElementById("emailInput").value = userData.email;
    } catch (error) {
        console.error("Failed to load user settings", error);
        alert("Settings could not be loaded.");
    }
}
loadUserSettings();
