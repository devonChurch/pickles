const getListOfItems = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([1, 2, 3, 4, 5])
        }, Math.random() * 1000)
    })
}

const throwAnError = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                new Error("its broken!")
            )
        }, Math.random() * 1000)
    })
}

(async () => {

    const items = await throwAnError()
        // .catch(getListOfItems);
        .catch(() => ([])); // default to generic empty list

    console.log("items", items);

})()
