function showNotifications(tasks) {
    const notificationBanner = document.getElementById("notification-banner");
    notificationBanner.innerHTML = "";

    tasks.forEach((task) => {
        const notification = document.createElement("div");
        notification.className = "notification";

        const label = document.createElement("label");
        label.textContent = task.name;

        const description = document.createElement("p");
        description.textContent = task.description || "No description added.";

        const dueDate = document.createElement("p");
        dueDate.textContent = `Notified at: ${new Date(
            task.notifyAt
        ).toLocaleString()}`;

        const dismissBtn = document.createElement("button");
        dismissBtn.textContent = "X";
        dismissBtn.onclick = () => notification.remove();

        for (let element of [label, description, dueDate, dismissBtn]) {
            notification.appendChild(element);
        }
        notificationBanner.style.display = "block";
    });
}
