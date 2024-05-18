import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateProductQuantity,
  findCartItemById,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProductById } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOptionById,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
  renderCheckoutHeader();

  function updateQuantityKeyDown(event, productId) {
    if (event.key === "Enter") {
      updateNewQuantity(productId);
    }
  }

  function updateNewQuantity(productId) {
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    const cartItemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    const cartItem = findCartItemById(productId);
    updateProductQuantity(cartItem.productId, newQuantity);
    quantityLabel.innerHTML = `${cartItem.productQuantity}`;
    cartItemContainer.classList.remove("is-editing-quantity");
    renderPaymentSummary();
    renderCheckoutHeader();
  }

  let orderSummaryHTML = "";

  cart.forEach((cartItem) => {
    const cartProductId = cartItem.productId;
    const matchingProduct = getProductById(cartProductId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOptionById(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    orderSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">
  
        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${
                matchingProduct.id
              }">${cartItem.productQuantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-quantity-link" data-product-id=${
              matchingProduct.id
            }>
              Update
            </span>
            <input class="quantity-input js-quantity-input-${
              matchingProduct.id
            }">
            <span class="save-quantity-link link-primary js-save-link" data-product-id=${
              matchingProduct.id
            }>Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
              matchingProduct.id
            }>
              Delete
            </span>
          </div>
        </div>
  
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
      `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${
        matchingProduct.id
      }" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${
        isChecked ? "checked" : ""
      } class="delivery-option-input" name="delivery-option-${
        matchingProduct.id
      }">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
      `;
    });

    return html;
  }

  const orderSummaryElement = document.querySelector(".js-order-summary");
  orderSummaryElement.innerHTML = orderSummaryHTML;

  const allDeleteLinks = document.querySelectorAll(".js-delete-link");
  const allQuantityLinks = document.querySelectorAll(".js-quantity-link");
  const allSaveLinks = document.querySelectorAll(".js-save-link");
  const allDeliveryOptions = document.querySelectorAll(".js-delivery-option");

  allDeleteLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  allQuantityLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const cartItemContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartItemContainer.classList.add("is-editing-quantity");
    });
  });

  allSaveLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      updateNewQuantity(productId);
    });
  });

  // Add keyboard support for save button
  cart.forEach((cartItem) => {
    const cartProductId = cartItem.productId;
    const quantityInput = document.querySelector(
      `.js-quantity-input-${cartProductId}`
    );
    quantityInput.addEventListener("keydown", (event) => {
      updateQuantityKeyDown(event, cartProductId);
    });
  });

  allDeliveryOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
