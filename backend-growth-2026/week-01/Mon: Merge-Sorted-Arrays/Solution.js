var merge = function (nums1, m, nums2, n) {
  (m == 0) ? (nums1.splice(0, nums1.length, ...nums2.slice(0, n)), n = 0) : nums1.splice(m);
  for (var i = 0, j = 0; i < m + n; i++) {
    if (nums1[i] > nums2[j]) nums1.splice(i, 0, nums2[j++]);
  }
  nums1.push(...nums2.slice(j, n));
};

// Example usage:

let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;

merge(nums1, m, nums2, n);
console.log('ending', nums1); // Output: [1, 2, 2, 3, 5, 6]

nums1 = [1];
m = 1;
nums2 = [];
n = 0;

merge(nums1, m, nums2, n);
console.log('ending', nums1); // Output: [1]



nums1 = [0];
m = 0;
nums2 = [1];
n = 1;

merge(nums1, m, nums2, n);
console.log('ending', nums1); // Output: [1]