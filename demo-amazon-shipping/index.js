function calculateTotal() {
  const inputElement = document.querySelector(".js-cost-input");
  let cost = Number(inputElement.value);

  if (cost <= 0 || isNaN(cost)) {
    document.querySelector(".js-total-cost").innerHTML =
      "<p style='color: red;'>Error: cost cannot be less than 0$</p>";
    return;
  }

  if (cost < 40) {
    cost += 10;
  }
  document.querySelector(".js-total-cost").innerHTML =
    "Total cost is: $" + cost;
}

function handleCostKeydown(key) {
  if (key === "Enter") {
    calculateTotal();
  }
}
