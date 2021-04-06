"use strict";

// node study/3.2.0.js || echo $?

const dontSayPotato = (message) => {
    if (message === "potato") {
        process.exitCode = 1;
    }

    return process.exitCode ? (() => process.exit())() : `you said: ${message}`;
}



console.log(dontSayPotato("banana"));
console.log(dontSayPotato("apple"));
console.log(dontSayPotato("potato"));
console.log(dontSayPotato("carrot"));