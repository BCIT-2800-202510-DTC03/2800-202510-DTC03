/* global axios */

import { backendURL } from "../util.js";

// set up form event listener
function SetupListeners() {
    const form = document.getElementById("error-form");
    form.addEventListener("submit", sendReport);
}

async function sendReport(event) {
    //stop submit button from refreshing page
    event.preventDefault();
    const form = document.getElementById("error-form");
    //get form information as data
    const reportData = new FormData(form);

    //turn form data into an object
    const report = {};
    reportData.forEach((value, key) => {
        report[key] = value;
    });

    console.log(report);

    //send the report to backend
    try {
        const response = await axios.post(
            backendURL + `/error/sendReport`,
            report,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log(response.data);
        }
    } catch (error) {
        console.error("Error sending report:", error);
    }
}

function main() {
    SetupListeners();
}

main();
