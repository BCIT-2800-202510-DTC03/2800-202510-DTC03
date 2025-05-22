import { insertGarden } from "./garden.js";

const addBtn = document.getElementById("add-goal-tasks-btn");
const overlay = document.getElementById("task-overlay");
const goalPanel = document.getElementById("goal-panel");
const closeOverlay = document.getElementById("close-overlay");
const filterGoals = document.getElementById("filter-goals");
const taskItems = document.getElementById("task-items");
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
                case "greenerEating":
                    return "Greener Eating";
                case "transportation":
                    return "Transportation";
                case "wasteReduction":
                    return "Waste Reduction";
                case "resourceConservation":
                    return "Resource Conservation";
                case "consciousConsumption":
                    return "Conscious Consumption";
                default:
                    return category.charAt(0).toUpperCase() + category.slice(1);
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
                allTasks.push({ ...task, sunPoints: 5 });

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
                    await addTaskToUser(task.description, task.category);
                    addTaskToHome(task.description, task.category);
                });

                taskContainer.appendChild(taskDesc);
                taskContainer.appendChild(addButton);
                categoryDiv.appendChild(taskContainer);
            });
            goalPanel.appendChild(categoryDiv);
        }
        isLoaded = true;
    }
});

// Add task to homepage UI
function addTaskToHome(taskText, category) {
    const template = document.getElementById("task-template");
    const taskElement = template.content.cloneNode(true);

    const taskDiv = taskElement.querySelector(".task");
    taskDiv.dataset.category = category;
    taskDiv.querySelector(".task-text").textContent = taskText;

    userTasks.push({ text: taskText, category });

    taskItems.appendChild(taskElement);
}

// Check User current tasks
// async function fetchUserTask() {
//     try {
//         const response = await fetch("http://localhost:3000/userTask/get", {
//             method: "GET",
//             credentials: "include",
//         });

//         if (!response.ok) {
//             throw new Error("Failed to get user tasks");
//         }

//         const data = await response.json();
//         return data
//             .filter(task => task.taskId && !task.completed)
//             .map(task => task.taskId);
//     } catch (error) {
//         console.error("Error fetching user tasks:", error);
//         return [];
//     }
// }

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

// async function addTaskToUser(taskText, category) {
//     try {
//         const response = await fetch("http://localhost:3000/userTask/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 text: taskText,
//                 category: category,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to save task");
//         }

//         console.log("Task saved to userTask DB");
//     } catch (error) {
//         console.error("Error adding task to DB:", error);
//     }
// }

// Filter tasks shown on homepage
filterGoals.addEventListener("change", () => {
    const selected = filterGoals.value;
    taskItems.innerHTML = "";

    const filtered =
        selected === "all"
            ? userTasks
            : userTasks.filter((t) => t.category === selected);

    filtered.forEach((t) => addTaskToHome(t.text, t.category));
});

// Mark tasks completed
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkmark")) {
        const task = e.target.closest(".task");
        task.classList.add("completed");
        setTimeout(() => task.remove(), 500);
    }
});

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

    // Filter tasks to show
    const filteredTasks =
        selectedCategory === "all"
            ? allTasks
            : allTasks.filter((task) => task.category === selectedCategory);

    // Add filtered tasks to homepage
    filteredTasks.forEach((task) => {
        addTaskToHome(task.text, task.category);
    });
});

// Mark tasks completed and fade out
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("checkmark")) {
        const task = event.target.closest(".task");
        task.classList.add("completed");

        setTimeout(() => {
            task.remove();
        }, 500);
    }
});

async function loadGarden() {
    try {
        const response = await axios.get(`${backendURL}/garden/getGarden`, {
            withCredentials: true,
        });
        const gardenData = response.data;
        insertGarden(
            gardenData.fence,
            gardenData.building,
            gardenData.shelf,
            gardenData.rightObject,
            gardenData.leftObject,
            gardenData.plant1,
            gardenData.plant2,
            gardenData.plant3,
            gardenData.plant4,
            gardenData.plant5,
            gardenData.plant6
        );
        console.log("Garden data:", gardenData);
    } catch (error) {
        console.error("Problem fetching user's garden.", error);
    }
}

// async function loadGarden() {
//     const backendURLTest = "http://localhost:3000"; // waiting to be updated

//     fetch("http://localhost:3000/garden/getGarden", {
//         method: "GET",
//         credentials: "include",
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log("FETCH FROM DATABASE");
//             console.log(data);
//             insertGarden(
//                 data.fence,
//                 data.building,
//                 data.shelf,
//                 data.rightObject,
//                 data.leftObject,
//                 data.plant1,
//                 data.plant2,
//                 data.plant3,
//                 data.plant4,
//                 data.plant5,
//                 data.plant6
//             );
//         })
//         .catch((error) => console.error("Error fetching user garden:", error));

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
    await loadUserTasks();
    await loadGarden();
}

setup();
