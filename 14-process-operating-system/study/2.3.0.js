"use strict";

// console.log({
//     uptime: process.uptime(),
//     cpuUsage: process.cpuUsage(),
//     memoryUsage: process.memoryUsage()
// });



// (async () => {
//     const doLightTask = () => new Promise(resolve => {
//         setTimeout(() => {
//             resolve()
//         }, 5000);
//     });

//     await doLightTask();

//     const uptime = process.uptime(); // in seconds
//     const totalCpuTime = (({ user, system }) => {
//         return (user + system) / 1000000; // divide by million = 1 second
//     })(process.cpuUsage())

//     console.log({
//         uptime, // 5.038322405
//         totalCpuTime // 0.043838
//     });

// })();

{
    const doHeavyTask = () => 
        new Array(10000000)
            .fill(0)
            .map(() => Math.random())
            .map((value) => Math.sqrt(value))
            .map((value) => Math.sqrt(value))
            .map((value) => Math.sqrt(value))
            .map((value) => Math.sqrt(value));

    doHeavyTask();

    const uptime = process.uptime(); // in seconds
    const totalCpuTime = (({ user, system }) => {
        return (user + system) / 1000000; // divide by million = 1 second
    })(process.cpuUsage())

    console.log({
        uptime, // 4.566902118
        totalCpuTime // 4.697572
    });
}