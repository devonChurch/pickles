class FirstNameError extends Error {
    constructor(firstName) {
        super(`the first name of ${firstName} is not valid`);
        this.name = "FirstNameError";
        this.code = "ERR_FIRST_NAME_REQUIRED";
    }
}

const sayMyName = ({first, last}) => {
    if(!first) {
        throw new FirstNameError(first);
    }
    console.log(`${first}${last ? ` ${last}` : ''}`);
}

sayMyName({ fist: "John"})
sayMyName({ first: "Jane", last: "Doe"});
sayMyName({ last: "Smith"});