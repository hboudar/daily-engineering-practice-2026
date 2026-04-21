/**
 * @param {number[]} nums
 * @return {number}
 */
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

// Example usage:
const nums = [1, 1, 2];
const newLength = removeDuplicates(nums);
console.log(newLength); // Output: 2
console.log(nums.slice(0, newLength)); // Output: [1, 2]


// // Example usage:
const nums2 = [0,0,1,1,1,2,2,3,3,4];
const newLength2 = removeDuplicates(nums2);
console.log(newLength2); // Output: 5
console.log(nums2.slice(0, newLength2)); // Output: [0, 1, 2, 3, 4]