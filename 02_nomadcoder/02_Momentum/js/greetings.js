//second
// const loginForm = document.querySelector(".login-form");
// const textInput = loginForm.querySelector(".login-form input");
// const inputBtn = loginForm.querySelector(".login-form button");
// const greeting = document.querySelector("h1");

// const HIDDEN_CLASSNAME = "hidden";
// const USERNAEM_KEY = "username";

// function onSubmit(e) {
//   e.preventDefault();
//   const username = textInput.value;

//   if (textInput.value === "") {
//     alert("Write your name");
//   } else {
//     loginForm.classList.add(HIDDEN_CLASSNAME);
//     greeting.textContent = `Hello ${username}`;
//     greeting.classList.remove(HIDDEN_CLASSNAME);
//     localStorage.setItem(USERNAEM_KEY, username);
//   }
// }

// const savedUsername = localStorage.getItem(USERNAEM_KEY);
// // inputBtn.addEventListener("click", onSubmit);

// if (savedUsername === null) {
//   loginForm.classList.remove(HIDDEN_CLASSNAME);
//   inputBtn.addEventListener("click", onSubmit);
//   // greeting.classList.add(HIDDEN_CLASSNAME);
// } else {
//   const username = textInput.value;
//   loginForm.classList.add(HIDDEN_CLASSNAME);
//   greeting.classList.remove(HIDDEN_CLASSNAME);
//   // localStorage.setItem(USERNAEM_KEY, username);
//   greeting.textContent = `Hello ${savedUsername}`;
// }

const loginForm = document.querySelector(".login-form");
const textInput = document.querySelector("#txtInput");
const greeting = document.querySelector(".greeting");

const USERNAEM_KEY = "username";
const HIDDEN_CLASS = "hidden";

function onLoginSubmit(e) {
  e.preventDefault();
  const username = textInput.value;

  // console.log(username);
  if (username === "") {
    alert("Write your name");
  } else {
    localStorage.setItem(USERNAEM_KEY, username);
    paintGreeting(username);
  }
}

function paintGreeting(username) {
  loginForm.classList.add(HIDDEN_CLASS);
  greeting.classList.remove(HIDDEN_CLASS);
  greeting.textContent = `Hello ${username}`;
}

loginForm.addEventListener("submit", onLoginSubmit);

const savedUserName = localStorage.getItem(USERNAEM_KEY);

if (savedUserName === null) {
  // loginForm.classList.(HIDDEN_CLASS);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUserName);
}
