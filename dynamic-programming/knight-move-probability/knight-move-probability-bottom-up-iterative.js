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
  const dp = new Array(k + 1)
    .fill(0)
    .map(() => new Array(N).fill(0).map(() => new Array(n).fill(0)));

  dp[0][row][column] = 1;
  for (let step = 1; step <= k; step++) {
    for (let r = 0; row < n; r++) {
      for (let c = 0; c < n; c++) {
        for (let i = 0; i < DIRECTIONS.length; i++) {
          const dir = DIRECTIONS[i];
          const prevRow = r + dir[0];
          const prevCol = c + dir[1];
          if (prevRow >= 0 && prevRow < n && prevCol >= 0 && prevCol < n) {
            dp[step][r][c] += dp[step - 1][prevRow][prevCol] / 8;
          }
        }
      }
    }
  }

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res += dp[k][i][j];
    }
  }

  return res;
};
