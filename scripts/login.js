// axios.defaults.withCredentials = true;
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

  const userData = {
    email: emailAddress,
    password: password,
  };

  const backendURLTest = "http://192.168.1.112:3000"; // waiting to be updated
  try {
    const response = await axios.post(backendURLTest + "/user/login", userData);
    return response.json;
  } catch (error) {
    console.error("error:", error);
  }
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
  } else {
    console.log("Email:", emailAddress);
    console.log("Password:", password);

    const userData = {
      email: emailAddress,
      password: password,
    };
    const backendURLTest = "http://192.168.1.112:3000"; // waiting to be updated
    try {
      const response = await axios.post(
        backendURLTest + "/user/register",
        userData
      );
      return response.json;
    } catch (error) {
      console.error("error:", error);
    }
  }
}
