import { writeSolutionSeparatorToConsole } from "../utils/console";
import { getFile } from "../utils/file";

export const solution = async () => {
    writeSolutionSeparatorToConsole(2);
    const file = await getFile(__dirname, "rock-paper-scissors-guide.txt");
    const rounds = file.split("\n");


    console.log("Part 1 | Total Score: %s", partOneScore(rounds as Round[]));
    console.log("Part 2 | Total Score: %s", partTwoScore(rounds as Round[]));
};

const partOneScore = (rounds: Round[]): number => {
    const totalScore = rounds.reduce((prev: number, current: string) => {
        const [opponentMoveCode, myMoveCode] = current.split(" ");
        const opponentMove: Move =  opponentMoveCode ? CODE_MOVE_MAP[opponentMoveCode as OpponentMoveCode] : "Rock";
        const myMove: Move =  myMoveCode ? CODE_MOVE_MAP[myMoveCode as MyMoveCode] : "Rock";
        const score = RESULT_SCORE_MAP[ROUND_RESULT_MAP[`${opponentMove}|${myMove}`]] + MY_MOVE_BONUS_MAP[myMove];
        return prev + score;
    }, 0);
    return totalScore;
};

const partTwoScore = (rounds: Round[]): number => {
    const totalScore = rounds.reduce((prev: number, current: string) => {
        const [opponentMoveCode, desiredOutcomeCode] = current.split(" ");
        const opponentMove: Move =  opponentMoveCode ? CODE_MOVE_MAP[opponentMoveCode as OpponentMoveCode] : "Rock";
        const desiredOutcome = CODE_ROUND_RESULT_MAP[desiredOutcomeCode as DesiredOutcomeCode];
        const myMove = DESIRED_OUTCOME_MOVE_MAP[`${opponentMove}|${desiredOutcome}`];
        const score = RESULT_SCORE_MAP[ROUND_RESULT_MAP[`${opponentMove}|${myMove}`]] + MY_MOVE_BONUS_MAP[myMove];
        return prev + score;
    }, 0);
    return totalScore;
};

type Move = "Scissors" | "Paper" | "Rock";

type OpponentMoveCode = 
    "A"     // Rock
    | "B"   // Paper
    | "C";  // Scissors

type MyMoveCode =
    "X"     // Rock
    | "Y"   // Paper
    | "Z";  // Scissors

type DesiredOutcomeCode =
    "X"     // Lose
    | "Y"   // Draw
    | "Z";  // Win

type MoveCode = OpponentMoveCode | MyMoveCode;
const CODE_MOVE_MAP: Record<MoveCode, Move> = {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
    X: "Rock",
    Y: "Paper",
    Z: "Scissors",
};

const CODE_ROUND_RESULT_MAP: Record<DesiredOutcomeCode, RoundResult> = {
    X: "lose",
    Y: "draw",
    Z: "win"
};

type Round = `${Move}|${Move}`;
type DesiredOutcome = `${Move}|${RoundResult}`;

type RoundResult = 
    "win"
    | "lose"
    | "draw";

const RESULT_SCORE_MAP: Record<RoundResult, number> = {
    draw: 3,
    lose: 0,
    win: 6,
};

const MY_MOVE_BONUS_MAP: Record<Move, number> = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
};

const ROUND_RESULT_MAP: Record<Round, RoundResult> =  {
    "Paper|Paper": "draw",
    "Paper|Rock": "lose",
    "Paper|Scissors": "win",
    "Rock|Paper": "win",
    "Rock|Rock": "draw",
    "Rock|Scissors": "lose",
    "Scissors|Paper": "lose",
    "Scissors|Rock": "win",
    "Scissors|Scissors": "draw",
};

const DESIRED_OUTCOME_MOVE_MAP: Record<DesiredOutcome, Move> = {
    "Paper|draw": "Paper",
    "Paper|lose": "Rock",
    "Paper|win": "Scissors",
    "Rock|draw": "Rock",
    "Rock|lose": "Scissors",
    "Rock|win": "Paper",
    "Scissors|draw": "Scissors",
    "Scissors|lose": "Paper",
    "Scissors|win": "Rock",
};
