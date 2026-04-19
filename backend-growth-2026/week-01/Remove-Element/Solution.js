/*My first Approach*/

var removeElement = function(nums, val) {
    let k = 0;
    let j = nums.length - 1;


    for (let i = 0; i < nums.length; i++) {
        (nums[k] === val) ? (nums[k] += nums[j],
                            nums[j] = nums[k] - nums[j],
                            nums[k] -= nums[j],
                            j--)
                        : k++;
    }

    return k;
};


// Example usage:

let nums = [3, 2, 2, 3];
let val = 3;

console.log(removeElement(nums, val)); // Output: 2
console.log(nums); // Output: [2, 2, _, _]

nums = [0,1,2,2,3,0,4,2];
val = 2;

console.log(removeElement(nums, val)); // Output: 5
console.log(nums); // Output: [0,1,3,0,4,_,_,_]

nums = [1];
val = 1;

console.log(removeElement(nums, val)); // Output: 0
console.log(nums); // Output: [_]