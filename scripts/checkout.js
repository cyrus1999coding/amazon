import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import "../data/backend-practice.js";
// import "../data/cart-class.js";
// import "../data/car.js";

async function loadPage() {
  try {
    // throw "error1";

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw "error2";
      loadCart(() => {
        // reject("error3");
        resolve("value 3");
      });
    });
  } catch (error) {
    console.log("Unexpected error, Please try again later");
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPage();

// async function outerFunction() {
//   console.log('hello');

//   function innerFunction() {
//     await loadProductsFetch()
//   }
// }

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then((values) => {
//   console.log(values);
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// });

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value 1");
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
*/

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
//   });
// });
