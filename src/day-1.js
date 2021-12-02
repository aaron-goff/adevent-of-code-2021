const fs = require("fs");
const readline = require("readline");

let increasesSolo = 0;
let increasesTrio = 0;
let lineNum = 0;
let first = 0;
let second = 0;
let third = 0;

const increaseSolo = (prev, current) => {
  if (prev < current) {
    increasesSolo++;
  }
};

const increaseTrio = (current) => {
  if (first + second + third < second + third + current) {
    increasesTrio++;
  }
};

const reassign = (current) => {
  first = second;
  second = third;
  third = current;
};

let rl = readline.createInterface({
  input: fs.createReadStream("./src/data/day-1.txt"),
  output: process.stdout,
  terminal: false,
});
rl.on("line", (text) => {
  switch (lineNum) {
    case 0:
      first = Number(text);
      lineNum++;
    case 1:
      second = Number(text);
      increaseSolo(first, second);
      lineNum++;
    case 2:
      third = Number(text);
      increaseSolo(second, third);
      lineNum++;
    default:
      const current = Number(text);
      increaseSolo(third, current);
      increaseTrio(current);
      reassign(current);
  }
});
rl.on("close", () => {
  console.log(`Problem one answer: ${increasesSolo}`);
  console.log(`Problem two answer: ${increasesTrio}`);
});
