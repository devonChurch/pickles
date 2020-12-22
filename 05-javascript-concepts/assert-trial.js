const assert = require("assert");

// String.
assert.strictEqual("hello world", "hello world");
assert.notStrictEqual("hello", "world");

//
//
//

// Function n calls.
const tracker = new assert.CallTracker();
const myFunc = tracker.calls(() => {}, 3); // <-- number of time to call (3).

myFunc();
myFunc();
myFunc();

tracker.verify(); // Verify myFunc was called 3 times.

//
//
//

// Truthy assertions.
assert.ok(true);
assert.ok(5 * 5 === 25);
assert.ok(5 * 5 !== 52);

//
//
//

// Promise rejection.
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject("Error!"), 1000);
});
assert.rejects(myPromise);
assert.rejects(myPromise, (error) => {
  // Can also add extra assertions on the rejection Error.
  assert.strictEqual(error, "Error!");
  return true;
});

//
//
//

// Deep equal.
assert.deepStrictEqual(
  [1, 2, [3, 4], [5, [6, 7]]],
  [1, 2, [3, 4], [5, [6, 7]]]
);

assert.deepStrictEqual(
  { foo: 1, bar: { baz: 2 } },
  { foo: 1, bar: { baz: 2 } }
);
