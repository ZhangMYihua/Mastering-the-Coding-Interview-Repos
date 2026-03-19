/*
reccurence relation:
Directions = [
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2]
];

0 >= r < N, 0 >= c < N, k === 0
probability(r, c, k) = 1

0 >= r < N, 0 >= c < N, k > 1
probability(r, c, k) = Σ(x, y)∈Directions probability(r + x, c + y, k - 1) / 8

r < 0 || r > N, c < 0 || c > N
probability(r, c, k) = 0

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

var knightProbability = function (N, K, r, c) {
  let prevDp = new Array(N).fill(0).map(() => new Array(N).fill(0));
  let nextDp = new Array(N).fill(0).map(() => new Array(N).fill(0));

  prevDp[r][c] = 1;
  for (let step = 1; step <= K; step++) {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        for (let i = 0; i < DIRECTIONS.length; i++) {
          const currentDirection = DIRECTIONS[i];
          const prevRow = row + currentDirection[0];
          const prevCol = col + currentDirection[1];
          if (prevRow >= 0 && prevRow < N && prevCol >= 0 && prevCol < N) {
            nextDp[row][col] = nextDp[row][col] + prevDp[prevRow][prevCol] / 8;
          }
        }
      }
    }
    prevDp = nextDp;
    nextDp = new Array(N).fill(0).map(() => new Array(N).fill(0));
  }

  let res = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      res += prevDp[i][j];
    }
  }

  return res;
};

console.log(knightProbability(6, 3, 2, 2));
