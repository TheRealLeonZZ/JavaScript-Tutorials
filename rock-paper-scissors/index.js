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

function getImgFromMove(move) {
  if (move === rock) {
    return rockImg;
  } else if (move == paper) {
    return paperImg;
  } else if (move == scissors) {
    return scissorsImg;
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
  let userImg = document.createElement("img");
  let pcImg = document.createElement("img");

  let userImgPath = getImgFromMove(userMove);
  let pcImgPath = getImgFromMove(pcMove);

  let movesP = document.querySelector(".js-moves");

  userImg.src = userImgPath;
  userImg.classList.add("move-icon");
  pcImg.src = pcImgPath;
  pcImg.classList.add("move-icon");

  movesP.innerHTML = "";

  movesP.appendChild(document.createTextNode("You) "));
  movesP.appendChild(userImg);
  movesP.appendChild(document.createTextNode(" - "));
  movesP.appendChild(pcImg);
  movesP.appendChild(document.createTextNode(" (PC "));
}

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// Winner variables
const user = "You";
const pc = "PC";
const tie = "Tie.";

// Playable moves
const rock = "Rock";
const paper = "Paper";
const scissors = "Scissors";

// Images variables
const imagesPath = "images/";
const rockImg = imagesPath + "rock-emoji.png";
const paperImg = imagesPath + "paper-emoji.png";
const scissorsImg = imagesPath + "scissors-emoji.png";

// Image setters
document.querySelector(".js-rock-btn-img").src = rockImg;
document.querySelector(".js-paper-btn-img").src = paperImg;
document.querySelector(".js-scissors-btn-img").src = scissorsImg;

updateScore(score);
