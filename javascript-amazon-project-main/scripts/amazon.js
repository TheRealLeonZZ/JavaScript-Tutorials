import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
        <img class="product-image" src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
        ${product.name}
    </div>

    <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${
          product.rating.stars * 10
        }.png">
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
    </div>

    <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}">
        Add to Cart
    </button>
</div>
`;
});

const productsGridElement = document.querySelector(".js-products-grid");
productsGridElement.innerHTML = productsHTML;

function updateCartQuantity(cartQuantityElement) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.productQuantity;
  });

  cartQuantityElement.innerHTML = `${cartQuantity}`;
}

const allAddToCartButtons = document.querySelectorAll(".js-add-to-cart");
allAddToCartButtons.forEach((button, index) => {
  let addedToCartMsgTimeout;
  button.addEventListener("click", () => {
    if (addedToCartMsgTimeout) {
      clearTimeout(addedToCartMsgTimeout);
    }

    const { productId } = button.dataset;
    const cartQuantityElement = document.querySelector(".js-cart-quantity");
    const productQuantityElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const productQuantity = Number(productQuantityElement.value);
    const addedToCartElement = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addToCart(productId, productQuantity);
    updateCartQuantity(cartQuantityElement);

    //show added to cart
    addedToCartElement.classList.add("added-to-cart-visible");
    addedToCartMsgTimeout = setTimeout(() => {
      addedToCartElement.classList.remove("added-to-cart-visible");
    }, "2000");
  }); //end click
}); //end forEach button
