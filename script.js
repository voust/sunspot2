const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
let x = canvas.width / 2;
let y = ballRadius;
let dx = 2;
let dy = 2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
    
    // Boundary checks
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            
            break;
        case 'ArrowRight':
            
            break;
    }
});

draw();
