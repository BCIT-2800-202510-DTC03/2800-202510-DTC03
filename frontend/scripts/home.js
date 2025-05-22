import {insertGarden} from "./garden.js"

export async function loadGarden() {
    const backendURLTest = "http://localhost:3000"; // waiting to be updated

    await fetch("http://localhost:3000/garden/getGarden", {method: "GET", credentials: "include"})
        .then((response) => response.json())
        .then((data) => {
            console.log("FETCH FROM DATABASE");
            console.log(data);
            insertGarden(data.fence, data.building, data.shelf,
                            data.rightObject, data.leftObject,
                            data.plant1, data.plant2, data.plant3, 
                            data.plant4, data.plant5, data.plant6);
        })
        .catch((error) => console.error("Error fetching user garden:", error));
    
    
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
}


async function setup() {
    loadGarden();
}

setup();