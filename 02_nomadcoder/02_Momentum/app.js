const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const link = document.querySelector("a");

const HEDDEN_CLASSNME = "hidden";
function onLoginSubmit(e) {
  // console.dir(loginInput)
  e.preventDefault();
  loginForm.classList.add(HEDDEN_CLASSNME);
  const username = loginInput.value;
  localStorage.setItem("username", username);
  greeting.textContent = `hello ${username}`;
  greeting.classList.remove(HEDDEN_CLASSNME);
}

loginForm.addEventListener("submit", onLoginSubmit);
