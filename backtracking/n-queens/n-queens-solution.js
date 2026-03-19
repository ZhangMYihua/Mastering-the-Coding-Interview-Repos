/*
N-Queens is a very well known computer science problem for how backtracking as an algorithm can efficiently solve complex problems!

The core problem asks that if we were given the variable N. We are tasked with placing N queens on a N x N chessboard in such a way that no two queens are attacking each other. For a given N, return ALL distinct solutions of possible queen placements.

Each distinct solution in our returned answer should be a board configuration defined as a 2-D array which represents the N x N board. Queens are represented as ‘ Q ’ and empty spaces are represented as ‘ . ‘.

Leetcode question link: https://leetcode.com/problems/n-queens/


——— Breaking down the problem ———

In our particular case with N-Queens, we know the question is asking us to return ALL valid solutions. The fact that we know there are valid and invalid solutions, and the fact that we are tasked to return ALL valid solutions satisfies the condition that backtracking tries every possible solution, and does it efficiently because it throws away bad solutions EARLY if we realize at an early step in the solution that it’s invalid (and therefore all subsequent steps and solutions from this step are invalid). 

How does the question work though? Let’s first understand how queens attack. Let's imagine we had a queen placed in the middle of a 5 x 5 board.

 _______________________________________
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

A queen can attack across the board both vertically, horizontally, and diagonally (represented by the A's).

Vertically
 _______________________________________
|       |       |       |       |       |
|       |       |   A   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   A   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   A   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   A   |       |       |
|_______|_______|_______|_______|_______|


Horizontally
 _______________________________________
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   A   |   A   |   Q   |   A   |   A   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|


Diagonally
 _______________________________________
|       |       |       |       |       |
|   A   |       |       |       |   A   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   A   |       |   A   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   A   |       |   A   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   A   |       |       |       |   A   |
|_______|_______|_______|_______|_______|


Putting it all together, a Queen is able to attack another chess piece (including other queens for our question) if they stand in any of the spaces with an A.

 _______________________________________
|       |       |       |       |       |
|   A   |       |   A   |       |   A   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   A   |   A   |   A   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   A   |   A   |   Q   |   A   |   A   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   A   |   A   |   A   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   A   |       |   A   |       |   A   |
|_______|_______|_______|_______|_______|

Now that we understand queens, let's walk through how we would intuitively solve the problem if we were given a value of 5 for N.

We have 5 queens(Q1-5) to place. We start with an empty board, and we want to place the first queen(Q1). Because our board is empty, we can place the queen anywhere on the board, BUT because we know queens attack across an ENTIRE row on the board, if our board is N x N in size, this means there are N rows available. If a queen attacks an entire row, this means that in a valid solution, there can only be 1 queen per row since two queens anywhere on the same row will be attacking each other. This means that we can iterate through the rows of the board, and figure out where we can place our next queen on that row without attacking or being attacked by the Queens we've placed so far before it.

So for our first queen, we would place it somewhere on the first row, and since we want to test ALL valid solutions, we start from the top left corner (0,0) and try all other possible solutions from this position for the placement of our other queens.
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |     Q1
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

Now that we've placed our first queen(Q1), our second queen(Q2) MUST go on the second row as we derived earlier. If we place it in the first square on the second row, we'll be under attack from our first queen.
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |    Q2
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

Because of this, we know that ANY solution involving two queens being where they are in this configuration can not possibly be valid. So we don't even want to figure out how to place any of the other queens in this position. So instead we want to move our queen(Q2) to the next square on the row.

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |    Q2
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

This is also invalid since queens attack diagonally, so we know there can be no valid solutions with two queens in these positions on the board.

Moving our second queen to the right again, we get:

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |    Q2
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

Here, this queen is valid. Our queens are not attacking each other, so we can place our next queen(Q3). We go through the same steps of placing it on the next row starting from the left, then checking if our board state is valid. If it's not valid, move it forward, if it is valid place the next queen. 

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   Q   |       |       |       |       |    Q3 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q3 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |    Q3 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |    Q3 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q3 VALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

Now that Q3 is valid, we can place Q4 following the same steps.

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q4 VALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

Finally we do the same for Q5.

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q5 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q5 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q5 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q5 VALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|

Here we have a valid solution! So we can want to store this board state as one of our valid solutions. Remember, we want to return ALL valid solutions, so we need to continue trying all other solutions until we find all the valid ones. This means that we have to repeat this process for every other remaining step available in every placement of queens we're trying so far, including our current Q5 in case any remaining placements on this last row return ANOTHER valid solution.

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q5 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |
|_______|_______|_______|_______|_______|

However, we see that the remaining placement for Q5 is an invalid board state, this means we need to backtrack up to our previous queen Q4, and try it's remaining solutions.

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

So all the remaining placements for Q4 are also invalid, that means we do the same for Q3.

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |    Q3
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

But Q3 is already at the end of the row, meaning we've tried all possible placements for Q3, so now we backtrack to Q2 and try it's remaining placements.

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |    Q2
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

This is valid, so we need to try to place the remaining queens again.

------------------- Q3 -------------------

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   Q   |       |       |       |       |    Q3 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q3 VALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

------------------- Q4 -------------------

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q4 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q4 VALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |       |
|_______|_______|_______|_______|_______|

------------------- Q5 -------------------

 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q5 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q5 INVALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |
|_______|_______|_______|_______|_______|
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    Q5 VALID
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|

Here we have yet another valid solution! So we store this one as well, and then we repeat the same steps we just did after we found our first valid solution. We repeat this until we've tried all possible placements for all queens on all rows, storing valid solutions we come across along the way! 

Now translating this to code, let's think about the tools we need to turn this into code! First we need a way to keep track of where on our board our queens are. We know that we are placing queens on rows, and we know we're going to have N queens and N rows. We also know that in each row there are N squares since there are also N columns. This means we can represent the placement of ALL our queens in a single array of size N. The queen at index i will be the queen at row i, and the value at that row will the index of the square the queen sits in that row. 

i.e. this board state
 _______________________________________
|       |       |       |       |       |
|   Q   |       |       |       |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |   Q   |       |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |   Q   |       |       |       |    
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |       |       |   Q   |
|_______|_______|_______|_______|_______|
|       |       |       |       |       |
|       |       |   Q   |       |       |
|_______|_______|_______|_______|_______|

will be represented as [0, 3, 1, 4, 2]. 0 is the index of the column Q1 sits in the first row, 3 is the column Q2 sits in the second row, 1 is the index of the column Q3 sits in the third row, 4 the index of the column Q4 sits on the fourth row, and 2 the index of the column Q5 sits on the fifth row.

This means that what we can do, is write our recursive backtracking function to fill out this single array from left to right (representing row 1 to N), and trying all squares (the columns) in this row for our queen on this row. 

What we need for this function, is going to be the N value for the number of rows/cols/queens we have. The currentRow and queen we're placing, the placements we've so far, and the result array that's holding all our valid solutions we've come up with so far!

Our function will have the signature of:

const solve = (n, currentRow, colQueenPlacements, result) => {
  ...// code to answer
}

Following our backtracking formula, we know we want to do 3 things:
1. We have a valid solution, do something with it (add it to our result).
2. Try a value at this iteration (place our current queen), if it's valid, try to place the next queen (advance to our next queen). If it's invalid, try the next option in our current iteration.
3. If all options at step 2 failed, exit the current layer on the callstack and backtrack up.

Filling this in, we can fill out our solve function with what we know about the steps, we can figure out how to do the actual logic for them after.

const solve = (n, currentRow, colQueenPlacements, result) => {
  // We've placed the last queen and it's all valid
  if(currentRow === n) { 
        // Add it to our result. We'll figure out how to generate the correct format later, for now we'll just use a function to represent it.
        result.push(generateSolution(n, colQueenPlacements));
    } else {

        // Try every column square available at this current row
        for(let col = 0; col < n; col++) {

            // Add it to our board state
            colQueenPlacements.push(col); 

            //If our boardstate is valid, advance forward and place the next queen. Once again we'll use isValid as a placeholder function that we'll solve after.
            if(isValid(colQueenPlacements)) {
                solve(n, currentRow + 1, colQueenPlacements, result);
            }

            //Remove the last column placement so we can try the remaining columns
            colQueenPlacements.pop();
        }
    }
}

without the comments:
const solve = (n, currentRow, colQueenPlacements, result) => {
    if(currentRow === n) {
        result.push(generateSolution(n, colQueenPlacements));
    } else {
        for(let col = 0; col < n; col++) {
            colQueenPlacements.push(col);
            if(isValid(colQueenPlacements)) {
                solve(n, currentRow + 1, colQueenPlacements, result);
            }
            colQueenPlacements.pop();
        }
    }
}

Now that we have our main driving function, we need to define how isValid() and generateSolution() will work!

Let's start with isValid(). We know we're going to receive the board state represented by our single array. If we're on our first placement we know it must be true, so we can say:

const isValid = (colQueenPlacements) => {
    if(colQueenPlacements.length === 1) return true;
    ...
}

We can assume that when we receive our board state array, we only need to check if the last value in the array is valid because our previous row placements will have checked the validity of their respective values when that value WAS the last value in the array at that time.

The value of the row we're on is the index of the last value:
  const row = colQueenPlacements.length - 1;

The value of the column square our queen is on is the value stored at the row:
  const col = colQueenPlacements[row];

Now using the row and col values, we can to test against every other queen placed so far:

  for(var i = 0; i < colQueenPlacements.length - 1; i++) {}

We know that because we're always placing in new rows, we don't need to worry about queens attacking each other horizontally <- ->. We just need to make sure our new queen isn't standing in the same column as our other queens (i.e. they share the same value).

   for(var i = 0; i < colQueenPlacements.length - 1; i++) {
        if(colQueenPlacements[i] === col) return false;
    }

To check if they're not overlapping in diagonal directions. Thinking about that, if we had a queen at some position, for every single column up or down we go, the diagonal is additional 1 square to the right or left away from the current value. So we can calculate that distance based on subtracting index of the row we're currently at from the index of the row we're comparing against. If that value is equal to the distance between our current queen and the queen we're comparing, we know we're in the diagonal.

    for(var i = 0; i < colQueenPlacements.length - 1; i++) {
      if(colQueenPlacements[i] === col) return false;
      
      if (row - i === Math.abs(colQueenPlacements[i] - col)) return false;
    }


If none of these are violated, then we know our placement is valid. Putting it all together we get:

  const isValid = (colQueenPlacements) => {
    if(colQueenPlacements.length === 1) return true;

    const row = colQueenPlacements.length - 1;
    const col = colQueenPlacements[row];
    
    for(var i = 0; i < colQueenPlacements.length - 1; i++) {
        if(colQueenPlacements[i] === col) return false;
        
        if (row - i === Math.abs(colQueenPlacements[i] - col)) return false;
    }
    
    return true;
  }

Now for our generateSolution() function, we need to transform our single array into the array of strings the question is expecting. We need to instantiate an empty array, and simply iterate through our board state array, and for each value that represents a row, add a '.' if it's not equal to our actual queen placement and add a 'Q' if it is equal our queen placement.

const generateSolution = (n, colQueenPlacements) => {
  const solution = [];
  
  for(let row = 0; row < colQueenPlacements.length; row++) {
      let currentRow = '';
      for(let col = 0; col < n; col++) {
          if(col === colQueenPlacements[row]) {
              currentRow += 'Q';
          } else {
              currentRow += '.';
          }
      }
      solution.push(currentRow);
  }
  
  return solution;
}

Putting it all together, our solution is below!
 */

