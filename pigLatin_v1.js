// Args slice
const args = process.argv.slice(2);
// console.log(args);
// Set the user Choice
// need an Array of words, not a Sentence Array
let userString = args.join(' ').split(' ')

// console.log(userString);

// Checking if each string has two consonants or a consonant and a vowel or just a vowel
// In Python we did it with a list and: if letter in listVowels
// In JavaScript we can do the same with an Array of vowels and .includes()

// Grabbing 'word'[0] and 'word'[1] are the two letter to check if they are a const and a vowel [change nr. 1
// or both vowels [change nr. 2].
// for our else if when 'word'[0] is a vowel we do change nr. 3

const vowels = ['a','e','i','o','u','A','E','E','I','O','U'];
let translateWords = [];

userString.forEach((word) => {
    if (!vowels.includes(word[0]) && vowels.includes(word[1])) {
        // If a word starts with a consonant and a vowel, 
        // put the first letter of the word at the end of the word and add “ay.”
        const cvString = word.slice(1) + word[0] + 'ay';
        translateWords.push(cvString);
    }
    else if (vowels.includes(word[0]) && vowels.includes(word[1])) {
        // If a word starts with two consonants 
        // move the two consonants to the end of the word and add “ay.”
        const vvString = word.slice(1) + word[0] + word[1] + 'ay';
        translateWords.push(vvString);
    }
    else if (vowels.includes(word[0])) {
        // If a word starts with a vowel add the word “way” at the end of the word.
        const vString = word + 'way';
        translateWords.push(vString);
    };

 })

// Convert the let to a const and string it with spaces
const finalSentence = translateWords.join(' ')

// clg it. 
console.log(finalSentence);