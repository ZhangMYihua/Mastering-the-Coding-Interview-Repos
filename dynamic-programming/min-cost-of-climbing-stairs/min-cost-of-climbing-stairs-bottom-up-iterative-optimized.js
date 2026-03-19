const cost = [20, 15, 30, 5];

const minCostClimbingStairs = function (cost) {
  const n = cost.length;
  if (n === 0) return 0;
  if (n === 1) return cost[0];
  let dpOne = cost[0];
  let dpTwo = cost[1];
  for (let i = 2; i < n; i++) {
    const current = cost[i] + Math.min(dpOne, dpTwo);
    dpOne = dpTwo;
    dpTwo = current;
  }
  return Math.min(dpOne, dpTwo);
};

console.log(minCostClimbingStairs(cost));
