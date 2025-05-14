const editPencil = document.getElementById("edit-pencil");
const pfpOptions = document.getElementById("pfp-choices-wrap");
const buttons = document.querySelectorAll('.pfp-image-radio');
const pfp = document.getElementById("profile-picture");


function profilePictureSetup() {
    editPencil.addEventListener("click", (event) => {
        //prevents triggering other event listener immediately
        event.stopPropagation();
        pfpOptions.style.display = "flex";
    })

    document.addEventListener("click", (closeEvent) => {
        const clickedOptions = pfpOptions.contains(closeEvent.target);
        if (!clickedOptions) {
            pfpOptions.style.display = "none";
        }
    })
}


function updateUserPreference() {
    //send stuff to DB
}

function radioButtonSetup() {
    buttons.forEach(btn => {
        btn.addEventListener("change", () => {
            if (btn.checked) {
                pfp.src = btn.value;
                pfpOptions.style.display = "none";
                updateUserPreference();
            }
        })
    })
}



function main() {
    profilePictureSetup();
    radioButtonSetup();
}

main();