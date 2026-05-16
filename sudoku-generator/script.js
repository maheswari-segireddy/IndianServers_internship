document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('sudoku-board');
    const difficultySelect = document.getElementById('difficulty');
    const newGameBtn = document.getElementById('new-game-btn');
    const solveBtn = document.getElementById('solve-btn');
    const statusMessage = document.getElementById('status-message');

    let solutionBoard = [];
    let currentBoard = [];

    // Difficulty settings: number of cells to remove
    const difficultyLevels = {
        easy: 30,
        medium: 45,
        hard: 55,
        expert: 64
    };

    // Initialize an empty 9x9 board
    function createEmptyBoard() {
        return Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    // Check if it's safe to place a number in a given cell
    function isSafe(board, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }

        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }

        // Check 3x3 box
        let startRow = row - row % 3;
        let startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) return false;
            }
        }

        return true;
    }

    // Solve the board using backtracking
    function solveSudoku(board) {
        let emptySpot = findEmptySpot(board);
        if (!emptySpot) return true; // Solved

        let [row, col] = emptySpot;

        // Try numbers 1-9
        for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
                board[row][col] = num;

                if (solveSudoku(board)) return true;

                // Backtrack
                board[row][col] = 0;
            }
        }
        return false;
    }

    function findEmptySpot(board) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === 0) return [r, c];
            }
        }
        return null;
    }

    // Fill the diagonal 3x3 boxes randomly
    function fillDiagonal(board) {
        for (let i = 0; i < 9; i = i + 3) {
            fillBox(board, i, i);
        }
    }

    // Fill a 3x3 box randomly
    function fillBox(board, rowStart, colStart) {
        let num;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                do {
                    num = Math.floor(Math.random() * 9) + 1;
                } while (!isSafeInBox(board, rowStart, colStart, num));
                board[rowStart + i][colStart + j] = num;
            }
        }
    }

    function isSafeInBox(board, rowStart, colStart, num) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[rowStart + i][colStart + j] === num) return false;
            }
        }
        return true;
    }

    // Generate a full valid Sudoku board
    function generateSolution() {
        let board = createEmptyBoard();
        fillDiagonal(board);
        solveSudoku(board);
        return board;
    }

    // Remove digits to create the puzzle based on difficulty
    function generatePuzzle(solution, difficulty) {
        let puzzle = solution.map(row => [...row]);
        let cellsToRemove = difficultyLevels[difficulty];

        while (cellsToRemove > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);

            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
                cellsToRemove--;
            }
        }
        return puzzle;
    }

    // Render the board to the DOM
    function renderBoard(board) {
        boardElement.innerHTML = '';
        
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cellDiv = document.createElement('div');
                cellDiv.className = 'cell';

                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.dataset.row = r;
                input.dataset.col = c;

                if (board[r][c] !== 0) {
                    input.value = board[r][c];
                    input.readOnly = true;
                    input.classList.add('prefilled');
                } else {
                    input.value = '';
                    input.classList.add('user-input');
                    
                    // Input event listener for validation
                    input.addEventListener('input', handleInput);
                }

                cellDiv.appendChild(input);
                boardElement.appendChild(cellDiv);
            }
        }
    }

    function handleInput(e) {
        const input = e.target;
        const r = parseInt(input.dataset.row);
        const c = parseInt(input.dataset.col);
        const val = parseInt(input.value);

        // Clear classes
        input.classList.remove('incorrect', 'solved');

        // Allow clearing the cell
        if (!input.value) {
            currentBoard[r][c] = 0;
            checkWin();
            return;
        }

        // Validate 1-9
        if (isNaN(val) || val < 1 || val > 9) {
            input.value = '';
            currentBoard[r][c] = 0;
            return;
        }

        currentBoard[r][c] = val;

        // Check if correct against solution
        if (val !== solutionBoard[r][c]) {
            input.classList.add('incorrect');
        } else {
            checkWin();
        }
    }

    function checkWin() {
        let isWin = true;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (currentBoard[r][c] !== solutionBoard[r][c]) {
                    isWin = false;
                    break;
                }
            }
        }

        if (isWin) {
            statusMessage.textContent = 'Congratulations! You solved it!';
            statusMessage.classList.add('show');
            // Disable all inputs
            const inputs = document.querySelectorAll('.cell input');
            inputs.forEach(input => input.readOnly = true);
        }
    }

    function initGame() {
        statusMessage.classList.remove('show');
        const difficulty = difficultySelect.value;
        solutionBoard = generateSolution();
        currentBoard = generatePuzzle(solutionBoard, difficulty);
        renderBoard(currentBoard);
    }

    function solveGame() {
        const inputs = document.querySelectorAll('.cell input');
        inputs.forEach(input => {
            const r = parseInt(input.dataset.row);
            const c = parseInt(input.dataset.col);
            
            if (!input.readOnly) {
                input.value = solutionBoard[r][c];
                input.classList.remove('incorrect');
                input.classList.add('solved');
                currentBoard[r][c] = solutionBoard[r][c];
            }
            input.readOnly = true;
        });
        
        statusMessage.textContent = 'Puzzle Solved!';
        statusMessage.classList.add('show');
    }

    // Event Listeners
    newGameBtn.addEventListener('click', initGame);
    solveBtn.addEventListener('click', solveGame);
    difficultySelect.addEventListener('change', initGame);

    // Initialize first game
    initGame();
});
