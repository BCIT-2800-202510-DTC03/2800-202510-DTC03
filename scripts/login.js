// function help to switch the login/ signup form
function switchForm() {
  const toggleBtn = document.getElementById("toggle_form_btn");
  const loginForm = document.getElementById("login_form_wrapper");
  const signupForm = document.getElementById("signup_form_wrapper");

  let isLogin = true;
  toggleBtn.addEventListener("click", () => {
    isLogin = !isLogin;
    // switch between login btn & signup btn
    if (isLogin) {
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
      toggleBtn.textContent = "New User?";
    } else {
      loginForm.classList.add("hidden");
      signupForm.classList.remove("hidden");
      toggleBtn.textContent = "Already have an account?";
    }
  });
}
switchForm();

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

// login
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
//signup
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
