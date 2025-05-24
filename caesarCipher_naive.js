
/*  I know we have .ord() and .chr() in python. 
    So there must be something in JS to do the equivalent. 
    I checked and it is .charCodeAt() and .fromCharCode().

    Task:
    - The program should take a phrase and a shift number as inputs from process.argv.
    - Encrypt the phrase by shifting each letter, based on its position in the english alphabet, 
      by the specified number.
      How to check if in Alphabet. In Python we have .isalpha. 
      In JS we have 3 options: regEx, array of ASCII codes or alphqbet string with includes()
      Will test and try out this regEx (regular expression) of lower case [a-z].test(letter)
      docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    - Case insensitive = .toLowerCase()

    - A negative shift means shift to the left 
      We must find a way to grab the 2nd input from the progress. Thinking of Index grabbing: args[0] for the letters and args[1] as the second input for the shift. This is still a string. Need to convert it to a integer. In Python we do .int(). Looked up: Number() in JS. For str() in JS is String()

    - A positive shift means shift to the right
    - Output the encrypted phrase to the console.

    String Constructor:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String

    ASCII codes:
    https://www.w3schools.com/charsets/ref_html_ascii.asp
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

let returnString = "";

for (let i = 0; i < userString.length; i++) {
  const letter = userString[i];
  const code = letter.charCodeAt(0); // Grabbing the char code at index position 0

  // Check if it's a lowercase letter
  if (code >= 97 && code <= 122) { // ASCII a = 97 and z = 122, if inbetween continue:
    let shifted = code + userShift; // set to new let

    // Wrap around for lowercase letters
    if (shifted > 122) { 
      shifted -= 26;
    }
    if (shifted < 97) {
      shifted += 26;
    }

    // build the shifted letters(shifted) into the let returnString
    returnString += String.fromCharCode(shifted);
  } else {
    // add anything else to the returnString
    returnString += letter; 
  }
}

console.log(returnString);