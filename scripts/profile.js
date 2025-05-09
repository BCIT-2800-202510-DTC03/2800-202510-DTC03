function profilePictureSetup() {
    const fileInput = document.getElementById("pfp-img");
    const pfp = document.getElementById("profile-picture");

    fileInput.addEventListener("change", (fileChange) => {
        const file = fileChange.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            pfp.src = event.target.result;
        };

        fileReader.readAsDataURL(file);
    });
}



function main() {
    profilePictureSetup();
}

main();