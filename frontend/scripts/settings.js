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

// Add update rendering
const settingsForm = document.getElementById("settingsForm");
settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent post if their password(s) is/are incorrect

    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("emailInput").value;

    try {
        const res = await fetch("/settings/update", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                oldPassword,
                newPassword,
                confirmPassword,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error); // 👈 show alert
            return;
        }

        alert("Settings updated.");
        window.location.reload();
    } catch (err) {
        alert("Unexpected error occurred.");
        console.error(err);
    }
});
