// Gameboard module
const GB = (function Gameboard() {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Function to render the game board
  const render = () => {
    let boardHtml = "";
    gameBoard.forEach((square, index) => {
      boardHtml += `<div class="square" id="${index}">${square}</div>`;
    });//by putting ${square} as the text that should appear it will print the value of whats inside the array item
    document.querySelector("#myGameBoard").innerHTML=boardHtml;

    const squares=document.querySelectorAll(".square");
    squares.forEach((square)=>{
      square.addEventListener("click",gameController.handleClick);
            });
};


const getGameBoard=()=>gameBoard;
const updateSquare=(index,value)=>{
   //coz its an array the symbol will shown in the cell as a value without the need for a textcontent
  gameBoard[index]=value;
  render();//call render again so it reloads the board to show updates
}
  return {
    render,
    updateSquare,
    getGameBoard
  };
})();

// Player factory
const createPlayers = (playerName, symbol) => {
  return { playerName, symbol };
};



// GameController module  holds the logic of
const gameController = (() => {
  let playersArray = [];
  let currentPlayerIndex;
  let gameover = false;

  // Function to start the game
  const start = () => {
    // Use push to add players to the array
    playersArray.push(createPlayers(document.querySelector('#player1').value, '0'));
    playersArray.push(createPlayers(document.querySelector('#player2').value, 'x'));
    currentPlayerIndex = 0;
    gameover = false;
    GB.render();
  };

  // Function to handle user's move
  const handleClick = (event) => {
    let index = parseInt(event.target.id);//when setting an id as num it will be stores as string so convert to num before using it
    if (GB.getGameBoard()[index] !== "") return;//by returning we are saying stop the execution if you try to press on a filled space
// event.target means listen yo the item/div thats been clicked 
    GB.updateSquare(index, playersArray[currentPlayerIndex].symbol);
   
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    if (checkForWin(GB.getGameBoard())) {
        gameover = true;
        alert(`${playersArray[currentPlayerIndex].playerName} won`);
    }else if (checkTie(GB.getGameBoard())) {
      gameover = true;
      alert(`TIE`)
    }
};


  const resetGame=()=>{
  for(let i=0;i<9;i++){
    GB.updateSquare(i,"");
  }
  GB.render();//call render again to reload with the updates made
  }
  
  return {
    start,
    handleClick,
    resetGame
  };
})();

function checkForWin(board) {
  // Set the possible combinations for winning
  const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // the first 3 accomodate for the how to win in a row
           // the rest  accomodate for the how to win in a in a colum and diagonally
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  for (let i = 0; i < winningCombo.length; i++) {
      const [a, b, c] = winningCombo[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
      }
  }

  return false;
}


function checkTie(board){
  return board.every(cell=>cell !=="")
}

// Event listener for the Start button
const startBtn = document.querySelector('#startBtn');
startBtn.addEventListener('click', gameController.start);

const resetBtn = document.querySelector('#endBtn');
resetBtn.addEventListener('click', gameController.resetGame);

