// Gameboard module
const Gameboard = (() => {
    const gameBoard = Array(9).fill("");
  
    const render = () => {
      const boardHtml = gameBoard.map((square, index) => `<div class="square" id="${index}">${square}</div>`).join("");
      document.querySelector("#myGameBoard").innerHTML = boardHtml;
  
      const squares = document.querySelectorAll(".square");
      squares.forEach((square) => {
        square.addEventListener("click", GameController.handleClick);
      });
    };
  
    const getGameBoard = () => gameBoard;
    const updateSquare = (index, value) => {
      gameBoard[index] = value;
      render();
    };
  
    return {
      render,
      updateSquare,
      getGameBoard,
    };
  })();
  
  // Player factory
  const createPlayer = (playerName, symbol) => ({ playerName, symbol });
  
  // GameController module
  const GameController = (() => {
    let playersArray = [];
    let currentPlayerIndex;
    let gameover = false;

    let playerOneName=document.querySelector('#player1').value;

    let playerTwoName=document.querySelector('#player2').value;

 
    let playerOne= createPlayer(playerOneName, 'x');
    let playerTwo= createPlayer(playerTwoName, 'o');

    const start = () => {
        if (playerOne.playerName=="" && playerTwo.playerName == "") {
            alert("Enter Player Names First");
            return
          }else{

            
      playersArray = [
            playerOne,
            playerTwo
      ];
      currentPlayerIndex = 0;
      gameover = false;
      Gameboard.render();
    }

    };


    const handleClick = (event) => {
      const index = parseInt(event.target.id);
      if (Gameboard.getGameBoard()[index] !== "") return;
  
      Gameboard.updateSquare(index, playersArray[currentPlayerIndex].symbol);
  
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  
      if (checkForWin(Gameboard.getGameBoard())) {
        gameover = true;
        alert(`${playersArray[currentPlayerIndex].playerName} won`);
      } else if (checkTie(Gameboard.getGameBoard())) {
        gameover = true;
        alert("TIE");
      }
    };
  
    const resetGame = () => {
      for (let i = 0; i < 9; i++) {
        Gameboard.updateSquare(i, "");
      }
      Gameboard.render();
    };
  
    return {
      start,
      handleClick,
      resetGame,
    };
  })();
  
  function checkForWin(board) {
    const winningCombo = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
  
    for (const combo of winningCombo) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
  
    return false;
  }
  
  function checkTie(board) {
    return board.every(cell => cell !== "");
  }
  
  // Event listener for the Start button
  document.querySelector('#startBtn').addEventListener('click', GameController.start);
  
  // Event listener for the Reset button
  document.querySelector('#endBtn').addEventListener('click', GameController.resetGame);
  