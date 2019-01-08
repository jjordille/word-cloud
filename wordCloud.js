class WordCloudData {
  constructor(inputString) {
    this.wordsToCounts = new Map();
    this.populateWordsToCounts(inputString);
  }

  populateWordsToCounts(inputString) {

    // Count the frequency of each word
    // Steps to account for

    // Think of the case "Bob has a dog, a cat and three fish...AND a dog"

    // This function will

    // 1. Itterate through your input string one character at a time
    // keeping track of the current character it is on

    // 2. Determine if a word has started by passing the current character into
    // a function that will compare the current character to a string of letters
    // and if there is a match then we will return the value (the letter) at the
    // index of the match

    // 3. Keep track of the current words length and start index to assure
    // that we do not forget where we determine the start of a word is

    // 4. Continue to increment the word count until the current character
    // does not match a value in the string of letter in our isLetter() function
    // in which case we move on to check WHICH type of non letter character
    // it is.

    // 5. Once we have determined a word has ended, we check to see if
    // if our current word length > 0 and if if is we splice our string from
    // our words start index up to the index plus the length of the word
    // and save it to a variable word.

    // 6. We pass our word into a funciton that will add the word to the map
    // or increment the count associated with the key that matches the word
    // by checking to see if the value saved in the word variable is already
    // inside of our word map, if it is, we increment the count of the value
    // associated with that word key
    // if the word is not already in the map, then we add the word as a key
    // in the map and assign its value to 1

    let currentWordStartIndex = 0;
    let currentWordLength = 0;

    for(let i = 0; i < inputString.length; i++){
      const character = inputString.charAt(i);

      if(i === inputString.length - 1) {
        if(this.isLetter(character)){
          currentWordLength += 1;
        }
        if(currentWordLength > 0) {
          const word = inputString.slice(currentWordStartIndex, currentWordStartIndex + currentWordLength);
          this.addWordToMap(word);
        }
      } else if(character === ' ' || character === '\u2014') {
          if(currentWordLength > 0){
            const word = inputString.slice(currentWordStartIndex, currentWordStartIndex + currentWordLength);
            this.addWordToMap(word);
            currentWordLength = 0;
          }
        } else if(character === '.') {
          if(i < inputString.length - 1 && inputString.charAt(i+1) === '.') {
            if(currentWordLength > 0) {
              const word = inputString.slice(currentWordStartIndex, currentWordStartIndex + currentWordLength);
              this.addWordToMap(word);
              currentWordLength = 0;
            }
          }
        } else if(this.isLetter(character) || character === '\''){
            if(currentWordLength === 0){
            currentWordStartIndex = i;
            }
            currentWordLength += 1;
          } else if(character === '-'){
            if(i > 0 && this.isLetter(inputString.charAt(i-1)) && this.isLetter(inputString.charAt(i+1))){
              if(currentWordLength === 0){
                currentWordStartIndex = i;
              }
              currentWordLength += 1;
            } else {
                if(currentWordLength > 0) {
                const word = inputString.slice(currentWordStartIndex, currentWordStartIndex + currentWordLength);
                this.addWordToMap(word);
                currentWordLength = 0;
              }
            }
          }
    }
  }

  addWordToMap(word) {
    let newCount;

    if(this.wordsToCounts.has(word)) {
      newCount = this.wordsToCounts.get(word) + 1;
      this.wordsToCounts.set(word, newCount);
    } else if(this.wordsToCounts.has(word.toLowerCase())){
        newCount = this.wordsToCounts.get(word.toLowerCase()) + 1;
        this.wordsToCounts.set(word.toLowerCase(), newCount);
    } else if(this.wordsToCounts.has(this.capitalize(word))) {
        newCount = this.wordsToCounts.get(this.capitalize(word)) + 1;
        this.wordsToCounts.set(word.toLowerCase(), newCount);
        this.wordsToCounts.delete(this.capitalize(word));
    } else {
      this.wordsToCounts.set(word, 1);
    }
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  isLetter(character) {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(character) >= 0;
  }
}

const createNewWordCloud = () => {
  document.getElementById("container").innerHTML = '';
  const message = document.getElementById("message").value;
  const newCloud = new WordCloudData(message).wordsToCounts;
  console.log(newCloud);

  newCloud.forEach(addWords);
  //console.log(newCloud.keys());
  const iterator1 = newCloud[Symbol.iterator]();

  for (let item of iterator1) {
    appearanceKey = item[0];
    if(item[1] === maxValue){
      document.getElementById(`${appearanceKey}`).style.color = "blue";
    }
  }
}

let maxValue = 0;
const addWords = (value, key, map) => {
  const appearanceKey = key;
  let newFontSize = 384/map.size * value;
  let newDiv = document.createElement('div');
  let newColor = randomColor();
  newDiv.id = `${key}`;
  newDiv.innerHTML = key;
  newDiv.style.fontSize = `${newFontSize}px`;
  newDiv.style.display = "inline-block";
  newDiv.style.color = `${newColor}`;
  if(value > maxValue) {
    maxValue = value;
  }
  document.getElementById("container").appendChild(newDiv);
  document.getElementById("container").style.border = "thick solid red";
}

const randomColor = () => {
  let values = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += values[Math.floor(Math.random() * 16)];
  }
  return color;
}
