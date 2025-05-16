const addBtn = document.getElementById("add-goal-tasks-btn");
const overlay = document.getElementById("task-overlay");
const goalPanel = document.getElementById("goal-panel");
const closeOverlay = document.getElementById("close-overlay");

let isLoaded = false; //ensure tasks are not reloaded multiple times

addBtn.addEventListener("click", async () => {
    overlay.style.display = "flex";

    if (!isLoaded) {
        try {
            const response = await fetch("http://localhost:3000/task");
            const goals = await response.json();

            for (const [category, tasks] of Object.entries(goals)) {
                const categoryDiv = document.createElement("div");
                categoryDiv.classList.add("goal");

                // Heading for category
                const title = document.createElement("h3");
                title.textContent = category;
                categoryDiv.appendChild(title)

                // Tasks under each category
                tasks.forEach(task => {
                    const taskContainer = document.createElement("div");
                    taskContainer.style.display = "flex";
                    taskContainer.style.alignItems = "centre";
                    taskContainer.style.marginBottom = "8px";

                    // add button
                    const addBtn = document.createElement("button");
                    addBtn.textContent = "+";
                    addBtn.classList.add("add-goal-task");
                    addBtn.setAttribute("data-task", task.text);
                    addBtn.setAttribute("data-points", task.sunPoints);
                    addBtn.innerText = `Add "${task.text}"`;
                    addBtn.textContent = "+";

                    btn.addEventListener("click", () => {
                        addTaskToHome(task.text, task.sunPoints); // Add task to homepage
                    });

                    // Task text
                    const taskText = document.createElement("span");
                    taskText.textContent = `${task.text} (${task.sunPoints}☀)`;

                    taskContainer.appendChild(addBtn);
                    taskContainer.appendChild(taskText);
                    categoryDiv.appendChild(taskContainer);
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
