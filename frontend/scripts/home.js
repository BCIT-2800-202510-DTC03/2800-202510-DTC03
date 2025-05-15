function loadGarden() {
    fetch("/getGarden", {method: "GET"})
        .then((response) => response.json())
        .then((data) => {
            insertGarden(fence=data.fence, building=data.building, shelf=data.shelf,
                            rightObject=data.rightObject, leftObject=data.leftObject,
                            plant1=data.plant1, plant2=data.plant2, plant3=data.plant3, 
                            plant4=data.plant4, plant5=data.plant5, plant6=data.plant6);
        })
        .catch((error) => console.error("Error fetching user garden:", error));
}


async function setup() {
    loadGarden();
}

setup();