import { updateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const cartQuantity = updateCartQuantity();

  const checkoutHeaderHTML = `
  Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity}</a>)
  `;

  const checkoutHeaderElement = document.querySelector(".js-checkout-header");
  checkoutHeaderElement.innerHTML = checkoutHeaderHTML;
}
