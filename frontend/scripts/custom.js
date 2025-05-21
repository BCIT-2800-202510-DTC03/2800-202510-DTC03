let userGarden = {};
let userInventory = {};
let currentTab = "fence";
let currentPosition = "fence";


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
    console.log("TEST");
    console.log(oldTab);
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

    itemArray.forEach(item => {
        // Card 
        const card = document.createElement("div");
        card.classList.add("inventory-cards");

        // Card Content
        //Top Section
        const top = document.createElement("div");

        let isSelected;

        // If item is selected...
        const selected = document.createElement("p");
        if (isSelected) {
            selected.innerText = 'SELECTED';
            selected.classList.add("inventory-selected");
        } else {
            //Event Listener
            card.addEventListener("click", () => {
                console.log("Click");
            });
        };

        const picture = document.createElement("img");
        picture.src = `../assets/garden/${item.position}-${item.typeName}.png`

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

async function setup() {
    await getInventory();
    await getInventoryItems(currentTab, currentPosition);
}

setup();