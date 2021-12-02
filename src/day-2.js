const fs = require("fs");
const readline = require("readline");

let rl = readline.createInterface({
  input: fs.createReadStream("./src/data/day-2.txt"),
  output: process.stdout,
  terminal: false,
});
let horizontal = 0;
let aim = 0;
let depth = 0;
rl.on("line", (text) => {
  const command = text.split(" ")[0];
  const amount = Number(text.split(" ")[1]);
  if (command == "forward") {
    horizontal += amount;
    depth += amount * aim;
  } else if (command == "down") {
    aim += amount;
  } else if (command == "up") {
    aim -= amount;
  }
});
rl.on("close", () => {
  console.log(`Horizontal is ${horizontal}`);
  console.log(`Vertical is ${aim}`);
  console.log(`Multiplied is ${horizontal * aim}`);
  console.log(`Depth is ${depth}`);
  console.log(`Horizontal times depth is ${horizontal * depth}`);
});
