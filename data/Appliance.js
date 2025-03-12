// Import Product class from products.js
import { Product } from "./product.js";

class Appliance extends Product {
  // You can add methods or properties specific to Appliance here

  insrtructionLink;
  warrantyLink;
  constructor(productDetails) {
    super(productDetails); // call the parent constructor
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}

export default Appliance;
