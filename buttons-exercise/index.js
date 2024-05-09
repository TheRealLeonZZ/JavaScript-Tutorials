// const jsButton = document.querySelector(".js-button");

// jsButton.classList.add("secondary-button");

function toggleButton(jsButton) {
  // Remove toggled class from all buttons
  const allButtons = document.querySelectorAll(".my-button");
  allButtons.forEach(function (btn) {
    btn.classList.remove("is-toggled");
  });
  if (!jsButton.classList.contains("is-toggled")) {
    jsButton.classList.add("is-toggled");
  }
}
