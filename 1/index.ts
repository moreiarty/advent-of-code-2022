import { writeSolutionSeparatorToConsole } from "../utils/console";
import { getFile } from "../utils/file";

export const solution = async () => {
    writeSolutionSeparatorToConsole(1);
    const file = await getFile(__dirname, "calorie-count.txt");

    console.log("Top Elf's Calories: %s", topElf(file));
    console.log("Top 3 Elves' Calories: %o", topThreeElves(file));
};

const topElf = (input: string) => {
    const eachElf = input.split("\n\n");
    let maxCalories = 0;
    eachElf.forEach(elfCalories => {
        const elfTotalCalories = elfCalories.split("\n").reduce((prev, curr) => prev + parseInt(curr), 0);
        if (elfTotalCalories > maxCalories) {
            maxCalories = elfTotalCalories;
        }
    });
    return maxCalories;
};

const topThreeElves = (input: string) => {
    const eachElf = input.split("\n\n");
    let topThreeCalories = [0, 0, 0];
    eachElf.forEach(elfCalories => {
        const elfTotalCalories = elfCalories.split("\n").reduce((prev, curr) => prev + parseInt(curr), 0);
        topThreeCalories.every((val, idx) => {
            if (elfTotalCalories > val) {
                topThreeCalories.splice(idx, 0, elfTotalCalories);
                topThreeCalories = topThreeCalories.slice(0, 3);
                return false;
            }
            return true;
        });
    });
    return topThreeCalories.reduce((a, b) => a + b, 0);
};