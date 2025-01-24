// Importing the needed
import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  saveToStorage,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let cartQuantity = calculateCartQuantity();

let cartSummaryHTML = " ";

cart.forEach((CartItem) => {
  let productId = CartItem.productId;
  let productQuantity = CartItem.quantity;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  // Creating the DOM(Elements) with JS
  const header = document.querySelector(".checkout-header");

  cartSummaryHTML += `<div class="cart-item-container 
  cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
            <img
            class="product-image"
            src="${matchingProduct.image}" 
            />

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">$${formatCurrency(
              matchingProduct.priceCents
            )} 
  </div>
            <div class="product-quantity">
                <span> Quantity: <span class="quantity-label quantity-label-${
                  matchingProduct.id
                }">${CartItem.quantity}</span> </span>
                <span class="update-quantity-link update-quantity-link-${
                  matchingProduct.id
                } link-primary"
                 data-product-id="${matchingProduct.id}" >
                Update
                </span> 
                <input class="save-quantity-input save-quantity-input-${
                  matchingProduct.id
                }" type = "numbers"> 

                <span class="save-quantity-link link-primary" data-product-id="${
                  matchingProduct.id
                }" data-product-quantity = "${productQuantity}">Save</span> 
                

                <span class="delete-quantity-link js-delete-link link-primary"  data-product-id="${
                  matchingProduct.id
                }" data-product-quantity = "${productQuantity}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
            </div>
            </div>
        </div>
        </div>`;
});
//DOm for order summary
document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

//Removing the product with delete link
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const numberOfItems = link.dataset.productQuantity;

    removeFromCart(productId);
    const container = document.querySelector(
      `.cart-item-container-${productId}`
    );

    // Updating(subtracting the deleted products)
    container.remove();
    cartQuantity -= numberOfItems;

    let message = checkoutNumber(cartQuantity);
    document.querySelector(".js-checkout-number").innerHTML = message;
  });

  // link.addEventListener("click", checkoutNumber);
});
function checkoutNumber(cartQuantity) {
  let message =
    cartQuantity == 0
      ? `Checkout (<a class="return-to-home-link" href="amazon.html"> 0 item </a>)`
      : cartQuantity > 1
      ? `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items </a>)`
      : (cartQuantity = 1
          ? `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} item </a>)`
          : " ");
  return message;

  // console.log(cart);
}

//Updating header
document.addEventListener("DOMContentLoaded", updateHeader);

function updateHeader() {
  let message = checkoutNumber(cartQuantity);
  document.querySelector(".js-checkout-number").innerHTML = message;
}
//Update link
document.querySelectorAll(`.update-quantity-link`).forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document
      .querySelector(`.cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");
  });
});

//Save link
document.querySelectorAll(".save-quantity-link").forEach((link) => {
  const productId = link.dataset.productId;
  let Quantity = link.dataset.productQuantity;

  link.addEventListener("click", saveNewCart);
  document
    .querySelector(`.save-quantity-input-${productId}`)
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        saveNewCart();
      }
    });

  function saveNewCart() {
    document
      .querySelector(`.cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");
    let newQuantity = Number(
      document.querySelector(`.save-quantity-input-${productId}`).value
    );

    if (isNaN(newQuantity) || newQuantity < 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    document.querySelector(`.quantity-label-${productId}`).innerHTML =
      newQuantity;

    const cartItem = cart.find((item) => item.productId === productId);
    const oldQuantity = cartItem.quantity;
    cartItem.quantity = newQuantity;

    // cartQuantity = newQuantity - oldQuantity;
    saveToStorage();
    cartQuantity = calculateCartQuantity();
    updateHeader();
  }

  // Making the cartnumber [Header] interactive
});
