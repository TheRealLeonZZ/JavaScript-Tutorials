function writeNumber(textButton) {
  calculation += textButton;
  showCalculation();
}

function showCalculation() {
  document.querySelector(".calculation").innerHTML = calculation;
}

calculation = "";
