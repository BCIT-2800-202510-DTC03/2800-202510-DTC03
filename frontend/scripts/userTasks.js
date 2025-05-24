/* global axios */
import { backendURL } from "../util.js";

export async function loadUserTasks() {
    console.log("Is load user tasks being called?");
    try {
        const tasks = await fetchUserTasks();

        if (!Array.isArray(tasks)) {
            console.error("Expected array but got this instead:", tasks);
            return;
        }
        const taskItems = document.getElementById("task-items");
        taskItems.innerHTML = "";

        console.log("Tasks:", tasks);
        const alreadyAdded = new Set();
        tasks.forEach((task) => {
            console.log("Rendering task:", task);

            addTaskToList(task, alreadyAdded, taskItems);
        });
    } catch (error) {
        console.error("Failed to load user tasks: ", error);
    }
}

async function fetchUserTasks() {
    try {
        const response = await axios.get(`${backendURL}/userTasks`, {
            withCredentials: true,
        });
        console.log("Fetched tasks from DB:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        return []; // Return empty array just in case forEach doesn't return any
    }
}

function addTaskToList(task, alreadyAddedTask, taskItems) {
    // Prevent duplicates
    if (alreadyAddedTask.has(task.description)) {
        return;
    }
    alreadyAddedTask.add(task.description);

    const taskElement = renderTask(task);
    taskItems.appendChild(taskElement);
}

function renderTask(task) {
    const taskTemplate = document.getElementById("task-template");
    const taskCard = taskTemplate.content.cloneNode(true);

    const taskContainer = taskCard.querySelector("#task-container");
    // set data-category property in taskContainer for querying later or grouping
    taskContainer.dataset.category = task.category;
    if (task.completed) {
        taskContainer.classList.add("completed-task");
    }

    taskContainer.querySelector(".task-text").textContent = task.description;
    taskContainer.querySelector(".sun-value").textContent = task.worth;

    return taskCard;
}
