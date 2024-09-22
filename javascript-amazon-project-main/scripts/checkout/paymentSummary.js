import { cart, updateCartQuantity } from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const matchingProduct = getProductById(cartItem.productId);
    const matchingDeliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);

    productPriceCents += matchingProduct.priceCents * cartItem.productQuantity;
    shippingPriceCents += matchingDeliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const cartQuantity = updateCartQuantity();

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary
    js-place-order">
    Place your order
    </button>`;

  const paymentSummaryElement = document.querySelector(".js-payment-summary");
  paymentSummaryElement.innerHTML = paymentSummaryHTML;

  document.querySelector(".js-place-order").addEventListener("click", async () => {
    const response = await fetch("https://supersimplebackend.dev/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
      body: JSON.stringify({
        cart: cart,
      }),
    });

    const order = await response.json();
    console.log(order);
  });
}
