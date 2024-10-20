const _submitLogin = document.querySelector("#submit-login");
const _logoutButton = document.querySelector("#logout-button");
const _userInput = document.querySelector("#user");
const _passwordInput = document.querySelector("#password");
const _pageOverlay = document.querySelector("#page-overlay");
const _loginModal = document.querySelector(".login.modal");
const _loginIcon = document.querySelector("#login-icon");
const _loginIconImg = document.querySelector("#login-icon img");



//din momentul in care se incarca pagina , verifica daca 
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isLoggedIn") === null) {
    localStorage.setItem("isLoggedIn", "false");
  }

  if (localStorage.getItem("isLoggedIn") === "true") {
    enableInteractions();
  } else {
    updateLoginIcon();
  }
});

_loginIcon.addEventListener("click", () => {
  _loginModal.style.display = "block";
  _pageOverlay.style.display = "block";
});

_pageOverlay.addEventListener("click", () => {
  _loginModal.style.display = "none";
  _pageOverlay.style.display = "none";
});

_submitLogin.addEventListener("click", fetchLogin);

_logoutButton.addEventListener("click", logout);

function updateLoginIcon() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    if (window.location.pathname.includes("/index.html")) {
      _loginIconImg.src = "Assets/loginONHEAD.png";
    } else {
      _loginIconImg.src = "../Assets/loginONHEAD.png";
    }
  } else {
    if (window.location.pathname.includes("/index.html")) {
      _loginIconImg.src = "Assets/loginOFFHEAD.png";
    } else {
      _loginIconImg.src = "../Assets/loginOFFHEAD.png";
    }
  }
}

function enableInteractions() {
  _pageOverlay.style.display = "none";
  _loginModal.style.display = "none";
  _submitLogin.style.display = "none";
  _logoutButton.style.display = "block";
  updateLoginIcon();
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  _logoutButton.style.display = "none";
  _submitLogin.style.display = "block";
  _pageOverlay.style.display = "none";
  _loginModal.style.display = "none";
  _userInput.value = "";
  _passwordInput.value = "";
  updateLoginIcon();
}

async function fetchLogin() {
  const user = _userInput.value;
  const password = _passwordInput.value;

  try {
    const response = await fetch("https://paulghiran.com/messages/login.php", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user: user,
        password: password,
      }),
    });

    localStorage.setItem("isLoggedIn", "true");
    enableInteractions();
  } catch (error) {
    console.log(error);
    alert("User sau parola gresit/a");
  }
}
