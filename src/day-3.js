const fs = require("fs");
const readline = require("readline");

let rl = readline.createInterface({
  input: fs.createReadStream("./src/data/day-3.txt"),
  output: process.stdout,
  terminal: false,
});
let lines = [];
const getMostCommonBit = (data, index) => {
  let value = 0;
  data.forEach((line) => {
    value += Number(line[index]) === 1 ? 1 : -1;
  });
  return value >= 0 ? "1" : "0";
};
const getLeastCommonBit = (data, index) => {
  return getMostCommonBit(data, index) === "1" ? "0" : "1";
};

rl.on("line", (text) => {
  lines.push(text);
});
rl.on("close", () => {
  const lineLength = lines[0].length;
  let gamma = "";
  let epsilon = "";
  for (i = 0; i < lineLength; i++) {
    gamma += getMostCommonBit(lines, i);
    epsilon += getLeastCommonBit(lines, i);
  }
  oxygen = lines;
  for (i = 0; i < lineLength && oxygen.length > 1; i++) {
    let mostCommon = getMostCommonBit(oxygen, i);
    oxygen = oxygen.filter((item) => {
      return item[i] === mostCommon;
    });
  }

  co2 = lines;
  for (i = 0; i < lineLength && co2.length > 1; i++) {
    let leastCommon = getLeastCommonBit(co2, i);
    co2 = co2.filter((item) => {
      return item[i] === leastCommon;
    });
  }

  console.log(`Final gamma is ${gamma}, in decimal is: ${parseInt(gamma, 2)}`);
  console.log(
    `Final epsilon is ${epsilon}, in decimal is: ${parseInt(epsilon, 2)}`
  );
  console.log(`Power is: ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`);
  console.log(
    `Oxygen is ${oxygen[0]}, in decminal is: ${parseInt(oxygen[0], 2)}`
  );
  console.log(`CO2 is ${co2[0]}, in decminal is: ${parseInt(co2[0], 2)}`);
  console.log(
    `Life Support Rating is ${parseInt(oxygen[0], 2) * parseInt(co2[0], 2)}`
  );
});

// 4105235
