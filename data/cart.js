export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, selectorValue) {
  let matchingItem;
  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: Number(selectorValue.value),
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  //   cart.forEach((cartItem) => {
  //     if (cartItem.productId === productId) {
  //       cart.remove(cartItem);
  //     }
  //   });

  const newCart = [];
  cart.forEach((CartItem) => {
    if (CartItem.productId !== productId) {
      newCart.push(CartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(cartQuantity) {
  cartQuantity = 0;
  cart.forEach((CartItem) => {
    cartQuantity += CartItem.quantity;
  });
  return cartQuantity;
}

// export function updateQuantity(productId, newQuantity) {
//   let cartQuantity = 0;
//   cart.forEach((CartItem) => {
//     if (CartItem.productId === productId) {
//       cartQuantity += newQuantity;
//     }
//   });
//   return cartQuantity;
// }
