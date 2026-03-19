/* 
Knight Probability in Chessboard
Question: On a given n x n chessboard, a knight piece will start at the r-th row and c-th column. The knight will attempt to make k moves. 

A knight can move in 8 possible ways. Each move will choose one of these 8 at random. The knight continues moving until it finishes k moves, or it moves off the chessboard. Return the probability that the knight is on the chessboard after it finishes moving.
*/

const DIRECTIONS = [
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
];

const knightProbability = (n, k, row, column) => {
  const dp = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill(0).map(() => new Array(n).fill(undefined)));

  return recurse(n, k, row, column, dp);
};

const recurse = (n, k, row, column, dp) => {
  if (row < 0 || row >= n || column < 0 || column >= n) return 0;
  if (k === 0) return 1;
  if (dp[row][column][k] !== undefined) return dp[row][column][k];

  let response = 0;
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const dir = DIRECTIONS[i];
    response += recurse(n, k - 1, row + dir[0], column + dir[1], dp) / 8;
  }
  dp[row][column][k] = response;
  return response;
};

const n = 6;
const k = 3;
const row = 2;
const column = 2;
console.log(knightProbability(n, k, row, column));
