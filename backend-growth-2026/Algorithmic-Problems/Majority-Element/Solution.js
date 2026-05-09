/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let count = 0;
    let candidate = null;

    for (let num of nums) {
        candidate = (count === 0) ? num : candidate;
        count += (num === candidate) ? 1 : -1;
    }

    return candidate;
};
// Example usage:
const nums = [3,3,4];
console.log(majorityElement(nums)); // Output: 3
