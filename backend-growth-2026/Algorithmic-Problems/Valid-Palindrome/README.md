# 125. Valid Palindrome

## Problem
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

---

## Example 1
**Input:**  
`s = "A man, a plan, a canal: Panama"`

**Output:**  
`true`

**Explanation:**  
After removing non-alphanumeric characters and converting uppercase letters to lowercase:

`"amanaplanacanalpanama"`

This string reads the same forward and backward.

---

## Example 2
**Input:**  
`s = "race a car"`

**Output:**  
`false`

**Explanation:**  
After cleaning the string:

`"raceacar"`

This string does not read the same forward and backward.

---

## Example 3
**Input:**  
`s = " "`

**Output:**  
`true`

**Explanation:**  
After removing non-alphanumeric characters, the string becomes empty:

`""`

An empty string is considered a palindrome.

---

## Intuition
The problem asks us to compare only meaningful characters:

- lowercase letters
- uppercase letters converted to lowercase
- digits

All other characters, such as spaces, commas, and punctuation, should be ignored.

So, we can first build a cleaned version of the string that contains only lowercase alphanumeric characters.

Then we check whether this cleaned string reads the same from the beginning and from the end.

---

## Approach
Use two steps:

### Step 1: Normalize the string
Create a new string called `result`.

Loop through every character in `s`:

- If the character is an uppercase letter, convert it to lowercase.
- If the character is a lowercase letter, keep it.
- If the character is a digit, keep it.
- Otherwise, ignore it.

### Step 2: Check if the cleaned string is a palindrome
Use a loop from the beginning to the middle of `result`.

For every index `i`, compare:

```javascript
result[i]
```


## Code:

```javascript
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
```

## Better Solution : 

```javascript
var isPalindrome = function (s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        while (left < right && !isAlphaNumeric(s[left])) {
            left++;
        }

        while (left < right && !isAlphaNumeric(s[right])) {
            right--;
        }

        if (toLowerAscii(s[left]) !== toLowerAscii(s[right])) {
            return false;
        }

        left++;
        right--;
    }

    return true;
};

function isAlphaNumeric(ch) {
    const code = ch.charCodeAt(0);

    return (
        (code >= 48 && code <= 57) ||  // 0-9
        (code >= 65 && code <= 90) ||  // A-Z
        (code >= 97 && code <= 122)    // a-z
    );
}

function toLowerAscii(ch) {
    const code = ch.charCodeAt(0);

    if (code >= 65 && code <= 90) {
        return String.fromCharCode(code + 32);
    }

    return ch;
}
```