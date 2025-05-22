import { insertGarden } from "./garden.js";
// import { loadUserTasks } from "./userTasks.js";

const addBtn = document.getElementById("add-goal-tasks-btn");
const overlay = document.getElementById("task-overlay");
const goalPanel = document.getElementById("goal-panel");
const closeOverlay = document.getElementById("close-overlay");
const filterGoals = document.getElementById("filter-goals");
const taskItems = document.getElementById("task-items");

const filterDropdown = document.getElementById('filter-goals');
const toggleBtn = filterDropdown.querySelector('.filter-toggle');
const menu = filterDropdown.querySelector('.dropdown-menu');
const title = filterDropdown.querySelector('.dropdown-title');
const taskCounter = document.getElementById("task-counter");
const completedTasks = document.getElementById("completed-tasks");

const premadeTask = [
    {
        category: "greenerEating",
        description: "Plan meals for tomorrow.",
    },
    {
        category: "greenerEating",
        description: "Use one ingredient close to expiring.",
    },
    {
        category: "greenerEating",
        description: "Buy one unpackaged or bulk item.",
    },
    {
        category: "greenerEating",
        description: "Avoid packaged snacks all day.",
    },
    {
        category: "greenerEating",
        description: "Cook a meal using only ingredients on hand.",
    },
    {
        category: "greenerEating",
        description: "Store one perishable item properly to extend its life.",
    },
    {
        category: "transportation",
        description: "Walk or bike for one trip.",
    },
    {
        category: "transportation",
        description: "Take public transit once today.",
    },
    {
        category: "transportation",
        description: "Skip one car trip today.",
    },
    {
        category: "transportation",
        description: "Turn off engine while waiting or parked.",
    },
    {
        category: "transportation",
        description: "Check and adjust tire pressure.",
    },
    {
        category: "transportation",
        description: "Combine two errands into one trip.",
    },
    {
        category: "wasteReduction",
        description: "Use a reusable bottle or cup today.",
    },
    {
        category: "wasteReduction",
        description: "Say no to disposable utensils or straws.",
    },
    {
        category: "wasteReduction",
        description: "Buy one item with minimal or no packaging.",
    },
    {
        category: "wasteReduction",
        description: "Separate and recycle one batch of waste.",
    },
    {
        category: "wasteReduction",
        description: "Reuse a bag, container, or jar.",
    },
    {
        category: "wasteReduction",
        description: "Compost food scraps from one meal.",
    },
    {
        category: "resourceConservation",
        description: "Turn off water while brushing teeth.",
    },
    {
        category: "resourceConservation",
        description: "Turn off lights in unused rooms.",
    },
    {
        category: "resourceConservation",
        description: "Take a shower five minutes shorter than usual.",
    },
    {
        category: "resourceConservation",
        description: "Fully fill the dishwasher before running it.",
    },
    {
        category: "resourceConservation",
        description: "Unplug or power off one unused device.",
    },
    {
        category: "consciousConsumption",
        description: "Skip one non-essential purchase today.",
    },
    {
        category: "consciousConsumption",
        description: "Find an item on your list that can be bought secondhand.",
    },
    {
        category: "consciousConsumption",
        description: "Declutter one area and donate unused items.",
    },
    {
        category: "consciousConsumption",
        description: "Borrow something instead of buying it.",
    },
];

let isLoaded = false;
let allTasks = []; // for filtering
let userTasks = []; // tasks shown on home page

console.log("home.js loaded");

