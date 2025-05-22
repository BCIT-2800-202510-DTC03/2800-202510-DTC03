function AI_BTN() {
    const btn = document.getElementById("AI-task-btn");
    const popup = document.getElementById("AI-task-display")
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        popup.style.display = "flex";
    })

    document.addEventListener("click", (closeEvent) => {
        const clickedOptions = popup.contains(closeEvent.target) && closeEvent.target.id !== "AI-task-btn";
        const clickedAcceptBtn = closeEvent.target.id === "AI-accept";

        if (!clickedOptions || clickedAcceptBtn) {
            popup.style.display = "none";
        }
    })

}

AI_BTN();

