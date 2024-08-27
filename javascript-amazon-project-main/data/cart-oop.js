function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            productQuantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            productQuantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId, productQuantity) {
      let matchedItem = this.findCartItemById(productId);
      if (matchedItem) {
        matchedItem.productQuantity += productQuantity;
      } else {
        this.cartItems.push({
          productId,
          productQuantity,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    },

    findCartItemById(productId) {
      let matchedItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchedItem = cartItem;
        }
      });

      return matchedItem;
    },

    updateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.productQuantity;
      });

      return cartQuantity;
    },

    updateProductQuantity(productId, newQuantity) {
      if (newQuantity >= 0 && newQuantity < 1000) {
        let matchedItem = this.findCartItemById(productId);

        matchedItem.productQuantity = newQuantity;
        this.saveToStorage();
      } else {
        console.log("Invalid quantity to update");
      }
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchedItem = this.findCartItemById(productId);
      matchedItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
