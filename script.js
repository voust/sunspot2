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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawLevel() {
    const level = levels[currentLevel];
    for (const hole of level.holes) {
        ctx.fillStyle = "#f0f0f0"; // Same color as background
        ctx.fillRect(hole.x, hole.y, hole.width, hole.height);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawLevel();
    x += dx;
    y += dy;

    // Boundary checks
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Check for level completion
    if (y + dy > canvas.height) {
        currentLevel++;
        if (currentLevel >= levels.length) {
            // Game over (you win!)
            alert("You win!");
            return;
        }
        x = canvas.width / 2;
        y = ballRadius;
    }

    // Check for hole collisions
    const level = levels[currentLevel];
    for (const hole of level.holes) {
        if (x > hole.x && x < hole.x + hole.width &&
            y + ballRadius > hole.y && y < hole.y + hole.height) {
            // Ball fell through a hole
            y = hole.y - ballRadius;
            dy = 2; // Reset vertical speed
            break;
        }
    }

    // Game over if ball misses a hole
    if (y + ballRadius > canvas.height && !level.holes.some(hole => x > hole.x && x < hole.x + hole.width &&
        y + ballRadius > hole.y && y < hole.y + hole.height)) {
        alert("Game Over!");
        return;
    }

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowLeft':
            dx = -2;
            break;
        case 'ArrowRight':
            dx = 2;
            break;
    }
});

draw();
