class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
    this.code = "CUSTOM_ERROR";
  }
}

const myFunction = (value) => {
  if (value === undefined) {
    throw new Error("must supply a value");
  }

  if (typeof value !== "number") {
    throw new TypeError("must be a number");
  }

  if (value <= 0) {
    throw RangeError("must be greater than zero");
  }

  if (value === 5) {
    throw new CustomError("the number five is unlucky!");
  }

  console.log("SUCCESS!", value);
};

const runThroughFunctionList = () => {
  try {
    //   myFunction();
    //   myFunction("seven");
    //   myFunction(0);
      myFunction(5);
    myFunction(1);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      console.error("try | error", error);
    }
  }
};

try {
  runThroughFunctionList();
} catch (error) {
  console.error("propogation | error", error);
}
