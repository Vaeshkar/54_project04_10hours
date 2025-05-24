// imports
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// score variables
let scorePlayer = 0;
let scoreCom = 0;

// diffrent text winning loosing, draw, rematch, foul
const welcomeMessage1 = "🎮 Welcome to Rock, Paper, Scissors CLI Game!";
const welcomeMessage2 =
    "You play against the computer. First to quit loses the fun!";
const enterMessage = "you like to start, press enter!";
const gameMessage =
    "\nChoose rock 'r', paper 'p', or scissors 's' (or type exit 'e' to quit): ";
const thanksMessage = "\nThanks for playing!";
const winMessage = "Congrats! You win!";
const loseMessage = "Sorry, you lost!";
const drawMessage = "Its a draw!";
const scoreMessage = ["The actual score is Player:", " - ", ":Computer"]; //"The actual score is Player:" + scorePlayer + " - " + scoreCom + ":Computer"
const rematchMessage = "You want a rematch?";
const foulMessage = "You enter a wrong word! Its a foul";

// list
const choices = ["r", "p", "s"]; //["rock", "paper", "scissors"];

//functions---------------------------------------------------

// function to get computer choice
function getComChoice() {
    const randIndex = Math.floor(Math.random() * choices.length);
    return choices[randIndex];
}
// function to calculate winner
function calcWinner(player, computer) {
    if (player === computer) {
        return "draw";
    }

    if (
        (player == "r" && computer == "s") ||
        (player == "p" && computer == "r") ||
        (player == "s" && computer == "p")
    ) {
        scorePlayer++;
        return "player";
    } else {
        scoreCom++;
        return "computer";
    }
}
// function highScore
function highScore() {
    if (scoreCom == scorePlayer) {
        return "draw";
    }
    if (scoreCom > scorePlayer) {
        return "computer";
    } else {
        return "player";
    }
}
// function to present score
function presentScore(winner, finished = false) {
    if (winner == "draw") {
        console.log(drawMessage);
    }
    if (winner == "human") {
        console.log(winMessage);
    }
    if (winner == "computer") {
        console.log(loseMessage);
    }
    console.log(
        "The actual score is Player:" +
            scorePlayer +
            " - " +
            scoreCom +
            ":Computer"
    );

    if (finished) {
        rl.close();
        return;
    } else {
        return startGame();
    }
}
// Game function
function startGame() {
    rl.question(gameMessage, (input) => {
        const playerChoice = input[0].toLowerCase();

        if (playerChoice == "e") {
            console.log(thanksMessage);
            return presentScore(highScore(), true);
        }

        if (!choices.includes(playerChoice)) {
            console.log(foulMessage);
            return startGame();
        }

        presentScore(calcWinner(playerChoice, getComChoice()));
    });
}

// app start ------------------------------------------------
// Welcome message
console.log(welcomeMessage1);
console.log(welcomeMessage2);
//Welcome message
rl.question(enterMessage, () => {
    scoreCom = 0;
    scorePlayer = 0;
    startGame();
});