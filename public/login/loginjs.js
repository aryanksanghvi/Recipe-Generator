const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login_form');
  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    // Send a POST request to the server with login credentials
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });
    const data = await response.json();
    if (response.ok) {
      // Authentication successful, redirect the user to the home page
      window.location.href = './home/home.html';
    } else {
      // Authentication failed, display error message to the user
      alert(data.message);
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function () {
  const textElement = document.getElementById('typing-text');
  const text = textElement.innerText;
  textElement.innerText = ''; // Clear text content
  let index = 0;
  let isTyping = true;

  function typeText() {
    if (index < text.length && isTyping) {
      textElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 50); // Adjust typing speed here (in milliseconds)
    } else {
      isTyping = false;
      setTimeout(eraseText, 3000); // Wait 1 second before erasing
    }
  }

  function eraseText() {
    if (index >= 0 && !isTyping) {
      const newText = text.substring(0, index - 1);
      textElement.textContent = newText;
      index--;
      setTimeout(eraseText, 50); // Adjust erasing speed here (in milliseconds)
    } else {
      isTyping = true;
      setTimeout(typeText, 1000); // Wait 1 second before typing again
    }
  }
  typeText(); // Start typing initially
});
function redirectToHomePage() {
  window.location.href = "../home/home.html";
}
