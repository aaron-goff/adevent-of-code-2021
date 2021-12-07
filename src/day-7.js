const fs = require("fs");

const data = fs
  .readFileSync("./src/data/day-7.txt")
  .toString()
  .split(",")
  .map(Number);

let min = Math.min(...data);
let max = Math.max(...data);

const getLowest = (isIncremental) => {
  let lowCost = Math.pow(10, 1000);
  for (let i = min; i < max; i++) {
    let cost = 0;
    for (let j = 0; j < data.length; j++) {
      if (isIncremental) {
        // Second answer
        const low = Math.min(data[j], i);
        const high = Math.max(data[j], i);
        for (let step = 1; step <= high - low; step++) {
          cost += step;
        }
      } else {
        // First answer
        cost += Math.abs(data[j] - data[i]);
      }
    }
    lowCost = cost < lowCost ? cost : lowCost;
  }
  return lowCost;
};
console.log(`First answer is: ${getLowest(false)}`);
console.log(`Second answer is ${getLowest(true)}`);
