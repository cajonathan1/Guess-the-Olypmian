// Game settings
const maxAttempts = 3;
let attempts = 0;
let currentRound = 0;

// Array of rounds
const rounds = [
  { image: "assets/Aphrodite.jpg", answer: "aphrodite" },
  { image: "assets/Apollo.jpg", answer: "apollo" },
  { image: "assets/Ares.jpg", answer: "ares" },
  { image: "assets/Artemis.jpg", answer: "artemis" },
  { image: "assets/Athena.jpg", answer: "athena" },
  { image: "assets/Demeter.jpg", answer: "demeter" },
  { image: "assets/Dionysus.jpg", answer: "dionysus" },
  { image: "assets/Hephaestus.jpg", answer: "hephaestus" },
  { image: "assets/Hera.jpg", answer: "hera" },
  { image: "assets/Hermes.jpg", answer: "hermes" },
  { image: "assets/Poseidon.jpg", answer: "poseidon" },
  { image: "assets/Zeus.jpg", answer: "zeus" },
];

// Function to shuffle the rounds array
function shuffleRounds() {
  for (let i = rounds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rounds[i], rounds[j]] = [rounds[j], rounds[i]];
  }
}

// Shuffle the rounds array on page load
shuffleRounds();

function restartGame() {
  currentRound = 0;
  shuffleRounds();
  initializeGame();
  document.getElementById("play-again-button").style.display = "none";
}

// Initialize the game
function initializeGame() {
  if (currentRound < rounds.length) {
    const round = rounds[currentRound];
    document.getElementById("blurred-image").src = round.image;
    document.getElementById("message").textContent = `Round ${
      currentRound + 1
    }: Guess which Olympian it is!`;
    document.getElementById("guess-input").value = "";
    document.getElementById("guess-input").disabled = false;
    document.getElementById("submit-button").disabled = false;
    document.getElementById("next-round-button").style.display = "none";
    attempts = 0;
  } else {
    document.getElementById("message").textContent =
      "Game over! You've completed all rounds.";
    document.getElementById("guess-input").disabled = true;
    document.getElementById("submit-button").disabled = true;
    document.getElementById("next-round-button").style.display = "none";
    document.getElementById("play-again-button").style.display = "inline-block";
  }
}

// Function to check the user's guess
function checkGuess() {
  const userGuess = document.getElementById("guess-input").value.toLowerCase();
  const messageElement = document.getElementById("message");
  const imageElement = document.getElementById("blurred-image");
  const correctAnswer = rounds[currentRound].answer.toLowerCase();

  attempts++;

  if (userGuess === correctAnswer) {
    messageElement.textContent = "Congratulations! You guessed right!";
    imageElement.classList.add("revealed");
    endRound();
  } else {
    if (attempts < maxAttempts) {
      messageElement.textContent = `Wrong guess! You have ${
        maxAttempts - attempts
      } attempts left.`;
    } else {
      messageElement.textContent = `Sorry, you're out of attempts! The correct answer was "${correctAnswer}".`;
      imageElement.classList.add("revealed");
      endRound();
    }
  }
}

// Function to end the round and show the Next Round button
function endRound() {
  document.getElementById("guess-input").disabled = true;
  document.getElementById("submit-button").disabled = true;
  document.getElementById("next-round-button").style.display = "inline-block";
}

// Function to move to the next round
function nextRound() {
  currentRound++;
  const imageElement = document.getElementById("blurred-image");
  imageElement.classList.remove("revealed");
  initializeGame();
}

// Start the game
initializeGame();
