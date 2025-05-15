const addBtn = document.getElementById("add-goal-tasks-btn");
const overlay = document.getElementById("task-overlay");
const goalPanel = document.getElementById("goal-panel");
const closeOverlay = document.getElementById("close-overlay");

let isLoaded = false; //ensure tasks are not reloaded multiple times

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
                        addTaskToHome(task.text, task.sunPoints); // Add task to homepage
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

// Close overlay when button is clicked
closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
});


// Function to add task to the home page task list
function addTaskToHome(taskText, sunPoints) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <div id="task-left">
            <div id="task-text">${taskText}</div>
        </div>
        <div id="task-actions">
            <div id="sunpoints">
                <span id="sun-icon">☀</span>
                <span id="sun-value">${sunPoints}</span>
            </div>
            <div id="checkmark">✔</div>
        </div>
    `;
    document.getElementById("task-items").appendChild(taskElement);
}

document.addEventListener("click", (event) => {
    if (event.target.id === "checkmark") {
        const task = event.target.closest(".task");
        task.classList.add("completed");

        // Fade out and remove the task
        setTimeout(() => {
            task.remove();
        }, 500); // Slight delay for a smooth transition
    }
});

closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
});
