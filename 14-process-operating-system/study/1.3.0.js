// {
//     const logUptime = () => process.stdout.write(
//         process.uptime() + "\n"
//     );

//     logUptime();

//     setTimeout(() => {
//         logUptime();
//     }, 2000)
// }

{
    const logCpuUsage = () => (
        process.stdout.write(
            process.uptime() + "\n" +
            "\n" +
            JSON.stringify((({ user, system}) => ({
                user: user / 1000000,
                system: system / 1000000,
                total: user / 1000000 + system / 1000000
            }))(process.cpuUsage()), null, 2) +
            "\n" +
            JSON.stringify(process.memoryUsage(), null, 2) +
            "\n"
        )
    )

    logCpuUsage();

    new Array(10000000)
        .fill(1)
        .map((_, index) => index * Math.random())
        .filter(value => value > 500)

    logCpuUsage();
}