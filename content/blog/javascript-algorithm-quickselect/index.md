---
date: 2022-01-03
title: "Javascript algorithm: Quickselect"
description: A method of picking up kth smallest/largest element
tags: [algorithm, javascript]
donation: false
---

When I saw the article [Javascript Algorithms: Quicksort](https://wsvincent.com/javascript-algorithms-quicksort/) inspires me to write a similar article of quickselect, because quickselect is related to quicksort sorting algorithm.

Quicksort was developed by Tony Hoars, thus quickselect is known as Hoare's selection algorithm.

> Quickselect is a selection algorithm to find the kth smallest element in an unordered list

From wikipedia [definition](https://en.wikipedia.org/wiki/quickselect)

<!-- more -->

## Mechanism

Quickselect summarizes 3 functions

1. quickselect
2. partition
3. swap

### Quickselect

The main body of the algorithm itself.

It has three factors: `left`, `right` pointers and a `pivot` index.

A recursion function until the pivot index equals to the kth smallest index.

The pivot index is generated randomly between the left and right pointers, like this `pivotIndex = Math.floor(Math.random() * (right - left + 1) + left)`

The left pointer starts with 0. If `kth smallest index > pivotIndex`, update `pivotIndex + 1` as the next left argument and the right argument not change.

Vice versa, the right pointer starts with the `array length - 1`. If `kth smallest index < pivotIndex`, update `pivotIndex - 1` as the next right argument and the left argument not change.

Otherwise, we found the kth smallest index and return its value.

### Partition

Inside of the quickselect, the pivot index is updated by partition. Partition is to put the values of the array in order by following steps:

1. Swap the pivot index value with the right pointer value
2. Assign the left pointer to a store index
3. For loop the left pointer until `left <= right`, if `nums[i] < pivotValue` swap the store index value and the loop's i value, update the store index + 1
4. Swap the store index value with the right pointer value (the first greater element larger than the the pivot value)

### Swap

Swap is called very often by partition. Wrap it as an utility function.

Post-ES6 can be written like this

```js
function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}
```

## Put it all together

```js
function quickselect(nums, l, r, kSmallest) {
 // best case for the first input
 if (l === r) {
   return nums[l];
 }

 const swap = (nums, i, j) => [nums[i], nums[j]] = [nums[j], nums[i]];

 const partition = (l, r, pivotIndex) => {
   const pivotValue = nums[pivotIndex];
   // 1. move pivotIndex to end
   swap(nums, pivotIndex, r);

   let storeIndex = l;
   // 2. move all elements of nums smaller than nums[pivotIndex] to the left
   for (let i = l; i <= r; i++) {
     if (nums[i] < pivotValue) {
       swap(nums, storeIndex, i);
       storeIndex++;
     }
   }

   // 3. move 1st element larger than nums[pivotIndex] to its right
   swap(nums, storeIndex, r);

   return storeIndex;
 }

 let pivotIndex = Math.floor(Math.random() * (r - l + 1) + l);

 // update position for next pivotIndex
 pivotIndex = partition(l, r, pivotIndex);

 // the pivotIndex is on (N - k)th smallest position
 if (kSmallest == pivotIndex) return nums[kSmallest];
 // update right, go left side
 else if (kSmallest < pivotIndex) return quickselect(nums, l, pivotIndex - 1, kSmallest);
 // update left, go right side
 return quickselect(nums, pivotIndex + 1, r, kSmallest);
}
```

It has O(N) average time complexity, O(N^2) in the worst case.

## Practice

- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/description/)
