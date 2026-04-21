# 27. Remove Element

## Problem
Given an integer array `nums` and an integer `val`, remove all occurrences of `val` **in-place**.  
The order of the elements **may be changed**.

Return the number of elements in `nums` that are **not equal** to `val`.

The first `k` elements of `nums` should contain all elements that are not equal to `val`, where `k` is the returned value.  
Anything beyond the first `k` elements does not matter.

---

## Example 1
**Input:**  
`nums = [3,2,2,3], val = 3`

**Output:**  
`2, nums = [2,2,_,_]`

**Explanation:**  
The function returns `k = 2`, and the first two elements are `2`.

---

## Example 2
**Input:**  
`nums = [0,1,2,2,3,0,4,2], val = 2`

**Output:**  
`5, nums = [0,1,4,0,3,_,_,_]`

**Explanation:**  
The function returns `k = 5`, and the first five elements contain all values different from `2`.  
The order does not matter.

---

## Intuition
Since the problem allows the order of elements to change, we do not need to shift every element left when we find `val`.

Instead, whenever the current element is equal to `val`, we can swap it with an element from the end of the array.  
This way, unwanted values are pushed toward the back, and valid values stay in the front part of the array.

The first part of the array will eventually contain only elements different from `val`, and its size is the answer.

---

## Approach
Use two pointers:

- `k` points to the current position from the front.
- `j` points to the current position from the back.

### Logic
- If `nums[k] !== val`, this element is valid, so move `k` forward.
- If `nums[k] === val`, swap `nums[k]` with `nums[j]` and decrease `j`.
- Do **not** move `k` after a swap, because the new value placed at `nums[k]` may still be equal to `val`, so it must be checked again.

At the end, `k` represents the number of elements that are not equal to `val`.

---

## Complexity
- **Time complexity:** `O(n)`
- **Space complexity:** `O(1)`

---

## Code
```javascript
var removeElement = function(nums, val) {
    let k = 0;
    let j = nums.length - 1;

    for (let i = 0; i < nums.length; i++) {
        (nums[k] === val) ?
                            (
                                nums[k] += nums[j],
                                nums[j] = nums[k] - nums[j],
                                nums[k] -= nums[j],
                                j--
                            )
                        : k++;
    }

    return k;
};
```

## Better solution :
```javascript
var removeElement = function(nums, val) {
    let k = 0;

    for (let i = 0; i < nums.length; i++)
        (nums[i] !== val) && (nums[k++] = nums[i]);

    return k;
};
```