const animal = {
  name: "Mamal",
  eat: function () {
    return `${this.name} is eating`;
  },
};

const createDog = (props) =>
  Object.create(animal, {
    // name: {
    //   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
    //   value: name
    // },
    ...Object.entries(props).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: { value } }),
      {}
    ),
    speak: {
      value: function () {
        return `${this.name} says woof`;
      },
    },
    metrics: {
      value: function () {
        return `${this.name} is ${this.height} tall and ${this.weight} in size`;
      },
    },
  });

const spike = createDog({ name: "Spike", height: "1.1m", weight: "31.3kg" });
console.log(spike.eat());
console.log(spike.speak());
console.log(spike.metrics());

const daisy = Object.create(spike, {
  name: { value: "Daisy" },
  run: {
    value: function () {
      return `${this.name} is running `;
    },
  },
});

console.log(daisy.eat());
console.log(daisy.speak());
console.log(daisy.metrics());
console.log(daisy.run());
