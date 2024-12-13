// Importing the needed
import {
  cart,
  removeFromCart,
  saveToStorage,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let cartSummaryHTML = " ";
cart.forEach((CartItem) => {
  const productId = CartItem.productId;

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
                 data-product-id="${matchingProduct.id}">
                Update
                </span> 
                <input class="save-quantity-input save-quantity-input-${
                  matchingProduct.id
                }" type = "numbers"> 

                <span class="save-quantity-link link-primary" data-product-id="${
                  matchingProduct.id
                }">Save</span> 
                

                <span class="delete-quantity-link js-delete-link link-primary"  data-product-id="${
                  matchingProduct.id
                }">
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

document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

//Removing the product with delete
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(
      `.cart-item-container-${productId}`
    );
    container.remove();
    checkoutNumber();
  });

  link.addEventListener("click", checkoutNumber);
});

// Making the cartnumber [Header] interactive
document.addEventListener("DOMContentLoaded", checkoutNumber);
function checkoutNumber() {
  let cartQuantity = 0;
  cart.forEach((CartItem) => {
    cartQuantity += CartItem.quantity;
  });
  // updateQuantity(productId, 0);

  let message =
    cartQuantity == 0
      ? `Checkout (<a class="return-to-home-link" href="amazon.html"> 0 item </a>)`
      : cartQuantity > 1
      ? `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items </a>)`
      : (cartQuantity = 1
          ? `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} item </a>)`
          : " ");

  document.querySelector(".js-checkout-number").innerHTML = message;
}

document.querySelectorAll(`.update-quantity-link`).forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document
      .querySelector(`.cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document
      .querySelector(`.cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");
    const newQuantity = Number(
      document.querySelector(`.save-quantity-input-${productId}`).value
    );

    document.querySelector(`.quantity-label-${productId}`).innerHTML =
      newQuantity;

    saveToStorage();
    // console.log(document.querySelector(`.cart-item-container-${productId}`));
  });
});
