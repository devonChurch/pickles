const database = {};

const addItemToDatabase = (item) =>
  new Promise((resolve, reject) => {
    if (typeof item !== "string") {
      reject(new TypeError("item must be a string"));
    }
    setTimeout(() => {
      const totalItems = Object.entries(database).length;
      database[totalItems] = item;
      resolve(item);
    }, 1000);
  });

const getItemFromDatabase = (index) =>
  new Promise((resolve, reject) => {
    if (typeof index !== "number") {
      reject(new TypeError("index must be a number"));
    }
    if (index < 0) {
      reject(new RangeError("index must be a positive number"));
    }

    setTimeout(() => {
      const item = database[index];
      if (!item) {
        reject(new Error("item not found under index"));
      }
      resolve(item);
    }, 1000);
  });

const addSomeItems = () =>
  addItemToDatabase("Hello world!")
    .then((response) => console.log("complete", response))
    .then(() => addItemToDatabase({ foo: 1, bar: 2, baz: 3 }))
    .then((response) => console.log("complete", response))
    .then(() => addItemToDatabase("Potato =)"))
    .then((response) => console.log("complete", response))
    // .catch(error => console.error("*** error", error));

const getSomeItems = () => getItemFromDatabase(0)
  .then((response) => console.log("item", response))
  .then(() => getItemFromDatabase(1))
  .then((response) => console.log("item", response))
  .then(() => getItemFromDatabase(2))
  .then((response) => console.log("item", response))
  // .catch(error => console.error("*** error", error));

addSomeItems()
  .then(getSomeItems)
  .catch(error => console.error("*** error", error))
  .finally(() => console.log("...sequence complete!"))
