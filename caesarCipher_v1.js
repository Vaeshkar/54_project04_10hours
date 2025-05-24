/*  I know we have .ord() and .chr() in python. 
    So there must be something in JS to do the equivalent. 
    I checked and it is .charCodeAt() and .fromCharCode().

    Task:
    - The program should take a phrase and a shift number as inputs from process.argv.
    - Encrypt the phrase by shifting each letter, based on its position in the english alphabet, 
      by the specified number.
      How to check if in Alphabet. In Python we have .isalpha. 
      In JS we have 3 options: regEx, array of ASCII codes or alphabet string with includes()
      Will test and try out this RegEx (regular expression) of lower case [a-z].test(letter)
      docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    - Case insensitive = .toLowerCase()

    - A negative shift means shift to the left 
      We must find a way to grab the 2nd input from the progress. Thinking of Index grabbing: args[0] for the letters and args[1] as the second input for the shift. This is still a string. Need to convert it to a integer. In Python we do .int(). Looked up: Number() in JS. For str() in JS is String()

    - A positive shift means shift to the right
    - Output the encrypted phrase to the console.

    .str() or .int()
    Number constructor: 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number
    String Constructor:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String

    ASCII codes:
    https://www.w3schools.com/charsets/ref_html_ascii.asp
 */

  /* 
  Python: if word not in words;
              do something here;
  Javascript: if (words.included(word)) { do something here};
  
  */


// Args slice
const args = process.argv.slice(2);
console.log(args);

// Set the user Choice
// need an Array of words, not a Sentence Array
let userString = args[0].toLowerCase()
let userShift = Number(args[1])

// check if it works.
console.log(args[0]);
console.log(args[1]);

const returnString = userString
    .split('') // to get letters from the userString
    .map((letter) => {
        // look true alphabet with RegEx.
    if (/[a-z]/.test(letter)) {
        const baseLetter = 'a'.charCodeAt(0); // Grab the charChode at index position 0, get a base value: 97
        const shiftLetter = (letter.charCodeAt(0) - baseLetter + userShift + 26) % 26; // 
        // return the String Constructor and convert the codes to chars. 
        return String.fromCharCode(baseLetter + shiftLetter);
    } else {
        // anything else return to returnString
        return letter;
}
})

const finalSentence = returnString.join('');
console.log(finalSentence); // Output: khoor zruog