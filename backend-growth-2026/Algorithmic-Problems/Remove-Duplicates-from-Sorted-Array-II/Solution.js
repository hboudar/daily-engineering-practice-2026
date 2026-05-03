/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length <= 2)
        return 2;

    let i = 2;
    for (let j = 2; j < nums.length; j++) {

        if (nums[j] !== nums[i - 2]) {
            nums[i] = nums[j];
            i++; 
        }
    }
    return i;
    
};

// Example 1 usage:const nums = [0,0,1,1,1,2,2,3,3,4];
const nums = [0,0,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4];
const newLength = removeDuplicates(nums);
console.log('New Length: ' + newLength); // Output: 5
console.log('Modified Array: ' + nums.slice(0, newLength)); // Output: [0, 1, 2, 3, 4]


// Example 2 usage: 
const nums2 = [1,1,1,2,2,3];
const newLength2 = removeDuplicates(nums2);
console.log('New Length: ' + newLength2); // Output: 5
console.log('Modified Array: ' + nums2.slice(0, newLength2)); // Output: [1, 2, 3]
