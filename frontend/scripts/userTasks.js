async function loadUserTasks() {
    try {
        const response = await axios.get(`${backendURL}/userTasks`, {
            withCredentials: true,
        });
        const userTasksData = response.data;

        if (!Array.isArray(userTasksData)) {
            console.error("Expected array but got this instead:", data);
            return;
        }
        const taskItems = document.getElementById("task-items");
        taskItems.innerHTML = "";

        console.log("Tasks:", userTasksData);
        const alreadyAddedTasks = new Set();
        userTasksData.forEach((task) => {
            // Prevent duplicates
            if (alreadyAddedTasks.has(task.description)) {
                return;
            }
            alreadyAddedTasks.add(task.description);

            const taskTemplate = document.getElementById("task-template");
            const taskCard = taskTemplate.content.cloneNode(true);

            const taskContainer = taskCard.querySelector("#task-container");
            // set data-category property in taskContainer for querying later or grouping
            taskContainer.dataset.category = task.category;
            if (task.completed) {
                taskContainer.classList.add("completed-task");
            }

            taskContainer.querySelector(".task-text").textContent =
                task.description;
            taskContainer.querySelector(".sun-value").textContent = task.worth;

            taskItems.appendChild(taskCard);
        });
    } catch (error) {
        console.error("Failed to load user tasks: ", error);
    }
}
