// https://adventofcode.com/2022/day/2

/*
 * Types/Interfaces
 */
/**
 * Represents all possible play scores
 */
type PlayScore = -1 | 1 | 2 | 3;
/**
 * Represents all possible round result scores
 */
type ResultScore = 6 | 3 | 0 | -1;

const ROCK_SCORE: PlayScore = 1;
const PAPER_SCORE: PlayScore = 2;
const SCISSORS_SCORE: PlayScore = 3;
const INVALID_SCORE: PlayScore = -1;
const WIN_SCORE: ResultScore = 6;
const DRAW_SCORE: ResultScore = 3;
const LOSE_SCORE: ResultScore = 0;

/**
 * Gets the correct play score based on the opponent's play and desired result
 * @param targetResult The desired result for this round
 * @param theirScore The score of the opponent's play
 * @returns The score for the correct play
 */
const getTargetScore = (targetResult: ResultScore, theirScore: PlayScore): PlayScore => {
  switch (targetResult) {
    case LOSE_SCORE:
      switch (theirScore) {
        case ROCK_SCORE:
          return SCISSORS_SCORE;
        case PAPER_SCORE:
          return ROCK_SCORE;
        case SCISSORS_SCORE:
          return PAPER_SCORE;
        default:
          return INVALID_SCORE;
      }
    case DRAW_SCORE:
      return theirScore;
    case WIN_SCORE:
      switch (theirScore) {
        case ROCK_SCORE:
          return PAPER_SCORE;
        case PAPER_SCORE:
          return SCISSORS_SCORE;
        case SCISSORS_SCORE:
          return ROCK_SCORE;
        default:
          return INVALID_SCORE;
      }
    default:
      console.error("Target result symbol is invalid!", input);
      return INVALID_SCORE;
  }
};

/**
 * Gets the score for a specific play symbol
 * @param input A single-character string representing the play by myself or the opponent
 * @returns The score earned for the player's chosen play
 */
const getPlayScore = (input: string): PlayScore => {
  switch (input) {
    case "A":
      return ROCK_SCORE;
    case "B":
      return PAPER_SCORE;
    case "C":
      return SCISSORS_SCORE;
    default:
      console.error("Player has provided an invalid input!", input);
      return INVALID_SCORE;
  }
};

/**
 * Gets the desired result from a specific result symbol
 * @param input A single-character string representing the desired result
 * @returns The target score earned result of the current round
 */
const getTargetResult = (input: string): ResultScore => {
  switch (input) {
    case "X":
      return LOSE_SCORE;
    case "Y":
      return DRAW_SCORE;
    case "Z":
      return WIN_SCORE;
    default:
      console.error("Target result symbol is invalid!", input);
      return INVALID_SCORE;
  }
};

/**
 * Calculates the total score for current player
 * @param input A multiline string containing the plays for every round of the game
 */
const calculateTotal = (input: string) => {
  try {
    // Total number of *our* points across all rounds.
    const total = input
      .split("\n")
      .filter((singleLine) => singleLine.length > 0) // filter out any empty lines
      .reduce((runningTotal, singleLine): number => {
        // singleLine would look like 'A Y', or 'B X', etc...
        // Destructure the line into the opponent's score and the target result
        const tokens = singleLine
          .trim()
          .split(" ");
        
        if (tokens.length < 2) {
          console.error(
            `One or more invalid plays were found: "${singleLine}", try Limbo instead!`
          );

          return runningTotal;
        }

        const theirScore = getPlayScore(tokens[0]), targetResult = getTargetResult(tokens[1]);

        // Make sure both inputs are valid
        if (targetResult !== INVALID_SCORE && theirScore !== INVALID_SCORE) {
          runningTotal +=
            targetResult + getTargetScore(targetResult, theirScore);
        } else {
          console.error(
            `One or more invalid plays were found: "${singleLine}", try Limbo instead!`
          );
        }
        
        return runningTotal;
      }, 0);
    console.info("Total:", total);
  } catch (err) {
    console.error("Unexpected error while iterating over input.", err);
  }
};

