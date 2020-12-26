const multiplyByFive = (value) => {
  if (typeof value !== "number") {
    throw new TypeError();
  }
  if (value < 0) {
    throw new RangeError();
  }

  return value * 5;
};

try {
  multiplyByFive(7);
} catch (error) {
  if (error instanceof TypeError) {
    console.error("must be a number");
  }
  if (error instanceof RangeError) {
    console.error("must be a positive number");
  }
}
