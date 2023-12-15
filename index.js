
const hangmanParts = document.getElementsByClassName("parts");
const words = ['javascript', 'programming', 'hangman', 'developer', 'openai', 'react' , 'node', 'express'];
let selectedWord, wrongGuessCount = 0;
let correctGuessCount = 0;
const maxGuess = 6;
let guessed = document.querySelectorAll(".guessed");
let guessedLetters = [];
let remainingAttempts = 6;
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
guessInput.addEventListener("keypress", function(e){
  if(e.key == "Enter"){
    e.preventDefault();
    guessButton.click();
  }
})

const getRandomWord = () => {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord);
  const wordDisplay = document.getElementById('wordDisplay');
  wordDisplay.innerHTML = selectedWord.split("").map(() => `<li class="letter">_</li>`).join("");
}

function setWinBackgroundColor() {
  document.body.style.backgroundColor = 'green';
  guessButton.disabled = true;
  guessInput.disabled = true;
}

function setLossBackgroundColor() {
  document.body.style.backgroundColor = 'red';
  guessButton.disabled = true;
  guessInput.disabled = true;
}


function checkWin() {
 
    wordDisplay.textContent = 'Congratulations! You won!';


  
}

function checkLoss() {

    wordDisplay.textContent = 'Game over! You lost.';
 
  
}

getRandomWord();


function checkGuess(){
  let guessedValue = guessInput.value;
  if(!guessedLetters.includes(guessedValue.toLowerCase())){
    guessedLetters.push(guessedValue.toLowerCase());
    console.log(guessedLetters);
  }
  includeGuess();
  guessInput.value = "";
  if(selectedWord.includes(guessedValue.toLowerCase())){
    console.log(guessedValue, " is exist.");
    [...selectedWord].forEach((letters, idx) => {
      if(letters === guessedValue){
        wordDisplay.querySelectorAll("li")[idx].innerText = letters.toLowerCase();
        wordDisplay.querySelectorAll("li")[idx].classList.add("guessed");
        correctGuessCount++;
        guessed = document.querySelectorAll(".guessed");
        console.log(guessed.length, "Guessed length");
      }
    })
  }else{
    console.log(guessed, " is not exist.");
    hangmanParts[wrongGuessCount].classList.remove("hide");
    wrongGuessCount++;  
    console.log(wrongGuessCount);  
  }
  if(wrongGuessCount === maxGuess){
    setLossBackgroundColor();
    checkLoss();
    return;
  }
  if(guessed.length === selectedWord.length){
    console.log(guessed);
    setWinBackgroundColor();
    checkWin();
    return;
  }
}

function includeGuess(){
  const guessesId = document.getElementById("guessesId");
  let ans= "";
  guessedLetters.forEach((letter) => {
    ans += letter + ", ";
  });
  guessesId.innerHTML = `Guesses: <span id="guesses">${ans}</span>`; 
}