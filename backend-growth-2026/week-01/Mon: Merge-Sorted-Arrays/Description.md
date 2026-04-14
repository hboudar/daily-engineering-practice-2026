# Problem : 'Merge Sorted Array'

You are given two integer arrays, nums1 and nums2, sorted in non-decreasing order, along with two integers m and n.

The first m elements of nums1 are valid values.
The last n elements of nums1 are placeholder zeros and should be ignored.
nums2 contains n valid elements.

The task is to merge nums2 into nums1 so that nums1 becomes one sorted array in non-decreasing order.

The result must be stored in place inside nums1, not returned.

Constraints:

nums1.length == m + n
nums2.length == n
0 <= m, n <= 200
1 <= m + n <= 200
-109 <= nums1[i], nums2[j] <= 109
 

# Constraints : 'What mattered?'

The main detail is that nums1 already has enough space to hold all m + n elements, but only its first m values are part of the input. The trailing zeros are just placeholders.

The prompt also asks whether the problem can be solved in O(m + n) time. That is the optimal target, although the approach below is insertion-based and is not optimal in the worst case.


# Approach & Solution:

I solve the problem by merging from the front of both arrays.

First, I remove the placeholder part of nums1 and keep only its first m valid elements. This is necessary because my solution relies on insertion, and leaving the extra zeros in place would interfere with comparisons.

Then I use two pointers:

i scans nums1
j scans nums2

At each step:

If nums1[i] is less than or equal to nums2[j], I leave nums1[i] where it is.
Otherwise, nums2[j] is smaller, so I insert it into nums1 at index i and move j forward.

This keeps nums1 sorted as I process the arrays.

After the scan finishes, if there are still elements left in nums2, I append them to the end of nums1, since they are all greater than the elements already placed.


# Mistakes / Failure mode
At first, I missed two important details:

The trailing zeros in nums1 are only placeholders, not real values to compare against, so better remove/ignore them.
The case m = 0 needs special handling, because nums1 has no valid initial elements.

My early mistake was treating nums1 as if all of its elements were part of the sorted input. That caused incorrect comparisons and broke edge cases.


# Takeaway & Backend relevance

The broader lesson is to distinguish between:

actual data
reserved capacity
placeholder values
