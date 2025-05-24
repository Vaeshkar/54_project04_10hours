/* Rock Paper Scissors Description: 
Implement a basic Rock Paper Scissors game.

Requirements:
- The program should take the player’s move as an input from process.argv.
- The program should randomly generate a move for the computer.
- Determine the winner based on the rules of Rock Paper Scissors.
- Output the result (win, lose, or draw) to the console.

Example:
node rockPaperScissors.js rock 
# Output: You chose rock. Computer chose scissors. You win! */

// Game logic
/* 
rock - scissors:   rock wins
scissors - paper:  scissors wins
paper - rock:      paper wins */

// Initialize choices
const choice = ["rock", "paper", "scissors"];
/* const outcome = ["A draw!", "You win!", "You lose!"] */
const args = process.argv.slice(2);
// Set the user Choice
const userChoice = args.join().toLowerCase();

// Check edge cases
if (args.length !== 1 || !choice.includes(userChoice)) {
    console.error("Invalid input. Please choose 'rock', 'paper' or 'scissors'.");
  return;
}

// pick a random choice from the list
// Initialize a computer Choice
const compChoice = choice[Math.floor(Math.random() * choice.length)];

// Output function of returns – deprecated
/* function resultText(player, computer, outcome) {
    return `You chose ${player}. Computer chose ${computer}. ${outcome}`;
}; */

// Output function of returns
function resultText(player, computer, resultKeyword) {
    const outcomes = {
            win: "You win!",
            lose: "You lose!",
            draw: "A draw!"
        };

        return `You chose ${player}. Computer chose ${computer}. ${outcomes[resultKeyword]}`;
    }

// check function | Naive Version – large if statement
function gameWin(player, computer, outcome) {
    if (player === computer) {
        return resultText(player, computer, 'draw');
    }
    // Object rule solution
    const winsGame = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };
    // Object check 
    if (computer === winsGame[player]) {
        return resultText(player, computer, 'win');;
    };

    // no else needed, just return
    return resultText(player, computer, 'lose');;
}
// Call the function with the choices and log it.
console.log(gameWin(userChoice, compChoice));