const getBoxId = function (row, col) {
  const rowVal = Math.floor(row / 3) * 3;
  const colVal = Math.floor(col / 3);

  return rowVal + colVal;
};

const isValid = function (box, row, col, num) {
  if (box.has(num) || row.has(num) || col.has(num)) {
    return false;
  } else {
    return true;
  }
};

const solve = function (board, boxes, rows, cols, n, r, c) {
  if (r === n || c === n) {
    return true;
  } else {
    if (board[r][c] === '.') {
      const boxId = getBoxId(r, c);
      const box = boxes[boxId];
      const row = rows[r];
      const col = cols[c];

      for (let num = 1; num <= 9; num++) {
        const numVal = num.toString();

        if (isValid(box, row, col, numVal)) {
          board[r][c] = numVal;
          box.add(numVal);
          row.add(numVal);
          col.add(numVal);

          if (c === n - 1) {
            if (solve(board, boxes, rows, cols, n, r + 1, 0)) {
              return true;
            }
          } else {
            if (solve(board, boxes, rows, cols, n, r, c + 1)) {
              return true;
            }
          }

          box.delete(numVal);
          row.delete(numVal);
          col.delete(numVal);

          board[r][c] = '.';
        }
      }
    } else {
      if (c === n - 1) {
        if (solve(board, boxes, rows, cols, n, r + 1, 0)) {
          return true;
        }
      } else {
        if (solve(board, boxes, rows, cols, n, r, c + 1)) {
          return true;
        }
      }
    }
  }
  return false;
};

var solveSudoku = function (board) {
  const n = board.length;
  const boxes = new Array(n),
    rows = new Array(n),
    cols = new Array(n);

  for (let i = 0; i < n; i++) {
    boxes[i] = new Set();
    rows[i] = new Set();
    cols[i] = new Set();
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] !== '.') {
        const boxId = getBoxId(i, j);
        const box = boxes[boxId].add(board[i][j]);
        rows[i].add(board[i][j]);
        cols[j].add(board[i][j]);
      }
    }
  }

  solve(board, boxes, rows, cols, n, 0, 0);
};

const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

solveSudoku(board);
console.log(board);
