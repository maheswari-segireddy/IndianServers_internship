document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    const scoreElement = document.getElementById('current-score');
    const highScoreElement = document.getElementById('high-score');
    const finalScoreElement = document.getElementById('final-score');
    
    const startOverlay = document.getElementById('start-overlay');
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    // Game constants
    const tileSize = 20;
    const tileCountX = canvas.width / tileSize;
    const tileCountY = canvas.height / tileSize;
    
    // Game variables
    let snake = [];
    let velocityX = 0;
    let velocityY = 0;
    let foodX;
    let foodY;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameLoop;
    let isGameOver = false;
    let isPlaying = false;
    let speed = 10; // fps

    // Initialize UI
    highScoreElement.textContent = highScore;

    // Control buttons
    document.getElementById('btn-up').addEventListener('click', () => changeDirection({ key: 'ArrowUp' }));
    document.getElementById('btn-down').addEventListener('click', () => changeDirection({ key: 'ArrowDown' }));
    document.getElementById('btn-left').addEventListener('click', () => changeDirection({ key: 'ArrowLeft' }));
    document.getElementById('btn-right').addEventListener('click', () => changeDirection({ key: 'ArrowRight' }));

    // Keyboard events
    document.addEventListener('keydown', changeDirection);

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    function initGame() {
        // Initial snake position (middle)
        const startX = Math.floor(tileCountX / 2);
        const startY = Math.floor(tileCountY / 2);
        
        snake = [
            { x: startX, y: startY },
            { x: startX, y: startY + 1 },
            { x: startX, y: startY + 2 }
        ];
        
        velocityX = 0;
        velocityY = -1; // moving up initially
        score = 0;
        speed = 10;
        isGameOver = false;
        
        updateScore();
        placeFood();
    }

    function startGame() {
        startOverlay.classList.add('hidden');
        gameOverOverlay.classList.add('hidden');
        initGame();
        isPlaying = true;
        
        if (gameLoop) clearTimeout(gameLoop);
        draw();
    }

    function gameOver() {
        isGameOver = true;
        isPlaying = false;
        clearTimeout(gameLoop);
        
        finalScoreElement.textContent = score;
        gameOverOverlay.classList.remove('hidden');
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            highScoreElement.textContent = highScore;
        }
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    function placeFood() {
        // Keep generating random coordinates until finding one not on the snake
        let validPosition = false;
        while (!validPosition) {
            foodX = Math.floor(Math.random() * tileCountX);
            foodY = Math.floor(Math.random() * tileCountY);
            
            validPosition = true;
            for (let part of snake) {
                if (part.x === foodX && part.y === foodY) {
                    validPosition = false;
                    break;
                }
            }
        }
    }

    function changeDirection(event) {
        if (!isPlaying) return;

        const up = 38;
        const down = 40;
        const left = 37;
        const right = 39;
        
        const key = event.keyCode || event.key;
        
        // Prevent default scrolling for arrow keys
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(key) > -1 || 
           [37, 38, 39, 40, 32].indexOf(event.keyCode) > -1) {
            if(event.preventDefault) event.preventDefault();
        }

        const goingUp = velocityY === -1;
        const goingDown = velocityY === 1;
        const goingRight = velocityX === 1;
        const goingLeft = velocityX === -1;

        if ((key === 'ArrowLeft' || key === left || key === 'a' || key === 'A') && !goingRight) {
            velocityX = -1;
            velocityY = 0;
        }
        if ((key === 'ArrowUp' || key === up || key === 'w' || key === 'W') && !goingDown) {
            velocityX = 0;
            velocityY = -1;
        }
        if ((key === 'ArrowRight' || key === right || key === 'd' || key === 'D') && !goingLeft) {
            velocityX = 1;
            velocityY = 0;
        }
        if ((key === 'ArrowDown' || key === down || key === 's' || key === 'S') && !goingUp) {
            velocityX = 0;
            velocityY = 1;
        }
    }

    function moveSnake() {
        // Create new head
        const head = { 
            x: snake[0].x + velocityX, 
            y: snake[0].y + velocityY 
        };

        // Wall Collision
        if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
            gameOver();
            return;
        }

        // Self Collision
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }

        snake.unshift(head); // Add new head

        // Check food collision
        if (head.x === foodX && head.y === foodY) {
            score += 10;
            updateScore();
            placeFood();
            
            // Increase speed slightly
            if (score % 50 === 0 && speed < 25) {
                speed += 1;
            }
        } else {
            snake.pop(); // Remove tail if no food eaten
        }
    }

    function drawScreen() {
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Grid Lines (light theme)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += tileSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += tileSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // Draw Food
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        ctx.fillStyle = '#ef4444';
        // Add a slight padding so food isn't exactly tile size
        ctx.fillRect(foodX * tileSize + 2, foodY * tileSize + 2, tileSize - 4, tileSize - 4);
        
        // Draw Snake
        snake.forEach((part, index) => {
            if (index === 0) {
                // Head
                ctx.shadowBlur = 6;
                ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
                ctx.fillStyle = '#10b981';
            } else {
                // Body
                ctx.shadowBlur = 4;
                ctx.shadowColor = 'rgba(52, 211, 153, 0.3)';
                ctx.fillStyle = '#34d399';
            }
            
            // Inner fill
            ctx.fillRect(part.x * tileSize + 1, part.y * tileSize + 1, tileSize - 2, tileSize - 2);
        });

        // Reset shadow for next frame
        ctx.shadowBlur = 0;
    }

    function draw() {
        if (isGameOver) return;
        
        moveSnake();
        if (isGameOver) return; // check again after moving
        
        drawScreen();
        
        gameLoop = setTimeout(draw, 1000 / speed);
    }
    
    // Initial draw (just background)
    drawScreen();
});
