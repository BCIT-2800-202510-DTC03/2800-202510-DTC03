import { backendURL } from "../util.js";

let totalWallet = 0;
let userInventory = {};
let currentTab = "fence";

let currentItemName = "";
let currentItemCost = "";

let selectedTab = "";
let selectedItem = "";

async function getWallet() {
    const wallet = document.getElementById("wallet");
    await fetch(`${backendURL}/garden/getWallet`, {
        method: "GET",
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log("WALLET: " + data);
            totalWallet = data;
            wallet.innerHTML = `Sun Points: <span>${totalWallet}</span>`;
        })
        .catch((error) => console.error("Error fetching user wallet:", error));
}

async function getInventory() {
    await fetch(`${backendURL}/garden/getInventory`, {
        method: "GET",
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("GET INVENTORY");
            console.log(data);
            userInventory = data;
        })
        .catch((error) =>
            console.error("Error fetching user inventory:", error)
        );
}

async function getItems(tab) {
    const itemList = document.getElementById("shop-grid");
    itemList.innerHTML = "";

    currentTab = tab;

    const oldTab = document.getElementsByClassName("shop-tab-active")[0];
    console.log("TEST");
    console.log(oldTab);
    if (oldTab) {
        oldTab.classList.remove("shop-tab-active");
    }

    const activeTab = document.getElementById(`tab-${tab}`);
    activeTab.classList.add("shop-tab-active");

    fetch(`${backendURL}/garden/getShopItem/${tab}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((item) => {
                let alreadyPurchased;

                switch (tab) {
                    case "fence": {
                        (userInventory.fence || []).forEach((inventoryItem) => {
                            if (item.typeName == inventoryItem.typeName) {
                                alreadyPurchased = true;
                            }
                        });
                        break;
                    }
                    case "building": {
                        (userInventory.building || []).forEach((inventoryItem) => {
                            if (item.typeName == inventoryItem.typeName) {
                                alreadyPurchased = true;
                            }
                        });
                        break;
                    }
                    case "shelf": {
                        (userInventory.shelf || []).forEach((inventoryItem) => {
                            if (item.typeName == inventoryItem.typeName) {
                                alreadyPurchased = true;
                            }
                        });
                        break;
                    }
                    case "object": {
                        (userInventory.object || []).forEach((inventoryItem) => {
                            if (item.typeName == inventoryItem.typeName) {
                                alreadyPurchased = true;
                            }
                        });
                        break;
                    }
                    case "plant": {
                        (userInventory.plant || []).forEach((inventoryItem) => {
                            if (item.typeName == inventoryItem.typeName) {
                                alreadyPurchased = true;
                            }
                        });
                        break;
                    }
                }

                // Card
                const card = document.createElement("div");
                card.classList.add("shop-cards");

                // Card Content
                //Top Section
                const top = document.createElement("div");

                const cost = document.createElement("p");
                cost.classList.add("item-cost");
                if (totalWallet < item.cost) {
                    cost.classList.add("item-expensive");
                } else {
                    cost.classList.add("item-buyable");
                }
                cost.innerText = item.cost;

                const picture = document.createElement("img");
                picture.src = `../assets/garden/${tab}-${item.typeName}.png`;

                top.appendChild(cost);
                top.appendChild(picture);

                //Bottom Section
                const name = document.createElement("p");
                name.classList.add("item-name");

                console.log(alreadyPurchased == true);
                if (alreadyPurchased) {
                    name.innerText = "PURCHASED";
                    name.classList.add("item-purchased");
                } else {
                    name.innerText = item.displayName; //Event Listener
                    if (totalWallet >= item.cost) {
                        card.addEventListener("click", () => {
                            console.log("Click");

                            const buyButton =
                                document.getElementById("purchase-item");
                            buyButton.disabled = false;

                            const showcase =
                                document.getElementById("showcase-item");
                            showcase.style.visibility = "initial";
                            showcase.src = `../assets/garden/${tab}-${item.typeName}.png`;

                            currentItemName = item.displayName;
                            currentItemCost = item.cost;
                            selectedTab = tab;
                            selectedItem = item.typeName;
                        });
                    }
                }

                card.appendChild(top);
                card.appendChild(name);

                itemList.appendChild(card);
            });
        })
        .catch((error) => console.error("Error fetching user garden:", error));
}

function openPurchaseScreen() {
    console.log("Open");

    const purchaseName = document.getElementById("purchase-name");
    purchaseName.innerHTML = `Item Name: ${currentItemName}`;

    const purchaseCost = document.getElementById("purchase-cost");
    purchaseCost.innerHTML = `Cost: ${currentItemCost}`;

    const purchaseConfirmation = document.getElementById(
        "purchase-confirmation"
    );
    purchaseConfirmation.style.display = "flex";

    const purchaseOverlay = document.getElementById("purchase-overlay");
    purchaseOverlay.style.animation = "openPurchaseScreen 0.5s normal";
    purchaseOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    purchaseOverlay.style.display = "initial";
    let purchaseConfirm;

    if (document.getElementById("confirm-button")) {
        purchaseConfirm = document.getElementById("confirm-button")
    };
    purchaseConfirm.onclick = () => purchaseItem(selectedTab, selectedItem);
}

function closePurchaseScreen() {
    console.log("Close");

    const purchaseConfirmation = document.getElementById(
        "purchase-confirmation"
    );
    purchaseConfirmation.style.display = "none";

    const purchaseOverlay = document.getElementById("purchase-overlay");
    purchaseOverlay.style.animation = "closePurchaseScreen 0.5s normal";
    purchaseOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

    setTimeout(() => {
        purchaseOverlay.style.display = "none";
    }, 300);
}

async function purchaseItem(selectedTab, selectedItem) {
    console.log("purchaseItem function is called");
    if (!selectedTab || !selectedItem) {
        console.log("missing info", selectedTab, selectedItem);
        return;
    }
    fetch(`${backendURL}/garden/buyShopItem/${selectedTab}/${selectedItem}`, {
        method: "POST",
        credentials: "include",
    })
        .then((response) => {
            if (response.ok) {
                setup();

                const buyButton = document.getElementById("purchase-item");
                buyButton.disabled = true;

                const showcase = document.getElementById("showcase-item");
                showcase.style.visibility = "hidden";

                closePurchaseScreen();
            }
        })
        .catch((error) => console.error("Error buying decoration:", error));
}

function resizeWindow() {
    document.getElementById("shop-inventory").style.height = `${screen.height - 300
        }px`;
}

async function setup() {
    await getWallet();
    await getInventory();
    if (userInventory[currentTab]) {
        getItems(currentTab);
    }
    resizeWindow();
    window.onresize = resizeWindow;
}
setup();

window.getItems = getItems;
window.openPurchaseScreen = openPurchaseScreen;
window.closePurchaseScreen = closePurchaseScreen;