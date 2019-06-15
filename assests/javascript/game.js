var secretWords = ["ketel", "goose", "ciroc", "belvedere", "reyka", "chopin", "smirnoff", "absolut", "hanger",
"stolichnaya", "skyy", "pinnacle", "titos", "dixie", "svedka", "tovaritch", "wheatley", "chase", "wyborowa",
"valt", "kirkland", "deepeddy", "midwest", "wave", "silver", "selfish", "woltzs"];

const triesLeft = 13;     //max # of tries a player has

var lettersGuessed = [];     //letters guessed storage
var indexedWord;     //the index in the array for the current word
var buildingWord = [];     //must equal matchWord
var guessesLeft = 0;     //tries left to guess
var startUp = false;     //game has started
var endGame = false;     //game is over
var wins = 0;     //total of wins

function nextGame() {
    guessesLeft = triesLeft;
    startUp = false;
//start of a new game
indexedWord = Math.floor(Math.random() * (secretWords.length));
lettersGuessed = [];
buildingWord = [];
console.log(lettersGuessed);
//the computer picks a new word to use from secretWords array
//and displays a win or lose picture and the scoreboard
for (var i = 0; i < secretWords[indexedWord].length; i++) {
    buildingWord.push("_");
}
document.getElementById("tryAgain").style.cssText = "display: none";
document.getElementById("gameover-pic").style.cssText = "display: none";
document.getElementById("winner-pic").style.cssText = "display: none";

displayScore();
};

function displayScore() {
    document.getElementById("wins").innerText = wins;
    document.getElementById("matchWord").innerText = "";
    for (var i = 0; i < buildingWord.length; i++) {
        document.getElementById("matchWord").innerText += buildingWord[i];
    }
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    if (guessesLeft <= 0) {
        document.getElementById("gameover-pic").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText = "display: block";
        endGame = true;
    }
};
document.onkeydown = function (event) {
    if (endGame) {
        nextGame();
        endGame = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            userGuess(event.key.toLowerCase());
        }
    }
};
//if it's the end of the game, then the computer will reset
//when the user hits any key
//event.keycode---> THANK YOU CSS TRICKS!!!
function userGuess(letter) {
    if (guessesLeft > 0) {
        if (!startUp) {
            startUp = true;
        }
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            check(letter);
        }
    }
    displayScore();
    winnersFlag();
};
//scoreboard check and make sure we use a key only once
function check(letter) {
    var letterPos = [];
    for (var i = 0; i < secretWords[indexedWord].length; i++) {
        if (secretWords[indexedWord][i] === letter) {
            letterPos.push(i);
        }
    }
    if (letterPos.length <= 0) {
        guessesLeft--;
    } else {
        for (var i = 0; i < letterPos.length; i++) {
            buildingWord[letterPos[i]] = letter;
        }
    }
};
function winnersFlag() {
    if (buildingWord.indexOf("_") === -1) {
        document.getElementById("winner-pic").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText = "display: block";
        wins++;
        endGame = true;
    }
};