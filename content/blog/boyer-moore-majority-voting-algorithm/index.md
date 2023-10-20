---
date: 2023-10-21
title: Boyer-Moore majority voting algorithm
description: 一個用線性時間和常數空間 O(1) 複雜度演算法尋找佔多數的元素
tags: [algorithm]
---

Boyer-Moore majority voting algorithm 是一個用**線性時間**和**常數空間**尋找元素序列中佔多數的元素

> <https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm>

可以解決的問題，如 Leetcode [169. Majority Element](https://leetcode.com/problems/majority-element/)

```txt
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

比較簡單直覺的做法是用一個 hash table 紀錄每個數字出現的次數和最大的計數

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let counts = new Map();
  let candidate = null;
  let maxCount = 0;
  for (const n of nums) {
    if (!counts.has(n)) {
      counts.set(n, 0);
    }
    counts.set(n, counts.get(n) + 1);
    // if the number's count greater than the maxCount
    // The current number is the majority of the element
    if (counts.get(n) > maxCount) {
      maxCount = counts.get(n);
      candidate = n;
    }
  }

  return candidate;
};
```

這個解法的複雜度為

- Time Complexity: O(n)
- Space Complexity: O(n)，需要一個 n 陣列長度的 map 紀錄每個數字出現次數。

如果要用 **O(1) Space** 解決這個問題就要用到 Boyer-Moore majority voting algorithm

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let count = 0;
  let candidate = null;

  for (const n of nums) {
    // when count is zero takes any number as a candidate
    if (count == 0) {
      candidate = n;
    }
    // if the current number is not the candidate number
    // the count subtracts 1, vice versa adds 1
    count += n == candidate ? 1 : -1;
  }

  return candidate;
};
```

其他相關問題

- [229. Majority Element II](https://leetcode.com/problems/majority-element-ii/)
- [1150. Check If a Number Is Majority Element in a Sorted Array](https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array/)
