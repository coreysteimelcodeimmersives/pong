/*/////////////////////////*/
/*/////   VARIABLES   /////*/
/*/////////////////////////*/

// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');

// The y-velocity of the computer paddle
let computerPaddleYPosition;
let computerPaddleYVelocity;

// Get the bal element
const ball = document.querySelector('.ball');

// The x position of the ball
let ballXPosition;

// The x velocity of the ball
let ballXVelocity;

// The y position of the ball
let ballYPostion;

// The y velocity of the ball
let ballYVelocity;

// Boolean for who is starting
let computerStart;

/*/////////////////////////*/
/*/////   FUNCTIONS   /////*/
/*/////////////////////////*/

// Intialize Function
function gameStart(){

    // The y postion & velocity of the computer paddle
    computerPaddleYPosition = getComputerPaddlePosition();
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    computerPaddleYVelocity = getRandomVelocity();
    
    // The x & y position & velocity of the ball at gameStart
    ballXPosition = 660;
    ball.style.left = `${ballXPosition}px`;
    if (computerStart === true){
        ballXVelocity = -1
    } else {
        ballXVelocity = 1;
    }
     
    ballYPostion = getBallStartPosition() + computerPaddleYPosition;
    ball.style.top = `${ballYPostion}px`;
    ballYVelocity = getRandomVelocity();
    
}

// Update the pong world
function update() {

    // Update the computer paddle's position
    computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity;

    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;

    // Send the Paddle Back Up after it reaches the bottom of the Game Area
    if (computerPaddleYPosition >= 400){
        computerPaddleYPosition = 400;
        computerPaddleYVelocity = -1;
    }

    // Send the Paddle Back Down after it reaches the top of the Game Area
    if (computerPaddleYPosition <= 0){
        computerPaddleYPosition = 0;
        computerPaddleYVelocity = 1;
    }

    // Update the ball x velocity
    ballXPosition += ballXVelocity;

    // Apply the x position
    ball.style.left = `${ballXPosition}px`;

    // Update the ball y velocity
    ballYPostion += ballYVelocity;

    // Apply the y position
    ball.style.top = `${ballYPostion}px`;

    //Restart the Game if the ball go past left or right boundary
    if (ballXPosition <= 0){
        gameStart();
    }

    if (ballXPosition >= 700){
        gameStart();
    }

    //Bounce the ball if the ball hits top or bottom boundary
    if (ballYPostion <= 0){
        ballYVelocity = 1;
    }

    if (ballYPostion >= 480){
        ballYVelocity = -1;
    }
    
}

function getRandomNumber(max){
    return Math.floor(Math.random()*max);
}

function getComputerPaddlePosition(){
    return getRandomNumber(401);
}

function getRandomVelocity(){
    let computerVelocity = getRandomNumber(2);
    if(computerVelocity === 1){
        return 1;
    } else {
        return -1;
    }
}

function getBallStartPosition(){
    return getRandomNumber(101)
}

/*/////////////////////////*/
/*/////   RUN CODE.   /////*/
/*/////////////////////////*/

// Start of the Game
computerStart = true;
gameStart();

// Call the update() function every 35ms
setInterval(update, 35);
