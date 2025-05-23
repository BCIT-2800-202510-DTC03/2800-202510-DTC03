
function SetupListeners(){
    const form = document.getElementById("error-form");
    form.addEventListener("submit", sendReport);
}

function sendReport(event) {
    event.preventDefault();
    const form = document.getElementById("error-form");
    const reportData = new FormData(form);

    const report = {};
    reportData.forEach((value, key) => {
        report[key] = value;
    })

    console.log(report);

}

function main(){
    SetupListeners();
}

main();