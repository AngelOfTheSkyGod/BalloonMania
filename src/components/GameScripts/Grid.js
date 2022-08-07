/*
the balloons are 5 colors. air is empty.
*/
const colors = ["^", "&", "%", "#", "*"];
/*GAME OBJECT: 
{
    history: [
      { board: makeGrid([], 7, 7), points: 0, time: 30000, rows: 7, cols: 7 },
    ],
    currentBoard: 0,
  }
*/
/*GRID OBJECT: 
{ board: makeGrid([], 7, 7), points: 0, time: 30000, rows: 7, cols: 7 }
*/
/*
print array is just for printing our matrix.
*/
function printMatrix(grid, rows, cols) {
  let gridString = "";
  for (let r = 0; r < rows; r++) {
    let str = "";
    for (let c = 0; c < cols; c++) {
      str += ` ${grid[r][c].color}`;
    }
    gridString += `${str}\n`;
  }
  return gridString;
}
/*
makes a board of random colored balloon objects. the board is rows x cols
it'll have air spots which are empty slots where there's
no balloons. the balloons must be on top and air at the bottom.
*/
export function makeGrid(grid, rows, cols) {
  for (let r = 0; r < rows; r++) {
    let array = [];
    for (let c = 0; c < cols; c++) {
      let balloon = {
        color: colors[Math.floor(Math.random() * colors.length)],
        popped: false,
        row: r,
        col: c,
      };
      array.push(balloon);
    }
    grid.push(array);
  }
  grid = floatUp(grid, rows, cols);
  console.log(`created matrix:\n${printMatrix(grid, rows, cols)}`);
  return grid;
}

// makes all balloons float up if there's any air above them.
//balloons must float up to the top because they're balloons.
export function floatUp(grid, rows, cols) {
  for (let c = 0; c < cols; c++) {
    let breakSpot = -1;
    let broken = false;
    let fixingArray = [];
    /////for grabbing all the unique balloons
    for (let r = 0; r < rows; r++) {
      if (grid[r][c].color === "*" && breakSpot === -1) {
        breakSpot = r;
      } else if (grid[r][c].color !== "*" && breakSpot !== -1) {
        broken = true;
        fixingArray.push(grid[r][c]);
      }
    }
    /////for fixing the column
    let j = 0;
    for (let i = breakSpot; i < rows && broken; i++, j++) {
      if (j >= fixingArray.length) {
        grid[i][c].color = "*";
        grid[i][c].popped = true;
      } else {
        grid[i][c].color = fixingArray[j].color;
        grid[i][c].popped = false;
      }
      grid[i][c].row = i;
      grid[i][c].col = c;
    }
  }
  return grid;
}

function outOfBounds(gameObject, row, col) {
  let grid = gameObject.history[gameObject.currentBoard].board;
  if (row >= grid.rows || col >= grid.cols || row < 0 || col < 0) {
    return true;
  }
  return false;
}

function rPop(gameObject, row, col, prevBalloon, popped) {
  let board = gameObject.history[gameObject.currentBoard].board;
  if (
    outOfBounds(gameObject, row, col) ||
    board[row][col].color !== board[prevBalloon.r][prevBalloon.c].color ||
    board[row][col] === colors[4] ||
    board[row][col].popped === true
  ) {
    return popped;
  }
  popped++;
  board[row][col].popped = true;

  if (row - 1 !== prevBalloon.r) {
    popped = rPop(gameObject, row - 1, col, { r: row, c: col }, popped);
  }
  if (row + 1 !== prevBalloon.r) {
    popped = rPop(gameObject, row + 1, col, { r: row, c: col }, popped);
  }
  if (col - 1 !== prevBalloon.c) {
    popped = rPop(gameObject, row, col - 1, { r: row, c: col }, popped);
  }
  if (col + 1 !== prevBalloon.c) {
    popped = rPop(gameObject, row, col + 1, { r: row, c: col }, popped);
  }

  board[row][col].color = colors[4];

  return popped;
}

export function popBalloon(gameObject, row, col) {
  let board = gameObject.history[gameObject.currentBoard];
  if (
    outOfBounds(gameObject, row, col) ||
    board.board[row][col].color === colors[4]
  ) {
    return null;
  }

  gameObject.history.push(JSON.parse(JSON.stringify(board)));
  gameObject.currentBoard++;
  board = gameObject.history[gameObject.currentBoard];
  console.log(
    `current board: \n${printMatrix(board.board, board.rows, board.cols)}`
  );
  let balloonsPopped = rPop(gameObject, row, col, { r: row, c: col }, 0);

  console.log(`popped: ${balloonsPopped} balloons!`);

  console.log(
    `board after: \n${printMatrix(board.board, board.rows, board.cols)}`
  );
  board.popped = balloonsPopped;
  return gameObject;
}

export function revertHistory(gameObject, row, col) {
  if (gameObject.currentBoard <= 0) {
    return null;
  }
  gameObject.history.pop();
  gameObject.currentBoard--;
  console.log(
    `rewinding history one step: \n${printMatrix(
      gameObject.history[gameObject.currentBoard].board,
      gameObject.history[gameObject.currentBoard].rows,
      gameObject.history[gameObject.currentBoard].cols
    )} current history: ${gameObject.currentBoard}`
  );
  return gameObject;
}
