#!/usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
let userInput = await inquirer.prompt({
    name: "input",
    type: "number",
    message: "ENTER THE AMOUNT OF SECOND YOU WANT TO COUNT DOWN.",
    validate: (input) => {
        if (isNaN(input)) {
            return `PLEASE ENTER VALID NUMBER.`;
        }
        else if (input < 0) {
            return `PLEASE ENTER A NUMBER LESS THAN OR EQUAL TO 60.`;
        }
        else {
            return true;
        }
    },
});
const storeInput = userInput.input;
function Time(value) {
    let initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    let intervalTime = new Date(initialTime);
    setInterval(() => {
        const cuurentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, cuurentTime);
        if (timeDifference <= 0) {
            console.log(chalk.red.bold.italic("\n\t\tTIME'S UP."));
            process.exit();
        }
        else {
            const hour = Math.floor((timeDifference % (3600 * 24)) / 3600);
            const min = Math.floor((timeDifference % 3600) / 60);
            const sec = timeDifference % 60;
            console.log(chalk.green.bold.italic(`\t\t${hour.toString().padStart(2, "0")}:${min
                .toString()
                .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }
    }, 1000);
}
Time(storeInput);
