const fs = require("fs");

const data = fs
  .readFileSync("./src/data/day-8.txt")
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(" | "));

const inputs = [];
const outputs = [];
data.forEach((x) => {
  inputs.push(x[0].split(" "));
  outputs.push(x[1].split(" "));
});

// Answer one
let oneFourSevenEightAnswer = 0;
for (const output of outputs) {
  for (const digit of output) {
    oneFourSevenEightAnswer =
      digit.length === 2 ||
      digit.length === 3 ||
      digit.length === 4 ||
      digit.length === 7
        ? oneFourSevenEightAnswer + 1
        : oneFourSevenEightAnswer;
  }
}

let totalOutput = 0;
for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
  const input = inputs[inputIndex];
  let digits = [...Array(10)];
  let potential5 = [];
  let potential6 = [];
  for (const digit of input) {
    switch (digit.length) {
      case 2:
        digits[1] = digit;
        break;
      case 3:
        digits[7] = digit;
        break;
      case 4:
        digits[4] = digit;
        break;
      case 5:
        potential5.push(digit);
        break;
      case 6:
        potential6.push(digit);
        break;
      case 7:
        digits[8] = digit;
        break;
    }
  }

  // Zero contains all but one of 4's segments, but 6 and 9 contain all of 4's segments
  for (const digit of potential6) {
    let letters = [];
    for (const letter of digits[4]) {
      // the segment zero does not contain exists on 4 but not on 1, so just simplifying
      if (digits[1].indexOf(letter) === -1) {
        letters.push(letter);
      }
    }
    // if the digit does not contain all segments, it is 0
    if (digit.indexOf(letters[0]) === -1 || digit.indexOf(letters[1]) === -1) {
      digits[0] = digit;
    }
  }
  // remove 0
  potential6 = potential6.filter((item) => item !== digits[0]);
  // 6 and 9 remain -> 6 does not contain one of the segments in 1
  for (const digit of potential6) {
    if (
      digit.indexOf(digits[1][0]) === -1 ||
      digit.indexOf(digits[1][1]) === -1
    ) {
      digits[6] = digit;
    }
  }
  // 9 is the remaining 6 segment digit
  digits[9] = potential6.filter((item) => item !== digits[6])[0];

  // 2 and 5 do not contain both of 1's segments, but 3 does
  for (const digit of potential5) {
    if (
      digit.indexOf(digits[1][0]) !== -1 &&
      digit.indexOf(digits[1][1]) !== -1
    ) {
      digits[3] = digit;
    }
  }
  // remove 3
  potential5 = potential5.filter((item) => item !== digits[3]);
  // 5 is only missing one of 4's segments, while 2 is missing 2 segments.
  for (const digit of potential5) {
    let missing = 0;
    for (const letter of digits[4]) {
      missing = digit.indexOf(letter) === -1 ? missing + 1 : missing;
    }
    if (missing === 1) {
      digits[5] = digit;
    } else if (missing === 2) {
      digits[2] = digit;
    }
  }
  const output = outputs[inputIndex];
  let curOutput = [];
  for (let digitIndex = 0; digitIndex < output.length; digitIndex++) {
    for (let i = 0; i < digits.length; i++) {
      if (output[digitIndex].length === digits[i].length) {
        let match = true;
        for (const letter of output[digitIndex]) {
          if (digits[i].indexOf(letter) === -1) {
            match = false;
            break;
          }
        }
        if (match) {
          curOutput.push(i);
        }
      }
    }
  }
  totalOutput += parseInt(curOutput.join(""));
}
console.log(`Answer one is: ${oneFourSevenEightAnswer}`);
console.log(`Answer two is: ${totalOutput}`);
