// My first solution :

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

// Example usage:
const nums = [1,2,3,4,5,6]
const k = 2;
rotate(nums, k);
console.log('Rotated array: ',nums);

