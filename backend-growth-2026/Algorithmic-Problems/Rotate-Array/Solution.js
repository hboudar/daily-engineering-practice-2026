// Both solutions have the same time complexity of O(n) and space complexity of O(1)
// They both rotate the array in place without using any additional data structures.
// The first solution uses a single loop to perform the rotation
// while the second solution uses a nested loop.



// My solution (No cap :) ):

var rotate1 = function(nums, k) {
    let current = 0;
    let target = k % nums.length;

    for (let i = 0; i < nums.length; i++) {
        if (current === target) { // 
            current++; // moving to the next current index
            target = current; // reseting target to the new current index
        } else {
            [nums[current], nums[target]] = [nums[target], nums[current]];
        }
        target = (target + k) % nums.length; // moving target k steps ahead
    }
}


// GPT's enhancment of mine :

var rotate2 = function(nums, k) {
    const n = nums.length;
    k %= n;

    let moved = 0;

    for (let start = 0; moved < n; start++) {
        let current = start;
        let prev = nums[start];

        do {
            const next = (current + k) % n;

            const temp = nums[next];
            nums[next] = prev;

            prev = temp;
            current = next;

            moved++;
        } while (current !== start);
    }
};

// Example usage:
const nums = [1,2,3,4,5,6]
const k = 2;
rotate1(nums, k);
console.log('Rotated array: ',nums);



// Example usage:
const nums2 = [1,2,3,4,5,6]
const k2 = 2;
rotate2(nums2, k2);
console.log('Rotated array: ',nums2);