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
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 1;

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
}

// Call the update() function every 35ms
setInterval(update, 35);
