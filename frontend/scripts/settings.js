const PORT = process.env.PORT || 3000;

async function loadUserSettings() {
    try {
        // const load = await fetch("/pages/settings", { credentials: "include" });
        const load = await fetch(`http://localhost:${PORT}/settings`, {
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

/**
 * Prevents settings form from being submitted unless the correct information is provided. I found this on https://developer.mozilla.org/
 * @author MDN contributors
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
const settingsForm = document.getElementById("settingsForm");
settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent post if their password(s) is/are incorrect

    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("emailInput").value;

    try {
        const res = await fetch(`http://localhost:${PORT}/settings/update`, {
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
            alert(data.error);
            return;
        }

        alert("Settings updated.");
        window.location.reload();
    } catch (err) {
        alert("Unexpected error occurred.");
        console.error(err);
    }
});
