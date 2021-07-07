const { readInput } = require("./helpers/inquirer")

const main=async()=>{
    const text=await readInput("hello");
    console.log(text);
}
main();