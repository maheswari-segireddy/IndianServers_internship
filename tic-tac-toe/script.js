document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const currentPlayerIndicator = document.getElementById('current-player');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const scoreDrawElement = document.getElementById('score-draw');
    const restartBtn = document.getElementById('restart-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const winnerModal = document.getElementById('winner-modal');
    const winnerMessage = document.getElementById('winner-message');

    let gameState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    let scores = {
        X: 0,
        O: 0,
        Draws: 0
    };

    const winningConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left col
        [1, 4, 7], // middle col
        [2, 5, 8], // right col
        [0, 4, 8], // diagonal 1
        [2, 4, 6]  // diagonal 2
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (gameState[index] !== '' || !gameActive) {
            return;
        }

        placeMark(cell, index);
        checkWinOrDraw();
    }

    function placeMark(cell, index) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.classList.add('filled');
    }

    function checkWinOrDraw() {
        let roundWon = false;
        let winningLine = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                winningLine = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            handleWin(winningLine);
            return;
        }

        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            handleDraw();
            return;
        }

        swapTurns();
    }

    function handleWin(winningLine) {
        gameActive = false;
        
        // Highlight winning cells
        winningLine.forEach(index => {
            cells[index].classList.add('win-highlight');
        });

        scores[currentPlayer]++;
        updateScores();

        setTimeout(() => {
            winnerMessage.innerHTML = `Player <span class="${currentPlayer.toLowerCase()}-color">${currentPlayer}</span> Wins!`;
            winnerModal.classList.remove('hidden');
        }, 600);
    }

    function handleDraw() {
        gameActive = false;
        scores.Draws++;
        updateScores();

        setTimeout(() => {
            winnerMessage.textContent = "It's a Draw!";
            winnerModal.classList.remove('hidden');
        }, 500);
    }

    function swapTurns() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerIndicator.textContent = currentPlayer;
        
        if (currentPlayer === 'X') {
            currentPlayerIndicator.className = 'x-color';
        } else {
            currentPlayerIndicator.className = 'o-color';
        }
    }

    function updateScores() {
        scoreXElement.textContent = scores.X;
        scoreOElement.textContent = scores.O;
        scoreDrawElement.textContent = scores.Draws;
    }

    function restartGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        
        currentPlayerIndicator.textContent = currentPlayer;
        currentPlayerIndicator.className = 'x-color';

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'filled', 'win-highlight');
        });

        winnerModal.classList.add('hidden');
    }

    // Event Listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
    playAgainBtn.addEventListener('click', restartGame);
});
