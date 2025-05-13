async function loadUserSettings() {
    try {
        const load = await fetch("/pages/settings", { credentials: "include" });
        const userData = await res.json();

        if (userData.error) {
            alert(userData.error);
            return;
        }
        const userIdInput = document.getElementById("userId");
        userIdInput.value = userData.userId;
        userIdInput.value.readOnly = true;
        document.getElementById("emailInput").value = userData.email;
    } catch (error) {
        console.error("Failed to load user settings", error);
        alert("Settings could not be loaded.");
    }
}
loadUserSettings();
