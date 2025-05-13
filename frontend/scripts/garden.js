weather = "clear"

function insertBackground() {
    const background = document.getElementById("garden-background");

    background.style.backgroundImage = "url('../assets/garden/background-" + weather + ".png')";
    
    if (background.style.backgroundImage && weather) {
        background.style.backgroundColor = "transparent";
    }

}

function insertFence(type) {
    const fence = document.getElementById("garden-fence");

    fence.style.backgroundImage = "url('../assets/garden/fence-" + type + ".png')";
    
    if (fence.style.backgroundImage || !type) {
        fence.style.backgroundColor = "transparent";
    }

}

function insertBuilding(type) {
    const building = document.getElementById("garden-building");

    building.style.backgroundImage = "url('../assets/garden/building-" + type + ".png')";
    
    if (building.style.backgroundImage && type) {
        building.style.backgroundColor = "transparent";
    }

}

function insertShelf(type) {
    const shelf = document.getElementById("garden-shelf");

    shelf.style.backgroundImage = "url('../assets/garden/shelf-" + type + ".png')";
    
    if (shelf.style.backgroundImage && type) {
        shelf.style.backgroundColor = "transparent";
    }

}

function insertObject(type, select) {
    const elementID = `garden-${select}Object`;
    const object = document.getElementById(elementID);

    object.style.backgroundImage = "url('../assets/garden/object-" + type + ".png')";
    
    if (object.style.backgroundImage && type) {
        object.style.backgroundColor = "transparent";
    }

}

function insertPlant(type, select) {
    const elementID = `#plant-${select}.garden-plant`;
    const plant = document.querySelector(elementID);

    plant.style.backgroundImage = "url('../assets/garden/plant-" + type + ".png')";
    
    if (plant.style.backgroundImage && type) {
        plant.style.backgroundColor = "transparent";
    }

}

async function setup() {
    insertBackground();
    insertFence("brown");
    insertBuilding("");
    insertShelf("brown");
    insertObject("", "right");
    insertObject("", "left");
    insertPlant("", "1")
    insertPlant("", "2")
    insertPlant("", "3")
    insertPlant("", "4")
    insertPlant("", "5")
    insertPlant("", "6")
}

setup();