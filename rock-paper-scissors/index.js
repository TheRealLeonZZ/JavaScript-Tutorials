function mainGame(userMove) {
  let computerRand = Math.floor(Math.random() * 3) + 1;
  let pcMove = translateMove(computerRand);
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

function autoPlay() {
  if (!isPlaying) {
    isPlaying = true;
    document.querySelector(".js-autoplay-button").innerHTML = "Stop AutoPlay";

    gameInterval = setInterval(() => {
      //Generate moves
      let computerRand = Math.floor(Math.random() * 3) + 1;
      let userMove = translateMove(computerRand);
      mainGame(userMove);
    }, 300);
  } else {
    isPlaying = false;
    document.querySelector(".js-autoplay-button").innerHTML = "AutoPlay";
    clearInterval(gameInterval);
  }
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

// Adding event listeners:
const rockButton = document.querySelector(".js-rock-button");
const paperButton = document.querySelector(".js-paper-button");
const scissorsButton = document.querySelector(".js-scissors-button");
const resetButton = document.querySelector(".js-reset-button");
const autoPlayButton = document.querySelector(".js-autoplay-button");

const pageBody = document.body;

const rockEventListener = () => {
  mainGame(rock);
};

const paperEventListener = () => {
  mainGame(paper);
};

const scissorsEventListener = () => {
  mainGame(scissors);
};

const resetEventListener = () => {
  resetScore();
};

const autoPlayEventListener = () => {
  autoPlay();
};

rockButton.addEventListener("click", rockEventListener);
paperButton.addEventListener("click", paperEventListener);
scissorsButton.addEventListener("click", scissorsEventListener);
resetButton.addEventListener("click", resetEventListener);
autoPlayButton.addEventListener("click", autoPlayEventListener);

pageBody.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    rockEventListener();
  } else if (event.key === "p") {
    paperEventListener();
  } else if (event.key === "s") {
    scissorsEventListener();
  } else if (event.key === "a") {
    autoPlayEventListener();
  } else if (event.key === "Backspace") {
    resetEventListener();
  }
});

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isPlaying = false;
let gameInterval;

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
document.querySelector(".js-rock-button-img").src = rockImg;
document.querySelector(".js-paper-button-img").src = paperImg;
document.querySelector(".js-scissors-button-img").src = scissorsImg;

updateScore(score);
