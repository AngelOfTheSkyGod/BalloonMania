import { FaSoundcloud } from "react-icons/fa";
import Audio from "./Audio";
/*
the balloons are 5 colors. air is empty.
*/
const colors = ["^", "&", "%", "#", "*"];
/*GAME OBJECT: 
{
    history: [
      { board: makeGrid([], 7, 7), points: 0, time: 30000, rows: 7, cols: 7, popped, animating},
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
        animating: false,
      };
      array.push(balloon);
    }
    grid.push(array);
  }
  grid = floatUp(grid, rows, cols);
  //////console.log(`created matrix:\n${printMatrix(grid, rows, cols)}`);
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
        grid[i][c].color = colors[4];
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
  let grid = gameObject.history[gameObject.currentBoard];
  if (row >= grid.rows || col >= grid.cols || row < 0 || col < 0) {
    return true;
  }
  return false;
}

async function ExecutePop(row, prevBalloon, gameObject, setGame, col, info) {
  const board = gameObject.history[gameObject.currentBoard].board;
  ////console.log("CALLING EXECUTE POP!");
  if (row - 1 !== prevBalloon.r) {
    await rPop(gameObject, row - 1, col, { r: row, c: col }, setGame, info);
  }
  if (row + 1 !== prevBalloon.r) {
    await rPop(gameObject, row + 1, col, { r: row, c: col }, setGame, info);
  }
  if (col - 1 !== prevBalloon.c) {
    await rPop(gameObject, row, col - 1, { r: row, c: col }, setGame, info);
  }
  if (col + 1 !== prevBalloon.c) {
    await rPop(gameObject, row, col + 1, { r: row, c: col }, setGame, info);
  }

  return gameObject.history[gameObject.currentBoard].balloonsPopped;
}

function handlePopPromise(gameObject, version, board, setGame, popCooldown) {
  // gameObject.history[gameObject.currentBoard].points += popped * (popped + 1);
  const balloonsPopped =
    gameObject.history[gameObject.currentBoard].balloonsPopped;
  gameObject.history[gameObject.currentBoard].points +=
    balloonsPopped * (balloonsPopped - 1);
  setGame((oldBoard) => {
    if (version === 0) {
      gameObject.history[gameObject.currentBoard].totalPopped += balloonsPopped;
      gameObject.history[gameObject.currentBoard].topCombo = Math.max(
        balloonsPopped,
        gameObject.history[gameObject.currentBoard].topCombo
      );
      setTimeout(() => {
        floatUp(
          board,
          gameObject.history[gameObject.currentBoard].rows,
          gameObject.history[gameObject.currentBoard].cols
        );
        popCooldown.current = false;
        setGame(JSON.parse(JSON.stringify(gameObject)));
      }, 1000);
    }
    return JSON.parse(JSON.stringify(gameObject));
  });
}
async function rPop(gameObject, row, col, prevBalloon, setGame, info) {
  let board = gameObject.history[gameObject.currentBoard].board;
  if (
    outOfBounds(gameObject, row, col) ||
    outOfBounds(gameObject, prevBalloon.r, prevBalloon.c) ||
    board[row][col].color !== info.color ||
    board[row][col] === colors[4] ||
    board[row][col].popped
  ) {
    return;
  }

  let popSound = new Audio(Audio[0]);
  popSound.play();
  board[row][col].popped = true;
  let version = gameObject.history[gameObject.currentBoard].balloonsPopped;
  gameObject.history[gameObject.currentBoard].balloonsPopped++;

  let myPromise = new Promise(async function (myResolve, myReject) {
    setTimeout(async () => {
      board[row][col].color = colors[4];
      board[row][col].animating = true;
      setGame((oldBoard) => {
        return JSON.parse(JSON.stringify(gameObject));
      });
      setTimeout(() => {
        board[row][col].animating = false;
      }, 100);
      await ExecutePop(row, prevBalloon, gameObject, setGame, col, info);
      return myResolve(version);
    }, 250);
  });

  return myPromise.then((result) => {
    handlePopPromise(gameObject, version, board, setGame, info.popCooldown);
    return version;
  });
}

export async function popBalloon(gameObject, row, col, setGame, popCooldown) {
  let board = gameObject.history[gameObject.currentBoard];
  if (
    outOfBounds(gameObject, row, col) ||
    board.board[row][col].color === colors[4] ||
    popCooldown.current
  ) {
    //////console.log("do not run!" + board.board[row][col].color);
    return gameObject;
  }
  popCooldown.current = true;
  gameObject.history.push(JSON.parse(JSON.stringify(board)));
  gameObject.currentBoard++;
  board = gameObject.history[gameObject.currentBoard];
  board.balloonsPopped = 0;
  setGame((oldBoard) => {
    JSON.parse(JSON.stringify(gameObject));
    return JSON.parse(JSON.stringify(gameObject));
  });
  let balloonsPopped = 0;
  let finish = await rPop(gameObject, row, col, { r: row, c: col }, setGame, {
    color: board.board[row][col].color,
    popCooldown: popCooldown,
  });
  return gameObject;
}

export function revertHistory(gameObject, row, col) {
  if (gameObject.currentBoard <= 0) {
    return null;
  }
  gameObject.history.pop();
  gameObject.currentBoard--;
  // //////console.log(
  //   `rewinding history one step: \n${printMatrix(
  //     gameObject.history[gameObject.currentBoard].board,
  //     gameObject.history[gameObject.currentBoard].rows,
  //     gameObject.history[gameObject.currentBoard].cols
  //   )} current history: ${gameObject.currentBoard}`
  // );
  return gameObject;
}
