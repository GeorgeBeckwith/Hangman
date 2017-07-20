//Run the html before the javascript put javascript at the bottom of the page.
//Add an array with the words in.
    //var words = ['Blue', 'Red', 'Yellow', 'Green', 'Orange', 'Purple', 'Pink', 'White', 'Black', 'Grey']

//Hangman canvas
var c = document.getElementById("hangmanCanvas");
var canvasWidth = c.width
var canvasHeight = c.height
var headCenterY = 30
var headRadius = 15
var legEndY = 150
var armStartX = 100
var armStartY = 75
var armHeight = 75
//Randomise the variables for output.
    //var targetWord = words[Math.floor(Math.random() * words.length)];

//console.log("Target word: " + targetWord)
//Splits the word into an array of each character.

var notInWord = ""

//Define variable at top only prosess once. 
var guessCount = 0

//Add for each loop for all letters in word.
var gameWord = ""

//Use outside the for loop.

//Lives remainng.
livesRemaining = (11 - guessCount)


var targetWord = "";
var targetWordState = "";

//Make the enter button submit the text field.
document.getElementById("userGuess").addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
    //if (event.keyCode >= 65 && event.keyCode <= 90) {
    //console.log("Thats a letter")
        userGuess()
    }
    
});


function GetRandomWord() {
    console.log('Requesting Random Word');

    var requestStr = "http://setgetgo.com/randomword/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordReceived'
    });
}

function RandomWordReceived(data) {
    console.log('Random Word Recieved: ' + data.Word);

    targetWord = data.Word;
    targetWordState = targetWord.toLowerCase().split("");

    numberOfDuplicates()
    
    for (var i = 0; i < targetWord.length; i++) {
        //Replaces the word with underscores.
        gameWord += "_";
    };

    document.getElementById("letters-container").innerHTML = gameWord;
}

function numberOfDuplicates(guess) {
    var re = new RegExp(char);
    return string.match(re).length;
}

//Output the users input and link to function checkGuess.
function userGuess() {
    var input = document.getElementById("userGuess")

    checkGuess(input.value)

    //Clear userGuess.
    document.getElementById('userGuess').value = '';
}

//Check to where the users guess is in the word and out put the index to the console.
function checkGuess(guess) {

    //Test lowercase word against lowercase guess.
    var lowercaseGuess = guess.toLowerCase();
    var guessIndex = targetWordState.indexOf(lowercaseGuess);


    document.getElementById("usedWord").innerHTML  = "";
    //console.log("Guess Index: " + guessIndex)
    if (guessIndex > -1)
    {
        //Check off letters from targetState
        targetWordState[guessIndex] = null;

        //Set char at on game word (guessIndex) to be guess.
        gameWord = setCharAt(gameWord, guessIndex, guess)

        //Set innerHTML of letters container to be gameWord.
        document.getElementById("letters-container").innerHTML = gameWord;

        // CHECK TO SEE IF GAME HAS BEEN WON
        document.getElementById("lives-remain").innerHTML = (11 - guessCount);
        document.getElementById("lives-used").innerHTML = guessCount;

        if (gameWord.toLowerCase() == targetWord.toLowerCase()){
            document.getElementById("gameWon").innerHTML = "Game Won!";
            textStop()
        }
    } else {
        var letterAlreadyUsed = notInWord.indexOf(guess) 
        //console.log('Not in word is: ' + notInWord + " and the guess: " + guess + " has an index of: " + letterAlreadyUsed)           
        if (letterAlreadyUsed > -1) {
            document.getElementById("usedWord").innerHTML  = "That letter has been guessed already!";

        } else {

            //Make the guessCount increment every time that the user gets a letter wrong.
            functionsArray[guessCount]()
            guessCount = guessCount + 1;

            notInWord = notInWord + guess;
            document.getElementById("failedChar").innerHTML = "Used Characters: " + notInWord;

            //When the user gets 11 attempts wrong it will end the game.
            document.getElementById("lives-remain").innerHTML = (11 - guessCount);
            document.getElementById("lives-used").innerHTML = guessCount;

            if (guessCount == 11) {
                document.getElementById("answer").innerHTML = "The word was " + targetWord;
                document.getElementById("gameLost").innerHTML = "Game Lost!" ;
                textStop()
                }
            }
        }
    }

//The index that the user has guessed is then replaced with a underscore call at setCharAt (line: 78)
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
}

//Makes the text box unusable after the game has been won/lost.
function textStop() {
    if (guessCount == 11, gameWord == targetWord);
        document.getElementById("userGuess").disabled = true;
}

//Canvas Hangman
//
//Array of the canvas functions.
var functionsArray = [
    hangmanStandBottom,
    hangmanStandSide,
    hangmanStandTop,
    hangmanStandCorner,
    hangmanNoose,
    hangmanHead,
    hangmanBody,
    hangmanLeftLeg,
    hangmanRightLeg,
    hangmanLeftArm,
    hangmanRightArm
]

//Stand Bottom
function hangmanStandBottom(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(75, 200);
    ctx.stroke();
}

//Stand Side
function hangmanStandSide(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200, 0);
    ctx.stroke();
}

//Stand Top
function hangmanStandTop(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(200, 0);
    ctx.stroke();
}

//Stand Corner
function hangmanStandCorner(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(175, 0);
    ctx.lineTo(200, 20);
    ctx.stroke();
}

//Noose
function hangmanNoose(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, headCenterY - headRadius);
    ctx.stroke();
}

//Head
function hangmanHead(){
    var c = document.getElementById("hangmanCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(canvasWidth / 2,headCenterY,headRadius,0,2*Math.PI);
    ctx.stroke();
}

//Body
function hangmanBody(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, headCenterY + headRadius);
    ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
    ctx.stroke();
}

//Left Leg
function hangmanLeftLeg(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(70, legEndY);
    ctx.stroke();
}

//Right Leg
function hangmanRightLeg(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(130, legEndY);
    ctx.stroke();
}

//Left Arm
function hangmanLeftArm(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(70, armHeight);
    ctx.stroke();
}

//Right Arm
function hangmanRightArm(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(130, armHeight);
    ctx.stroke();
}

GetRandomWord()