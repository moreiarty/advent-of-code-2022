import { writeEndSeparator } from "./utils/console";
import { solution as dayOneSolution } from "./1";
import { solution as dayTwoSolution } from "./2";

(async () => {
    await dayOneSolution();
    await dayTwoSolution();
    writeEndSeparator(); 
})();