// Open overlay and load premade tasks if not loaded
addBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    console.log("button is clicked");

    if (!isLoaded) {
        const groupedByCategory = premadeTask.reduce((acc, task) => {
            if (!acc[task.category]) acc[task.category] = [];
            acc[task.category].push(task);
            return acc;
        }, {});

        const formatCategory = (category) => {
            switch (category) {
                case "greenerEating": return "Greener Eating";
                case "transportation": return "Transportation";
                case "wasteReduction": return "Waste Reduction";
                case "resourceConservation": return "Resource Conservation";
                case "consciousConsumption": return "Conscious Consumption";
                default: return category.charAt(0).toUpperCase() + category.slice(1);
            }
        };

        for (const [category, tasks] of Object.entries(groupedByCategory)) {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("goal");
            categoryDiv.marginBottom = "15px";

            const title = document.createElement("h3");
            title.textContent = formatCategory(category);
            categoryDiv.appendChild(title);

            tasks.forEach((task) => {
                const isAlreadyAdded = userTasks.some(
                    (t) => t.text === task.description
                );
                if (isAlreadyAdded) return;

                const taskContainer = document.createElement("div");
                taskContainer.style.display = "flex";
                taskContainer.style.justifyContent = "space-between";
                taskContainer.style.alignItems = "center";
                taskContainer.style.marginBottom = "8px";
                taskContainer.style.gap = "10px;";

                const taskDesc = document.createElement("span");
                taskDesc.textContent = `${task.description}`;
                taskDesc.style.flex = "1";
                taskDesc.style.width = "90%";

                const addButton = document.createElement("button");
                addButton.textContent = `+`;
                addButton.classList.add("add-goal-task");
                addButton.style.width = "10%";

                addButton.addEventListener("click", async () => {
                    const alreadyExists = userTasks.find(
                        (t) => t.text === task.description
                    );
                    if (alreadyExists) {
                        if (alreadyExists.completed) {
                            console.log("Task already completed in userTasks. Skipping add.");
                            alert("Task is already completed!");
                        } else {
                            console.log("Task already exists in userTasks. Skipping add.");
                            alert("Task already exists!");
                        }
                        return;
                    }
                    await addTaskToUser(task.description, task.category);
                    addTaskToHome(task.description, task.category);
                    loadUserTasks();
                    taskContainer.remove();
                });

                taskContainer.appendChild(taskDesc);
                taskContainer.appendChild(addButton);
                categoryDiv.appendChild(taskContainer);
            });
            if (categoryDiv.children.length > 1) {
                goalPanel.appendChild(categoryDiv);
            }
        }
    }
});

// Add task to homepage UI
function addTaskToHome(taskText, category, completed = false) {
    const template = document.getElementById("task-template");
    const taskElement = template.content.cloneNode(true);

    const taskDiv = taskElement.querySelector(".task");
    taskDiv.dataset.category = category;
    taskDiv.querySelector(".task-text").textContent = taskText;

    if (completed) {
        taskDiv.classList.add("completed");
        const header = document.getElementById("completedHeader");
        if (header) header.style.display = "block";
        completedTasks.appendChild(taskElement);
    } else {
        taskItems.appendChild(taskElement);
    }

    updateTaskCounter();
    taskVisibility();
}

// puts a message for the user to add tasks when there are none stored in their database

function taskVisibility() {
    const message = document.getElementById("no-task-message");
    if (userTasks.length === 0) {
        console.log("There are no tasks saved to the user db");
        message.style.display = "block";
    } else {
        console.log("There are tasks in the users db!");
        message.style.display = "none";
    }

}

// loads user tasks
async function loadUserTasks() {
    try {
        const response = await axios.get(`${backendURL}/userTasks/`, {
            withCredentials: true,
        });

        const tasks = response.data;
        userTasks = [];

        tasks.forEach((task) => {
            const isCompleted = task.completed || false;
            addTaskToHome(task.description, task.category, isCompleted);

            userTasks.push({
                id: task._id,
                text: task.description,
                category: task.category,
                completed: isCompleted
            });
        });
    } catch (err) {
        console.error("Failed to load user tasks", err);
    }
}

// Save task to userTask collection in backend
async function addTaskToUser(description, category) {
    console.log("Posting to:", `${backendURL}/userTasks/add`);

    try {
        const response = await axios.post(
            `${backendURL}/userTasks/add`,
            { description: description, category: category },
            { withCredentials: true }
        );

        const taskData = response.data;
        console.log("Task saved to DB:", response.data);
    } catch (error) {
        console.error("Couldn't save task to DB.");
    }
}

// changes the user tasks to complete
async function completeUserTask(taskText, task, userTasks) {
    const targetTask = userTasks.find(
        t => t.text.trim().toLowerCase() === taskText.trim().toLowerCase()
    );
    if (!targetTask || !targetTask.id) {
        console.error("Task ID not found for completion");
        return;
    }
    try {
        console.log("Trying to match:", taskText);
        console.log("In userTasks:", userTasks.map(t => t.text));
        await axios.post(`${backendURL}/userTasks/complete`, {
            taskId: targetTask.id
        }, { withCredentials: true });

        // Visually mark as complete
        task.classList.add("completed");

        setTimeout(() => {
            task.remove();

            // Update local array
            const index = userTasks.findIndex(t => t.id === targetTask.id);
            if (index !== -1) {
                const completedTask = userTasks.splice(index, 1)[0];
                completedTask.completed = true;
                addTaskToHome(completedTask.text, completedTask.category, true);
            }

            taskVisibility();
        }, 500);
    } catch (err) {
        console.error("Failed to mark task complete:", err);
    }
}

