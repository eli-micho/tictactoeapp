const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//Update Current Player Turn
const currentTurn = (currentPlayer) => {
    if(currentPlayer == 'X'){
        document.querySelector('#cp1').style.display = 'inline-block';
        document.querySelector('#cp2').style.display = 'none';
    }else{
        document.querySelector('#cp1').style.display = 'none';
        document.querySelector('#cp2').style.display = 'inline-block';
    }
};

//Create Gameboard
const gameBoard = (() => {
    const gameState = ['','','','','','','','',''];

    const winMessage = 'Game Over! You have won!';
    
    const drawMessage = "It's a draw!";

    const board = document.querySelector('.board');

    for(let i = 0; i <= 8; i++){
        const boardSquare = document.createElement('div')

        boardSquare.classList.add('square');
        boardSquare.setAttribute('id', `${i}`);
        board.appendChild(boardSquare);
    }

    return { winMessage, drawMessage, gameState, board };
})();

//Control Player Actions and Game State
const displayController = (() => {

    let currentPlayer = 'X';
    const statusDisplay = document.getElementById('statusMessage');

    const handleTurn = (targetCell, index) => {
        gameBoard.gameState[index] = currentPlayer;
        targetCell.innerHTML = currentPlayer;
        handleWinCondition()
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        currentTurn(currentPlayer)
    };

    const handleWinCondition = () => {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winConditions[i];
            let a = gameBoard.gameState[winCondition[0]];
            let b = gameBoard.gameState[winCondition[1]];
            let c = gameBoard.gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = gameBoard.winMessage;
            return;
        }

        let roundDraw = !gameBoard.gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = gameBoard.drawMessage;
            return;
        }

        handlePlayerChange();
    }
    
    return currentPlayer, { statusDisplay, handleTurn };

})();


//Reset Game 
const handleResetGame = () => {
    gameBoard.gameState = ['','','','','','','','',''];
    displayController.currentPlayer = 'X';
    displayController.statusDisplay.innerHTML = '';
    currentTurn(displayController.currentPlayer)
    document.querySelectorAll('.square').forEach(el => el.innerHTML = '')
}

//Event Listeners
document.addEventListener('click', function(e){
    if(e.target && e.target.className == 'square'){
        const targetCell = e.target
        const index = e.target.id;

        if(gameBoard.gameState[index] !== '') return false;

        displayController.handleTurn(targetCell, index)

    }

    if(e.target && e.target.className == 'resetBtn'){
        handleResetGame()
    }
})
