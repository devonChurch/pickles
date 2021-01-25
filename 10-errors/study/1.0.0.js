// {
//     const addTwoNumbersTogether = (num1, num2) => {
//         const validateArgument = (arg, index) => {
//             if (typeof arg !== "number") {
//                 const errorMessage = `Argument ${index + 1} must be a number`;
//                 throw new TypeError(errorMessage);
//             }
//         }
//         [num1, num2].forEach(validateArgument)

//         return num1 + num2;
//     }

//     console.log(addTwoNumbersTogether(1, 2));
//     console.log(addTwoNumbersTogether());
//     console.log(addTwoNumbersTogether(5));
// }

// {
//     const requestDaysOff = (daysOff) => {
//         if (typeof daysOff !== "number") {
//             throw new TypeError("must supply a number of days off");
//         }
//         if (daysOff < 1) {
//             throw new RangeError("must apply for at least one day off");
//         }

//         return `you have requested ${daysOff} ${daysOff === 1 ? 'day' : 'days'} off`
//     }

//     console.log(requestDaysOff(1));
//     console.log(requestDaysOff(5));
//     console.log(requestDaysOff("seven"));
//     console.log(requestDaysOff(0.25));
// }

(async () => {

    // Propagation!!!

    class ServerDownError extends Error {
        constructor(id) {
            super(`request ${id} did not reach the server`);
            this.name = "ServerDownError";
            this.code = "ERR_SERVER_NOT_RUNNING"
        }
    }

    const makeRequest = (id) => {
        return new Promise((resolve, reject) => {
            const shouldError = Math.random() > 0.5;
            if (shouldError) {
                const shouldPropagate = Math.random() > 0.5;
                if (shouldPropagate) {
                    reject(new Error("something went wrong"))
                } else {
                    reject(new ServerDownError(id))
                }
            } else {
                resolve("success!")
            }
        }).catch(error => {
            console.log("*** caught error");
            if (error.code === "ERR_SERVER_NOT_RUNNING") {
                return makeRequest(id);
            } else {
                throw error;
            }
        })
    }

    try {
        const response = await makeRequest(7);
        console.log("response", response);
    } catch (error) {
        console.error(error)
    }


})()