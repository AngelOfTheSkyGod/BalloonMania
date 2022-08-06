const colors = ["^", "&", "%", "#", "*"];
function printArray(grid, rows, cols) {
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
export function makeGrid(grid, rows, cols) {
  for (let r = 0; r < rows; r++) {
    let array = [];
    let str = "";
    for (let c = 0; c < cols; c++) {
      let balloon = {
        color: colors[Math.floor(Math.random() * colors.length)],
        popped: false,
        row: r,
        col: c,
      };
      str += ` ${balloon.color}\n`;
      array.push(balloon);
    }
    grid.push(array);
  }
  console.log(`BEFORE EDITING: \n${printArray(grid, rows, cols)}`);
  grid = floatUp(grid, rows, cols);
  console.log(`AFTER EDITING: \n${printArray(grid, rows, cols)}`);
  return grid;
}
// board: makeGrid([], 7, 7), points: 0, time: 30000, rows: 7, cols: 7
export function floatUp(grid, rows, cols) {
  for (let c = 0; c < cols; c++) {
    let breakSpot = -1;
    let broken = false;
    let fixingArray = [];
    /////for grabbing all the unique balloons
    for (let r = 0; r < rows; r++) {
      if (grid[r][c].color == "*" && breakSpot == -1) {
        breakSpot = r;
      } else if (grid[r][c].color != "*" && breakSpot != -1) {
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
