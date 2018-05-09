/**
 * conways game of life
 * @description conways game of life based on a randomized setup
 */

// import console.table
const cTable = require('console.table')

/**
 * setupBoard
 * @description setups 2-D array representing board
 * @param {Number} width 
 * @param {Number} height 
 * @return {Array} board
 */
function setupBoard(width, height) {
  let board = new Array(height);

  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(width);
  }
  return board;
}

/**
 * randomizeBoard
 * @description randomizes board
 * @param {Array} board 2-D Array of board
 * @return {Array} board randomized 2-D Array
 */
function randommizeBoard(board) {
  // rows
  for (let i = 0; i < board.length; i++) {
    // columns
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = Math.round(Math.random());
    }
  }
  return board;
}

/**
 * class Game
 * 
 * @constructor
 *  @param {Number} width
 *  @param {Number} height
 */
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this._board = randommizeBoard(setupBoard(this.width, this.height));
  }

  // return getStatus()
  get status() {
    return this.getStatus();
  }

  /**
   * getStatus
   * @return {Array} board
   */
  getStatus() {
    return this._board;
  }


  /**
   * nextLife
   * @description mutates _board to determine next state
   */
  nextLife() {
    let next = setupBoard(this.width, this.height);
    let life = [...this._board];
    
    // rows
    for (let i = 0; i < life.length; i++) {
      // columns
      for (let j = 0; j < life[i].length; j++) {
        let state = life[i][j];
        let neighbours = this.countNeighbours(life, i, j);
        
        if (state == 0 && neighbours == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }

    this._board = [...next];
  }

  /**
   * countNeighbours
   * @description counts neighbours based on board cell
   * @param {Array} board
   * @param {Number} x
   * @param {Number} y
   * @return {Number} counter
   */  
  countNeighbours(board, x, y) {
    let counter = 0;
    let cols = this.width;
    let rows = this.height;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        counter += board[col][row];
      }
    }
    counter -= board[x][y];
    return counter;
  }

  // printGame
  printGame(life) {
    console.log(`life ${life}: \n`);
    console.table(this.status);
    this.nextLife();
    life++;
    return life;
  }


  // run conways game of life based on number of lives
  runLives(numberOfLives) {
    let life = 1;
    
    if (!numberOfLives) {
      setInterval(() => {
        life = this.printGame(life);
      }, 1000)
    }

    while (life <= numberOfLives) {
      life = this.printGame(life);
    }
  }
}

exports = module.exports = Game;