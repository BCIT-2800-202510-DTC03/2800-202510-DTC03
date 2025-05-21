

function setUpAddListener() {
    const wrapper = document.getElementById("friend-wrapper");
    const addbtn = document.getElementById("add")
    addbtn.addEventListener("click", (event) => {
        event.stopPropagation();

        if (document.getElementById("search-friend-wrap")) {
            return;
        }

        const div = document.createElement("div");
        div.id = "search-friend-wrap";
        div.innerHTML = `
            <h2 class="friend-title">Add Friend</h2>
            <form id="search-friend">
                <label>Enter Friends ID</label>
                <div id="search-wrap"><input placeholder="e.g. 123ABC" id="search"></div>
            </form>
            <div id="error-msg-wrap">
            <p id="errorMsg"></p>
            </div>
            <div id="search-btns">
                <button id="add-btn">Add Friend</button>
                <button id="cancel-btn">Cancel</button>
            </div>`
        wrapper.appendChild(div);
        setUpInputListener();
        const cancelbtn = document.getElementById("cancel-btn");
        const removeOnClick = (closeEvent) => {
            if (!div.contains(closeEvent.target)) {
                wrapper.removeChild(div);
            }
            document.removeEventListener("click", removeOnClick);
        }

        cancelbtn.addEventListener("click", () => {
            wrapper.removeChild(div);
            document.removeEventListener("click", removeOnClick);
        })

        const addbtn = document.getElementById("add-btn");
        addbtn.addEventListener("click", () => {
            addFriend();
        })

        //delay so it doesn't accidentally trigger
        setTimeout(() => {
            document.addEventListener("click", removeOnClick);
        }, 1);
    })

}
function setUpInputListener() {
    const searchbar = document.getElementById("search");
    searchbar.addEventListener("change", async () => {
        if (await checkForFriend(searchbar.value));
    })
}

const backendURLTest = "http://localhost:3000";

var addActive = false;

async function addFriend() {
    if (!addActive) {
        return;
    }
    const toolTip = document.getElementById("errorMsg");
    const friendId = document.getElementById("search").value;

    try {
        const response = await axios.post(backendURLTest + "/user/addFriend", {
            friendId
        },
            {
                withCredentials: true,
            })
        if (response.status === 200) {
            getFriends();
            wrapper.removeChild(document.getElementById("search-friend-wrap"));
        }
    } catch (error) {
        toolTip.style.display = "block";
        toolTip.innerText = error.response.data.error_message;
    }

}

async function getFriends() {
    try {
        const response = await axios.get(backendURLTest + "/user/getFriends", { withCredentials: true, })
        const friendsList = response.data.friends;
        const wrapper = document.getElementById("friend-body");
        wrapper.innerHTML = "";
        friendsList.forEach(async (friend) => {
            const div = document.createElement("div");
            div.className = "friend";
            div.innerHTML = await getInfo(friend);
            wrapper.appendChild(div);
        });
    } catch (error) {
    }
}


async function getInfo(friendId) {
    try {
        const response = await axios.get(backendURLTest + "/user/getInfo", {
            params: { friendId },
            withCredentials: true,
        })
        const friend = response.data;
        if (response.status === 200) {
            return `<div class="friend-main">
                    <img class="friend-pfp" src="${friend.pfp || "../assets/profile/material_design_account_circle.svg"}">
                    <h2 class="friend-name">${friend.name}</h2>
                </div>
                <hr class="divider">`
        }
    } catch (error) {
        // handle error
    }
}

async function checkForFriend(id) {
    const toolTip = document.getElementById("errorMsg");
    try {
        const response = await axios.get(backendURLTest + "/user/checkForUser", {
            params: { id },
            withCredentials: true,
        })
        if (response.status === 200) {
            toolTip.innerText = "";
            toolTip.style.display = "none";
            addActive = true;
            updateAddBtn();
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toolTip.style.display = "block";
            toolTip.innerText = error.response.data.message;
            addActive = false;
            updateAddBtn();
        } else {
            toolTip.style.display = "block";
            toolTip.innerText = "An unknown error has occurred. Please try again."
            addActive = false;
            updateAddBtn();
        }
    }

}

function updateAddBtn() {
    const addbtn = document.getElementById("add-btn");

    if (addActive) {
        addbtn.style.backgroundColor = "#606c38";
    } else {
        addbtn.style.backgroundColor = "#afafaf";
    }
}


function main() {
    setUpAddListener();
    getFriends();
}

main();