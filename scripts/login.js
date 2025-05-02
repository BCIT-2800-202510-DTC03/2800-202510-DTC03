const bcrypt = require("bcrypt");

// bind the buttons to the handle functions
window.addEventListener("DOMContentLoaded", () => {
  handleLogin(); 
  handleRegister();
});

function handleLogin() {
  loginForm = document.getElementById("login_form");
  loginForm.addEventListener("submit", loginSubmit);
}
function handleRegister() {
  loginForm = document.getElementById("signup_form");
  loginForm.addEventListener("submit", signUpSubmit);
}
async function hashingPassword(password) {
    const SALT_ROUND = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    console.log(hashedPassword);
}

function loginSubmit(event) {
  event.preventDefault();

  let emailAddress = document.getElementById("input_login_id").value;
  let password = document.getElementById("input_login_password").value;
  password = hashingPassword(password);
  // ! login api has not been established
  // hashing before wrapping the request body
  // try {
  //     const response = await fetch("/user/login", {
  //     })
  // }
}
function signUpSubmit(event) {
  event.preventDefault();

  let emailAddress = document.getElementById("input_login_id").value;
  let password = document.getElementById("input_login_password").value;
  password = hashingPassword(password);

}
