import { backendURL } from "../util.js";

function SetupListeners(){
    const form = document.getElementById("error-form");
    form.addEventListener("submit", sendReport);
}

async function sendReport(event) {
    event.preventDefault();
    const form = document.getElementById("error-form");
    const reportData = new FormData(form);

    const report = {};
    reportData.forEach((value, key) => {
        report[key] = value;
    })

    console.log(report);

    try{
        const response = await axios.post(backendURL + `/error/sendReport`, 
            report, 
            {
            withCredentials: true,
        })
         if(response.status === 200){
            console.log(response.data);
         }
    } catch(error){
        console.error("Error sending report:", error);
    }

}

function main(){
    SetupListeners();
}

main();