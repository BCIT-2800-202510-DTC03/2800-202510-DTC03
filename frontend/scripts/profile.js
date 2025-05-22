//document elements
const editPencil = document.getElementById("edit-pencil");
const pfpOptions = document.getElementById("pfp-choices-wrap");
const buttons = document.querySelectorAll(".pfp-image-radio");
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

//user info variables
var aboutContent;
var pfpPreference;
var userGoal;

//garden variables
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
    });

    document.addEventListener("click", (closeEvent) => {
        const clickedOptions = pfpOptions.contains(closeEvent.target);
        if (!clickedOptions) {
            pfpOptions.style.display = "none";
        }
    });
}

async function loadUserGoal() {
    try {
        const response = await axios.get(`${backendURL}/user/UserInfo`, {
            withCredentials: true,
        });

        const userData = response.data;

        if (userData.error) {
            alert(userData.error);
            return;
        }

        const currentGoal = document.getElementById("current-goal");
        currentGoal.value = userData.goal;
        currentGoal.value.readOnly = true;
    } catch (error) {
        console.error("Failed to load user goal", error);
        alert("Current goal could not be loaded.");
    }
}

async function updateUserPreference() {
    //send information to DB
    try {
        //get latest values
        aboutContent = aboutMe.value;
        pfpPreference = pfp.src;
        userGoal = goalSelect.value;

        const response = await axios.post(
            `${backgroundURL}/user/updateInfo`,
            {
                aboutMe: aboutContent,
                pfp: pfpPreference,
                goal: userGoal,
            },
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error updating user information", error);
    }
}

async function loadUserPreferences() {
    //get information from DB
    try {
        const response = await axios.get(`${backendURL}/user/UserInfo`, {
            withCredentials: true,
        });

        const data = response.data;
        //get all needed information
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
            pfp.src =
                "/frontend/assets/profile/material_design_account_circle.svg";
        }
    } catch (error) {
        //replace with on screen message
        console.error("Error getting user information", error);
    }
}

function radioButtonSetup() {
    buttons.forEach((btn) => {
        buttons.forEach((btn) => {
            //event listener for profile picture options
            btn.addEventListener("change", () => {
                if (btn.checked) {
                    const newImageSource = btn.value;
                    pfp.src = newImageSource;
                    pfpOptions.style.display = "none";
                    updateUserPreference();
                    const headerPfp = document.getElementById("header-profile");
                    if (headerPfp) {
                        headerPfp.style.backgroundImage = `url('${newImageSource}')`;
                    }
                }
            });
        });
    });
}

function aboutMetSetup() {
    aboutMe.addEventListener("input", () => {
        //update as the user types
        aboutContent = aboutMe.value;
        // console.log(aboutContent);
    });
    aboutMe.addEventListener("change", () => {
        //when user finished typing/clicks off of input: update user info
        updateUserPreference();
        // console.log(aboutContent);
    });
}

function goalSetup() {
    goalSelect.addEventListener("change", () => {
        const selectedGoal = goalSelect.value;
        if (selectedGoal === "Select a goal") {
            return;
        }
        userGoal = selectedGoal;

        const currentGoal = document.getElementById("current-goal");
        currentGoal.value = selectedGoal;

        updateUserPreference();
        console.log(userGoal);
    });
}

function gardenSetup() {
    //set up garden
}

function main() {
    loadUserPreferences();
    profilePictureSetup();
    radioButtonSetup();
    aboutMetSetup();
    loadUserGoal();
    goalSetup();
    gardenSetup();
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