const isValid = (colQueenPlacements) => {
  if (colQueenPlacements.length === 1) return true;

  const row = colQueenPlacements.length - 1;
  const col = colQueenPlacements[row];

  for (var i = 0; i < colQueenPlacements.length - 1; i++) {
    if (colQueenPlacements[i] === col) return false;

    if (row - i === Math.abs(colQueenPlacements[i] - col)) return false;
  }

  return true;
};

const generateSolution = (n, colQueenPlacements) => {
  const solution = [];

  for (let row = 0; row < colQueenPlacements.length; row++) {
    let currentRow = '';
    for (let col = 0; col < n; col++) {
      if (col === colQueenPlacements[row]) {
        currentRow += 'Q';
      } else {
        currentRow += '.';
      }
    }
    solution.push(currentRow);
  }

  return solution;
};

const solve = (n, currentRow, colQueenPlacements, result) => {
  if (currentRow === n) {
    result.push(generateSolution(n, colQueenPlacements));
  } else {
    for (let col = 0; col < n; col++) {
      colQueenPlacements.push(col);
      if (isValid(colQueenPlacements)) {
        solve(n, currentRow + 1, colQueenPlacements, result);
      }
      colQueenPlacements.pop();
    }
  }
};

var solveNQueens = function (n) {
  const result = [];

  solve(n, 0, [], result);

  return result;
};
