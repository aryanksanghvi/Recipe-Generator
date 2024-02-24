const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));
// show password vala part 
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
//yaha tak

// login and signup forme shift karega

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});
document.addEventListener('DOMContentLoaded', function() {
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
      // cursorElement.style.opacity = (cursorElement.style.opacity === '0' ? '1' : '0'); // Toggle cursor opacity
      setTimeout(eraseText, 50); // Adjust erasing speed here (in milliseconds)
    } else {
      isTyping = true;
      setTimeout(typeText, 1000); // Wait 1 second before typing again
    }
  }

  typeText(); // Start typing initially
});