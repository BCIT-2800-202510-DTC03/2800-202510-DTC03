
function setUpAddListener() {
    const wrapper = document.getElementById("friend-wrapper");
    const addbtn = document.getElementById("add")
    addbtn.addEventListener("click", (event) => {
        event.stopPropagation();

        if(document.getElementById("search-friend-wrap")){
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
            <div id="search-btns">
                <button id="add-btn">Add Friend</button>
                <button id="cancel-btn">Cancel</button>
            </div>`
        wrapper.appendChild(div);
        const cancelbtn = document.getElementById("cancel-btn");
        const removeOnClick = (closeEvent) => {
            if(!div.contains(closeEvent.target)) {
                wrapper.removeChild(div);
            }
            document.removeEventListener("click", removeOnClick);
        }

        cancelbtn.addEventListener("click", () => {
            wrapper.removeChild(div);
            document.removeEventListener("click", removeOnClick);
        })

        //delay so it doesn't accidentally trigger
        setTimeout(() => {
            document.addEventListener("click", removeOnClick);
        }, 1);
    })

}


function main() {
    setUpAddListener();
}

main();