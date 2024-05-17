export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      productQuantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      productQuantity: 1,
    },
  ];
}

export function findCartItemById(productId) {
  let matchedItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchedItem = cartItem;
    }
  });

  return matchedItem;
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, productQuantity) {
  let matchingItem = findCartItemById(productId);
  if (matchingItem) {
    matchingItem.productQuantity += productQuantity;
  } else {
    cart.push({
      productId,
      productQuantity,
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.productQuantity;
  });

  return cartQuantity;
}

export function updateProductQuantity(productId, newQuantity) {
  if (newQuantity >= 0 && newQuantity < 1000) {
    let matchedItem = findCartItemById(productId);

    matchedItem.productQuantity = newQuantity;
    saveToStorage();
  } else {
    console.log("Invalid quantity to update");
  }
}
