# 26. Remove Duplicates from Sorted Array

## Problem

Given an integer array `nums` sorted in non-decreasing order, remove the duplicates **in-place** such that each unique element appears only once.

Return the number of unique elements `k`.

After the function returns:

- The first `k` elements of `nums` should contain the unique elements in sorted order.
- The elements beyond `k` do not matter.

### Example 1
**Input:** `nums = [1,1,2]`  
**Output:** `2`  
**Modified array:** `[1,2,_]`

### Example 2
**Input:** `nums = [0,0,1,1,1,2,2,3,3,4]`  
**Output:** `5`  
**Modified array:** `[0,1,2,3,4,_,_,_,_,_]`

### Constraints
- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order

---

## Intuition

Because the array is already sorted, all duplicates are grouped together.

That means we do not need to search for duplicates across the whole array.  
We only need to compare the current number with the last unique number we kept.

So the idea is:

- Keep one pointer for the position of the last unique element.
- Traverse the array with another pointer.
- When we find a new unique value, move it forward into the next valid position.

---

## Approach

Use the **two-pointer** technique:

- `i` points to the last unique element found.
- `j` scans the array from left to right.

For each `j`:

- If `nums[j]` is different from `nums[i]`, then it is a new unique value.
- Increment `i`.
- Copy `nums[j]` into `nums[i]`.

At the end:

- The first `i + 1` elements are the unique values.
- Return `i + 1`.

---

## Logic

### Step-by-step

1. If the array is empty, return `0`.
2. Start `i = 0` since the first element is always unique.
3. Loop `j` from `1` to `nums.length - 1`.
4. Compare `nums[j]` with `nums[i]`.
5. If they are different:
   - increment `i`
   - assign `nums[i] = nums[j]`
6. Return `i + 1`

### Why this works

Since the array is sorted:

- equal values are adjacent
- the first occurrence of each value is enough
- every time we see a different value, it must be the next unique element

This guarantees that the first part of the array is rewritten with only unique values, in the same relative order.

---

## Complexity

### Time Complexity
`O(n)`

We scan the array once.

### Space Complexity
`O(1)`

We modify the array in-place without using extra space proportional to input size.

---

## Code

```js
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;

    let i = 0;

    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
};