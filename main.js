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

// Get the User paddle element
const userPaddle = document.querySelector('.player-paddle');

// The Y Position and Velocity of the User Paddle
let userPaddleYPosition;
let userPaddleYVelocity;

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

// Boolean for Computer Paddle Direction
let computerPaddleUp;

// Boolean for User Paddle Direction
let userPaddleUp;

/*/////////////////////////*/
/*/////   FUNCTIONS   /////*/
/*/////////////////////////*/

// Ball Function
function sendBall(xPos, xVel, paddleDir){
    //Ball Position at Start and velocity
    ballXPosition = xPos;
    ballXVelocity = xVel;
    if (paddleDir === true){
        ballYVelocity = -2;
    } else {
        ballYVelocity = 2;
    }

    // The x & y position & velocity of the ball at gameStart
    ballYPostion = getBallStartPosition() + computerPaddleYPosition;
    ball.style.top = `${ballYPostion}px`;
}

// Intialize Function
function initialize(){

    // The y position of user paddle
    userPaddleYPosition = 200;
    userPaddle.style.top = `${userPaddleYPosition}px`;

    // The y postion & velocity of the computer paddle
    computerPaddleYPosition = getComputerPaddlePosition();
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    computerPaddleYVelocity = getRandomVelocity();
    if (computerPaddleYVelocity > 0){
        computerPaddleUp = false;
    } else {
        computerPaddleUp = true;
    }
    
    sendBall(658, -2, computerPaddleUp);

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
        computerPaddleYVelocity = -5;
        computerPaddleUp = true;
    }

    // Send the Paddle Back Down after it reaches the top of the Game Area
    if (computerPaddleYPosition <= 0){
        computerPaddleYPosition = 0;
        computerPaddleYVelocity = 5;
        computerPaddleUp = false;
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
    if (ballXPosition === 0){
        sendBall(658, -2, computerPaddleUp);
    }

    if (ballXPosition >= 700){
        sendBall(22, 2, userPaddleUp);
    }

    //Bounce the ball if the ball hits top or bottom boundary
    if (ballYPostion <= 0){
        ballYVelocity = 2;
    }

    if (ballYPostion >= 480){
        ballYVelocity = -2;
    }

    //Bounce the ball if the ball hits User Paddle
    if (ballXPosition === 20 && ballYPostion >= userPaddleYPosition && ballYPostion <= (userPaddleYPosition + 100)){
        ballXVelocity = 2;
        if (userPaddleUp === true){
            ballYVelocity = -2;
        } else{
            ballYVelocity = 2;
        }
    }

    //Bounde the ball if the ball hits the computer paddle
    if (ballXPosition === 660 && ballYPostion >= computerPaddleYPosition && ballYPostion <= (computerPaddleYPosition + 100)){
        ballXVelocity = -2;
        if (computerPaddleUp === true){
            ballYVelocity = -2;
        } else {
            ballYVelocity = 2;
        }
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
        return 5;
    } else {
        return -5;
    }
}

function getBallStartPosition(){
    return getRandomNumber(101)
}

function userArrow(event){
    if (event.key === 'ArrowUp'){
        if (userPaddleYPosition >= 1){
            userPaddleUp = true;
            userPaddleYVelocity = -5;
            userPaddleYPosition = userPaddleYPosition + userPaddleYVelocity;
            userPaddle.style.top = `${userPaddleYPosition}px`;
        }
    } else if (event.key === 'ArrowDown'){
        if (userPaddleYPosition <= 399){
            userPaddleUp = false;
            userPaddleYVelocity = 5;
            userPaddleYPosition = userPaddleYPosition + userPaddleYVelocity;
            userPaddle.style.top = `${userPaddleYPosition}px`;

        }
    }
}

// I THOUGHT I NEEDED TO DO SOME TRIG OR SOMETHING WITH ANGLES BUT MAYBE I DON'T???
// function getBallYVelocity(pos){
//     pos = Math.abs(pos - 50);
//     pos = ((pos/50)*2)+Math.random();
//     console.log(pos);
//     return pos
// }

// function getBallXAngle(pos){
//     if (pos === 0)
// }

/*///////////////////////////////*/
/*/////   Event Listeners   /////*/
/*///////////////////////////////*/

window.addEventListener("keydown", userArrow);

/*////////////////////////*/
/*/////   RUN CODE   /////*/
/*////////////////////////*/

// Start of the Game
initialize();

// Call the update() function every 35ms
setInterval(update, 35);
