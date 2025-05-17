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

                // card.addEventListener();

                itemList.appendChild(card);
            });
        })
        .catch((error) => console.error("Error fetching user garden:", error));
    
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