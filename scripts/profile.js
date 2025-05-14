const editPencil = document.getElementById("edit-pencil");
const pfpOptions = document.getElementById("pfp-choices-wrap");
const buttons = document.querySelectorAll('.pfp-image-radio');
const pfp = document.getElementById("profile-picture");
const aboutMe = document.getElementById("about-me-txt");
const goalSelect = document.getElementById("goals");


var aboutContent;
var pfpPreference;
var userGoal;

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


function loadUserPreferences() {
    //get stuff from DB

    if(aboutContent){
        aboutMe.value = aboutContent;
    }
    if(pfpPreference){
        pfp.src = pfpPreference;
    } else {
        //update this with the default image we want to use
        pfp.src = "https://dummyimage.com/100/606c38/dadbe6";
    }

    if (userGoal){
        goalSelect.value = userGoal;
    }
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

function aboutMetSetup() {
    aboutMe.addEventListener("input", () => {
        //update as the user types
        aboutContent = aboutMe.value;
        // console.log(aboutContent);
    })
    aboutMe.addEventListener("change", () => {
        //when user finished typing/clicks off of input: update user info
        updateUserPreference();
        // console.log(aboutContent);
    })
}

function goalSetup() {
    goalSelect.addEventListener("change", () => {
        userGoal = goalSelect.value;
        // console.log(userGoal);
    })
}



function main() {
    loadUserPreferences();
    profilePictureSetup();
    radioButtonSetup();
    aboutMetSetup();
    goalSetup();
}

main();