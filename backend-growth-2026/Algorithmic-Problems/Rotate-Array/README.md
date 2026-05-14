# 189. Rotate Array

## Problem
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

The rotation must be done **in-place**.

---

## Example 1
**Input:**  
`nums = [1,2,3,4,5,6,7], k = 3`

**Output:**  
`[5,6,7,1,2,3,4]`

---

## Example 2
**Input:**  
`nums = [-1,-100,3,99], k = 2`

**Output:**  
`[3,99,-1,-100]`

---

## Intuition
Rotating the array means every element moves from index:

```text
i -> (i + k) % n
```

where:

- `i` is the current index
- `k` is the number of rotations
- `n` is the array length

Instead of creating a new array, we can follow these index movements directly and swap values in-place.

The array rotation forms one or more **cycles**.  
Each cycle moves elements through the array until it returns to the starting position.

When a cycle closes, we move to the next untouched position and continue.

---

## Approach
Use two pointers:

- `current` → current index being updated
- `target` → destination index for `current` index

### Logic
- Compute the next rotated position using:

```text
target = (target + k) % n
```

- Swap values between `current` and `target`
- Continue following the cycle
- If the `current` is already in its `target` position (`target === destination`), move to the next cycle

This allows the rotation to happen completely in-place without extra memory.

---

## Complexity
- **Time complexity:** `O(n)`
- **Space complexity:** `O(1)`

---

## Code
```javascript
var rotate = function(nums, k) {
    const n = nums.length;

    let current = 0;
    let target = k % n;

    for (let i = 0; i < n; i++) {
        
        if (current === target) { // If we have come back to the starting point, move to the next element
            current++; // Move to the next element
            target = current; // Update the target to the new current
        } else {
            nums[current] += nums[target];
            nums[target] = nums[current] - nums[target];
            nums[current] -= nums[target];
        }
        target = (target + k) % n; // Move the target k steps ahead, wrapping around using modulo
    }
}
```

---

## Better Solution
A cleaner and more standard approach is the **reverse method**.

### Idea
1. Reverse the whole array
2. Reverse the first `k` elements
3. Reverse the remaining elements

Example:

```text
[1,2,3,4,5,6,7]
k = 3

Reverse all:
[7,6,5,4,3,2,1]

Reverse first k:
[5,6,7,4,3,2,1]

Reverse remaining:
[5,6,7,1,2,3,4]
```

---

## Better Solution Code
```javascript
var rotate = function(nums, k) {
    const n = nums.length;
    k %= n;

    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
};

function reverse(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
```

---

## Key Insight
The hidden structure of this problem is that array rotation is a **permutation of indices**.

The movement rule:

```text
i -> (i + k) % n
```

creates one or more cycles inside the array.

Understanding these cycles is the core idea behind efficient in-place rotation algorithms.