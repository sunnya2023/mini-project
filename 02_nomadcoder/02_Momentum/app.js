const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");

function onLoginSubmit(e) {
  // console.dir(loginInput)
  e.preventDefault()
  const username = loginInput.value;
  console.log(username);
}

loginForm.addEventListener("submit", onLoginSubmit);
