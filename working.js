//added singular Game class
//added startGame()

class Game {
    constructor(height, width){
       
        this.HEIGHT = height;
        this.WIDTH  = width;
        this.board = [];  //NOTE: double check this
        this.currPlayer = 1;
        //removed to put in the startGame this.makeBoard();
        //removed to put in startGame this.makeHtmlBoard();
        console.log(this.currPlayer); 
        console.log(height);
        this.gameStarted = false;   //added for the startGame edit
        
   
      
    }

startGame() {
    const button = document.getElementById('Button');
    button.addEventListener ('click', () => {
        if(!this.gameStarted);
        this.makeBoard();
        this.makeHtmlBoard();
        this.gameStarted = true;

   console.log('Game Begins!');  
});
}

//makeBoard: create in-JS board structure:
//board = array of rows, each row is array of cells  (board[y][x])
 
makeBoard() {

    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));  
}
}


//NOTE:  Passed to object later...
//const WIDTH = 7;
//const HEIGHT = 6;
//let currPlayer = 1; // active player: 1 or 2/
//let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeHtmlBoard: make HTML table and row of column tops. */

makeHtmlBoard() {
  const board = document.getElementById('board');
 
  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement('tr');  //top column boxes that you click
  top.setAttribute('id', 'column-top');
  
  top.addEventListener('click', (evt) => this.handleClick(evt)); 
  for (let x = 0; x < this.WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // make main part of board
  for (let y = 0; y < this.HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}


/** findSpotForCol: given column x, return top empty y (null if filled) */


findSpotForCol(x) {  
  for (let y = this.HEIGHT - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

//NO EDITS HERE

placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${this.currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */
//NOTE:  CHECK CALL LOC
 endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

 handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;  //NOTE: Unary to convert from string to number...

  // get next spot in column (if none, ignore click)
  const y = this.findSpotForCol(x);  
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  this.board[y][x] = this.currPlayer;
  this.placeInTable(y, x);   //NOTE:  check where this and placeTable is calling at
  
  // check for win
  if (this.checkForWin()) {

return this.endGame(`Player ${this.currPlayer} won!`);  //NOTE:  'this' is coming back undefined...
    
  }
  
  // check for tie
  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }
    
  //NOT USING THIS FOR EACH OF THESE BROKE THE ENTIRE THING..++++++++++++++++++++++++++++++++++++++++++++++
 this.currPlayer = this.currPlayer === 1 ? 2 : 1;   //NOTE:  Player toggle with ternary
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
// Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

//NOTE:  RETURN HERE TO CHECK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 _win(cells) {  //NOTE: removed from the class as a standalone function but can't call HEIGHT or WIDTH.
    return cells.every(([y, x]) =>  //NOTE: removed 'this' here to test:  'HEIGHT is not defined' so it all fails..
 
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
        x < this.WIDTH &&
        this.board[y][x] === this.currPlayer
        );
 
  }

  checkForWin() {
  for (let y = 0; y < this.HEIGHT; y++) {
    for (let x = 0; x < this.WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
        return true;
      }
    }
}
}
}


const game = new Game(7, 6);
game.startGame();