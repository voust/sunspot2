const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
let x = canvas.width / 2;
let y = ballRadius;
let dx = 2;
let dy = 2;

// Level data (example)
const levels = [
    { holes: [
        { x: 50, y: 100, width: 20, height: 20 },
        { x: 150, y: 100, width: 20, height: 20 },
        { x: 250, y: 100, width: 20, height: 20 }
    ] },
    { holes: [
        { x: 100, y: 100, width: 20, height: 20 },
        { x: 200, y: 100, width: 20, height: 20 }
    ] }
];

let currentLevel = 0;

// Create a Ball class
class Ball {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(hole) {
        if (this.x > hole.x && this.x < hole.x + hole.width &&
            this.y + this.radius > hole.y && this.y < hole.y + hole.height) {
            return true;
        }
        return false;
    }
}

// Create a Level class
class Level {
    constructor(holes) {
        this.holes = holes;
    }

    draw() {
        for (const hole of this.holes) {
            ctx.fillStyle = "#f0f0f0"; // Same color as background
            ctx.fillRect(hole.x, hole.y, hole.width, hole.height);
        }
    }

    checkCompletion(ball) {
        // Check if the ball has fallen through all holes
        return this.holes.every(hole => ball.checkCollision(hole));
    }
}

// Create a GameState object
const gameState = {
    ball: new Ball(canvas.width / 2, ballRadius, ballRadius, 2, 2),
    currentLevel: 0,
    levels: [
        new Level(levels[0].holes),
        new Level(levels[1].holes)
    ]
};

// Game loop
function gameLoop() {
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    gameState.ball.update();

    // Boundary checks
    if (gameState.ball.x + gameState.ball.dx > canvas.width - gameState.ball.radius ||
        gameState.ball.x + gameState.ball.dx < gameState.ball.radius) {
        gameState.ball.dx = -gameState.ball.dx;
    }

    // Check for level completion
    if (gameState.ball.y + gameState.ball.dy > canvas.height) {
        gameState.currentLevel++;
        if (gameState.currentLevel >= gameState.levels.length) {
            // Game over (you win!)
            alert("You win!");
            return;
        }
        gameState.ball.x = canvas.width / 2;
        gameState.ball.y = ballRadius;
    }

    // Check for hole collisions
    const currentLevel = gameState.levels[gameState.currentLevel];
    for (const hole of currentLevel.holes) {
        if (gameState.ball.checkCollision(hole)) {
            // Ball fell through a hole
            gameState.ball.y = hole.y - gameState.ball.radius;
            // Reset vertical speed
            gameState.ball.dy = 2;
            break;
        }
    }

    // Game over if ball misses a hole
    if (gameState.ball.y + gameState.ball.radius > canvas.height &&
        !currentLevel.holes.some(hole => gameState.ball.checkCollision(hole))) {
        alert("Game Over!");
        return;
    }
}

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.ball.draw();
    gameState.levels[gameState.currentLevel].draw();
}

document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowLeft':
            gameState.ball.dx = -2;
            break;
        case 'ArrowRight':
            gameState.ball.dx = 2;
            break;
    }
});

gameLoop();
