function mainGame(userMove) {
  computerRand = Math.floor(Math.random() * 3) + 1;
  pcMove = translateMove(computerRand);
  let winner;

  if (userMove === pcMove) {
    winner = tie;
    score.ties++;
  } else if (
    (userMove === rock && pcMove === scissors) ||
    (userMove === paper && pcMove === rock) ||
    (userMove === scissors && pcMove === paper)
  ) {
    winner = user;
    score.wins++;
  } else {
    winner = pc;
    score.losses++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateWinner(winner);
  updateMoves(userMove, pcMove);
  updateScore(score);
}

//   1 = rock, 2 = paper, 3 = scissors
function translateMove(move) {
  if (move === 1) {
    return rock;
  } else if (move === 2) {
    return paper;
  } else if (move === 3) {
    return scissors;
  }
}

// Reset functions:

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  updateScore(score);
  resetWinner();
  resetMoves();
  localStorage.removeItem("score");
  alert("Score has been restarted...");
}

function resetWinner() {
  document.querySelector(".js-winner-paragraph").innerHTML = "";
}

function resetMoves() {
  document.querySelector(".js-moves").innerHTML = "";
}

// Update functions:

function updateScore(score) {
  document.querySelector(".js-score-paragraph").innerHTML =
    "Score is: Wins = " +
    score.wins +
    " Losses = " +
    score.losses +
    " Ties = " +
    score.ties;
}

function updateWinner(winner) {
  if (winner === tie) {
    document.querySelector(".js-winner-paragraph").innerHTML = "It's a tie.";
  } else {
    document.querySelector(".js-winner-paragraph").innerHTML = winner + " win.";
  }
}

function updateMoves(userMove, pcMove) {
  document.querySelector(".js-moves").innerHTML =
    "You " + userMove + " - " + pcMove + " PC";
}

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// Winner variables
let user = "You";
let pc = "PC";
let tie = "Tie.";

// Playable moves
let rock = "Rock";
let paper = "Paper";
let scissors = "Scissors";

updateScore(score);
