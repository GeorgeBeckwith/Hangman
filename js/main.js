//Run the html before the javascript put javascript at the bottom of the page.
//Add an array with the words in.
var words = ['Blue', 'Red', 'Yellow', 'Green', 'Orange', 'Purple', 'Pink', 'White', 'Black', 'Grey']

//Randomise the variables for output.
var targetWord = words[Math.floor(Math.random() * words.length)];

//console.log("Target word: " + targetWord)
//Splits the word into an array of each character.
var targetWordState = targetWord.toLowerCase().split("");

var notInWord = ""
//Find number of letters.
//console.log("Target Word Length: " + targetWord.length)

//Define variable at top only prosess once. 
var guessCount = 0;

//Add for each loop for all letters in word.
var gameWord = "";

for (var i = 0; i < targetWord.length; i++) {
    //Replaces the word with underscores.
    gameWord += "_";
};

//Use outside the for loop.
document.getElementById("letters-container").innerHTML = gameWord;

//Lives remainng.
livesRemaining = (6 - guessCount)





//Output the users input and link to function checkGuess.
function userGuess() {
    var input = document.getElementById("userGuess")
    
    //console.log("Input Character: " + input.value)
    
    checkGuess(input.value)

    //Clear userGuess.
    document.getElementById('userGuess').value = '';
}

//Make the enter button submit the text field.
document.getElementById("userGuess").addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        //console.log("")

        userGuess()
    }
});

//Check to where the users guess is in the word and out put the index to the console.
function checkGuess(guess) {

    //Test lowercase word against lowercase guess.
    //Hint: use https://www.w3schools.com/jsref/jsref_tolowercase.asp
    var lowercaseGuess = guess.toLowerCase();
    var guessIndex = targetWordState.indexOf(lowercaseGuess);

    //console.log("Guess Index: " + guessIndex)

    if (guessIndex > -1)
    {
        //Check off letters from targetState
        targetWordState[guessIndex] = null;

        //Set char at on game word (guessIndex) to be guess.
        gameWord = setCharAt(gameWord, guessIndex, guess)
        
        //Update the game word with the letter that the user has guessed.
        //console.log("Updated gameWord: " + gameWord)

        //Set innerHTML of letters container to be gameWord.
        document.getElementById("letters-container").innerHTML = gameWord;

        // CHECK TO SEE IF GAME HAS BEEN WON
        document.getElementById("lives-remain").innerHTML = (6 - guessCount);
        document.getElementById("lives-used").innerHTML = guessCount;

        if (gameWord.toLowerCase() == targetWord.toLowerCase()){
            document.getElementById("gameWon").innerHTML = "Game Won!";

            textStop()
        }
    } else {
        //Make the guessCount increment every time that the user gets a letter wrong.
        guessCount = guessCount + 1;
        //console.log("Lives used: " + guessCount)

            notInWord = notInWord + guess;
            document.getElementById("failedChar").innerHTML = "Used Characters: " + notInWord;

        //When the user gets 6 attempts wrong it will end the game.
        document.getElementById("lives-remain").innerHTML = (6 - guessCount);
        document.getElementById("lives-used").innerHTML = guessCount;

        if (guessCount == 6) {
            document.getElementById("gameLost").innerHTML = "Game Lost!";

            textStop()

        }
    }
}

//The index that the user has guessed is then replaced with a underscore call at setCharAt (line: 73)
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
}

//Makes the text box unusable after the game has been won/lost.
function textStop() {
    if (guessCount == 6, gameWord == targetWord);
        document.getElementById("userGuess").disabled = true;
}