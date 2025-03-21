import { cart } from "../../data/cart-class.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
// import isSatSun from "../utils/day.js";
// let date = dayjs();
// console.log(isSatSun(date));

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}
    js-cart-item-container
    ">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img
        class="product-image"
        src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}
          ">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${
            matchingProduct.id
          }">
            <span>Quantity: <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"
            data-product-id="${matchingProduct.id}"  
            >
            Update
            </span>
            <input 
            class="quantity-input js-quantity-input-${matchingProduct.id}"
            type="text"
            >
            <span class="save-quantity-link link-primary js-save-quantity-link"
            data-product-id="${matchingProduct.id}"  
            >Save</span> 
            <span class="delete-quantity-link link-primary js-delete-link 
            js-delete-link-${matchingProduct.id}"
            data-product-id="${matchingProduct.id}"          
            >
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
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}
        "
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
        >
          <input
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input
          js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}
          "
          name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">
              ${dateString}  
            </div>
            <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);

      // updateCartQuantity();
      renderOrderSummary();
      renderPaymentSummary();

      renderCheckoutHeader();
    });
  });

  // function updateCartQuantity() {
  //   const cartQuantity = calculateCartQuantity();

  //   document.querySelector(
  //     ".js-return-to-home-link"
  //   ).innerHTML = `${cartQuantity} items`;
  // }
  // updateCartQuantity();

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });
  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      // Check if the input is a valid number
      if (isNaN(newQuantity)) {
        alert("Please enter a valid quantity.");
        return;
      }

      // Check if the quantity is within the allowed range
      if (newQuantity < 0 || newQuantity >= 1000) {
        alert("Quantity must be at least 0 and less than 1000.");
        return;
      }

      // Check if the quantity is an integer
      if (!Number.isInteger(newQuantity)) {
        alert("Quantity must be a whole number.");
        return;
      }

      cart.updateQuantity(productId, newQuantity);
      // updateCartQuantity();
      // document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      //   newQuantity;
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();

      renderPaymentSummary();
    });
  });
}
