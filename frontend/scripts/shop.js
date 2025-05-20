let totalWallet = 0;

async function getWallet() {
    const wallet = document.getElementById("wallet");

    fetch(`http://localhost:3000/garden/getWallet`, {method: "GET", credentials: "include"})
        .then((response) => response.json())    
        .then((data) => {
            totalWallet = data.currency;
            wallet.inner = `Sun Points: ${totalWallet}`;
        })
        .catch((error) => console.error("Error fetching user wallet:", error));
}

async function getItems(tab) {
    const itemList = document.getElementById("shop-grid");
    itemList.innerHTML = "";

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

                card.addEventListener("click", () => {
                    console.log("Click");

                    const showcase = document.getElementById("showcase-item");
                    showcase.style.display = "initial";
                    showcase.src = `../assets/garden/${tab}-${item.typeName}.png`;
                });

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



function resizeWindow() {
    document.getElementById("shop-inventory").style.height = `${(screen.height) - 300}px`;
}

function setup() {
    getItems("fence");
    resizeWindow();
    window.onresize = resizeWindow;
}
setup();