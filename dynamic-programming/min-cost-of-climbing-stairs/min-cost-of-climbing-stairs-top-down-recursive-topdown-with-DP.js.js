const cost = [20, 15, 30, 5];

const minCostClimbingStairs = function (cost) {
  const n = cost.length;
  const dp = [];
  return Math.min(
    minCostDPTopDown(n - 1, cost, dp),
    minCostDPTopDown(n - 2, cost, dp)
  );
};

const minCostDPTopDown = function (i, cost, dp) {
  if (i < 0) return 0;
  if (i === 0 || i === 1) return cost[i];
  if (dp[i] !== undefined) return dp[i];
  dp[i] =
    cost[i] +
    Math.min(
      minCostDPTopDown(i - 1, cost, dp),
      minCostDPTopDown(i - 2, cost, dp)
    );
  return dp[i];
};

console.log(minCostClimbingStairs(cost));
