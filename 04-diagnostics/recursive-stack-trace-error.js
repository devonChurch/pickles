(function foo(i) {
    if (!i) { throw new Error(`i: ${i} is not a positive number`)}
    debugger;
    foo(i - 1);
})(50)
