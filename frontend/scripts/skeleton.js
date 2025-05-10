async function insertHTML(filePath, element) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            return;
        }
        const text = await response.text();
        
        element.innerHTML = text;
        console.log("Successfully inserted");
    } catch (err) {
        console.error(err.message);
    }
}

function insertHeader() {
    const filePath = "../pages/text/navbar.html";
    const element = document.getElementById("placeholder-header");

    insertHTML(filePath, element);
}


function setup() {
    insertHeader();
}

setup();