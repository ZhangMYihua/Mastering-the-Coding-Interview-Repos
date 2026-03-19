/*
NOTE: The beginning portion builds our test case binary tree. Scroll down to the section titled Our Solution for the code solution!
 */

// ------- Code to generate our binary tree -------
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(values) {
    const queue = [this];
    let i = 0;
    while (queue.length > 0) {
      let current = queue.shift();
      for (let side of ['left', 'right']) {
        if (!current[side]) {
          if (values[i] !== null) {
            current[side] = new TreeNode(values[i]);
          }
          i++;
          if (i >= values.length) return this;
        }
        if (current[side]) queue.push(current[side]);
      }
    }
    return this;
  }
}

const tree = new TreeNode(1);
tree.insert([
  2,
  3,
  4,
  5,
  null,
  6,
  null,
  7,
  null,
  null,
  null,
  null,
  8,
  null,
  null,
  null,
]);
// ------- Code to generate our binary tree -------

// ------- Our Solution -------
const dfs = (node, currentLevel, result) => {
  if (!node) return;
  if (currentLevel >= result.length) {
    result.push(node.value);
  }

  if (node.right) {
    dfs(node.right, currentLevel + 1, result);
  }

  if (node.left) {
    dfs(node.left, currentLevel + 1, result);
  }
};

const rightSideViewDFS = function (root) {
  const result = [];

  dfs(root, 0, result);
  return result;
};

console.log(rightSideViewDFS(tree));
