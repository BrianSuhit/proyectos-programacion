// HTML Elements
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pauseButton');
const gameOverSign = document.getElementById('gameOver');

// Game Settings
const boardSize = 10;
const gameSpeed = 100;

const squareTypes = 
{
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};

const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
};

// Game Variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;
let isPaused = false;


const drawSnake = () => {
    snake.forEach( square => drawSquare(square, 'snakeSquare'));
}

const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
    const [row, column] = newSquare.split('');

    if
    ( newSquare < 0 || 
        newSquare > boardSize * boardSize  ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9 ||
        boardSquares[row][column] === squareTypes.snakeSquare) ) {
        gameOver();
    } 
        else 
        {
            snake.push(newSquare);
            if(boardSquares[row][column] === squareTypes.foodSquare) 
            {
                addFood();
            } 
                else 
                {
                    const emptySquare = snake.shift();
                    drawSquare(emptySquare, 'emptySquare');
                }
                drawSnake();
        }
}


const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval)
    startButton.disabled = false;
    pauseButton.disabled = true;
}


const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}


// Rellena cada cuadrado del tablero
// @params 
// square: posicion del cuadrado,
// type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)
const drawSquare = (square, type) => {
    const [ row, column ] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if(type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        if(emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}


const createBoard = () => {
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnndex) => {
            const squareValue = `${rowIndex}${columnndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })
}


const setDirection = newDirection => {
    direction = newDirection;
}

const directionEvent = key => {
    switch (key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
    }
}


const updateScore = () => {
    scoreBoard.innerText = score;
}

const createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}


const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}


const startGame = () => {
    setGame();
        gameOverSign.style.display = 'none';
    startButton.disabled = true;
    pauseButton.disabled = false; 
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
    isPaused = false;
    pauseButton.innerText = 'Pausar'; 
}


const togglePause = () => {
    if (isPaused) {
        // Reanudar el juego
        moveInterval = setInterval(() => moveSnake(), gameSpeed);
        pauseButton.innerText = 'Pausar';
    } else {
        // Pausar el juego
        clearInterval(moveInterval);
        pauseButton.innerText = 'Continuar';
    }
    isPaused = !isPaused; // Cambia el estado de pausa
}

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', togglePause);