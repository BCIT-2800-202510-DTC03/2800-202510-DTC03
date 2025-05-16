const editPencil = document.getElementById("edit-pencil");
const pfpOptions = document.getElementById("pfp-choices-wrap");
const buttons = document.querySelectorAll('.pfp-image-radio');
const pfp = document.getElementById("profile-picture");
const aboutMe = document.getElementById("about-me-txt");
const goalSelect = document.getElementById("goals");
const gBGElmnt = document.getElementById("garden-background");
const gGRNDElmnt = document.getElementById("garden-ground");
const gFenceElmnt = document.getElementById("garden-fence");
const gBuildElmnt = document.getElementById("garden-building");
const gShelfElmnt = document.getElementById("garden-shelf");
const gplnt1Elmnt = document.getElementById("one");
const gplnt2Elmnt = document.getElementById("two");
const gplnt3Elmnt = document.getElementById("three");
const gplnt4Elmnt = document.getElementById("four");
const gplnt5Elmnt = document.getElementById("five");
const gplnt6Elmnt = document.getElementById("six");
const gRightElmnt = document.getElementById("garden-rightObject");
const gLeftElmnt = document.getElementById("garden-leftObject");


var aboutContent;
var pfpPreference;
var userGoal;

var gardenBG;
var gardenGRND;
var gardenFence;
var gardenBuild;
var gardenShelf;
var gardenplnt1;
var gardenplnt2;
var gardenplnt3;
var gardenplnt4;
var gardenplnt5;
var gardenplnt6;
var gardenRight;
var gardenLeft;

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


async function loadUserPreferences() {
    //get information from DB
    const backendURLTest = "http://localhost:3000";
    try {
        const response = await axios.get(backendURLTest + "/user/UserInfo", {
            withCredentials: true,
        })

        const data = response.data;

        console.log("getting info!");
        aboutContent = data.aboutMe;
        pfpPreference = data.profilePicture;
        userGoal = data.goal;

        if (aboutContent) {
            aboutMe.value = aboutContent;
        }
        if (pfpPreference) {
            pfp.src = pfpPreference;
        } else {
            //update this with the default image we want to use
            pfp.src = "https://dummyimage.com/100/606c38/dadbe6";
        }

        if (userGoal) {
            goalSelect.value = userGoal;
        }
    } catch (error) {
        //replace with on screen message
        console.error("Error getting user information", error);
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

function gardenSetup() {

}

function main() {
    loadUserPreferences();
    profilePictureSetup();
    radioButtonSetup();
    aboutMetSetup();
    goalSetup();
    gardenSetup();
}


document.addEventListener("DOMContentLoaded", () => {
    main();
})