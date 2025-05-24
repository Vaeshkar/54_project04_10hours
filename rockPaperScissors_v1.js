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

const args = process.argv.slice(2);

// Check edge case 1
if (args.length !== 1) {
    console.error('Please enter only one string.');
    return;
}
// Check edge case 2
if (!choice.includes(userChoice)) {
  console.error("Invalid input. Please choose 'rock', 'paper' or 'scissors'.");
  return;
}

// Initialize choices
const choice = ["rock", "paper", "scissors"]

const random = Math.floor(Math.random() * choice.length)
// Initialize a computer Choice
const compChoice = choice[random]
// Set the user Choice - unstring it with .join()
const userChoice = args.join().toLowerCase()

// test choices works
/* console.log(compChoice);
console.log(userChoice); */

// Game logic
/* 
rock - scissors:   rock wins
scissors - paper:  scissors wins
paper - rock:      paper wins
*/

// check function | Naive Version – large if statement
function gameWin(player, computer) {
    if ((player === choice[0] && computer === choice[2]) || (player === choice[2] && computer === choice[1]) || (player === choice[1] && computer === choice[0]))
    return `You chose ${userChoice}. Computer chose ${compChoice}. You win!`
    else if (player === computer) {
        return `You chose ${userChoice}. Computer chose ${compChoice}. A draw!`
    }
    else {
        return `You chose ${userChoice}. Computer chose ${compChoice}. You lose!`
    }
}
// Call the function with the choices and log it.
console.log(gameWin(userChoice, compChoice));