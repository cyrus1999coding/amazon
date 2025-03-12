class Car {
  #brand;
  #model;

  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  // Getter methods inside the class to access private fields
  getBrand() {
    return this.#brand;
  }

  getModel() {
    return this.#model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";
    console.log(
      `${this.getBrand()} ${this.getModel()}, Speed: ${
        this.speed
      } km/h, Trunk: ${trunkStatus}`
    );
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }
    // Limit the speed to 200.
    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;
    // Limit the speed to 0.
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration = 0; // Initialize acceleration to 0

  constructor(carDetails) {
    super(carDetails); // Call the parent class constructor
    this.acceleration = carDetails.acceleration || 0; // Properly assign the acceleration
  }

  go() {
    // Increase speed by acceleration amount
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300; // Limit speed to 300
    }
  }

  openTrunk() {
    console.log("Race cars do not have a trunk");
  }

  closeTrunk() {
    console.log("Race cars do not have a trunk");
  }

  displayInfo() {
    const trunkStatus = "Race cars do not have a trunk";
    // Access parent class private fields using the public getter methods
    console.log(
      `${this.getBrand()} ${this.getModel()}, Speed: ${
        this.speed
      } km/h, Trunk: ${trunkStatus}`
    );
  }
}

// Example usage
const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});
const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
});
car1.displayInfo();
car2.displayInfo();

const raceCar1 = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});
raceCar1.displayInfo(); // Displays the car info with initial speed 0
raceCar1.go(); // Increase speed by acceleration (20)
raceCar1.displayInfo(); // Displays speed after acceleration

raceCar1.go(); // Increase speed again by acceleration (20)
raceCar1.displayInfo(); // Displays updated speed
