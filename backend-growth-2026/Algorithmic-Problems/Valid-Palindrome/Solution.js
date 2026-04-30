/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let result = "";
    for (let i = 0; i < s.length; i++)
        result += (s[i] >= 'A' && s[i] <= 'Z') ? String.fromCharCode(s[i].charCodeAt(0) + 32)
                : (s[i] >= 'a' && s[i] <= 'z') ? s[i]
                : (s[i] >= '0' && s[i] <= '9') ? s[i]
                : "";

    for (let i = 0; i < result.length / 2; i++) {
        if (result[i] !== result[result.length - 1 - i])
            return false;
    }


    return true;
};

//example 1
console.log('result 1:', isPalindrome("A man, a plan, a canal: Panama")); // true

// example 2
console.log('result 2:', isPalindrome("race a car")); // false

//example 3
console.log('result 3:', isPalindrome(" ")); // true

//example 4
console.log('result 4:', isPalindrome("0P")); // false
