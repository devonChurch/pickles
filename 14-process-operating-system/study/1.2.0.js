{
    process.stdout.write(
        process.env.PWD + "\n" +
        process.cwd() + "\n"
    )
    
    process.chdir(__dirname)
    
    process.stdout.write(
        process.env.PWD + "\n" +
        process.cwd() + "\n"
    )
}

{
    process.stdout.write(
        JSON.stringify(process.env, null, 2)
    )
}

{
    process.stdout.write(
        process.platform
    )
}