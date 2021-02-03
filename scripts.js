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

    const board = document.querySelector('.board');

    for(let i = 0; i <= 8; i++){
        const boardSquare = document.createElement('div')

        boardSquare.classList.add('square');
        boardSquare.setAttribute('id', `${i}`);
        board.appendChild(boardSquare);
    }

    return { gameState, board };
})();

const displayController = (() => {

    let currentPlayer = 'X';
    
    const handleTurn = (targetCell, index) => {
        gameBoard.gameState[index] = currentPlayer;
        targetCell.innerHTML = currentPlayer;
        handlePlayerChange()
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        currentTurn(currentPlayer)
    }
    
    return currentPlayer, { handleTurn };

})();


//ResetGame 

const handleResetGame = () => {
    gameBoard.gameState = ['','','','','','','','',''];
    displayController.currentPlayer = 'X';
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

/* const reset = document.querySelector('.resetBtn')
reset.addEventListener('onclick', ) */
