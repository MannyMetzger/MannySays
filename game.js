// Array for colors
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

// Create variable to keep track of the level
var level = 0;

// Detect if the game has started. Keyboard key needs to be pressed.
var started = false;

// Detect if keyboard keypress has been completed
$(document).keypress(function () {
    if (!started) {
        // Change h1 to say 'Level 0' when the game starts
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    // Reset the user's pattern for the next level
    userClickedPattern = [];

    // Increase the level by 1 every time nextSequence() is called
    level++;

    // Update h1 with this change
    $('#level-title').text('Level ' + level);

    // Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4); // Generates between 0 to 3

    // Create a new variable to select a random colour
    var randomChosenColour = buttonColours[randomNumber];

    // Add the random chosen colour to the end of the gamePattern array
    gamePattern.push(randomChosenColour);

    // Use jQuery to select the button with the same id as the randomChosenColour
    // Animate fade out and in
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // Play sound for the button selected
    playSound(randomChosenColour);
}

// Function to play sound based on color name
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Detect when button is clicked
$('.btn').click(function () {
    // Create var to store the ID of the clicked button
    var userChosenColour = $(this).attr('id');

    // Add the clicked color to the userClickedPattern array
    userClickedPattern.push(userChosenColour);

    // Play sound for the clicked button
    playSound(userChosenColour);

    // Add animation to the button press
    animatePress(userChosenColour);

    // Call checkAnswer with the index of the last clicked element
    checkAnswer(userClickedPattern.length - 1);
});

// Function to animate button press
function animatePress(currentColour) {
    // Add the "pressed" class
    $('#' + currentColour).addClass('pressed');

    // Remove the "pressed" class after 100 milliseconds
    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    // If the user's most recent answer matches the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('Success');

        // Check if the user has finished the sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence after a 1000 millisecond delay
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // If the answer is wrong
        console.log('Wrong');

        // Step 9.1: Play the wrong sound
        playSound('wrong');

        // Step 9.2: Add the "game-over" class to the body and remove it after 200 milliseconds
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        // Step 9.3: Change the h1 title to indicate game over and how to restart
        $('#level-title').text('Game Over, Press Any Key to Restart');

        // Restart the game
        startOver();
    }
}

// Function to reset the game variables when the user restarts
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