// Input values copied from https://adventofcode.com/2022/day/2/input
const input: string = `C Z
C Y
B X
A Z
C Z
B X
C Z
B Z
A Z
A Z
B Z
B X
C Z
C Z
A Z
B Y
B X
C Y
B X
B X
A Y
A Z
A Z
A Z
A Z
C Z
A Z
C Z
B X
A X
A Z
B Y
B X
A Z
B X
C Z
A Z
C Z
A Z
A Z
B X
C X
B X
A X
B X
A Z
A Z
B X
B Y
B Y
B Y
C Z
A Z
A Z
C X
B X
C Y
B X
C Z
A Z
C Z
B X
B X
B Z
B X
A Z
C Z
A Z
A Z
A Z
A Z
B X
C Z
C Y
A Z
A Z
A Z
A Z
C Z
A X
A Z
A Z
C Z
C Y
A Z
C Y
A Z
A Z
C Y
C Z
C Z
A Z
B Y
B X
B Y
C Z
A Z
A Z
A Z
B Z
C Z
A Z
B X
C Y
A Z
B X
A Z
B Z
A Z
B X
A Z
B Y
A Z
A Z
C Y
A Z
B Z
A Z
A Y
B Y
C Z
A Z
B X
C Z
C Z
B X
C Z
C Z
A Z
B X
C Z
C Z
A Z
C Y
A Z
A Z
B Y
C Y
A Z
B X
B Y
B X
B X
A Z
C Y
A Z
C Y
A Z
B Y
C Z
A Z
A Z
C Y
A Z
A Z
C Z
A Z
A Z
A Z
C Y
A Z
B X
C Z
A Z
C Z
B Z
C Z
A Z
C Y
B X
C Z
C Z
A Z
C Y
A Z
B Y
B X
A Z
C Y
C Z
B X
C X
B X
C Y
B X
B X
C Z
B X
A Z
C X
A Z
C Z
B X
C Y
A Z
A Z
C Z
C Y
A Z
A Z
A Z
B X
A Y
B X
C X
C Z
B X
C Z
C X
A Z
C Z
B Z
A X
A Z
C Y
A Z
C Z
C Z
B X
C Z
A X
C Y
C Z
C Z
C Z
B Y
C X
B X
A Z
B Y
A Z
A Z
C Y
A Z
B X
A Y
A Y
C Y
A Z
A Z
C Z
A Z
A Z
A Z
B Y
B X
B X
A Z
C X
C Y
A Z
C Z
A Z
A Z
A Z
A Z
A X
A Z
C Z
A Z
B Y
A Y
A Y
C Y
C Y
B X
B Y
A Z
A Z
C X
A Z
B X
C Y
A Y
A Y
A Z
C Y
C Z
B X
A Z
C Y
B X
C Z
A Z
B X
A Z
C Y
B X
C Z
A Z
A Z
A Y
A Z
A Z
C Y
C Z
A Z
B X
C Z
C Y
A Z
A Z
C Y
A Z
C Z
B X
A Z
C Z
A Z
A Z
A Z
C Y
C Y
B X
B Z
B X
A Z
B Y
B Y
A Z
A Z
A Z
B Y
B Y
C Y
A Y
A Z
C X
B X
A Y
B Y
C Y
A Z
B Z
C Y
C Z
B X
A Z
A X
B X
C Y
B Z
A Z
B Y
A Z
B X
A Z
B X
A Z
C X
C Y
C Z
B X
C Z
C Y
A Z
C X
C Z
A Z
C Y
A Y
C Y
C Y
B Y
A Z
A Z
A Y
A Z
C Z
B X
A Y
B X
B Y
B X
A Z
C Z
C Z
C Y
B X
C Z
A X
A Z
A Z
A Y
A Z
A Z
A Z
A Z
B Z
B X
B X
C Y
C Z
C Z
A Y
B X
C Z
C X
C Z
B Y
A Z
B X
B Y
B X
A Z
B X
B X
A Z
A Z
C X
B X
C Z
C X
A Z
A X
C Z
A Z
A Z
C Z
B Z
C Z
B X
A Z
A Z
C Z
A Y
A Z
A Z
C Y
A Z
B X
B Y
A Z
A Y
A X
B X
A Z
A Z
C Y
C Y
A Z
C X
A Z
A Y
A Z
B Y
A Z
A Y
B X
C Z
A Z
B X
A Z
A Z
B X
A Z
A Z
B X
A Z
C Y
A Z
C Z
C Y
B Y
B X
A Z
B Y
A Z
A Z
B X
A Z
A Z
B X
C Z
A Z
C Z
B X
B X
B Y
A Y
C Y
B X
A Z
C Z
A Z
A Z
A Z
B X
A Z
B X
A Z
A Z
A Z
C Z
A X
B X
B Z
A Z
A Z
C Z
A Z
A Z
A Z
B Y
A Y
C Z
B X
B X
C Y
A Y
A Z
C X
B Z
A Z
A Z
C Z
A Z
A Y
B Y
C Z
B X
A Z
A Z
A Z
C Z
A Z
A Y
B X
C Y
A Z
A Z
A Z
C X
B X
A Z
A Z
C Z
B X
A Z
A Z
A Z
A Z
A Z
A Z
C Y
A Z
B X
A Y
C Y
A Z
A Z
B X
A Z
B Y
A Y
B X
A X
A Z
C Z
C Z
C Y
A Z
B Y
A Z
C X
A Z
A Z
B X
A Z
A Z
B Y
A Y
A Z
A Z
B X
C Y
B X
B Y
C Y
C X
A Z
A Z
B Y
A Z
B Y
C Y
C Y
A Z
C Y
A Z
C Z
A Z
B X
A Z
A Z
A X
A Z
A Z
A Z
A Z
B Z
C X
B Y
A Z
C Z
A Z
A Z
A Z
C Z
B X
A Z
B X
C Y
C Z
A Z
A Z
C Z
B X
B X
A Z
A Z
B X
A Z
A Z
C Z
A Z
A Z
A X
C Z
C Y
A Z
A Z
A Z
A Z
C Z
A Z
A Z
B Z
A Z
C Y
A Z
A Z
B Y
A Z
A Z
B X
A Z
B X
A Z
A Z
C Y
A Y
C Y
B Z
B X
B Y
A Z
A Z
C Y
A Z
A Y
B Z
A Z
C Y
A Z
A Z
A X
A Z
B Y
B Y
A Z
A Z
A Z
C Z
C Z
A Y
C Y
B X
A Y
B X
B Y
C X
C Y
C Y
A Z
C Z
A Z
A Z
A Z
B X
A Z
A Z
A Z
A Z
A Y
B X
A Z
A Z
B X
A Z
A Z
A Z
A Z
A X
C Y
B X
A Z
A Y
C Y
C Y
A X
A Z
C X
C Z
A Z
C X
A Z
A Z
B Y
A Z
A Z
A Z
B X
A Z
A Z
B X
B X
A Z
A Z
C Z
C Z
A Z
C Z
B X
A Z
A Z
B X
C Z
C Z
C Y
C Z
A Z
B X
A X
C Z
A X
C Z
A Z
A Z
A Z
A Z
A Z
B X
A Z
B X
C Y
A Z
A Z
A Z
C Z
A Y
A Y
B Y
A Z
A Z
C Y
C Z
B X
B X
A X
C Z
B X
A Z
A Z
A Z
B Z
A Z
C Y
B X
A Z
A Z
A Y
B Y
C Z
C Z
A Z
A Z
A Z
B Y
A Z
C Y
B X
B Z
C X
B X
C Y
A X
C Z
A Z
B X
C X
A Y
C X
A Z
B X
B X
A Z
A Z
C Z
B X
B Z
C Y
C Z
A Z
B Y
A Z
A Z
B X
C Y
A Z
C Z
A Z
B Z
C Z
C Z
A Z
C Y
A Z
A Z
A Z
C Z
C X
B Y
C Y
A Z
C Y
C Y
C X
C Y
A Z
C Y
C Y
C X
C X
A Z
B X
A Z
C Y
A Z
B X
B X
B X
B X
B X
B Y
A Z
A Z
C Z
A Z
A Z
A Z
C Z
C Z
C Z
A Z
A Z
A Y
A Z
A Z
A Y
A X
C Z
A Z
A Z
C Z
B X
C Z
B Y
C Z
A Y
A Z
C Y
B X
A Z
C Y
A Z
C Z
C Y
B X
A Z
A Z
A Z
A Z
A Z
C X
C Z
A Z
A Z
A Z
C Z
A Z
B X
A Z
A X
A Z
B X
A Z
C Z
A Z
A Y
B X
B Z
A Z
B X
A Z
A Z
B Y
A Z
A Z
C Y
B Y
C X
A Z
A Z
A Z
C Z
A Z
A Z
A Z
C Z
A Z
C Y
B X
A Z
A Z
C X
A Z
C Z
A Z
B Y
A Z
A Y
C Z
C Z
A Y
A Y
A Z
A X
A Z
A Z
B X
A Z
A Z
B X
C Z
A Z
A Y
B X
A Z
A Z
C Z
A Z
A Z
B X
B Z
A Z
A X
B Y
A Z
B X
A Z
C Z
B X
C Y
A Z
B X
A Z
A Z
A Z
B Z
A Z
C Z
A Z
C Z
B X
A Z
B Z
A Z
C Z
C Z
B Y
C Z
A Z
A Z
C Y
A Z
A Z
B X
B Y
C Z
A Z
C Z
A Z
C Z
A Z
B X
A X
B Y
A Z
C Z
A Z
C Z
C Y
B X
C Z
C Z
B Y
B X
C Z
B X
C Y
A Z
C Y
C Y
A Z
B X
A Z
C X
C Z
B Y
C Z
B Z
A Z
A Z
A Z
A Z
A Z
A Z
A Z
A Z
C Z
A Z
B Y
C Y
C X
C Y
B Y
B X
A Z
C Z
B X
B Y
A Z
B Y
A Z
A Y
B X
A Z
B X
A Z
C Z
A Z
A Z
A Z
C X
B Y
C Z
C Z
A X
C Z
A Z
C Z
B Y
A Z
B Y
A Z
A Z
A Z
B Z
C Z
A Z
A Z
A Z
A Z
A Z
A Y
A Z
C Z
A Z
C X
A Z
A Z
A Z
C Z
A Y
A Z
A Z
B Z
A Z
A Z
A Z
C Z
C Z
A Y
A Z
A X
C Y
C Y
B Z
A Y
C Z
A Z
C Z
C Z
A Z
A X
A Z
B Y
C Z
B Y
A Z
B X
A Z
A Y
A Z
A Z
A Z
C Z
A Z
A Z
A Z
C Z
A Z
C Z
C Z
C Y
A Z
B X
A Z
A Z
A Z
A Z
A Z
A Z
C X
C Z
C X
A Z
A Z
A Z
A Z
A Z
A Z
C Z
B Y
B X
A Z
C Z
B Z
A Z
C Y
A Z
C Z
A Z
C Z
A Z
A Z
A Z
C Z
A Z
C Y
A Z
A Z
A Z
A Z
A Z
C Z
C Y
A Z
C X
A Z
C X
C Z
C Z
A Z
A Z
B Y
B X
A Z
B X
A Z
A Z
A Z
C Z
B Z
A Z
A Y
B Y
A Z
C Z
B X
C X
C Y
C Y
C Z
C X
B X
A Z
B X
A Z
C Z
A Z
A Y
A Z
B X
A Y
A Z
A Y
C Y
A Y
A Z
A Z
B X
C X
A Z
A Z
A Z
A Z
A Z
A Z
A Y
B X
A Z
A Z
B Y
B X
A Z
A Z
B X
A Z
C Y
C Y
B Y
A Z
A Z
A Y
A Z
A Z
A Y
C Z
C Y
C Z
C X
C Z
C Y
A Z
A Z
C Z
B X
A Z
C Z
A Z
C Z
C X
B Y
C X
B X
C Z
B X
C Z
A Z
A Y
B Y
A Z
A Z
C X
C Y
A Z
B X
A Z
A Z
C Y
C Z
B X
B X
A Z
C X
A Z
B X
C Y
A Z
A Y
B X
C Y
B X
A X
A Z
A Z
A Z
C Z
B Y
C Z
B Y
A Z
A Z
C Z
B X
A Z
A Z
A Z
A Z
C Y
B X
A Z
C X
A Z
C Z
B Z
A Z
A Z
A Z
B Z
A Y
A Z
A Z
C Z
B Z
A X
B X
A Z
A Z
A Z
A Z
A Z
A X
C Z
A Z
C Z
B X
B X
C Y
B X
A Z
A Z
C Y
C Z
B X
C Y
A Y
B X
B X
C X
A Z
A Z
C Z
A Z
C Z
C Z
B X
A Z
B X
A Z
A Z
B Y
B Y
A Z
A Z
C Z
A Z
A Z
B X
A Z
C Z
C Z
B X
C Y
A Z
A X
B X
B X
B Y
B Y
A Z
C Z
A Z
C Z
A Z
C Y
B X
A Z
A Z
C Z
B X
A Z
C Y
A Z
A Z
A Z
B X
A Z
A Y
C Y
C Z
A Z
A Z
B X
C Y
A Z
C X
A Z
B X
A Z
A Z
B Y
B X
C Z
A Z
B X
A Y
A Z
B Z
A Z
C Y
B Y
C Z
C X
B X
A X
B X
B Z
B X
B Y
B X
C Y
B X
A Y
B Z
B X
C X
B X
A Z
A Z
B X
B X
A Z
A Z
C Y
B Y
A Z
A Z
A Z
C Z
A Z
B X
A Z
B X
A Z
A Z
A Z
A Z
C Y
C X
A Z
A Z
A Z
A Z
B Y
A Z
A Z
C Z
C Z
B X
A Z
A Z
B X
A Z
B X
C Y
B X
C Z
A Z
C Z
C Z
A Z
A Z
A Z
A Z
A Z
C X
C Z
B X
B X
B X
A Z
A Z
C Z
B X
A Z
C X
A Z
C Z
A Z
A Z
C Z
A Z
A X
B X
A Z
A Z
A X
A Z
B Y
A Z
A Z
A Z
C Y
C Y
A Z
C Y
C X
A Z
B Y
A Z
A Z
B Y
A Z
A Z
A Z
C Y
B X
A Z
A Z
A Z
A X
A Z
A Y
A Y
A Z
C Z
B Y
C Y
B X
B X
B X
A Z
A Z
A Z
C Y
A Z
B X
A Z
A Z
C Z
B X
A Z
A Z
C Z
A Z
C Y
A Z
B X
C Z
C Y
A Z
C X
A Y
B Z
C Z
C Y
A Z
A Z
A Z
A Y
A Y
C Y
B X
C Z
B X
C Y
B X
B X
A Z
A Z
C Z
A Z
B X
A Z
B X
C Y
C Z
A X
B X
B X
C Z
C Z
C Z
C Z
C Z
A X
A Z
B X
A Z
B X
A Z
A Z
A Z
B X
B Y
C Z
C Y
A Z
C Z
B X
C Z
A Z
C Z
A Z
A Z
A Z
B X
B Z
A X
B Y
C Z
A Z
A X
A Y
A Z
C Y
A Z
C Z
A Z
A Z
A X
A Z
A Y
B Z
A Z
A Z
B X
B Y
A Z
C Z
A Z
A Z
C Z
A Z
A Z
C Y
B X
B X
A Z
C Y
B Z
A Z
B X
B X
B X
B Y
C Z
B Z
A X
B X
A Y
A Z
B X
B X
A Z
B X
A Z
C Z
A Z
C Z
C Y
B X
B X
C X
A Z
A X
A Z
C Y
C Z
C Y
C Z
C Y
C Y
B X
B Y
A Z
C X
C Z
B X
C Z
C Z
B X
A Z
A Z
A Y
A Z
A Z
C Y
A Z
B X
A Z
A Z
C Y
A Z
A Z
B X
A Z
A Z
B Z
A Z
A Z
A Z
A Z
A Z
C Z
A Y
A Z
C Z
C Z
C Z
A Z
B X
B Y
A Z
C X
A Y
A Y
C Y
C Y
A Z
C Y
B X
C X
B X
C Y
A Z
A Y
B X
B X
A Z
A Z
A Z
A X
A Z
B X
B Y
A Y
C Z
B Y
A X
A Z
A X
A Z
A X
A Y
C Y
C Z
A Z
A Z
A Z
C Y
A Z
A X
A Z
A X
A Z
A Z
B X
C X
C Y
C Z
B X
A X
C Z
C Z
C X
A Z
C Z
C Y
A Z
C Z
C Z
B X
A Z
B Y
B X
B X
C Z
A Z
A Z
B X
B X
A Z
C Z
B X
A Y
B Z
C X
A Z
C Y
A Z
A Z
B X
C Z
C Y
A Z
B X
B Y
A Z
B X
B Z
C X
A Z
C Y
C Z
B X
C X
C Y
A X
C X
C Y
B Y
A Z
C Y
C Z
A Z
A Z
A Y
A Z
C Y
C X
B X
C Y
A Z
B Y
A Z
B X
A Z
C X
A Z
C Z
B Y
B Y
B Y
C Y
A Z
A Y
C Z
C Y
B Y
A Z
B Y
B X
A Z
B Z
A Z
A Z
A Z
C Y
A Z
B X
A Z
C Z
B X
B X
C Z
A Z
C Z
B Y
C Y
C Z
A Z
A Z
A Z
A Z
A Z
C Z
A Z
C Y
A Z
B Y
A Z
C X
A Z
A Z
C Y
A Z
B X
A Z
A Z
B Y
A Y
C X
A Y
A Z
A Z
A Z
B X
A Z
B X
C Z
A Z
B X
C Y
C Z
A Z
A Z
C Z
A Z
A Z
A X
B X
B X
A Z
B X
C Y
A Y
A Z
A Z
C X
A Z
A Z
B X
A Z
A Z
A Z
A Y
B X
A Z
B X
B X
B X
B X
A Y
B X
A Z
A Z
B X
C Y
B X
C Z
B X
A Z
C X
A Z
B Y
C Z
B X
A Z
A Z
C Y
C Y
A Z
A Z
C Z
A Y
A Z
C X
C Z
A Z
A Z
B X
A Z
B X
A Y
B Z
B X
A Z
A X
B X
A Z
A Z
A Y
C Z
A Z
A Z
C Z
C Z
A X
A Z
C Y
A Z
B X
A Z
A Z
A Y
C Y
B X
C Z
A Z
C Y
B Y
A Z
B Y
C Z
A Z
A X
B X
B X
A Z
A X
A Z
A Z
A Z
A Z
B Z
A Y
A Z
A X
C Y
A Z
B X
B Y
B X
C Z
A Z
A Z
B X
A Z
C Z
A Z
B X
C Y
C Z
A Z
B Z
C Z
B X
C Y
A Z
C Z
B X
B X
A Y
A Z
B Z
B X
C Z
A Z
C Y
B Y
A Z
B Y
A Z
C Z
B X
B X
B X
C Z
A X
B Y
B Y
A Z
A Z
A Z
A Z
A Z
B X
A Z
A Z
B X
C Z
A Z
C Y
C Z
A Z
A X
A Z
A Z
A Z
B X
B Y
B X
A Z
A Z
C Z
A Z
C Z
A Z
A Z
B X
A Z
A Z
C Y
A Z
B X
A Z
A Z
B X
A Z
C Z
A Z
B X
A Z
A Z
A Z
C Z
B Y
A Z
B X
C X
A Z
B X
A Z
C Y
A Z
A Y
A Z
B Z
B X
C Z
A Z
C Z
C Y
B Y
B X
B Y
C Y
C Y
A Z
C Y
A X
A Z
B Y
A Z
B X
A Y
C Y
B X
C Y
B X
A Z
A X
B Y
B X
C Z
A Z
A Z
A Z
A Z
A Z
C Z
C Z
A Z
A Y
B X
B X
C Z
A Z
A Z
C X
B Z
C Z
B X
A Z
A Y
A Z
A Z
A Z
A Z
A Z
A Z
B Z
B X
A Z
B X
C Y
C Z
A Z
B X
B X
A Z
C X
A Z
B Y
A Z
C Y
B X
A Y
B Y
C Y
B X
B X
B Y
C Y
B X
A Z
C X
A Z
B X
A Z
A Y
A Z
A X
C X
C Y
A Z
A Z
C Y
A Z
A Z
A X
C Z
C Y
A Z
A Z
B X
B X
C Z
B X
A Z
C Y
B X
B X
C Z
A X
A Z
B Z
C Z
C Y
A Z
C Z
C Z
B Y
C Y
B Y
C Z
A Z
C Z
B X
A Z
B Y
B Y
C Y
C Y
A Z
C Z
C Z
A Z
A Z
C X
A Z
A Z
C X
A Z
A Z
A Y
A X
C X
A Z
A Z
A Z
C Z
A Z
A Z
A X
A X
B Y
A X
A Z
A X
B X
B X
A Z
C Y
A Z
C Y
C Y
B X
B X
A Z
B Z
B X
C X
B X
A Z
A Z
A Z
B X
C Y
C Z
A Z
B Y
C Y
C X
A Z
A Z
A Z
A Z
A X
C Z
A Z
B X
A Z
A Z
C Z
C X
C Z
A Z
C Y
B Y
A Z
C Z
B X
B Z
A Z
A Z
A Y
C Y
C Z
C Z
A Z
A Z
C Z
B X
A Z
A Z
A Z
B X
A Z
B X
B X
A Z
C Y
A Z
A Z
A Z
C Z
A Z
C Y
B X
A Z
C Z
A Z
C Z
A X
A Z
A Z
A Z
A Z
A Z
A Z
C Z
A Z
A Z
A Z
B X
C Y
B Z
A Z
C X
A Z
C Z
C Z
C Y
C Y
B X
A Z
C Z
A Z
A Z
A Z
A Z
A Z
A Z
A Y
A Z
A Z
A Z
C Y
B Y
C Z
C Z
A Z
A Z
A Z
A Y
C Z
A Z
A Y
A Z
A Z
A Z
B X
B X
C Y
B X
A Z
A Z
A X
C Z
C Y
A Z
C Y
A Z
A Z
A Z
C X
B X
A Z
C X
C Y
A Z
A Z
A Z
A Z
A Z
A Z
C Z
B X
C X
C Z
B Y
B Z
B Z
C Y
A Z
B X
B X
A Z
A Z
A Z
B Z
B Z
A Z
C Z
A Y
C X
C Y
A X
C Y
A Z
C X
A Z
B X
C Z
B X
B Z
A Z
A X
A Z
B X
C Y
B Y
A Z
C Z
A Y
A Z
C Y
A Z
C Y
B X
A Z
A Z
A Z
A Z
B Y
A X
A Z
C Z
A Z
C Z
B X
C Z
A Z
B Y
A Z
C Y
C Y
C Z
A Z
A Z
A Y
B X
A Z
A Z
C X
B X
C X
A Y
A Z
A X
B X
A Z
B Y
C Z
C Z
C Y
A Z
A Y
A Z
A Z
B Z
C Y
A Z
A Z
B Y
`;
calculateTotal(input);
