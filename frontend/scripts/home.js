const addBtn = document.getElementById("add-goal-tasks-btn");
const overlay = document.getElementById("task-overlay");
const goalPanel = document.getElementById("goal-panel");
const closeOverlay = document.getElementById("close-overlay");
const filterGoals = document.getElementById("filter-goals");
const taskItems = document.getElementById("task-items");

let isLoaded = false;
let allTasks = []; // Will store all tasks with their category

// Open overlay and load tasks if not loaded
addBtn.addEventListener("click", async () => {
    overlay.style.display = "flex";

    if (!isLoaded) {
        try {
            const response = await fetch("http://localhost:3000/task");
            const goals = await response.json();

            for (const [category, tasks] of Object.entries(goals)) {
                const categoryDiv = document.createElement("div");
                categoryDiv.classList.add("goal");

                const title = document.createElement("h3");
                title.textContent = category;
                categoryDiv.appendChild(title);

                tasks.forEach(task => {
                    // Store task with category for filtering later
                    allTasks.push({ ...task, category });

                    const taskContainer = document.createElement("div");
                    taskContainer.style.display = "flex";
                    taskContainer.style.alignItems = "center";
                    taskContainer.style.marginBottom = "8px";

                    const addBtn = document.createElement("button");
                    addBtn.classList.add("add-goal-task");
                    addBtn.textContent = `+ Add "${task.text}"`;
                    addBtn.setAttribute("data-task", task.text);
                    addBtn.setAttribute("data-points", task.sunPoints);

                    addBtn.addEventListener("click", () => {
                        addTaskToHome(task.text, task.sunPoints, category);
                    });

                    const taskText = document.createElement("span");
                    taskText.textContent = `${task.text} (${task.sunPoints}☀)`;
                    taskText.style.marginLeft = "8px";

                    taskContainer.appendChild(addBtn);
                    taskContainer.appendChild(taskText);
                    categoryDiv.appendChild(taskContainer);
                });

                goalPanel.appendChild(categoryDiv);
            }

            isLoaded = true;
        } catch (err) {
            console.error("Failed to load goals/tasks", err);
        }
    }
});

// Add task to homepage list with category info stored as attribute
function addTaskToHome(taskText, sunPoints, category) {
    const template = document.getElementById("task-template");
    const taskElement = template.content.cloneNode(true);

    const taskDiv = taskElement.querySelector("#task");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-category", category);
    taskDiv.querySelector("#task-text").textContent = taskText;
    taskDiv.querySelector("#sun-value").textContent = sunPoints;
    
    document.getElementById("task-items").appendChild(taskElement);
}



// Filter tasks on homepage based on category select
filterGoals.addEventListener("change", () => {
    const selectedCategory = filterGoals.value;

    // Clear current tasks on homepage
    taskItems.innerHTML = "";

    // Filter tasks to show
    const filteredTasks = selectedCategory === "all"
        ? allTasks
        : allTasks.filter(task => task.category === selectedCategory);

    // Add filtered tasks to homepage
    filteredTasks.forEach(task => {
        addTaskToHome(task.text, task.sunPoints, task.category);
    });
});

// Mark tasks completed and fade out
document.addEventListener("click", (event) => {
    if (event.target.id === "checkmark") {
        const task = event.target.closest(".task");
        task.classList.add("completed");

        setTimeout(() => {
            task.remove();
        }, 500);
    }
});

// Close overlay
closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
});
