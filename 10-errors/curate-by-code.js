const throwNewError = (ErrorType, message, code) => {
  const error = new ErrorType(message);
  error.code = code;
  throw error;
};

const multiplyByFive = (value) => {
  if (typeof value !== "number") {
    throwNewError(TypeError, "must be a number", "ERR_ARG_NOT_NUMBER");
  }
  if (value < 0) {
    throwNewError(
      RangeError,
      "must be a positive number",
      "ERR_NUMBER_NOT_POSITIVE"
    );
  }

  return value * 5;
};

const runSequence = () => {
  try {
    return multiplyByFive("-7");
  } catch (error) {
    if (error.code === "ERR_ARG_NOT_NUMBER") {
      console.error(error);
      // Do something.
      return 1;
    }
    if (error.code === "ERR_NUMBER_NOT_POSITIVE") {
      console.error(error);
      // Do someting.
      return 1;
    }
  }
};

console.log(runSequence());
