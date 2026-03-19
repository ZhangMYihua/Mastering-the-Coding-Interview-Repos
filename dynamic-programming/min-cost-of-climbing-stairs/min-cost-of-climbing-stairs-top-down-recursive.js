const cost = [20, 15, 30, 5];

const minCost = function (i, cost) {
  if (i < 0) return 0;
  if (i === 0 || i === 1) return cost[i];
  return cost[i] + Math.min(minCost(i - 1, cost), minCost(i - 2, cost));
};

const minCostClimbingStairs = function (cost) {
  const n = cost.length;
  return Math.min(minCost(n - 1, cost), minCost(n - 2, cost));
};

console.log(minCostClimbingStairs(cost));
