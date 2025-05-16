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

    if (type) {
        fence.style.backgroundImage = "url('../assets/garden/fence-" + type + ".png')";
    }
    
    if (fence.style.backgroundImage || !type) {
        fence.style.backgroundColor = "transparent";
    }

}

function insertBuilding(type) {
    const building = document.getElementById("garden-building");

    if (type) {
        building.style.backgroundImage = "url('../assets/garden/building-" + type + ".png')";
    }
    
    if (building.style.backgroundImage && type) {
        building.style.backgroundColor = "transparent";
    }

}

function insertShelf(type) {
    const shelf = document.getElementById("garden-shelf");

    if (type) {
        shelf.style.backgroundImage = "url('../assets/garden/shelf-" + type + ".png')";
    }

    if (shelf.style.backgroundImage && type) {
        shelf.style.backgroundColor = "transparent";
    }

}

function insertObject(type, select) {
    const elementID = `garden-${select}Object`;
    const object = document.getElementById(elementID);

    if (type) {
        object.style.backgroundImage = "url('../assets/garden/object-" + type + ".png')";
    }

    if (object.style.backgroundImage && type) {
        object.style.backgroundColor = "transparent";
    }

}

function insertPlant(type, select) {
    const elementID = `#plant-${select}.garden-plant`;
    const plant = document.querySelector(elementID);

    if (type) {
        plant.style.backgroundImage = "url('../assets/garden/plant-" + type + ".png')";
    }

    if (plant.style.backgroundImage && type) {
        plant.style.backgroundColor = "transparent";
    }

}

export function insertGarden(fence, building, shelf, rightObject, leftObject, 
                        plant1, plant2, plant3, plant4, plant5, plant6) {
    insertBackground();
    insertFence(fence);
    insertBuilding(building);
    insertShelf(shelf);
    insertObject(rightObject, "right");
    insertObject(leftObject, "left");
    insertPlant(plant1, "1")
    insertPlant(plant2, "2")
    insertPlant(plant3, "3")
    insertPlant(plant4, "4")
    insertPlant(plant5, "5")
    insertPlant(plant6, "6")
}