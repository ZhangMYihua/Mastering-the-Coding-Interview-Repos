/*
### Question:

Leetcode question link: https://leetcode.com/problems/palindrome-partitioning/

Given a string s, partition s such that every substring of the partition is a palindrome.

Return all possible palindrome partitioning of s.

Example:
Input: "aab"
Output:
[
  ["aa","b"],
  ["a","a","b"]
]

###

### Solution Walkthrough:
The first thing we need to do is understand what the question is asking us, so we can start breaking down how to approach the problem. We also ened to consider possible test cases to ensure we understand our approach properly.

We know we're going to receive a string S, and our goal is to final ALL the possible ways we can partition the string into substrings so that each substring is a palindrome.

This means that we need to figure out a way to break the string S into all possible combinations of substrings where each substring is a palindrome. We add that combination of partitioned substrings into our final output array.

An easy way to start thinking about how we would tackle this is just to think about how we would do this logically. Imagine we had the substring "aaba". We would probably start partitioning the string from left to right, and figure out all possible partitions we can make from the FIRST partition.

We would start by thinking about all possile solutions that consist of the first ONE character ("a").

* "yes" represents a valid solution, "no" represents a invalid solution *

1) "a" , "a" , "b" , "a" -> yes
2) "a", "a", "ba" -> no
3) "a", "ab", "a" -> no
4) "a", "aba" -> yes

We would then do the same for the first TWO characters ("aa")

1) "aa", "b", "a" -> yes
2) "aa", "ba" -> no

Then the same for the first THREE characters ("aab")

1) "aab", "a" -> no

Then the same for the entire string ("aaba")

1) "aaba" -> no

Grouping these together, the correct answer we would return is:
[
  ["a", "a", "b", "a"],
  ["a", "aba"],
  ["aa", "b", "a"]
]

Thinking about optimizing our solution, let's look at the first 4 solutions we came up with by partitioning with the first character included ("a").

I want us to look at solution 3, ["a", "ab", "a"], as we are partitioning from left to right, the moment we saw that the middle partition "ab" is not a palindrome, we no longer needed to continue with that solution because it already failed our logic. This gives us a hint that we don't want to pursue a solution if it fails our palindromic check in the middle.

The fact that we need ALL possible solutions, and we know we can throw away solutions if they violate our logic in the middle of a solution means that this may be a good candidate for backtracking!

We already know how to create a solution around backtracking, the general format is:

1. Add current solution
2. Decide whether to continue or not (by recursing further)
3. Remove current solution

Breaking these 3 steps down, we know that step 1 is adding the current solution. In this case we need to figure out WHAT to add, and WHERE we're adding it. The WHERE in this case is an array that holds the partitioned substrings in the current iteration S. The WHAT is the partitions themselves. 

Deciding to recurse further or not, will be based on whether or not the latest partitioned substring is a palindrome. If it is a palindrome, we continue partitioning and checking from this point onwards, if it isn't, we skip.

To start, we already know the function that helps us determine with our string is a palindrome, except we need to pass it the entire string and starting/ending indexes that represent the bounds of the substring.

const isPalindrome = (start, end, str) => {
  while(start < end) {
    if(str[start] !== str[end]) return false;
    
    start++;
    end--;
  }
  
  return true;
}

Then we need to break down the recursive function that DRIVES the solution at this decision step. Looking back at the string "aaba" and our first character partitions, particularly solution 3 and 4:

3) "a", "ab", "a"
4) "a", "aba"

When we look at it solution 3, we're partitioning "a", "ab" and at this point we know "ab" is not a palindrome. We don't need to continue partitioning the last character ("a") so we DECIDE not to continue. At this point though, we're not done with these characters because if we continue and include the next character in the partition "aba", we see this is a valid palindrome! For this reason, we need to make sure our recursive solution is able to capture all these points together.

Building out the recursive function, what are we trying to capture:

const solve = () => {}

1. We have to keep track of our starting index which represent the first character in the substring that we're partitioning:

const solve = (startingIdx) => {}

2. We need to pass the string S:

const solve = (startingIdx, S)

3. We need to pass an array containing the substrings we've partitioned so far in this current iteration:

const solve = (startingIdx, S, partialSplits) => {}

4. We need to pass the final result array that will hold ALL our CORRECT solutions

const solve = (startingIdx, S, partialSplits, result) => {}

Now fleshing out the logic and filling out the backtracking template, we first realize that if our startingIdx has reached the END of the string, all our substrings in this iteration must be valid! We can then push these accumulated substrings into our result array. 

*REMEMBER* We need to duplicate the array that we push into our result array because our existing array is still being backtracked through, meaning values are being removed and added constantly! We just want to push in the SNAPSHOT of the current state of our array.

const solve = (startingIdx, S, partialSplits, result) => {
  if(startingIdx === S.length) {
      result.push([...partialSplits]);
  }
}

Now the meat of our solution is going to be looping a second pointer through the remaining characters from our current startingIdx. This second pointer represents the last character in the current substring we're checking.

const solve = (startingIdx, S, partialSplits, result) => {
  if(startingIdx === S.length) {
      result.push([...partialSplits]);
  } else {
    for(var i = startingIdx; i < S.length; i++) {
    }
  }
}

If the current substring IS a palindrome, we want to push it into our current partialSplits array, and continue our recursive solution partitioning through all possible further solutions with the NEXT character as the new startingIdx to represent the first character of our next substring.

const solve = (startingIdx, S, partialSplits, result) => {
  if(startingIdx === S.length) {
      result.push([...partialSplits]);
  } else {
    for(var i = startingIdx; i < S.length; i++) {
      if(isPalindrome(startingIdx, i, S)) {
        const palindromeSnippet = S.slice(startingIdx, i + 1);
        partialSplits.push(palindromeSnippet);

        solve(i + 1, S, partialSplits, result);
      }
    }
  }
}

The last step is to remove the last substring we added, so we can try the next substrings that contain the existing characters.

const solve = (startingIdx, S, partialSplits, result) => {
  if(startingIdx === S.length) {
      result.push([...partialSplits]);
  } else {
    for(var i = startingIdx; i < S.length; i++) {
      if(isPalindrome(startingIdx, i, S)) {
        const palindromeSnippet = S.slice(startingIdx, i + 1);
        partialSplits.push(palindromeSnippet);

        solve(i + 1, S, partialSplits, result);
        partialSplits.pop();
      }
    }        
  }
}

Putting it all together, our final answer is below!
 */

const isPalindrome = (start, end, str) => {
  while (start < end) {
    if (str[start] !== str[end]) return false;

    start++;
    end--;
  }

  return true;
};

const solve = (startingIdx, S, partialSplits, result) => {
  if (startingIdx === S.length) {
    result.push([...partialSplits]);
  } else {
    for (var i = startingIdx; i < S.length; i++) {
      if (isPalindrome(startingIdx, i, S)) {
        const palindromeSnippet = S.slice(startingIdx, i + 1);
        partialSplits.push(palindromeSnippet);

        solve(i + 1, S, partialSplits, result);
        partialSplits.pop();
      }
    }
  }
};

var partition = function (str) {
  const result = [];

  solve(0, str, [], result);

  return result;
};

const str = 'aaba';

console.log(partition(str));
