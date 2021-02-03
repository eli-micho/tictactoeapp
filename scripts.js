//Global Variables

const gameboard = [];

//Create Player
/* const Player1 = () => {
    const playerMark = 'X'
    return { playerMark }
}

const Player2 = () => {
    const playerTurn = 
} */

const Player = (player) => {

    return player 
}

const player1 = Player('X');
const player2 = Player('O');

//Create Gameboard

const gameBoard = (() => {
    const board = document.querySelector('.board');

    for(let i = 0; i <= 8; i++){
        const boardSquare = document.createElement('div')

        boardSquare.classList.add('square');
        boardSquare.setAttribute('id', `${i}`);
        board.appendChild(boardSquare);
    }
    return { board };
  })();

function checkPlayerTurn(player) {
    if(player == player1){
        return takeTurn()
    }
}

const displayController = (() => {
    const startPlayer = player1;

    checkPlayerTurn(startPlayer);

})();



function takeTurn(where, player) {
   const turnSquare =  document.getElementById(`${where}`);
   turnSquare.textContent = `${player}`
}

//Event Listeners
document.addEventListener('click', function(e){
    if(e.target && e.target.className == 'square'){
        const where = e.target.id;
        const player = player1;

        takeTurn(where, player)
    }
})