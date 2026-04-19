/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let k = 0;
    let j = nums.length - 1;


    for (let i = 0; i < nums.length; i++) {
        (nums[k] === val) ? (nums[k] += nums[j],
                            nums[j] = nums[k] - nums[j],
                            nums[k] -= nums[j],
                            j--)
                        : k++;
        console.log(nums);
    }

    return k;
};
