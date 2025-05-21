let userGarden = {};
let userInventory = {};
let currentTab = "fence";
let currentPosition = "fence";


async function getGarden() {
    const backendURLTest = "http://localhost:3000"; // waiting to be updated

    await fetch("http://localhost:3000/garden/getGarden", {method: "GET", credentials: "include"})
        .then((response) => response.json())
        .then((data) => {
            console.log("GET GARDEN")
            console.log(data)
            userGarden = data;
        })
        .catch((error) => console.error("Error fetching user garden:", error));
}

async function getInventory() {
    await fetch("http://localhost:3000/garden/getInventory", {method: "GET", credentials: "include"})
        .then((response) => response.json())
        .then((data) => {
            console.log("GET INVENTORY")
            console.log(data)
            userInventory = data;
        })
        .catch((error) => console.error("Error fetching user inventory:", error));
}

async function getInventoryItems(tab, position) {
    const itemList = document.getElementById("inventory-grid");
    itemList.innerHTML = "";

    currentTab = tab;
    currentPosition = position;

    const oldTab = document.getElementsByClassName("custom-tab-active")[0];
    if (oldTab) {
        oldTab.classList.remove("custom-tab-active");
    }

    const activeTab = document.getElementById(`tab-${tab}`);
    activeTab.classList.add("custom-tab-active");

    let itemArray = [];
    switch (position) {
        case "fence": {
            itemArray = userInventory.fence;
            break;
        }
        case "building": {
            itemArray = userInventory.building;
            break;
        }
        case "shelf": {
            itemArray = userInventory.shelf;
            break;
        }
        case "object": {
            itemArray = userInventory.object;
            break;
        }
        case "plant": {
            itemArray = userInventory.plant;
            break;
        }
    }

    let currentSelect = "";
    switch (tab) {
        case "fence": {
            currentSelect = userGarden.fence;
            break;
        }
        case "building": {
            currentSelect = userGarden.building;
            break;
        }
        case "shelf": {
            currentSelect = userGarden.shelf;
            break;
        }
        case "rightObject": {
            currentSelect = userGarden.rightObject;
            break;
        }
        case "leftObject": {
            currentSelect = userGarden.leftObject;
            break;
        }
        case "plant1": {
            currentSelect = userGarden.plant1;
            break;
        }
        case "plant2": {
            currentSelect = userGarden.plant2;
            break;
        }
        case "plant3": {
            currentSelect = userGarden.plant3;
            break;
        }
        case "plant4": {
            currentSelect = userGarden.plant4;
            break;
        }
        case "plant5": {
            currentSelect = userGarden.plant5;
            break;
        }
        case "plant6": {
            currentSelect = userGarden.plant6;
            break;
        }
    }

    if (itemArray.length > 0) {
        itemArray.forEach(item => {
            // Card 
            const card = document.createElement("div");
            card.classList.add("inventory-cards");
    
            // Card Content
            //Top Section
            const top = document.createElement("div");
            top.classList.add("inventory-cards-top");
    
            let isSelected;
            isSelected = currentSelect === item.typeName;
    
            // If item is selected...
            const selected = document.createElement("p");
    
            const picture = document.createElement("img");
            picture.src = `../assets/garden/${item.position}-${item.typeName}.png`
    
            if (isSelected) {
                selected.innerText = 'SELECTED';
                selected.classList.add("inventory-selected");
    
                top.classList.add("inventory-selected-image")
                //Event Listener
                card.addEventListener("click", () => {
                    console.log("Click");
                    selectGardenItem(tab, item.typeName);
                });
            } else {
                //Event Listener
                card.addEventListener("click", () => {
                    console.log("Click");
                    selectGardenItem(tab, "none");
                });
            };
    
            top.appendChild(selected);
            top.appendChild(picture);
    
            //Bottom Section
            const name = document.createElement("p");
            name.classList.add("inventory-name");
            name.innerText = item.displayName;
            
            card.appendChild(top);
            card.appendChild(name);
    
            itemList.appendChild(card);
        });
    }
}

function selectGardenItem(position, type) {
    fetch(`http://localhost:3000/garden/selectGardenItem/${position}/${type}`, {method: "POST", credentials: "include"})
        .then((response) => {
            if (response.ok) {
                setup();
                // loadGarden();
            }
        })
        .catch((error) => console.error("Error buying decoration:", error));
}


function resizeWindow() {
    document.getElementById("custom-inventory").style.height = `${(screen.height) - 300}px`;
}

async function setup() {
    await getGarden();
    await getInventory();
    await getInventoryItems(currentTab, currentPosition);
    resizeWindow();
    window.onresize = resizeWindow;
}

setup();