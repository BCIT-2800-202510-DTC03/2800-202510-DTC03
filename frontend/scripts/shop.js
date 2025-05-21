let totalWallet = 0;
let currentTab = "fence";

async function getWallet() {
    const wallet = document.getElementById("wallet");

    fetch(`http://localhost:3000/garden/getWallet`, {method: "GET", credentials: "include"})
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log("WALLET: " + data.currency)
            totalWallet = data.currency;
            wallet.innerHTML = `Sun Points: <span>${totalWallet}</span>`;
        })
        .catch((error) => console.error("Error fetching user wallet:", error));
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

    fetch(`http://localhost:3000/garden/getShopItem/${tab}`, {method: "GET"})
        .then((response) => response.json())
        .then((data) => {
            console.log("FETCH FROM DATABASE");
            console.log(data);
            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("shop-cards");

                const top = document.createElement("div");

                const cost = document.createElement("p");
                cost.classList.add("item-cost");
                if (totalWallet < item.cost) {
                    cost.classList.add("item-expensive");
                } else {
                    cost.classList.add("item-buyable");
                };
                cost.innerText = item.cost;

                const picture = document.createElement("img");
                picture.src = `../assets/garden/${tab}-${item.typeName}.png`

                top.appendChild(cost);
                top.appendChild(picture);

                const name = document.createElement("p");
                name.classList.add("item-name");
                name.innerText = item.displayName;
                
                card.appendChild(top);
                card.appendChild(name);

                if (totalWallet <= item.cost) {
                    card.addEventListener("click", () => {
                        console.log("Click");

                        const buyButton = document.getElementById("purchase-item");
                        buyButton.disabled = false;

                        const showcase = document.getElementById("showcase-item");
                        showcase.style.visibility = "initial";
                        showcase.src = `../assets/garden/${tab}-${item.typeName}.png`;

                        const purchaseName = document.getElementById("purchase-name");
                        purchaseName.innerHTML = `Item Name: ${item.displayName}`

                        const purchaseCost = document.getElementById("purchase-cost");
                        purchaseCost.innerHTML = `Cost: ${item.cost}`

                        const purchaseConfirm = document.getElementById("purchase-confirm");
                        purchaseConfirm.addEventListener("click", purchaseItem(tab, item.typeName));
                    });
                };

                itemList.appendChild(card);
            });
        })
        .catch((error) => console.error("Error fetching user garden:", error));
    
}

function openPurchaseScreen() {
    console.log("Open");

    const purchaseConfirmation = document.getElementById("purchase-confirmation");
    purchaseConfirmation.style.display = "flex";
    
    const purchaseOverlay = document.getElementById("purchase-overlay");
    purchaseOverlay.style.animation = "openPurchaseScreen 0.5s normal";
    purchaseOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    purchaseOverlay.style.display = "initial";
}

function closePurchaseScreen() {
    console.log("Close");

    const purchaseConfirmation = document.getElementById("purchase-confirmation");
    purchaseConfirmation.style.display = "none";

    const purchaseOverlay = document.getElementById("purchase-overlay");
    purchaseOverlay.style.animation = "closePurchaseScreen 0.5s normal";
    purchaseOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

    setTimeout(() => {
        purchaseOverlay.style.display = "none";
    }, 300)
}

async function purchaseItem(tab, type) {
    fetch(`http://localhost:3000/garden/buyShopItem/${tab}/${type}`, {method: "POST", credentials: "include"})
        .then((response) => {
            if (response.ok) {
                getWallet();
                getItems(currentTab);
            }
        })
        .catch((error) => console.error("Error buying decoration:", error));
}


function resizeWindow() {
    document.getElementById("shop-inventory").style.height = `${(screen.height) - 300}px`;
}

function setup() {
    getWallet();
    getItems(currentTab);
    resizeWindow();
    window.onresize = resizeWindow;
}
setup();