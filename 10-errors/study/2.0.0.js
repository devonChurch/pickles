class CannotStartWithTheLetterAError extends Error {
  constructor(value) {
    const message = `${value} cannot start with the letter "a"`;
    super(message);
    this.name = "CannotStartWithTheLetterAError";
    this.code = "CANNOT_START_WITH_LETTER_A";
  }
}

const logYourName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("must be a string!");
  }
  if (name.length > 5) {
    throw new RangeError("must be less than 5 characters!");
  }
  if (name.toLowerCase().startsWith("a")) {
      throw new CannotStartWithTheLetterAError();
  }
  console.log(`my name is ${name} =)`)
};


try {
    logYourName("Devon");
    logYourName(2);
    logYourName("Sheldon");
    logYourName("Andy");
} catch (error) {
    console.error(error);
}