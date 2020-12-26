const capitaliseText = (text) => {
  const textType = typeof text;
  if (textType !== "string") {
    const errorMessage = `expected type "string", recieved type "${textType}"`;
    throw new TypeError(errorMessage);
  }
  const [firstLetter, ...remainingText] = text.split("");
  console.log([firstLetter.toUpperCase(), ...remainingText].join(""));
};

capitaliseText("hello world");
capitaliseText(["hello", "world"]);

const multiplyByFive = (value) => {
  if (value === 0) {
    throw new RangeError("number cannot be 0");
  }
  console.log(5 * value);
};

multiplyByFive(7);
multiplyByFive(0);
