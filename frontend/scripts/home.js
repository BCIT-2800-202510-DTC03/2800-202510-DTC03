const addBtn = document.getElementById("add-task-button");
const overlay = document.getElementById("task-overlay");
const goalPanel = document.getElementById("goal-panel");
const closeOverlay = document.getElementById("close-overlay");

let isLoaded = false;

addBtn.addEventListener("click", async () => {
    overlay.style.display = "flex";

    if (!isLoaded) {
        try {
            const response = await fetch('...');
            const goals = await response.json();

            for (const [goalName, tasks] of Object.entries(goals)) {
                const goalDiv = document.createElement("div");
                goalDiv.classList.add("goal");
                goalDiv.innerHTML = `<p><strong>${goalName}</strong></p>`;

                tasks.forEach(task => {
                    const btn = document.createElement("button");
                    btn.classList.add("add-goal-task");
                    btn.setAttribute("data-task", task.text);
                    btn.setAttribute("data-points", task.sunPoints);
                    btn.innerText = `Add "${task.text}"`;

                    btn.addEventListener("click", () => {
                        const taskElement = document.createElement("div");
                        taskElement.classList.add("task");
                        taskElement.innerHTML = `
                            <div id="task-left">
                                <div id="task-text">${task.text}</div>
                            </div>
                            <div id="task-actions">
                                <div id="sunpoints">
                                    <span id="sun-icon">☀</span>
                                    <span id="sun-value">${task.sunPoints}</span>
                                </div>
                                <div id="checkmark">✔</div>
                            </div>
                        `;
                        document.getElementById("task-items").appendChild(taskElement);
                    });

                    goalDiv.appendChild(btn);
                });

                goalPanel.appendChild(goalDiv);
            }

            isLoaded = true;
        } catch (err) {
            console.error("Failed to load goals/tasks", err);
        }
    }
});

closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
});
