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

const tree = new TreeNode(15);
tree.insert([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, null, null, null]);

// ------- Code to generate our binary tree -------

// ------- Solution -------

const dfs = function (node, min, max) {
  if (node.val <= min || node.val >= max) {
    return false;
  }

  if (node.left) {
    if (!dfs(node.left, min, node.val)) {
      return false;
    }
  }

  if (node.right) {
    if (!dfs(node.right, node.val, max)) {
      return false;
    }
  }

  return true;
};

const isValidBST = function (root) {
  if (!root) return true;
  return dfs(root, -Infinity, Infinity);
};
