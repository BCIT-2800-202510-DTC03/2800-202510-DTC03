
// bind the buttons to the handle functions
window.addEventListener("DOMContentLoaded", () => {
  handleLogin();
  handleRegister();
  console.log("addEventListener");
});

function handleLogin() {
  loginForm = document.getElementById("login_form");
  loginForm.addEventListener("submit", loginSubmit);
}
function handleRegister() {
  loginForm = document.getElementById("signup_form");
  loginForm.addEventListener("submit", signUpSubmit);
  console.log("handleRegister");
}

async function loginSubmit(event) {
  event.preventDefault();
  console.log("loginSubmit");

  let emailAddress = document.getElementById("input_login_id").value;
  let password = document.getElementById("input_login_password").value;
  password = await hashingPassword(password);
  // ! login api has not been established
  // hashing before wrapping the request body
  // try {
  //     const response = await fetch("/user/login", {
  //     })
  // }
}
async function signUpSubmit(event) {
  event.preventDefault();
  console.log("signUpSubmit");
  console.log("inside form");
  let emailAddress = document.getElementById("input_signup_id").value;
  let password = document.getElementById("input_signup_password").value;
  let passwordRepeat = document.getElementById(
    "input_signup_password_repeat"
  ).value;
  if (password != passwordRepeat) {
    console.log("error: password does not match");
  }
  console.log("Email:", emailAddress);
  console.log("Password:", password);

  const userData = {
    email: emailAddress,
    password: password,
  };
  const backendURLTest = "http://192.168.1.112:3000";
  try {
    const response = await axios.post(backendURLTest + "/user/register", userData);
    return response.json();
  } catch (error) {
    console.error("error:", error);
  }
}