// Changes what the counter says for number tasks left for user
function updateTaskCounter() {
    console.log("counter");
    const activeTasks = userTasks.filter(t => !t.completed);
    if (activeTasks.length === 1) {
        taskCounter.textContent = `${activeTasks.length} task left to do!`;
    } else {
        taskCounter.textContent = `${activeTasks.length} tasks left to do!`;
    }
}

//close overlay when clicking off
document.getElementById("task-overlay").addEventListener("click", (event) => {
    const overlayContent = document.getElementById("task-overlay-content");
    if (!overlayContent.contains(event.target)) {
        document.getElementById("task-overlay").style.display = "none";
    }
});

// Close overlay
closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
    console.log("button closed");
});

// Filter tasks on homepage based on category select
filterGoals.addEventListener("change", () => {
    const selectedCategory = filterGoals.value;

    // Clear current tasks on homepage
    taskItems.innerHTML = "";
    completedTasks.innerHTML = "";

    // Filter tasks to show
    const filteredTasks =
        selectedCategory === "all"
            ? userTasks
            : userTasks.filter((task) => task.category === selectedCategory);

    // Add filtered tasks to homepage
    filteredTasks.forEach((task) => {
        addTaskToHome(task.text, task.category, task.completed);
    });
    updateTaskCounter();
});

// Filter through the list of items
menu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        filterDropdown.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', false);
        const selected = item.dataset.value;
        taskItems.innerHTML = "";
        completedTasks.innerHTML = "";

        const filtered = selected === "all"
            ? userTasks
            : userTasks.filter(t => t.category === selected);

        filtered.forEach(task => {
            addTaskToHome(task.text, task.category, task.completed);
        });
        updateTaskCounter();
    });
});

// Open filter on click
toggleBtn.addEventListener('click', () => {
    const isOpen = filterDropdown.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
        menu.querySelector('li').focus();
    }
});

// Close dropdown if clicking outside
document.addEventListener('click', e => {
    if (!filterDropdown.contains(e.target)) {
        filterDropdown.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', false);
    }
});

// Mark tasks completed and fade out
document.addEventListener("click", (event) => {
    console.log("Task checkmark is clicked");
    const task = event.target.closest(".task");
    if (!task || task.classList.contains("completed")) return;

    const taskText = task.querySelector(".task-text").textContent;
    completeUserTask(taskText, task, userTasks);
});

export async function loadGarden() {
    const backendURLTest = "http://localhost:3000"; // waiting to be updated

    await fetch("http://localhost:3000/garden/getGarden", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
            console.log("FETCH FROM DATABASE");
            console.log(data);
            insertGarden(data.fence, data.building, data.shelf,
                data.rightObject, data.leftObject,
                data.plant1, data.plant2, data.plant3,
                data.plant4, data.plant5, data.plant6);
        })
        .catch((error) => console.error("Error fetching user garden:", error));

}
// const backendURLTest = "http://localhost:3000"; // waiting to be updated
// try {
//     const response = await axios.get(backendURLTest + "/garden/getGarden");
//     insertGarden(fence=response.data.fence, building=response.data.building, shelf=response.data.shelf,
//                     rightObject=response.data.rightObject, leftObject=response.data.leftObject,
//                     plant1=response.data.plant1, plant2=response.data.plant2, plant3=response.data.plant3, 
//                     plant4=response.data.plant4, plant5=response.data.plant5, plant6=response.data.plant6);
//     if (response.status === 200) {
//         window.location.href = "../pages/home.html";
//     }
// } catch (error) {
//     if (error.response && error.response.status === 401) {
//     gardenErrorMessage.textContent = error.response.data.error_message;
//     } else {
//     gardenErrorMessage.textContent =
//         "Something is going wrong. Please try again.";
//     }
// }

// insertGarden(fence="blue", building="tent-pink", shelf="brown",
//                     rightObject="", leftObject="",
//                     plant1="", plant2="", plant3="",
//                     plant4="tulip-orange", plant5="", plant6="");
// }

async function setup() {
    await loadUserTasks().then(updateTaskCounter);
    await loadGarden();
    taskVisibility();
}

setup();
