function mainGame(userChoice) {
  computerRand = Math.floor(Math.random() * 3) + 1;
  computerRand = translateMove(computerRand);
  let winner;

  if (userChoice === computerRand) {
    winner = "Tie.";
    score.ties++;
  } else if (
    (userChoice === "Rock" && computerRand === "Scissors") ||
    (userChoice === "Paper" && computerRand === "Rock") ||
    (userChoice === "Scissors" && computerRand === "Paper")
  ) {
    winner = "User";
    score.wins++;
  } else {
    winner = "PC";
    score.losses++;
  }

  if (!score) {
    console.log("theres no score");
    localStorage.setItem("score", JSON.stringify(score));
  }

  alert(
    "User's choice: " +
      userChoice +
      "\nComputer's choice: " +
      computerRand +
      "\nWinner is: " +
      winner +
      "\nScore is: Wins = " +
      score.wins +
      " losses = " +
      score.losses +
      " Ties = " +
      score.ties
  );
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  localStorage.removeItem("score");
  alert("Score has been restarted...");
}

//   1 = rock, 2 = paper, 3 = scissors
function translateMove(move) {
  if (move === 1) {
    return "Rock";
  } else if (move === 2) {
    return "Paper";
  } else if (move === 3) {
    return "Scissors";
  }
}

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
